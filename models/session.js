var monk = require('monk');
var config = require('../config');

var Session = function(){ };

Session.prototype.findBySessionId = function(sessionId, cb) {
  var db = monk(config().mongoUrl);
  var session = db.get('session');
  session.findOne({ sessionId: sessionId })
         .on('success', function(data){
            db.close();
            cb(null, data);
         })
         .on('error', function(err){
            db.close();
            cb(err);
         });
};

Session.prototype.store = function(sessionId, entries, cb) {
  var db = monk(config().mongoUrl);
  var session = db.get('session');
  console.log(sessionId);
  console.log(entries);
  session.findOne({ sessionId: sessionId })
      .on('success', function(data) {
        if (data === null) {
          session.insert({
            sessionId: sessionId,
            mymoe: [entries]
          }).on('success', function(data) {
            db.close();
            cb(null, data);
          }).on('error', function(err) {
            db.close();
            cb(err);
          });
        } else {
          var mymoe = data.mymoe;
          mymoe.push(entries);
          session.update({ sessionId: sessionId, mymoe : mymoe }).on('success', function(data) {
            db.close();
            cb(null, data);
          }).on('error', function(err) {
            db.close();
            cb(err);
          });
        }
      })
      .on('error', function(err){
         db.close();
        cb(err);
      });
};

module.exports = new Session();

