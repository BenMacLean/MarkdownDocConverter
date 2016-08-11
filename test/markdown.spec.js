'use strict';
const superagent = require('supertest');
const assert = require('chai').assert;
const app = require('../app');
const markdown = require('../controllers/markdown');

function request() {
  return superagent(app.listen());
}

describe('Routes', () => {
  describe('GET /getAllRepoFilePaths/BroadsoftLabs/hubDocs', () => {
    it('should return 200 and json', (done) => {
      request()
        .get('/getAllRepoFilePaths/BroadsoftLabs/hubDocs')
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.length > 0, 'no body found');
        })
        .expect(200, done);
    });
  });
});
