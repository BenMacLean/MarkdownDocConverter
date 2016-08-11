'use strict';
const marked = require('marked');
const request = require('koa-request');
const dataStorage = require('../services/data');

module.exports.listenForGithubChanges = function* listenForGithubChanges(user, repo) {
  // Get called by github
  // Update the files needed in the database
};

module.exports.getAllRepoFilePaths = function* getAllRepoFilePaths(user, repo) {
  // Called by the Docs UI tool
  // Return all the files in the repo as an array of paths

  // This will go to github and get all the docs for the readme repo. It returns an array of all file paths
  // https://developer.github.com/v3/git/trees/
  // Getting all files recursively with ?recursive=1

  const options = {
    url: `https://api.github.com/repos/${user}/${repo}/git/trees/master?recursive=1`,
    headers: {
      'User-Agent': 'request'
    }
  };

  const response = yield request(options);
  const jsonResult = JSON.parse(response.body);

  // collect all the doc urls for use in other methods
  const docs = [];
  jsonResult.tree.forEach((markdownDocument) => {
    // path is the name of the files
    if (markdownDocument.type === 'blob') {
      // Need to url encode the / character so it can be used in other methods as params

      docs.push(encodeURIComponent(markdownDocument.path));
    }
  });

  this.body = docs;
};

module.exports.getHtmlForFilePath = function* getHtmlForFilePath(user, repo) {
  // Called by the Docs UI tool
  // Grab the html from the database that matches the path

  // Gets the contents of the file based on the path attribute that comes back from github
  // https://developer.github.com/v3/repos/contents/
  // GET /repos/:owner/:repo/contents/:path

  // First get the url of the raw markdown url as download_url
  const options = {
    url: `https://api.github.com/repos/${user}/${repo}/contents/${path}`,
    headers: {
      'User-Agent': 'request'
    }
  };

  const response = yield request(options);
  const jsonResult = yield JSON.parse(response.body);

  // Secondly, do a get request to get the actual markdown
  const options2 = {
    url: jsonResult.download_url,
    headers: {
      'User-Agent': 'request'
    }
  };

  const response2 = yield request(options2);

  // Tell marked how you want it to work
  marked.setOptions({
    gfm: true
  });

  // return the markdown convesion to html
  this.body = {
    html: marked(response2.body)
  };
};
