# coding=cp949
import sys
import os

import angr
import archinfo
import logging
import signal
import subprocess

import hashlib
import random
import base64
import os


import uuid

from qiling import *
from unicorn import *
from capstone import *
from unicorn.x86_const import *



logging.getLogger('angr.state_plugins.symbolic_memory').setLevel(logging.CRITICAL)
logging.getLogger('angr.engines.successors').setLevel(logging.CRITICAL)
logging.getLogger('angr.project').setLevel(logging.CRITICAL)


class MyPipe():
	def __init__(self):
		self.buf = b''

	def write(self, s):
		self.buf += s

	def read(self, l):
		if l <= len(self.buf):
			ret = self.buf[ : l]
			self.buf = self.buf[l : ]
		else:
			ret = self.buf
			self.buf = ''
		return ret

	def fileno(self):
		return 0

	def show(self):
		pass

	def clear(self):
		pass

	def flush(self):
		pass

	def close(self):
		self.outpipe.close()
 	
		
def fully_symbolic(state, variable):
	for i in range(state.arch.bits):
		if not state.solver.symbolic(variable[i]):
			return False
	return True

def isSymbolExists(p,func_name):	
	for sym in p.loader.main_object.symbols:
		if sym.name == func_name:
			return sym.rebased_addr
	return None
def getProtection(ld):
	properties = {}
		
	properties["arch"] = ld.main_object.arch
	properties["pic"] = ld.main_object.pic
	properties["execstack"] = ld.main_object.execstack
	properties["canary"] = False
	
	for sym in ld.main_object.symbols:
		if sym.name == "__stack_chk_fail":
			properties["canary"] = True
	return properties

def getXrefString(p, cfg, find_str):
	
	ret_xref = []

	for f in cfg.memory_data.values():
		if f.sort == 'string' and f.content == find_str:
			if f.addr in p.kb.xrefs.xrefs_by_dst:
				for xref in p.kb.xrefs.xrefs_by_dst[f.addr]:
					ret_xref.append(xref)
	return ret_xref
	
def getXrefFunc(p, src):
	
	ret_xref = []
	addr = src
	if type(addr) == type("str"):
		addr = p.loader.main_object.plt[addr]

	if addr in p.kb.xrefs.xrefs_by_dst:
		for xref in p.kb.xrefs.xrefs_by_dst[addr]:
			ret_xref.append(xref)
	return ret_xref

### 
def findGetFlag(p, cfg):
	
	possible_xref = getXrefString(p, cfg, b"cat /flag")
	for xref in possible_xref:
		for node in cfg.graph.nodes():
			if xref.ins_addr >= node.addr and xref.ins_addr < node.addr+node.size:
				block_addr = node.addr
				block = p.factory.block(block_addr)
				irsb = block.vex
				if irsb.jumpkind == "Ijk_Call":
					callee_addr = int(str(irsb.next),16)
					if p.loader.main_object.reverse_plt[callee_addr] == "system":
						return block_addr
	
	return None
def step_func(simgr):
	
	exploitable_state = None
	if len(simgr.unconstrained) > 0:
		for u in simgr.unconstrained:
			if fully_symbolic(u, u.regs.pc):
				exploitable_state = u
				break
		#simgr.drop(stash='unconstrained')
	if exploitable_state != None:
		simgr.drop(stash="active")
	return simgr


def gen_random(n=20):
	result = ""
	for i in range(n):
		result += random.choice("0123456789abcdef")
	return str.encode(result)

def main():
	
	signal.alarm(120)
	
	server_pow = hashlib.sha384(gen_random()).hexdigest()[:5]
	print("POW : %s"%(server_pow))
	sys.stdout.write("Input : ")
	sys.stdout.flush()
	user_pow = hashlib.sha384(str.encode(input())).hexdigest()[:5]
	if user_pow != server_pow:
		print("Pow Failed")
		return
	
	sys.stdout.write("Input binary size : ")
	sys.stdout.flush()
	size = int(input())
	
	if size > 1024*1024:
		print("Too Big!")
		return
	try:
		input_binary = base64.b64decode(sys.stdin.read(size))
	except:
		print("base64 decode error.")
		return
	
	binary = OUT = "/tmp/binary-" + str(uuid.uuid4())
	
	f = open(binary,"wb")
	f.write(input_binary)
	f.close()
	os.system("chmod +x %s"%(binary))
	
	p = angr.Project(binary,auto_load_libs=False) #
	ld = p.loader
	protection = getProtection(ld)
	cfg = p.analyses.CFGFast(resolve_indirect_jumps=True, data_references = True) #
	get_flag = findGetFlag(p,cfg)
	
	
	if isSymbolExists(p,"read") != None:
		print("Sorry, i hate read")
		return
	
	if get_flag != None and protection["arch"].bits == 32 and protection["canary"] == False and protection["pic"] == False:
		sys.stdout.write("START %s\n"%(binary))
		sys.stdout.flush()
		
		entry_state = p.factory.entry_state(add_options=angr.options.unicorn & {angr.sim_options.REVERSE_MEMORY_NAME_MAP, angr.sim_options.TRACK_ACTION_HISTORY})
		simgr = p.factory.simgr(entry_state, save_unconstrained=True)
		
		simgr.step()
		
		simgr.explore(find=get_flag,step_func=step_func)
		
		if len(simgr.found) > 0:
			print("Angr is smarter than you!")
			print(simgr.found[0].posix.dumps(0))
			return
		elif len(simgr.unconstrained) > 0:
			ep = simgr.unconstrained[0]
			if ep.satisfiable(extra_constraints=[ep.regs.pc == get_flag]):
				ep.add_constraints(ep.regs.pc == get_flag)
				stdin = MyPipe()
				stdin.write(ep.posix.dumps(0))
				
				w = os.pipe()[1]
				w = os.fdopen(w, 'wb')
				
				ql = Qiling([binary],rootfs="/home/angry_solo/x86_linux",output = "off", stdin=stdin,stdout=w)
				ql.until_addr = get_flag
				
				try:
					ql.run()
				except:
					print("Qiling hate this binary. Bye~~")
					return
				
				if ql.uc.reg_read(UC_X86_REG_EIP) != get_flag:
					print("I think you are smarter than angr")
					sys.stdout.flush()
					
					popen = subprocess.Popen(binary, stdin=sys.stdin, stdout=sys.stdout, stderr = sys.stdout)
					popen.communicate()
					sys.stdout.flush()
					return
					
				else:
					print("No one is smarter than angr. right?")
					return
		else:
			print("What!?")
			return
	else:
		print("What??")
		return
if __name__ == "__main__":
	main()
