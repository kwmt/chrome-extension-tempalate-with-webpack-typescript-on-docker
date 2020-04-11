FROM node:alpine3.11
WORKDIR  /code
COPY ./* /code/
RUN npm install -g typescript webpack webpack-cli && npm install
# RUN npm install -g webpack webpack-cli
# RUN npm install -y
ENV PATH=$PATH:/code/node_modules/.bin
