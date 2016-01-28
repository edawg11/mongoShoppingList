'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res, next) {
  Item.find({},function  (err, items) {
    if(err) console.log(err);
    res.send(items);
  })
});

router.get('anitem/:itemID', function(req,res) {
  Item.find({_id: req.params.itemID }, function(err, items) {
    if (err) return res.status(400).send(err);
    console.log('items:', items);
    res.send(items);
  });
});

router.delete('/:productId', function(req, res) {
  Item.findById(req.params.productId, function(err, item) {
    console.log(item);
    item.remove(function(err) {
      res.status(err ? 400 : 200).send(err || null);
    });
  });
});

router.put('/:itemId', function(req, res) {
  Item.findById(req.params.itemId, function(err, item) {
    console.log('newItem:', req.body);
    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    item.qty = req.body.qty;

    item.save(function(err, savedItem) {
      res.status(err ? 400 : 200).send(err || savedItem);
    });
  });
});

router.post('/addItem', function(req, res) {
  var item = new Item(req.body);
  console.log(item);

  item.save(function(err, savedItem) {
    if (err) return res.status(400).send(err);
    console.log('savedItem:', savedItem);
    res.send(savedItem);
  });
});

module.exports = router;
