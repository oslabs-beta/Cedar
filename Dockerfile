FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build
ENV NODE_ENV="production"
EXPOSE 3000
ENTRYPOINT ["node", "./server/server.js"]
