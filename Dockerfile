FROM node:8.1.2-alpine

# configure database path
ENV DB_PATH /var/findmeaflat-db

# setup node package
RUN mkdir /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
WORKDIR /app
RUN yarn install

# copy code files
COPY ./ /app

VOLUME /var/findmeaflat-db
CMD ["npm", "start"]
