# Markdown Doc Converter

## How it works
A user updates the docs in github in a folder

A github webhook tells this app to get all the readmes and store them in a DB

This app reads the DB and serves back the html

In order for this to run, you need to copy the config over and set your values.


## How Koa Rest works
> REST demo with koa.

This is a simple demo of RESTful API with [koajs](http://koajs.com/) checkout the [live demo](http://lexicon-tactic.codio.io:1337/)


__How to try it?__

```sh

$ git clone https://github.com/hemanth/koa-rest.git

$ cd koa-rest

$ mongoimport -d library -c books ./db.json  # Import the DB, makes sure mongod is running.

$ npm install

$ npm run start

```

Open http://localhost:1337 to see the results.


```

GET /books -> List all the books in JSON.

GET /books/:id -> Returns the book for the given ID

POST /books/ -> JSON data to inserted to the books db.

PUT /books/:id -> JSON data to update the book data.

DELETE /books/:id -> Removes the book with the specified ID.

OPTIONS / -> Gives the list of allowed request types.

HEAD / -> HTTP headers only, no body.

TRACE / -> Blocked for security reasons.

```
