"use strict";
var redis = require("redis");

var CategoryRank = function(){};

CategoryRank.prototype.incrementCategory = function(categoryName, subcategoryName, cb){
  var client = redis.createClient();
  client.on("error", function(err){
    client.quit();
    if (cb) cb(err);
  });
  client.zincrby(categoryName, 1, subcategoryName, function(){
    client.quit();
    if (cb) cb(null);
  });
};

CategoryRank.prototype.getRank = function(categoryName, subcategoryName, cb){
  var client = redis.createClient();
  client.on("error", function(err){
    client.quit();
    if (cb) cb(err);
  });
  client.zrank(categoryName, subcategoryName, function(err, rank){
    client.quit();
    if (err) cb(err);
    if (cb) cb(null, rank);
  });

};

// getRanks({
//   categories: [{categoryName: '', subCategoryName: ''}]
// });
CategoryRank.prototype.increments = function(categories, cb){
  var client = redis.createClient();
  var multi = client.multi();
  client.on("error", function(err){
    client.quit();
    if (cb) cb(err);
  });

  categories.forEach(function(category){
    multi.zincrby(
      category.categoryName, 
      1, 
      category.entryName, redis.print);
  });

  multi.exec(cb);
};


CategoryRank.prototype.getRanks = function(categories, cb){
  var client = redis.createClient();
  var multi = client.multi();
  client.on("error", function(err){
    client.quit();
    if (cb) cb(err);
  });

  categories.forEach(function(category){
    multi.zrank(
      category.categoryName, 
      category.entryName, redis.print);
  });

  multi.exec(cb);
};

module.exports = new CategoryRank();
