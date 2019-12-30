#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import os
import sys
import random

FLAG = 'XMAS{y0u_s3Nt_7hE_GiFt_t0_y0urSe1F..XD}'

def send(data, end='\n'):
	sys.stdout.write(data+end)
	sys.stdout.flush()
	return

def scan(msg):
	send(msg, end='')
	return raw_input()

def choice():
	menu = '''
===========================
      Santa Game 2019     	
===========================
 1. Send Gift to Stranger
 2. Exit
===========================
>> '''
	return scan(menu)

def gift():
	ip = scan('Address : ')
	port = int(scan('Port : '))

	if ip!='localhost' and ip!='0.0.0.0' and ip!='127.0.0.1':
		sys.exit(0)

	cmd = 'echo "%s" | nc %s %d' % (FLAG, ip, port)
	os.system(cmd)

	send('Stranger must be happy!')
	return

def bye():
	send('Merry X-MAS!')
	sys.exit(0)

def banner():
	send("""
   *        *        *        __o    *      *
*      *       *        *    /_| _     *
   ||  *    ||      *        O'_)/ \  *    *
  <')____  <')____    __*   V   \  ) __  *
   \ ___ )--\ ___ )--( (    (___|__)/ /*     *
 *  |   |    |   |  * \ \____| |___/ /  *
    |*  |    |   |     \____________/       *""")	
	return

if __name__=='__main__':
	try:
		banner()
		while True:
			res = choice()
			if res=='1':
				gift()
			elif res=='2':
				sys.exit(0)
			else:
				send('Invalid Option : ' + res)
	except:
		bye()
