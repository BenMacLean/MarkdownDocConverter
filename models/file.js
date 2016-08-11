'use strict';
const mongoose = require('mongoose');
const Cat = mongoose.model('Cat', { name: String });

// mongoose.connect('mongodb://0.0.0.0:27017/test');
mongoose.connect(process.env.DB);

module.exports.create = function* create(options) {

  const kitty = new Cat({ name: 'Zildjian' });
  const prom = yield kitty.save();
};
