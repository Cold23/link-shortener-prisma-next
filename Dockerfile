FROM node:lts

RUN apt-get update && apt-get install libssl-dev ca-certificates -y

RUN mkdir -p /home/app/ && chown -R node:node /home/app

WORKDIR /home/app

COPY --chown=node:node . .

USER node

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]