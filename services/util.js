'use strict';

module.exports.convertGithubObjectsToArrayOfPaths = (jsonResult) => {
  const docs = [];
  // collect all the doc urls for use in other methods
  jsonResult.tree.forEach((markdownDocument) => {
    // path is the name of the files
    if (markdownDocument.type === 'blob') {
      // Need to url encode the / character so it can be used in other methods as params
      docs.push(encodeURIComponent(markdownDocument.path));
    }
  });

  return docs;
};
