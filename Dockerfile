FROM node:latest AS client
WORKDIR /client
COPY client/package.json ./package.json
COPY client/tsconfig.json ./tsconfig.json
COPY client/src ./src
COPY client/public ./public
RUN npm i 
RUN npm run build

### 

FROM node as api
WORKDIR /api
COPY api/package.json ./package.json
COPY api/src ./src
COPY api/tsconfig.json ./tsconfig.json
RUN npm i
RUN npm run build

###

FROM node:slim
WORKDIR /api
COPY ./api/package.json ./package.json
COPY --from=client /client/build /client/build
COPY --from=api /api/build ./build
RUN npm i --omit=dev

EXPOSE 8080
CMD [ "node", "./build/index.js" ]