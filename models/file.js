'use strict';
const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/test');

module.exports.create = function* create(options) {

  const Cat = mongoose.model('Cat', { name: String });

  const kitty = new Cat({ name: 'Zildjian' });
  const prom = yield kitty.save();
};
