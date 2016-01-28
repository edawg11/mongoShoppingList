'use strict'

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: {type: String},
  description: {type: String},
  price: {type: Number},
  quantity: {type: Number}
})

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;