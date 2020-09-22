# CS497S Exemplar
## Introduction
This example microservice exposes two REST endpoint over HTTP. These endpoints are available at `localhost:5678/ping` and `localhost:5678/count` upon starting the service. The functionality exposed by these endpoints is explained below.

### Ping
The `/ping` endpoint simply returns the following JSON:
```JSON
{
  "msg": "pong"
}
```

### Count
The `/count` endpoint returns JSON with a single "count" property which starts at zero and increases by one with each successive request. This should technically be a POST request because in order to be a true REST API, all GET requests should be idempotent, but it has been exposed as a GET request for ease of testing. 

Here's an example response for this endpoint:
```JSON
{
  "count": 5
}
```

## Installation and Usage

 1. Install nodejs and npm at https://nodejs.org if you don't already have it
 2. Clone the repository with `git clone https://github.com/galactus-player/exemplar`
 3. Run `npm start` in the root of the cloned repo
 4. Visit `localhost:5678/ping` or `localhost:5678/count` in a web browser

