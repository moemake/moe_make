var express = require('express');
var router = express.Router();
var session = require('../models/session');
var result = require('../models/moeResult');
var categoryRank = require('../models/categoryRank');

/* GET home page. */
router.get('/', function(req, res) {
  session.findBySessionId(req.sessionID, function(err, data){
    if (data === null) return res.redirect("/moe");
    res.render('moe_competition', {mymoe : data.mymoe});
  });
});

router.post('/', function(req, res) {
 // todo if (!req.body.id) res.redirect("/error");
  var names = req.body.id.map(function(entry){
    return entry.entryName;
  });
  var entries = req.body.id;
  result.store(req.sessionID, req.body.id, function(err, data){
    var dataId = data._id;
    categoryRank.increments(entries, function(err, data){
      res.send({id: dataId, result: names});
    });
  });
});

module.exports = router;
