#!/bin/sh
((sleep 3s &&  xdg-open http://localhost:8181/) &) && \
docker-compose up --build