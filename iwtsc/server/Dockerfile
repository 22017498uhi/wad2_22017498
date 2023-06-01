# Use a Node 16 base image alpine variant which is small
FROM node:16-alpine

RUN mkdir app
COPY ./ ./app
WORKDIR "/app"

RUN chmod 777 ./startup.sh

# Install the dependecies
RUN npm install

CMD ["./startup.sh"]

# Run on this port
EXPOSE 3000
