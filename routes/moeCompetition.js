var express = require('express');
var router = express.Router();
var session = require('../models/session');
var result = require('../models/moeResult');

/* GET home page. */
router.get('/', function(req, res) {
  session.findBySessionId(req.sessionID, function(err, data){
    if (data === null) return res.redirect("/moe");
    res.render('moe_competition', {mymoe : data.mymoe});
  });
});

router.post('/', function(req, res) {
 // todo if (!req.body.id) res.redirect("/error");
  result.store(req.sessionID, req.body.id, function(err, data){
    console.log(data._id);
    res.send({id: data._id});
  });
});

module.exports = router;


