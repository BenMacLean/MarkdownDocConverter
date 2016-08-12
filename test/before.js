console.log('DB Delete');


var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Connection URL
var url = 'mongodb://root:root@ds153775.mlab.com:53775/html';

before(function(done) {

  MongoClient.connect(url, function(err, db) {

    var col = db.collection('file');
    col.deleteMany({}, function(err, r) {
      assert.equal(null, err);
      db.close();
      done()
    });

  });

});
