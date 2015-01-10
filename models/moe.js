var monk = require('monk');

var Moe = function(){ };

Moe.prototype.findByCategoryId = function(categoryId, cb){
  var db = monk('localhost/moedb');
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
        cb(null, result);
        db.close();
      });
};

module.exports = new Moe();
