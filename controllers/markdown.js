'use strict';

module.exports.convertToHtml = function * convertToHtml(next) {
  this.body = yield {text: 'Hello World'};
};
