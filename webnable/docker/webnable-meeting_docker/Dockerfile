FROM ubuntu:16.04
MAINTAINER c2w2m2 <juchang0308@gmail.com>

RUN apt update -y -qq
RUN apt install libsqlite3-dev -y -qq
RUN apt install wget -y -qq
RUN useradd -m ctf
RUN chmod -R 774 /var/tmp
RUN chmod -R 774 /dev
RUN chmod -R 774 /run
RUN chmod 1733 /tmp /var/tmp /dev/shm

WORKDIR /home/ctf

CMD ["/home/ctf/server"]
