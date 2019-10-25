#!/usr/bin/env bash
docker run --name datacube -d -p 8000:4200 -p 8081:8081 datacube
echo "Please launch : http://localhost:8000/demo/DataCube"