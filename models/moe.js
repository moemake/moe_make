var monk = require('monk');
var _ = require('lodash');
var config = require('../config');

var Moe = function(){ };

Moe.prototype.findByCategoryId = function(categoryId, cb){
  var db = monk(config().mongoUrl);
  var moes = db.get('moes');
  console.log(categoryId);
  moes.find({categoryId: categoryId})
      .on('complete', function(err, data){
        if (err) cb(err);
        if (data.length === 0) cb("Not found");

        var first = data[0];
        var result = {
          categoryId: first.categoryId,
          categoryName: first.categoryName,
          entries: data
        };
        db.close();
        cb(null, result);
      });
};

Moe.prototype.findAllCategories = function(cb){
  var db = monk(config().mongoUrl);
  var moes = db.get('moes');

  // NOTE: monkってaggregateをサポートしてないので置き
  // あとで相談する
  /*
  moes.aggregate([
        {
          $group:{
            _id: "$categoryId",
            categoryId: {$first: "$categoryId"},
            categoryName: {$first: "$categoryName"}
          }
        }, 
        {
          $sort: {
            _id: 1
          }
        }
      ])
      .on('complete', function(err, data){
        if (err) cb(err);
        if (data.length === 0) cb("Not found");
        console.log(data);
        db.close();
        cb(null, data);
      });
  */
};


module.exports = new Moe();
