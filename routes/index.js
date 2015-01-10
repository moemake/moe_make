var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
    categoryId: 1,  
    categoryName: '眼',  
    entries: [
      { id: 1, name: 'レイプ目' },
      { id: 2, name: 'ジト目' },
      { id: 3, name: '糸目' },
      { id: 4, name: '切れ長目' },
    ],  
  });
});

module.exports = router;

/*

三白眼
まんまる目
たれ目
つり目
ぐるぐる目
＞＜
オッドアイ
邪気眼
レイプ目
単眼
三つ目
赤目
碧眼
翠眼
隻眼
金眼
*/
