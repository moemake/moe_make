var express = require('express');
var router = express.Router();
var result = require('../models/moeResult');

/* GET home page. */
router.get('/:result/*', function(req, res) {
  console.log(req.params.result);
  result.findById(req.params.result, function(err, data){
    console.log(data);
    res.render('moe_result', data);
  });
});

module.exports = router;



