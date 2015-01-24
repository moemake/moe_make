"use strict";
var express = require('express');
var router = express.Router();
var moe = require('../models/moe');
var session = require('../models/session');
var MAX_CATEGORY_ID = 2;

/* GET home page. */
router.get('/', function(req, res) {
  var categoryId = +req.query.categoryId || 1;

  moe.findByCategoryId(categoryId, function(err, data){
    if (err === 'Not found') {
      res.status(404).send('Not Found');
    }
    if (err) {
      res.status(500).send(err);
    }

    var isLast = false;
    if (categoryId === MAX_CATEGORY_ID) {
      isLast = true;
    }

    res.render('index', { 
      entries: data.entries,
      categoryName: data.categoryName,
      categoryId:   data.categoryId,
      isLast:       isLast
    });
  });
});

router.post('/', function(req, res) {
  var entries = req.body.entries;
  var categoryId = req.body.categoryId;
  var categoryIdChan = req.body.categoryId;
  var categoryName = req.body.categoryName;
  session.store(req.sessionID, { 
    categoryId: categoryId, 
    categoryName: categoryName, 
    entries : entries, 
  }, function(err, data) {
    // NOTE:あまり調べてないけどこの名前空間だとcategoryIdが使えない？？
    var categoryId = +req.body.categoryId;
    var nextCategoryId = categoryId + 1;
    res.send({ nextCategoryId : nextCategoryId});
  });
});

module.exports = router;

