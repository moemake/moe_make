var express = require('express');
var router = express.Router();
var moe = require('../models/moe');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);

  var category = +req.query.category;
  var categoryId = category || 1;
  moe.findByCategoryId(categoryId, function(err, data){
    if (err === 'Not found') {
      res.status(404).send('Not Found');
    }
    if (err) {
      res.status(500).send(err);
    }
    console.log(data);
    res.render('index', data);
  });
});

module.exports = router;

