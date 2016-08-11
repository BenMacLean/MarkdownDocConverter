'use strict';
const superagent = require('supertest');
const app = require('../app');
const markdown = require('../controllers/markdown');

function request() {
  return superagent(app.listen());
}

describe('Routes', () => {
  describe('GET /listAllRepoFiles/BroadsoftLabs/hubDocs', () => {
    it('should return 200 and json', (done) => {
      request()
        .get('/listAllRepoFiles/BroadsoftLabs/hubDocs')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
