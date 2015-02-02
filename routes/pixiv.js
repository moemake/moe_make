"use strict";
var express = require('express');
var router = express.Router();
var pixiv = require('pixiv');
var _ = require('lodash');

router.get('/', function(req, res) {
  var pixivKeyword = req.query.pixivKeyword || "";
  console.log(pixivKeyword);
  var orderBy = _.sample(["date", ""]);
  pixiv.search({
    word: pixivKeyword + " AND (100 OR 500 OR なにこれ OR クリック推奨 OR タグ) AND -講座 AND -素材",
    order: orderBy,
  }, function(images){
    var pixivImage = "";
    var pixivUrl = "";
    if (images.length > 0) {
      var pixivInfo = _.sample(images);
      if (pixivInfo.illust_480mw_url) {
        pixivImage = pixivInfo.illust_480mw_url;
        pixivUrl = "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + pixivInfo.illust_id;
      }
    }
    res.status(200).json({  
      pixivImage: pixivImage,
      pixivUrl: pixivUrl,
    });
  });
});

module.exports = router;
