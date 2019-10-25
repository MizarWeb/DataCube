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

RUN npm -v
RUN node -v
EXPOSE 4200
CMD npm start
