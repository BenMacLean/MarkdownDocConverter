'use strict';
module.exports.githubWebhook = function* githubWebhook() {

  console.log('Something was changed in the git repo');

  this.body = yield [];
};
