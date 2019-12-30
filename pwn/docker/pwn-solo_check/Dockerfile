FROM ubuntu:19.04
MAINTAINER st4nw

RUN apt-get update
RUN apt-get install -y xinetd netcat 
ENV TERM=linux

RUN useradd solo_test
RUN mkdir /home/solo_test
WORKDIR /home/solo_test

ADD solo_test /home/solo_test
ADD start.sh /home/solo_test
ADD xinetd /etc/xinetd.d/

ADD flag /home/solo_test

RUN chmod 460 /home/solo_test/*
RUN chmod 440 /home/solo_test/flag

RUN chown solo_test:root /home/solo_test/*
RUN chmod +x /home/solo_test/solo_test
RUN chmod +x /home/solo_test/start.sh

RUN echo "solo_test 3000/tcp" >> /etc/services
EXPOSE 3000

RUN service xinetd restart
CMD ["/usr/sbin/xinetd","-dontfork"]
