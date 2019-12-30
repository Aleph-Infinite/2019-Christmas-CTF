FROM       ubuntu:16.04
MAINTAINER howdays
RUN cd /etc/apt && sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' sources.list
RUN apt-get update -y
RUN apt-get install -y xinetd netcat 
ENV TERM=linux

RUN useradd howdays
RUN mkdir /home/howdays
WORKDIR /home/howdays

ADD problem /home/howdays
ADD start.sh /home/howdays
ADD readflag /
ADD xinetd /etc/xinetd.d/

RUN chmod 001 /readflag

RUN chmod 460 /home/howdays/*
RUN chown howdays:root /home/howdays/*
RUN chmod +x /home/howdays/problem
RUN chmod +x /home/howdays/start.sh


RUN echo "howdays 3000/tcp" >> /etc/services
EXPOSE 3000

RUN service xinetd restart
CMD ["/usr/sbin/xinetd","-dontfork"]
