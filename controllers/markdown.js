'use strict';
const file = require('../models/file.js');
const util = require('../services/util');
const github = require('../services/github');
const co = require('co');
const converter = require('../services/converter');
const request = require('koa-request');

module.exports.listenForGithubChanges = function* listenForGithubChanges() {
  // [ { id: 'd85b43100f89765410afff5e052a1840da96fe3a',
  // 2016-08-11T18:42:19.380579+00:00 app[web.1]:     tree_id: '6eb9061f6f661d0f88c420341dea41ac7acef9f1',
  // 2016-08-11T18:42:19.380580+00:00 app[web.1]:     distinct: true,
  // 2016-08-11T18:42:19.380580+00:00 app[web.1]:     message: 'Update test.md',
  // 2016-08-11T18:42:19.380581+00:00 app[web.1]:     timestamp: '2016-08-11T15:10:33-03:00',
  // 2016-08-11T18:42:19.380583+00:00 app[web.1]:     url: 'https://github.com/BroadsoftLabs/hubDocs/commit/d85b43100f89765410afff5e052a1840da96fe3a',
  // 2016-08-11T18:42:19.380587+00:00 app[web.1]:     author:
  // 2016-08-11T18:42:19.380587+00:00 app[web.1]:      { name: 'Jonathan O\'Donnell',
  // 2016-08-11T18:42:19.380588+00:00 app[web.1]:        email: 'jodonnell@broadsoft.com',
  // 2016-08-11T18:42:19.380589+00:00 app[web.1]:        username: 'joncodo' },
  // 2016-08-11T18:42:19.380589+00:00 app[web.1]:     committer:
  // 2016-08-11T18:42:19.380590+00:00 app[web.1]:      { name: 'GitHub',
  // 2016-08-11T18:42:19.380590+00:00 app[web.1]:        email: 'noreply@github.com',
  // 2016-08-11T18:42:19.380591+00:00 app[web.1]:        username: 'web-flow' },
  // 2016-08-11T18:42:19.380592+00:00 app[web.1]:     added: [],
  // 2016-08-11T18:42:19.380592+00:00 app[web.1]:     removed: [],
  // 2016-08-11T18:42:19.380593+00:00 app[web.1]:     modified: [ 'Test1/test.md' ] } ]

  // Create File in DB
  const addedFiles = this.request.body.commits[0].added;

  // Delete file in DB
  const removedFiles = this.request.body.commits[0].removed;

  // Update file in DB
  const modifiedFiles = this.request.body.commits[0].modified;


  yield file.create({name: 'foo'});

  this.body = yield [];
};

module.exports.getAllRepoFilePaths = function* getAllRepoFilePaths(user, repo) {
  const allFiles = yield github.getAllFiles(user, repo);
  this.body = util.convertGithubObjectsToArrayOfPaths(allFiles);
};

module.exports.getHtmlForFilePath = function* getHtmlForFilePath(user, repo, path) {
  const rawFileUrl = yield github.getRawFileUrl(user, repo, path);
  const fileContents = yield github.getRawFileFromUrl(rawFileUrl);

  this.body = {
    html: converter.markdownToHtml(fileContents)
  };
};

module.exports.initDatabase = function* initDatabase(user, repo) {
  // TODO clear the DB first before initing. At least for all the files in this repo and for this user

  // Get all the file urls in the repo
  const allFiles = yield github.getAllFiles(user, repo);
  // Get the urls for the 'raw' view for all the files
  const allFilesArray = util.convertGithubObjectsToArrayOfPaths(allFiles);

  // Itterate over the files and create a db model for this.
  const filesToSaveToDB = [];

  allFilesArray.forEach(co.wrap(function* convertAllFilesToHtml(filePath) {
    const rawFileUrl = yield github.getRawFileUrl(user, repo, filePath);
    const fileContents = yield github.getRawFileFromUrl(rawFileUrl);

    filesToSaveToDB.push({
      html: converter.markdownToHtml(fileContents),
      path: filePath,
      repo: repo,
      user: user
    });
    // All files array is populated here
  }));

  console.log('fasdbm', test);

  this.body = 'Working on it bud...';
  // save html to database
};
