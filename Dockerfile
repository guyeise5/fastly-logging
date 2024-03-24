FROM node:latest AS client
WORKDIR /client
COPY client/package-lock.json ./package-lock.json
COPY client/package.json ./package.json
RUN npm ci
COPY client/tsconfig.json ./tsconfig.json
COPY client/src ./src
COPY client/public ./public
RUN npm run build

### 

FROM node as api
WORKDIR /api
COPY api/package-lock.json ./package-lock.json
COPY api/package.json ./package.json
RUN npm ci
COPY api/src ./src
COPY api/tsconfig.json ./tsconfig.json
RUN npm run build

###

FROM node:slim
WORKDIR /app
COPY --from=client /client/build /client/build
COPY --from=api /api/build ./build
COPY --from=api /api/node_modules ./node_modules

EXPOSE 8080
CMD [ "node", "./build/index.js" ]