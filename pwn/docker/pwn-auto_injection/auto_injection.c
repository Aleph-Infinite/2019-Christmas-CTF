#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <err.h>
#include <string.h>
#include <signal.h>

int check = 0;
char *trick1 = "/Bin/Sh";
char *trick2 = "CaT flag";
char *trick3 = "good luck!";

void time_out() {
	putchar('\n');
	printf("%s", "Timeout!!!\n");
	exit(-1);
}

void vuln() {
	char buf[RAND_SIZE];
	
	if (check) 
		printf("%s", "What are you doing!?!?!?\n");
	
	++check;
	puts("Let's exploit~!!");
	printf("gogo : ");
	read(0, buf, RAND_SIZE + 0x10);
	memset(buf, '\0', RAND_SIZE + 0xc);
	return;
}

void filter(char *command) {
	int check;
	int len = strlen(command);
	check = strcspn(command, RAND_FILTER);
	
	if(check != len) {
		printf("%s", "FILTERED!!!!!!\n");
		exit(-1);
	}
}

void hidden() {
	char buf[0x20];
	puts("Wow~~!!!!");
	puts("Stage2...");
	puts("Start!!");
	read(0, buf, 0x1f);
	filter(buf);
	puts("[*] filtering was bypassed successfully!!!");
	system(buf);
	exit(0);
}

int main() {
	setvbuf(stdin, 0, 2, 0);
	setvbuf(stdout, 0, 2, 0);
	signal(SIGALRM, time_out);
	alarm(20);
	puts("Hi~ W31c0m3 t0 4ut0 1nj3c710n~!!");
	vuln();
}