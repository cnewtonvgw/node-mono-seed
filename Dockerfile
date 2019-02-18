FROM node:8 as production-deps
WORKDIR .
COPY package.json .
COPY package-lock.json .
RUN npm install --production

FROM node:8 as builder
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY tsconfig.json /app
COPY webpack.server.config.js /app
COPY webpack.webapp.config.js /app
COPY src /app/src
RUN npm run build:prod

FROM node:8-alpine
COPY --from=builder /app/dist /app
COPY --from=production-deps node_modules /app/node_modules
CMD node /app/server.js
EXPOSE 8080
