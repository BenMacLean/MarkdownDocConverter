'use strict';
const request = require('koa-request');

module.exports.getAllFiles = function* getAllFiles(user, repo) {
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

  if (!(JSON.parse(response.body) instanceof Array)) {
    console.log('ERROR: getting access to github', response.body);
  }

  // Return all the files in the repo as an array of paths
  return JSON.parse(response.body);
};

module.exports.getRawFileUrl = function* getRawFileUrl(user, repo, path) {
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
  const json = JSON.parse(response.body);
  return json.download_url;
};

module.exports.getRawFileFromUrl = function* getRawFileFromUrl(url) {
  // do a get request to get the actual markdown from a url
  const options = {
    url: url,
    headers: {
      'User-Agent': 'request'
    }
  };

  const response = yield request(options);
  return response.body;
};
