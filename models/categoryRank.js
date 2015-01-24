"use strict";
var redis = require("redis");
var config = require('../config')();

var CategoryRank = function(){};

function createClient() {
  var client;
  console.log(config.redisUrl);
  if(config.redisUrl) {
    var redisUrl = config.redisUrl;
    client = redis.createClient(redisUrl.port, redisUrl.hostname);
    client.auth(redisUrl.auth.split(":")[1]);
  } else {
    client = redis.createClient();
  }
  return client;
}

CategoryRank.prototype.incrementCategory = function(categoryName, subcategoryName, cb){
  var client = createClient();
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
  var client = createClient();
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
  var client = createClient();
  var multi = client.multi();
  client.on("error", function(err){
    client.quit();
    console.log(err);
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
  var client = createClient();
  var multi = client.multi();
  client.on("error", function(err){
    client.quit();
    console.log(err);
  });

  categories.forEach(function(category){
    multi.zrank(
      category.categoryName, 
      category.entryName, redis.print);
  });

  multi.exec(cb);
};

module.exports = new CategoryRank();
