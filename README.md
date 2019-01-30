# Forus front-end local deployment

You need docker to run the front-ends locally.

```
docker run --rm -ti -p 8080:8080 --name http-server -v DIRECTORY_TO_EXPOSE:/sponsor teamforus/forus-frontend
```