var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res, next) {
  Item.find({}, function(err, items) {
    if (err) return res.status(400).send(err);
    console.log('items:', items);
    console.log(items.price, items.qty);

    var total = items.reduce(function(prev, curr) {
      return prev + curr.price;
      },0).toFixed(2);

  res.render('index', { items: items,
                        total: total
                      });
  });  
});

module.exports = router;
