# First stage: compile TypeScript files
FROM node:16 AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install 
RUN npm install -g typescript

RUN tsc
# Second stage: run Node.js application using compiled JavaScript files
FROM node:16

WORKDIR /app

COPY package*.json ./


COPY --from=build /app/dist ./dist

RUN npm install 

CMD [ "node", "dist/src/delegate.js" ]
