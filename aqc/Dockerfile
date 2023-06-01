# Download base image ubuntu latest
FROM ubuntu:20.04
ENV TZ=Europe/London
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install sudo curl postgresql postgresql-contrib systemctl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install nodejs wget 

RUN mkdir app

COPY ./ ./app
RUN chmod 777 ./app/startup.sh
RUN cd ./app

CMD ["./app/startup.sh"]

EXPOSE 4000