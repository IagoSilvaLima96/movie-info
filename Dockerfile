FROM node:18-slim

RUN mkdir -p /app && \
    chown -R node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "dist/main.js"]