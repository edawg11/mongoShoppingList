var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res, next) {
  Item.find({}, function(err, items) {
    if (err) return res.status(400).send(err);
    console.log('items:', items);
  res.render('index', { items: items });
  });  
});

module.exports = router;
