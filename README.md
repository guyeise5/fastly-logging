# Fastly Logging
An HTTP server that prints Fastly logs to stdout.

### Pre-Requirements
* Docker / npm 
## TL;DR

#### Docker
```console
docker run --rm -p 8080:8080 guyeise5/fastly-logging
```

#### npm
```console
npm install
npm start
```


---
## Features
### Limit Fastly services
lets you control which services are allowed to send logs to your deployment.
```console
docker run --rm -e FASTLY_SERVICES=<SERVICE_ID_1,SERVICE_ID_2,...> -p 8080:8080 guyeise5/fastly-logging
```
---
### Deploy with ngrok
create docker network
```console
docker network create fastly-logging
```
deploy the service
```console
docker run -d --name fastly-logging --network fastly-logging guyeise5/fastly-logging
```
deploy ngrok 
```
docker run -d --name fastly-logging-ngrok --network fastly-logging -e NGROK_AUTHTOKEN=<NGROK_TOKEN> ngrok/ngrok:alpine ngrok http --log=stdout [--hostname=<hostname>] http://fastly-logging:8080
```
showing the logs
```console
docker logs fastly-logging
```
showing ngrok logs
```console
docker logs fastly-logging-ngrok
```