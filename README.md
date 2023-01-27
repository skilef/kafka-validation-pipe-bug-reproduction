# Kafka + validation pipe bug

Prepare the environment:

```bash
npm install
docker compose up -d zookeeper
docker compose up -d kafka
docker compose up -d kafka-ui # not required
npx nest start
```

Send a GET request (using the browser for example) to

```bash
http://localhost:3001/normal
```

This will produce a normal behaviour - the validation is OK and there is no exception thrown.

Then, send a GET request to

```bash
http://localhost:3001/bug
```

This will reproduce the bug. In this scenario the validation is failing, thus throwing an exception and triggering Kafka's retry mechanism. This causes an infinite loop of:

```
Bad Request Exception multiple times --> Then a crash with KafkaJSNumberOfRetriesExceeded --> consumer stopped --> restarting the consumer --> Bad Request Exception ...
```
