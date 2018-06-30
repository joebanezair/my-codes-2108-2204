#/bin/bash

docker-compose -f docker/docker-compose.yaml up -d
docker-compose -f docker/docker-compose.yaml exec laiwan_io_web bash
