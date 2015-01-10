var monk = require('monk');
var config = require('../config');

var Result = function(){ };

Result.prototype.findById = function(id, cb) {
  var db = monk(config().mongoUrl);
  var result = db.get('result');
  result.findById(id)
         .on('success', function(data){
            db.close();
            cb(null, data);
         })
         .on('error', function(err){
            db.close();
            cb(err);
         });
};

Result.prototype.store = function(attrString, cb) {
  var db = monk(config().mongoUrl);
  var result = db.get('result');
  result.insert({
    attr : attrString
  }).on('success', function(data) {
    db.close();
    cb(null, data);
  }).on('error', function(err) {
    db.close();
    cb(err);
  });
};

module.exports = new Result();


