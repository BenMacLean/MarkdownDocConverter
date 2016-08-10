/*global describe, it*/
'use strict';
var superagent = require('supertest');
var app = require('../app');

function request() {
  return superagent(app.listen());
}

describe('Routes', function() {
  describe('GET /test', function() {
    it('should return 200', function(done) {
      request()
        .get('/test')
        .expect(200, done);
    });
  });
  describe('GET /test', function() {
    it('should return 200 and json', function(done) {
      request()
        .get('/test')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
