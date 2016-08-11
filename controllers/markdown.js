'use strict';
var marked = require('marked');
var request = require('koa-request');

module.exports.listAllRepoFiles = function* listAllRepoFiles(user, repo) {
  //This will go to github and get all the docs for the readme repo. It returns an array of all file paths
  //https://developer.github.com/v3/git/trees/
  //Getting all files recursively with ?recursive=1

  var options = {
    url: 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/master?recursive=1',
    headers: {
      'User-Agent': 'request'
    }
  };

  var response = yield request(options);
  var jsonResult = yield JSON.parse(response.body);

  //collect all the doc urls for use in other methods
  var docs = [];
  jsonResult.tree.forEach(function(markdownDocument) {
    //path is the name of the files
    if (markdownDocument.type === 'blob') {
      //Need to url encode the / character so it can be used in other methods as params
      markdownDocument.path.replace('/', '%2F');
      docs.push(markdownDocument.path);
    }
  });

  this.body = yield docs;
};


module.exports.convertMarkdownToHtml = function* convertMarkdownToHtml(user, repo, path) {
  //Gets the contents of the file based on the path attribute that comes back from github

  //https://developer.github.com/v3/repos/contents/
  // GET /repos/:owner/:repo/contents/:path

  //First get the url of the raw markdown url as download_url
  var options = {
    url: 'https://api.github.com/repos/' + user + '/' + repo + '/contents/' + path,
    headers: {
      'User-Agent': 'request'
    }
  };

  var response = yield request(options);
  var jsonResult = yield JSON.parse(response.body);

  //Secondly, do a get request to get the actual markdown
  var options2 = {
    url: jsonResult.download_url,
    headers: {
      'User-Agent': 'request'
    }
  };

  var response2 = yield request(options2);

  //Tell marked how you want it to work
  marked.setOptions({
    gfm: true
  });

  //return the markdown convesion to html
  this.body = {
    html: marked(response2.body)
  };
};

module.exports.convertToHtml = function* convertToHtml() {
  //Matt: This is how I would do this with callbacks

  // var client = github.client();

  // var doc = client.get('/repos/BroadsoftLabs/hubDocs/contents/Security.md', {}, function (err, status, body, headers) {
  //   return res.send(body);
  // });

  //How do I do this with yield
  // var client = github.client();
  //
  // var myPromise = q.promisify(client.get);
  // myPromise('/repos/BroadsoftLabs/hubDocs/contents/Security.md', {}).then(function(results) {
  //   console.log(results);
  // });
  //
  // this.body = yield {
  //   data: 'doc'
  // };
};
