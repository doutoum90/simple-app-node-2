#!/bin/bash
set -e;
docker-compose up --build -d front
docker-compose up --build -d db
sleep 10
docker-compose up --build -d api 
FDr2M-Xb7wRwm!r