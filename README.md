# Web Applications Development - 2

<!-- TABLE OF CONTENTS -->
## Table of Contents
* [Video Recording](#video-recording)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation Steps](#installation-steps)
    * [Usage](#usage)
* [Introduction](#introduction)
* [Methodology](#methodology)
    * [Task - Split IWTSC into containers](#task---split-iwtsc-into-containers)
    * [Task - Migrate Questions to MongoDB for IWTSC](#task---migrate-questions-to-mongodb-for-iwtsc)
    * [Task - Embed ALQ website into IWTSC](#task---embed-alq-website-into-iwtsc)
* [Evaluation](#evaluation)

## Video Recording
https://youtu.be/dLUGomkTWY0

<!-- GETTING STARTED -->
## Getting Started

This section shows the prerequisites required and steps on how to get this project running locally on your device.

### Prerequisites

This project requires Docker Desktop using which containers can be easily viewed and managed. It can be downloaded from https://www.docker.com/.

It also contains docker CLI and docker compose using which containers can be built and run from command line.

### Installation Steps

Make sure Docker desktop is running.

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/22017498uhi/wad2_22017498.git
```
Navigate to the project directory.
```sh
$ cd wad2_22017498
```

#### WINDOWS ONLY
If you are running this on windows platform, then extra step needs to be performed.
Open project "wad2_22017498" in VS code.
Open all three ```startup.sh``` files from this project. Path is shown below.
![statupsh files](https://github.com/22017498uhi/wad2_22017498/assets/113307467/ae88340c-4131-437c-ae1e-c59593b75b1a)

Change their end of line formating to "**LF**" instead of "CLRF" as shown below. It is there on bottom right corner of VS code.

![change to LF](https://github.com/22017498uhi/wad2_22017498/assets/113307467/c3e9fd44-4f8a-447a-9e8c-95120b2b196c)

Windows only stuff ends here. Follow below steps for all platforms.

---


**Build and start AQC website**

Navigate to *aqc* directory.
```sh
$ cd aqc
```

Run below command which builds the docker image for aqc.
```sh
docker build -t aqc .
```

Now run the container based on above image.
```sh
docker run -ti -d --name aqc1  -p 4000:4000 -p 4040:4040  aqc
```


**Build and start IWTSC website**

Navigate back to the root directory.
```sh
$ cd ..
```

Navigate to *iwtsc* directory.
```sh
$ cd iwtsc
```

Run below command which builds images and containers.
```sh
docker-compose up
```


<!-- USAGE EXAMPLES -->
### Usage
Once Docker containers are started, Websites run on below address.

ALQ : http://localhost:4000/

IWTSC: http://localhost:3000/

Below image from Docker desktop shows that docker containers are running.

![containers running](https://github.com/22017498uhi/wad2_22017498/assets/113307467/ffe108f1-082f-440c-921d-705dcb06cecf)

<!-- ABOUT THE PROJECT -->
## Introduction

This project takes container of IWTSC react app and splits into separate containers for frontend, server, and database. Then it further splits database into PostgreSQL and mongoDB. Then lastly, ALQ container website is being embedded inside IWTSC.

## Methodology


## Task - Split IWTSC into containers
First task is about splitting IWTSC container into separate containers.

Previously, IWTSC website was running on a single container which was using ```ubuntu:20.04``` image. As part of its ```Dockerfile```, it was installing **nodejs**, **postgresql** and executing ```startup.sh``` file, which was responsible for starting PostgreSQL service, creating a database in it, and granting a user all access to the database.

Previous *Dockerfile* and *startup.sh*

![iwtsc old dockerfile](https://github.com/22017498uhi/wad2_22017498/assets/113307467/e70903ec-4e1f-48e6-bb13-159718c35a0a)

Approach here is to split the website into below three containers.

- Frontend
- Server
- Database - PostgreSQL

> **Note:** All the activities below are done from a blank directory "wad2_22017498".

For this task, "iwtsc" directory is created.

For Frontend, created a new directory "front_end" under "iwtsc" and copied all files from "client" directory of original IWTSC.
Created a ```Dockerfile``` and ```startup.sh``` in root of ***front_end*** directory.

Since frontend UI is built using React, it doesn't need to run on Ubuntu image, Hence, ```node:16-alpine``` image is used which runs **node.js** on **Alpine linux** which results into very small image size. Also, ```startup.sh``` file becomes simpler as database has its own container so most of the code can be removed.

Below image shows final version of ```Dockerfile``` and ```startup.sh``` for **front_end** container.
![frontend Dockerfile](https://github.com/22017498uhi/wad2_22017498/assets/113307467/f3c315cc-1e17-4971-b276-cfbe16ca8e03)

Next, Server directory of original IWTSC is copied into this project. This will be the second container. Added ```Dockerfile``` and ```startup.sh``` to this directory as shown below. For this container also ```node:16-alpine``` image is being used as server utilizes **express.js** which runs on **node JS**, Hence, Ubuntu is not required.

![Server Dockerfile](https://github.com/22017498uhi/wad2_22017498/assets/113307467/88a190a8-db1c-4915-96dd-2ad11e65a52d)

Next thing is to introduce a container for database which is using postgresql. Since there are 3 containers, it's better to use docker-compose feature so that all containers can be managed together.

At "iwtsc", new file ```docker-compose.yml``` is created which looks like below.

![yaml task 1](https://github.com/22017498uhi/wad2_22017498/assets/113307467/420d71ba-850d-4304-ad86-aaea88a34ccd)

In above file, postgres container is declared. it uses ```postgres:9.6-alpine``` image which is perfectly suited for this scenario. It defines container name, ports, and links it to a volume to persist data on restart.

After that, Server container is declared which has "build" property linking to the server directory of the project. This executes ```Dockerfile``` for the server container. This also has **evironment** property which defines things related to postgres such as postgres container name, database name, user, and password.

After that, Frontend container is declared which has "build" property linking to the front_end directory of the project. This executes ```Dockerfile``` for front_end container.

Next, "db.config.js" is updated to utilize environment variables which points to **postgress** container instead of hardcoded local values as shown below.

![db config postgress](https://github.com/22017498uhi/wad2_22017498/assets/113307467/347e1847-dfad-48e5-8295-01595b69df0d)

At this point, all the setup is done. App can be started using ``` docker-compose up``` command.

## Task - Migrate Questions to MongoDB for IWTSC
At this point, both user and question data are stored in postgres. As part of this task, questions are moved into mongodb database.

To achieve this, new docker container is introduced in ```docker-compose.yml``` file as shown below. This mongo container uses ```mongo:latest``` image and is linked to a named volume. Also, on server container, two more environment variables are defined which stores container name of mongo and name of the database.

![mongo yaml](https://github.com/22017498uhi/wad2_22017498/assets/113307467/8b81ca78-2d1e-41e6-8699-f25fbd716f17)

Next, mongoose is added as a dependency in "package.json" under server project.

Then "server.js" is updated to connect with mongo container using **mongoose** as shown below.

![mongoose connected](https://github.com/22017498uhi/wad2_22017498/assets/113307467/8a78af77-c448-4d61-84d4-e9208fb311a8)

After that questions model is defined under new directory "mongoModels". This has details related to Question Schema as shown below.

![questionmodel mongo](https://github.com/22017498uhi/wad2_22017498/assets/113307467/8ca9d2e5-d099-47bf-8e3d-9f288c99499a)

Then inside ```initial()``` function, question insertion into postgres is commented and below code related to adding questions into mongodb is added.

![question save server js](https://github.com/22017498uhi/wad2_22017498/assets/113307467/bf7ceee5-1ac9-41c1-bc17-a0a3871a681b)

Last part is to update **questions** related route so that it reads data from mongo as shown below.

![api update mongo questuons](https://github.com/22017498uhi/wad2_22017498/assets/113307467/7f8dec99-fdaf-47cd-92d0-af4d77307ec0)


## Task - Embed ALQ website into IWTSC

This task is about embedding ALQ website inside IWTSC.

Firstly, inside **front_end** project of IWTSC, a new page **ALevelQuestionList.js** is added as shown below. It fetches data from ALQ container's existing question list API.

![alqquestlist](https://github.com/22017498uhi/wad2_22017498/assets/113307467/4bd90199-a45d-496c-a225-3dd02e17ab8d)

Then, new route is added for question list as shown below.

![aqlist route](https://github.com/22017498uhi/wad2_22017498/assets/113307467/20552403-d115-48ab-a080-fe226ffa4351)

Also, under ```NavBar.js``` component, removed disable styling for this link as shown below.

![nav link question list](https://github.com/22017498uhi/wad2_22017498/assets/113307467/f7af9b05-9f94-4649-a681-f0c0e9602c65)

>  **Note:** IWTSC website url needs to be added as CORS options in **server.js** of ALQ container, otherwise, no third-party websites can access data due to CORS policy. This is shown below.

![cors alq](https://github.com/22017498uhi/wad2_22017498/assets/113307467/ede1ab83-d20b-4288-8d3a-65db7cc337f7)


Then new page **ALevelQuestionPage.js** is added which shows question and answer details by adding iFrame to ALQ website as shown below.

Important thing to note here is that it passes "**embeded=true**" URL query parameter.

This parameter is read by ALQ code and few details are hidden such as site header, answer link while in embed mode. But when someone visits the ALQ site normally, this URL parameter will not be there so they will see the full website without any impact.

![alq quespage iframed](https://github.com/22017498uhi/wad2_22017498/assets/113307467/68434a8a-9e3e-4975-8414-cb57949cc13c)

For example, as shown below, "**NavBar.js**" in ALQ project, it reads **embeded** URL query parameter and shows content only if this parameter is not there.

![navbar embed code](https://github.com/22017498uhi/wad2_22017498/assets/113307467/3a984365-5671-4da0-a6ae-ac03056bdbaf)

## Evaluation

The approach I followed for this was to take gradual steps while splitting the container. First, I had tried to run client and server folder of IWTSC separately by running them locally using ```npm install``` and ```npm start```. Once It ran locally, I had added Dockerfile for it and ran them as a docker container. Once they were running individually as docker container, then I introduced ```docker-compose.yml``` and added postgres. Once website was working fine as three separate containers, I changed image from **Ubuntu** to **Node** for both frontend and server containers as Ubuntu is not at all required, rather it's better to use lightweight **Node-Alpine** images.

I did run into a critical issue after moving to Node images, insert into postgres was failing. It was due to postgres database not being fully initialized before inserting the data in **server.js**. To resolve this, I added 5 second delay before running ```initial()``` function which inserts the data. This makes sure that database is initialized properly. But this is still unreliable and better alternative should be explored such as adding condition in "depends_on" parameter in ```docker-compose.yml``` as mentioned here https://github.com/peter-evans/docker-compose-healthcheck. 

For embedding ALQ into IWTSC, it uses iFrames to display question detail and its answer buttons. iFrames are not good practise. As an alternative, IWTSC could have native question detail page and it would fetch data from ALQ APIs.

Another thing which could be improved is that currently IWTSC's front_end is served using ```npm start``` which is for development mode, it should be changed to ```npm build``` and website should be served using nginx. Also communicating with server APIs could be handled via nginx reverse proxy.

But overall, Functionality is working as expected for all three tasks.
