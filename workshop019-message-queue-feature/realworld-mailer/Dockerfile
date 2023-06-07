FROM node:16.15.0
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node
CMD [ "npm", "run", "start" ]