var express = require('express');
var router = express.Router();
var moe = require('../models/moe');
var result = require('../models/moeResult');

/* GET home page. */
router.get('/:result/*', function(req, res) {
  console.log(req.params.result);
  result.findById(req.params.result, function(err, data){
    if (err) return res.redirect("/moe");
    if (!data) return res.redirect("/moe");
    var names = data.result.map(function(entry){

      return entry.entryName;
    }).join("  と ");
    console.log(names);
    res.render('moe_result', {  names: names });
  });
});

module.exports = router;



