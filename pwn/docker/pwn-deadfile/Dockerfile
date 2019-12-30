FROM ubuntu:18.04
MAINTAINER st4nw

RUN apt-get update
RUN apt-get install -y xinetd netcat 
ENV TERM=linux

RUN useradd deadfile
RUN mkdir /home/deadfile
WORKDIR /home/deadfile

ADD deadfile /home/deadfile
ADD start.sh /home/deadfile
ADD xinetd /etc/xinetd.d/

ADD execute_me_to_get_flag /home/deadfile

RUN chmod 460 /home/deadfile/*
RUN chmod 111 /home/deadfile/execute_me_to_get_flag

RUN chown deadfile:root /home/deadfile/*
RUN chmod +x /home/deadfile/deadfile
RUN chmod +x /home/deadfile/start.sh

RUN echo "deadfile 3000/tcp" >> /etc/services
EXPOSE 3000

RUN service xinetd restart
CMD ["/usr/sbin/xinetd","-dontfork"]
