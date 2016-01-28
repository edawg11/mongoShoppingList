'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');


router.get('/:itemID', function(req,res) {
  Item.find({_id: req.params.itemID }, function(err, items) {
    if (err) return res.status(400).send(err);
    console.log('items:', items);
    res.send(items);
  });
});

router.post('/', function(req, res) {
  var item = new Item(req.body);
  console.log(item);

  item.save(function(err, savedItem) {
    if (err) return res.status(400).send(err);
    console.log('savedItem:', savedItem);
    res.send(savedItem);
  });
});

module.exports = router;