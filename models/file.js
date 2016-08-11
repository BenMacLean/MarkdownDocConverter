'use strict';
const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/test');

module.exports.create = function* create(options) {
  // Create a file with the path and the html doc contents
  // Expose api endpoint to read the html that is needed
  // Call that endpoint from the angular website

  // Deploy this
  // Test the githubWebhook to create cats
  // Test the githubWebhook to see which document needs to be updated in the DB

  const Cat = mongoose.model('Cat', { name: String });

  const kitty = new Cat({ name: 'Zildjian' });
  const prom = yield kitty.save();
};
