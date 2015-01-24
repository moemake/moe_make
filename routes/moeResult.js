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
      return '<span class="txt-bold txt-xxl">' + entry.entryName + '</span>';
    }).join("、");
    console.log(names);
    // TODO: ドメインを取ったらなおす
    var url = "http://oremoe.herokuapp.com/" + req.params.result + "/"; 
    res.render('moe_result', { names: names, url: url});
  });
});

module.exports = router;



