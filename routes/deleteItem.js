'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.delete('/:productId', function(req, res) {
  Item.findById(req.params.productId, function(err, item) {
    console.log(item);
    item.remove(function(err) {
      res.status(err ? 400 : 200).send(err || null);
    });
  });
});

module.exports = router;