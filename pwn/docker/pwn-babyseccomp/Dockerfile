FROM ubuntu:19.04
MAINTAINER st4nw

RUN apt-get update
RUN apt-get install -y xinetd netcat 
ENV TERM=linux

RUN useradd babyseccomp
RUN mkdir /home/babyseccomp
WORKDIR /home/babyseccomp

ADD babyseccomp /home/babyseccomp
ADD start.sh /home/babyseccomp
ADD xinetd /etc/xinetd.d/

ADD flag /

RUN chmod 460 /home/babyseccomp/*
RUN chmod 444 /flag

RUN chown babyseccomp:root /home/babyseccomp/*
RUN chmod +x /home/babyseccomp/babyseccomp
RUN chmod +x /home/babyseccomp/start.sh

RUN echo "babyseccomp 3000/tcp" >> /etc/services
EXPOSE 3000

RUN service xinetd restart
CMD ["/usr/sbin/xinetd","-dontfork"]
