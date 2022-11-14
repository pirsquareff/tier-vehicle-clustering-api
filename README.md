# Tier Vehicle Clustering API
## Description
The main purpose of this service is to provide the data via an API to visualize vehicle clusters on a map. It should also allow users to filter vehicles (e.g., based on availability, location, or other attributes) by passing parameters.

The downstream data for this service is obtained from Tier publicly available API endpoints based on the GBFS standard: https://data-sharing.tier-services.io/tier_paris/gbfs/2.2

## Prerequisites
- Docker and Docker Compose
- [Optional] New Relic license key for app instrumentation. See [here](https://docs.newrelic.com/docs/apm/agents/nodejs-agent/installation-configuration/install-nodejs-agent-docker) for New Relic documentation.

## Installation
1. [Optional] Add your New Relic license key to [`docker-compose.yml`](./docker-compose.yml)
```yml
...
  environment:
    PORT: 3001
    NEW_RELIC_LICENSE_KEY: "<NEW_RELIC_LICENSE_KEY>"
...
```
2. Run a following command to start the server
```bash
$ docker compose up
```
3. The app should be up and running at http://localhost:3001

## Technical Design
 As the payload for a bike status is quite large, the service is designed to periodically cache data from the downstream API. This is to improve client's response time. 

The data from the downstream API is periodically cached with regard to `ttl` and `lasted_updated` fields returned in a Tier GBFS response. In this service, we require data from three different endpoints. For the sake of maintainability, [`TierGBFSInternalCacheGenericRepository`](./src/core/repository/tier-gbfs-internal-cache-generic-repository.ts) is defined to be a generic repository to internally cache and synchronize data from any downstream endpoint. 

This is sufficient as a starting point. When the service is horizontally scaled up, we can introduce a new distributed cache layer to minimize load on the downstream API.  

### Available Endpoints
- GET /vehicles
- GET /vehicles/:id
- GET /vehicle-types
- GET /vehicle-types/:id
- GET /pricing-plans
- GET /pricing-plans/:id

