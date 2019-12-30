FROM ubuntu:19.04
MAINTAINER st4nw

RUN apt-get update
RUN apt-get install -y xinetd netcat python2.7
ENV TERM=linux

RUN useradd santa_game
RUN mkdir /home/santa_game
WORKDIR /home/santa_game

ADD play.py /home/santa_game
ADD start.sh /home/santa_game
ADD xinetd /etc/xinetd.d/

RUN chmod 460 /home/santa_game/*

RUN chown santa_game:root /home/santa_game/*
RUN chmod +x /home/santa_game/play.py
RUN chmod +x /home/santa_game/start.sh

RUN echo "santa_game 31337/tcp" >> /etc/services
EXPOSE 31337

RUN service xinetd restart
CMD ["/usr/sbin/xinetd","-dontfork"]
