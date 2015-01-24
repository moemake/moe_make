var monk = require('monk');
var _ = require('lodash');
var config = require('../config');

var Category = function(){ };

Category.prototype.findAll = function(cb){
  var db = monk(config().mongoUrl);
  var category = db.get('category');
  category.find()
      .on('complete', function(err, data){
        if (err) cb(err);
        cb(null, data);
      });
};


module.exports = new Category();

