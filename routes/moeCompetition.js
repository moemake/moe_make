var express = require('express');
var router = express.Router();
var session = require('../models/session');
var result = require('../models/moeResult');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);
  session.findBySessionId(req.sessionID, function(err, data){
    if (data === null) return res.redirect("/moe");
    res.render('moe_competition', {mymoe : data.mymoe});
  });
});

router.post('/', function(req, res) {
  var names = req.body.name.join(" ");
  result.store(names, function(err, data){
    res.send({ result : "ok" });
  });
});

module.exports = router;


