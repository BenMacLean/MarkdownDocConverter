'use strict';

// Libraries Import
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const app = module.exports = koa();

// My Files Import
const markdown = require('./controllers/markdown');

// Logger
app.use(logger());

// Markdown Routing
app.use(route.post('/listenForGithubChanges', markdown.listenForGithubChanges));
app.use(route.get('/getAllRepoFilePaths/:user/:repo', markdown.getAllRepoFilePaths));
app.use(route.get('/getHtmlForFilePath/:user/:repo/:path', markdown.getHtmlForFilePath));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(process.env.PORT || 1337);
  console.log('listening on port 1337');
}
