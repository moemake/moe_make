var express = require('express');
var router = express.Router();
var result = require('../models/moeResult');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query.id);
  result.findById(req.query.id, function(err, data){
    if (data === null) return res.redirect("/moe");
    res.render('moe_result', data);
  });
});

module.exports = router;



