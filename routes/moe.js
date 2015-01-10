"use strict";
var express = require('express');
var router = express.Router();
var moe = require('../models/moe');
var session = require('../models/session');

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
  var entries = req.body.entries;
  var categoryId = req.body.categoryId;
  console.log(entries);
  console.log(categoryId);
  console.log(req.sessionID);
  session.store(req.sessionID, { 
    categoryId: categoryId, 
    entries : entries, 
  }, function(err, data) {
    res.send({ result : "ok" });
  });
});

module.exports = router;

