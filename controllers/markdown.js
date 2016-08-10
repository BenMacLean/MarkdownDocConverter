"use strict";
var marked = require('marked');
var request = require('koa-request');
var q = require('bluebird');

var github = require('octonode');


// module.exports.getHubDocsUrls = function* getHubDocsUrls() {
//   var docs = [];
//
//   client.get('/repos/BroadsoftLabs/hubDocs/git/trees/master', {}, function(err, status, body, headers) {
//     body.tree.forEach(function(treeNode) {
//       docs.push(treeNode.url);
//     });
//   });
//
//   this.body = yield docs;
// };


module.exports.convertToHtml = function* convertToHtml() {
  //Matt: This is how I would do this with callbacks

  // var client = github.client();

  // var doc = client.get('/repos/BroadsoftLabs/hubDocs/contents/Security.md', {}, function (err, status, body, headers) {
  //   return res.send(body);
  // });

  //How do I do this with yield
  var client = github.client();

  var doc = yield q.promisify(client.get('/repos/BroadsoftLabs/hubDocs/contents/Security.md'));
  this.body = yield {data: doc};
};
