FROM node:carbon

WORKDIR /usr/src/app

# Bundle app source
ADD https://github.com/teamforus/forus-frontend/archive/v0.0.3.tar.gz /usr/src/forus-frontend/
RUN tar -zxvf /usr/src/forus-frontend/v0.0.3.tar.gz -C /usr/src/forus-frontend

RUN mv  /usr/src/forus-frontend/forus-frontend-0.0.3/src /usr/src/app/src
RUN rm  /usr/src/forus-frontend/ -R

COPY run.sh ./

EXPOSE 8080

RUN apt-get update && apt-get upgrade -y
RUN apt-get install mc nano -y

RUN npm i npm@latest -g
RUN npm i gulp@latest -g
RUN npm install http-server@latest -g
RUN cd /usr/src/app/src && npm install && gulp init && gulp compile && cd ..

RUN ./run.sh

RUN ls

CMD [ "http-server" ]