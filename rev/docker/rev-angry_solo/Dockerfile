FROM ubuntu:18.04
RUN cd /etc/apt && sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' sources.list
RUN apt-get update -y
RUN apt-get install xinetd libc6-dev-i386 python3 python3-dev python3-pip -y
RUN apt-get install cmake -y
RUN apt-get install git -y
RUN pip3 install keystone-engine
RUN pip3 install angr==8.19.10.30
RUN cd ~/ && git clone https://github.com/qilingframework/qiling.git && cd qiling && python3 setup.py install
RUN mv /usr/local/lib/python3.6/dist-packages/usr/lib/python3/dist-packages/keystone/libkeystone.so /usr/local/lib/python3.6/dist-packages/keystone/libkeystone.so
RUN useradd -mU angry_solo
COPY ./home /home/angry_solo
COPY ./xinetd /etc/xinetd.d/angry_solo
COPY ./flag /flag
RUN chmod 750 /home/angry_solo /home/angry_solo/main.py
RUN chmod 440 /flag
RUN chown -R root:angry_solo /home/angry_solo
RUN chown root:angry_solo /flag

CMD ["/usr/sbin/xinetd","-dontfork"]
