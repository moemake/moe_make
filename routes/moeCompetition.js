var express = require('express');
var router = express.Router();
var session = require('../models/session');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);
  session.findBySessionId(req.sessionID, function(err, data){
    res.render('moe_competition', {mymoe : data.mymoe});
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


