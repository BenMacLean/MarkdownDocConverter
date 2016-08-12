const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const connectionString = require('../config.json').dbConnectionTest;

before(function clearDB(done) {
  // Connect to the test database
  mongoClient.connect(connectionString, function connectDB(err, db) {
    const filesCollection = db.collection('file');
    // Clear all documents in the 'files' collection from test database
    filesCollection.deleteMany({}, function deleteFilesFromCollection(err, r) {
      assert.equal(null, err, 'Could not connect to DB');
      db.close();
      done();
    });
  });
});
