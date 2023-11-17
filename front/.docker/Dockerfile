FROM node:18

WORKDIR /front
COPY . /front
#   Install Dependencies.
COPY ./package.json .
COPY ./package-lock.json .

RUN yarn install
RUN yarn build
