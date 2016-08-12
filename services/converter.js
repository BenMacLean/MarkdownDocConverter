'use strict';
const marked = require('marked');

module.exports.markdownToHtml = function markdownToHtml(markdown) {
  // Tell marked how you want it to work
  marked.setOptions({
    gfm: true
  });

  return marked(markdown);
};
