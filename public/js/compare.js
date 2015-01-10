// 気が向いたらちゃんと書く＼(^o^)／
;(function() {
  // ダミーだよ
  // 中身は違うとこんな配列で帰ってくると素敵
  var data = [
    {
      category: 1,
      date: [
        {
          id: 1,
          name: 'ほげ'
        },
        {
          id: 2,
          name: 'ふが'
        },
        {
          id: 3,
          name: 'ぴよ'
        },
        {
          id: 3,
          name: 'にゃん'
        }
      ]
    },
    {
      category: 2,
      date: [
        {
          id: 1,
          name: 'ほげ'
        }
      ]
    },
  ];

  var Scene = function (data, model) {
    this.data = data;
    this.model = model;
    this.$left = $('#js-block-left');
    this.$right = $('#js-block-rigitn');
    this.addEvent();
    this.currentCategoryIdx = 0;
    this.result = [];
    this.initialize();
  };

  Scene.prototype = {
    initialize: function() {
      render();
    },

    addEvent : function () {
      this.$left.on('click', this.compare);
      this.$right.on('click', this.compare);
    };

    // 配列を整形するところまでやるか
    compare: function(e) {
      console.log('比較');

      // クリックした方に仕込まれてるIDは負けた方のID
      var id = e.target('item-lost-id');
      var currentCategory = this.getCurrentCategory().data;
      
      // 削除
      // TODO:いけてないので動いたら治す
      this.getCurrentCategory().data = currentCategory().data.filter(function(v){
        return v.id != id;
      });

      if ((this.data.length-1) === this.currentCategoryIdx) {
        end();
      } else {
        render();
      }
    },

    beforeRender: function() {
      // 選択肢が一つの場合はnextを呼んでカテゴリを進める
      if (this.getCurrentCategory().data.length === 1) {
        goNextCategory();
      }
    },

    render: function() {
      beforeRender();
      var competitor = this.getCompatitor();

      $left.text(competitor[0]);
      $right.text(competitor[1]);
    },

    goNextCategory: function() {
      this.currentCategoryIdx++;
    },

    getCompetitor: function() {
      // ２つ以上あることを保証した上で実行
      var suffled = _.suffle(this.getCurrentCategory().data());
      return [suffled[0], suffled[1]];
    },

    getCurrentCategory: function() {
      return this.data[this.currentCategoryIdx];
    },

    end: function() {
      console.log(this.result);
      this.model.send(this.result);
    }
  };

  var Modal = function () {};
  Model.prototype = {
    send: function(data) {
      $.ajax({
        type:"post",
        url:"", // TODO
        data:JSON.stringify({"id":selectedIds}),
        contentType: 'application/json',
        dataType: "json",
        success: function(data) {
          alert('成功');
        },
        error: function() {
        }
      });
    }
  };

  new Scene(data, new Model());

})();
