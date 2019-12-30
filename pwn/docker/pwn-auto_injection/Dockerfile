FROM ubuntu:16.04

RUN apt-get -y update
RUN apt-get -y install python2.7 g++-multilib socat xinetd
RUN useradd -mU prob
WORKDIR /home/prob
COPY ./auto_injection.py /home/prob/auto_injection.py
COPY ./auto_injection.c /home/prob/auto_injection.c
COPY ./xinetd /etc/xinetd.d/auto_injection

RUN chmod 750 /home/prob /home/prob/auto_injection.py
RUN chown -R root:prob /home/prob

CMD ["/usr/sbin/xinetd","-dontfork"]