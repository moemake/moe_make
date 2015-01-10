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
    res.render('index', data);
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  var selectedIds = req.body.id;
  var categoryId = req.body.categoryId;
  console.log(selectedIds);
  console.log(categoryId);
  res.send({ hoge : "hoge" });
});

module.exports = router;

