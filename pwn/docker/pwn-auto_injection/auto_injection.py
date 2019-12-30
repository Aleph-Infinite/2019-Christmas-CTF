import random
import string
import os
import sys

GCC = 'gcc -m32 -o {} /home/prob/auto_injection.c -no-pie -Wl,-z,relro -fno-stack-protector -D RAND_SIZE={} -D RAND_FILTER=\'"{}"\''
FLAG = R"XMAS{4c7u4lly_Just_Luck_:p}"
RAND_FILTER = string.printable.replace(string.ascii_uppercase, '').replace(string.digits, '')

NEED_ESCAPE = ['\t', '\r', '\b', '\n', '\v', '\b', '\a', '\f', '\'', '\"']
MUST_BE_BAN = ['b', 'h', '?', '*', 'c', 'm', 'v', 'i']
DONT_NEED = ['\r', '\x0c', '\x0b', '\n', 'r', 'e', ';', '\'', '"', '$']

FILE_NAME = '/tmp/injection_'
FLAG_NAME = '/tmp/flag_'

RAND_SIZE = random.randrange(0x100, 0xf00)
RAND_SIZE = (RAND_SIZE >> 3)
RAND_SIZE = (RAND_SIZE << 3)

def set_filter() :
	global RAND_FILTER

	for i in MUST_BE_BAN :
		RAND_FILTER = RAND_FILTER.replace(i, '')
	
	for i in DONT_NEED :
		RAND_FILTER = RAND_FILTER.replace(i, '')
	
	RAND_FILTER = ''.join(random.sample(RAND_FILTER,len(RAND_FILTER)))
	RAND_FILTER = RAND_FILTER[random.randrange(0, 15):random.randrange(len(RAND_FILTER) - 20, len(RAND_FILTER))]
	
	for i in MUST_BE_BAN :
		RAND_FILTER += i

	RAND_FILTER = RAND_FILTER.replace('\\', R"\\")

def make_file() :
	global GCC
	global RAND_SIZE
	global RAND_FILTER
	global FLAG_NAME
	global FILE_NAME

	set_filter()

	rand_val = random._urandom(7).encode('hex')

	FILE_NAME += rand_val
	FLAG_NAME += rand_val
	
	with open(FLAG_NAME, 'wb') as f:
		f.write(FLAG)

	GCC = GCC.format(FILE_NAME, RAND_SIZE, RAND_FILTER)
	os.system(GCC)

def send_file() :
	global FILE_NAME
	global FLAG_NAME

	with open(FILE_NAME, 'rb') as f:
		buf = f.read()
	buf = buf.encode('base64')

	print buf
	print 'flag is here : ' + FLAG_NAME
	sys.stdout.flush()

def excute_file() :
	global FILE_NAME
	global FLAG_NAME
	os.system('%s'%FILE_NAME)
	os.system('rm -f %s'%FILE_NAME)
	os.system('rm -f %s'%FLAG_NAME)

def main() :
	make_file()
	send_file()
	excute_file()

if __name__ == '__main__' :
	main()	
