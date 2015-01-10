var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);
  res.render('moe_competition', {
    mymoe: [ 
      {
        categoryId : 1,
        categoryName : "目",
        entries: [
          { entryId: 1, entryName: "ジト目" },
          { entryId: 2, entryName: "レイプ目" },
          { entryId: 3, entryName: "ファック目" },
          { entryId: 4, entryName: "らめぇ目" },
        ] 
      },
      {
        categoryId : 2,
        categoryName : "性格",
        entries: [
          { entryId: 21, entryName: "死姦" },
          { entryId: 22, entryName: "ネクロフェリア" },
        ] 
      },
    ]
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  var selectedIds = req.body.id;
  var categoryId = req.body.categoryId;
  console.log(selectedIds);
  console.log(categoryId);
  res.send({ hoge : "hoge" });
});

module.exports = router;


