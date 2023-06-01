#!/bin/bash
service postgresql start
#sudo -i -u postgres
sudo -u postgres createdb testdb
sudo -u postgres psql --command "alter user postgres with encrypted password 'postgres'"
sudo -u postgres psql --command "grant all privileges on database testdb to postgres"
cd /app/server
npm i
#npm start
nohup npm start &
cd /app/client
npm i
#npm start
nohup npm start &

sleep infinity

