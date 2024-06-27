# Microservices with Circuit Breaker

This repository contains two APIs, one built with Python (Flask) and the other with Node.js (TypeScript and Express). Both APIs are configured with Docker Compose to restart every 10 seconds, simulating timeouts or data loss scenarios. Circuit Breaker patterns are implemented to handle failures gracefully.

## Setup

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

```sh
git clone https://github.com/pazfelipe/circuit-broker.git
cd circuit-broker
docker-compose up --build -d
```

2. Build and start the services:

```sh
docker-compose up --build -d
```

## Endpoints

### Python API

 • /status - Returns the status of the Python API.
 • /data - Returns a sample data from the Python API.
 • /node-data - Fetches data from the Node.js API using a Circuit Breaker.

### Node.js API

 • /status - Returns the status of the Node.js API.
 • /data - Returns a sample data from the Node.js API.
 • /python-data - Fetches data from the Python API using a Circuit Breaker.

## Testing

### Python API

```sh
cd python_api
pytest
```

### Node.js API

```sh
cd node_api
npm test
```

## Circuit Breaker

Both APIs implement the Circuit Breaker pattern to handle failures gracefully and prevent cascading failures across services.

**Python API**

Uses the _pybreaker_ library.

**Node.js API**

Uses the _opossum_ library.
