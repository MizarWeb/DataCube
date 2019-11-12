FROM node:8.10-stretch
# Configure npm by allowing root to use npm
RUN echo "unsafe-perm=true" > ~/.npmrc

# ------ FRONTEND
WORKDIR /opt
RUN git clone https://github.com/MizarWeb/DataCube.git 
WORKDIR /opt/DataCube 
RUN npm install -g npm
RUN npm install ng
RUN rm package.json
COPY package.json package.json
RUN npm install

EXPOSE 4200

# ------ BACKEND

# Install java
RUN echo "deb http://deb.debian.org/debian stretch-backports main" >> /etc/apt/sources.list.d/nginx.list
RUN apt-get update && apt-get -y dist-upgrade
RUN apt-get -y -t stretch-backports install openjdk-8-jdk

# install maven
RUN apt-get -y install maven

# clone Server
WORKDIR /opt/ 
RUN git clone https://github.com/MizarWeb/DataCubeServer.git \
    && cd DataCubeServer \
    && mkdir /data \
    && sed -i -e '/workspace=/ s/=.*/=\/data\//' -e '/workspace_cube=/ s/=.*/=\/data\//' cubeExplorer.properties \
    && sed -i -e '/workspace=/ s/=.*/=\/data\//' -e '/workspace_cube=/ s/=.*/=\/data\//' src/main/resources/conf/cubeExplorer.properties \
    && mvn clean install 

EXPOSE 8081

# ------- RUN APPs
COPY ./script.sh /
RUN chmod +x /script.sh
ENTRYPOINT ["/script.sh"]