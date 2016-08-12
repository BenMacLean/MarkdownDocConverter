console.log('top');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://root:root@ds153775.mlab.com:53775/html';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected succesfully to server");

  db.close();
});

describe("Customers", function(){

before(function() {




//
//   console.log('before');
//
//   var mongodb = require('mongodb');
//
//   var MongoClient = mongodb.MongoClient;
//
//   var url = 'mongodb://root:root@ds153775.mlab.com:53775/html';
//
//   MongoClient.connect(url, function(err, db) {
//     if (err) {
//       console.log('Unable to connect to the mongoDB server. Error:', err);
//     } else {
//       console.log('Connection established to', url);
//
//       var clearDB = function(db, callback) {
//         db.collection('file').deleteMany({}, function(err, results) {
//           console.log('results', results);
//           callback();
//         });
//       };
//
//       db.close();
//     }
//   });
});
});
