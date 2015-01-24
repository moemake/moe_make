var express = require('express');
var router = express.Router();
var result = require('../models/moeResult');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query.id);
  result.findById(req.query.id, function(err, data){
    console.log(data);
    res.render('moe_result', data);
  });
});

module.exports = router;



