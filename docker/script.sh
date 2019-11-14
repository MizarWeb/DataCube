#!/bin/bash

npm --prefix /opt/DataCube start & 

cd /opt/DataCubeServer/target/
java -jar "$(echo cubeExplorer-*.jar )"