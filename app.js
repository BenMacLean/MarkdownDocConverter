'use strict';

// Libraries Import
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// My Files Import
var markdown = require('./controllers/markdown');

// Logger
app.use(logger());

// Routing
app.use(route.get('/listAllRepoFiles/:user/:repo', markdown.listAllRepoFiles));
app.use(route.get('/convertMarkdownToHtml/:user/:repo/:path', markdown.convertMarkdownToHtml));
//app.use(route.get('/markdown/getContentsOfFile', markdown.getContentsOfFile));

app.use(route.post('/githubWebhook', markdown.githubWebhook));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
