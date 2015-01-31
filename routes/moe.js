"use strict";
var express = require('express');
var router = express.Router();
var moe = require('../models/moe');
var _ = require('lodash');
var session = require('../models/session');

/* GET home page. */
router.get('/', function(req, res, next) {
  var categoryId = +req.query.categoryId || 1;

  var app = require('../app');
  var moeCategories = app.get('moeCategories');
  var categorySize = moeCategories.length;
  var isLast = false;
  if (categoryId > categorySize) {
    categoryId = categorySize;
  }
  if (categoryId === categorySize) {
    isLast = true;
  }
  var percentage = parseInt(((categoryId-1)/(categorySize-1)) * 100);
  moe.findByCategoryId(categoryId, function(err, data){
    if (err === 'Not found') {
      res.status(404).send('Not Found');
    }
    if (err) {
      res.status(500).send(err);
    }
    res.render('index', { 
      entries: _.shuffle(data.entries),
      categoryName: data.categoryName,
      categoryId:   data.categoryId,
      percentage:   percentage, 
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

