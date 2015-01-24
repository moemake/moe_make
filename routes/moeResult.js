var express = require('express');
var router = express.Router();
var moe = require('../models/moe');
var result = require('../models/moeResult');
var category = require('../models/category');
var categoryRank = require('../models/categoryRank');

/* GET home page. */
router.get('/:result/*', function(req, res) {
  console.log(req.params.result);
  result.findById(req.params.result, function(err, data){
    if (err) return res.redirect("/moe");
    if (!data) return res.redirect("/moe");
    var names = data.result.map(function(entry){
      return '<span class="txt-bold txt-xxl">' + entry.entryName + '</span>';
    }).join("、");
    var tweetStr = data.result.map(function(entry){
      return entry.entryName;
    }).join("、");
    console.log(names);
    console.log(data.result);
    var app = require('../app');
    var categories = app.get('moeCategories');
    console.log(categories);
    categoryRank.getRanks(data.result, function(err, ranks){
      console.log("ranks = ", ranks);
      var moerate = 0.0;
      for(var index = 0; index<data.result.length; index++){
        var entry = data.result[index];
        var rank = ranks[index];
        categories.forEach(function(cat){
          if (cat.categoryName === entry.categoryName) {
            console.log("subCatgoryCount", cat.subCategoryCount);
            console.log("rank ", rank);
            moerate += (rank/+cat.subCategoryCount);
          }
        });
      }
      moerate = parseInt(moerate * 100);
      var url = "http://oremoe.herokuapp.com/moe_result/" + req.params.result + "/"; 
      res.render('moe_result', {  names: names, moerate: moerate, url: url, tweetStr: tweetStr});
    });
  });
});

module.exports = router;
