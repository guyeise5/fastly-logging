# Fastly Logging
An HTTP server that prints Fastly logs to stdout.
Also has a base web UI.

### Pre-Requirements
* Docker 

## TL;DR
1. start the container
```console
docker pull guyeise5/fastly-logging
docker run --name fastly-logging -p 8080:8080 guyeise5/fastly-logging
```
2. configure in fastly an HTTP logger with URL as "https://EXTERNAL-DOMAIN/api/v1/log"
3. see the logs 
```console
docker logs fastly-logging
```
4. done

---
## Features
### Limit Fastly services
lets you control which services are allowed to send logs to your deployment.
```console
docker run --rm -e FASTLY_SERVICES=<SERVICE_ID_1,SERVICE_ID_2,...> -p 8080:8080 guyeise5/fastly-logging
```
---
### Authorization
Authorization lets you control who can access your service.
1. start the container with authorization key
```console
docker pull guyeise5/fastly-logging
docker run --name fastly-logging -e AUTH_TOKEN="Secr3tT0ken" -p 8080:8080 guyeise5/fastly-logging
```
2. Go to Fastly and configure in your logger under the advanced options:
    * **Custom header name** = `Authorization`
    * **Custom header value** = `<Your token>`

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
```console
docker run -d --name fastly-logging-ngrok --network fastly-logging \
-e NGROK_AUTHTOKEN=<NGROK_TOKEN> ngrok/ngrok:alpine \
 http --log=stdout [--hostname=<hostname>] http://fastly-logging:8080
```

ngrok logs
```console
docker logs fastly-logging-ngrok
```
