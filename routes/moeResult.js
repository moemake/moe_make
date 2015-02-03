"use strict";
var express = require('express');
var router = express.Router();
var moe = require('../models/moe');
var result = require('../models/moeResult');
var category = require('../models/category');
var categoryRank = require('../models/categoryRank');
var _ = require('lodash');

var moeMessages = [
  "いんじゃないスかぁ、大衆的感覚w",
  "普通万歳！普通ヤッタネ！よっ普通大臣!!",
  "変態だー!!!!",
  "その性癖には流石に引いてます",
];

var IMG_NUM = 5;

var getAoriText = function(moerate){
  var moeLen = moeMessages.length;
  for (var i=0; i<moeLen; i++) {
    var prev = i/moeLen;
    var next = i+1/moeLen;
    if (prev <= moerate && moerate < next) {
      return moeMessages[i];
    }
  }
  return moeMessages[moeLen-1];
};

/* GET home page. */
router.get('/:result/*', function(req, res) {
  console.log(req.params.result);
  result.findById(req.params.result, function(err, data){
    if (err) return res.redirect("/moe");
    if (!data) return res.redirect("/moe");

    var names = data.result.map(function(entry){
      return '<span class="txt-bold txt-xxl">' + entry.entryName + '</span>';
    }).join("、");
    
    var namesStr = data.result.map(function(entry){
      return entry.entryName;
    }).join("、");

    var keywords = data.result.map(function(entry){
      return entry.entryName;
    }).join(",");

    var seoWordsForUrl = data.result.map(function(entry){
      return entry.entryName;
    }).join("+");

    var app = require('../app');
    var categories = app.get('moeCategories');
    categoryRank.getRanks(data.result, function(err, ranks){
      if (err) res.redirect("/moe");

      var moerate = 0.0;
      for(var index = 0; index<data.result.length; index++){
        var entry = data.result[index];
        if (!ranks) res.redirect("/moe");
        var rank = ranks[index];
        categories.forEach(function(cat){
          if (cat.categoryName === entry.categoryName) {
            var count = +cat.subCategoryCount;
            moerate += (rank/count);
          }
        });
      }
      var aori = "なんか選べよ！！！";
      var pixivKeyword = "";
      var moegao = _.sample([0, 1, 2, 3]);

      if (data.result.length !== 0) {
        moerate = moerate / data.result.length;
        aori = getAoriText(moerate);
        moerate = parseInt(moerate * 100);
        pixivKeyword = _.sample(data.result, IMG_NUM).map(function(entry){
          return entry.entryName;
        });
        console.log("test", pixivKeyword);
      }

      var url = "http://oremoe.herokuapp.com/moe_result/" + req.params.result + "/"; 
      req.session.destroy(function(err){
        res.render('moe_result', {
          names: names || "何も選んでない...",
          moerate: moerate,
          moegao: moegao,
          url: url,
          namesStr: namesStr || "何も選んでない...",
          seoWordsForUrl: seoWordsForUrl || "",
          aori: aori,
          keywords: keywords,
          pixivKeyword: {pixivKeyword: pixivKeyword}
        });
      });
    });
  });
});

module.exports = router;
