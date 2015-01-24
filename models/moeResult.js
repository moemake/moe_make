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

Result.prototype.findBySessionId = function(sessionId, cb) {
  var db = monk(config().mongoUrl);
  var result = db.get('result');
  result.findOne({sessionId: sessionId})
         .on('success', function(data){
            db.close();
            cb(null, data);
         })
         .on('error', function(err){
            db.close();
            cb(err);
         });
};

Result.prototype.store = function(sessionId, storedData, cb) {
  var db = monk(config().mongoUrl);
  var result = db.get('result');
  result.findOne({sessionId: sessionId}).on('success', function(data){
    if (!data) {
      result.insert({
        sessionId: sessionId,
        result: storedData
      }).on('success', function(data) {
        db.close();
        cb(null, data);
      }).on('error', function(err) {
        db.close();
        cb(err);
      });
    } else {
      result.update(
        {sessionId: sessionId}, 
        {sessionId: sessionId, result: storedData}
      ).on('success', function(data) {
        db.close();
        cb(null, data);
      }).on('error', function(err) {
        db.close();
        cb(err);
      });
    }
  })
};

module.exports = new Result();


