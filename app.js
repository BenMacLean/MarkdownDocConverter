'use strict';
var markdown = require('./controllers/markdown');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/markdown/convertToHtml', markdown.convertToHtml));
app.use(route.get('/getHubDocsUrls', markdown.getHubDocsUrls));
app.use(route.get('/test', markdown.getContentsOfFile));



// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
