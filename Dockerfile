FROM node:latest

RUN mkdir ./app
COPY ./sync-server.ts ./app
COPY ./package.json ./app
COPY ./package-lock.json ./app
WORKDIR ./app

EXPOSE 9595/tcp
RUN ["npm", "install"]
CMD ["npm", "start"]
