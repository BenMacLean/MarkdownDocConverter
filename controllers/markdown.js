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


module.exports.getContentsOfFile = function* getContentsOfFile() {
  //Gets the contents of the file based on the path attribute that comes back from github

  //https://developer.github.com/v3/repos/contents/
  // GET /repos/:owner/:repo/contents/:path

  //First get the url of the raw markdown
  var options = {
    url: 'https://api.github.com/repos/BroadsoftLabs/hubDocs/contents/Security.md',
    headers: { 'User-Agent': 'request' }
  };

  var response = yield request(options);
  var jsonResult = yield JSON.parse(response.body);

  //Secondly, do a get request to get the actual markdown
  var options2 = {
    url: jsonResult.download_url,
    headers: { 'User-Agent': 'request' }
  };

  var response2 = yield request(options2);

  //return the markdown
  this.body = {markdown: response2.body};
};

module.exports.convertToHtml = function* convertToHtml() {
  //Matt: This is how I would do this with callbacks

  // var client = github.client();

  // var doc = client.get('/repos/BroadsoftLabs/hubDocs/contents/Security.md', {}, function (err, status, body, headers) {
  //   return res.send(body);
  // });

  //How do I do this with yield
  var client = github.client();

  var myPromise = q.promisify(client.get);
  myPromise('/repos/BroadsoftLabs/hubDocs/contents/Security.md', {}).then(function(results) {
    console.log(results);
  });

  this.body = yield {
    data: 'doc'
  };
};
