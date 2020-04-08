FROM node:alpine3.11
WORKDIR  /code
COPY ./* /code/
RUN npm install -y
ENV PATH=$PATH:/code/node_modules/.bin
