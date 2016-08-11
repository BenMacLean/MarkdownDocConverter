'use strict';
const util = require('../services/util');
const assert = require('chai').assert;

const githubData = { sha: 'adae2b175e13a823ee259d935fd02401fb41d336',
  url: 'https://api.github.com/repos/BroadsoftLabs/hubDocs/git/trees/adae2b175e13a823ee259d935fd02401fb41d336',
  tree:
   [ { path: 'Architecture.md',
       mode: '100644',
       type: 'blob',
       sha: '19cce902d66ed5e273f19b16e9a554c7e82d2842',
       size: 3094,
       url: 'https://api.github.com/repos/BroadsoftLabs/hubDocs/git/blobs/19cce902d66ed5e273f19b16e9a554c7e82d2842' },
     { path: 'Test2',
       mode: '040000',
       type: 'tree',
       sha: '0f68ffb16ef3a97af1a1275c568112fddcf1836a',
       url: 'https://api.github.com/repos/BroadsoftLabs/hubDocs/git/trees/0f68ffb16ef3a97af1a1275c568112fddcf1836a' },
     { path: 'Test2/test.md',
       mode: '100644',
       type: 'blob',
       sha: '752dd80785917dd0175ce244b6e6e193d807ddeb',
       size: 13,
       url: 'https://api.github.com/repos/BroadsoftLabs/hubDocs/git/blobs/752dd80785917dd0175ce244b6e6e193d807ddeb' }],
  truncated: false };

describe('Util', () => {
  describe('convertGithubObjectsToArrayOfPaths', () => {
    it('should convert stuff', (done) => {
      const methodCall = util.convertGithubObjectsToArrayOfPaths(githubData);
      const expected = ['Architecture.md', 'Test2%2Ftest.md'];

      assert.sameMembers(methodCall, expected, 'me');
      return done();
    });
  });
});
