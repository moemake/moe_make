// 気が向いたらちゃんと書く＼(^o^)／
;(function() {
  // ダミーだよ
  // 中身は違うとこんな配列で帰ってくると素敵
  var data = [
    {
      category: 1,
      data: [
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
      data: [
        {
          id: 1,
          name: 'クソ'
        }
      ]
    },
  ];

  var Scene = function (data, model) {
    this.data = data;
    this.model = model;
    this.$left = $('#js-block-left');
    this.$right = $('#js-block-right');
    this.addEvent();
    this.currentCategoryIdx = 0;
    this.result = [];
    this.initialize();
  };

  Scene.prototype = {
    initialize: function() {
      this.render();
    },

    addEvent : function () {
      this.$left.on('click', function(e){
        this.onClick(e);
      }.bind(this));

      this.$right.on('click', function(e){
        this.onClick(e);
      }.bind(this));
    },

    onClick: function(e) {
      this.compare(e);

      // 選択肢が一つの場合はnextを呼んでカテゴリを進める
      if (this.getCurrentCategory().data.length <= 1) {
        this.goNextCategory();
      }

      this.render();
    },

    // 配列を整形するところまでやるか
    compare: function(e) {
      // クリックした方に仕込まれてるIDは負けた方のID
      var id = $(e.target).data('lost-id');
      var data = this.getCurrentCategory().data;
      
      // 削除
      // TODO:いけてないので動いたら治す
      this.getCurrentCategory().data = data.filter(function(val){
        return +val.id !== +id;
      });
    },

    render: function() {
      var competitor = this.getCompetitor();

      this.$left
        .text(competitor[0].name)
        .data('lost-id', competitor[1].id);
      this.$right
        .text(competitor[1].name)
        .data('lost-id', competitor[0].id);
    },

    // 色々やらせすぎ
    goNextCategory: function() {
      // データがひとつしかなかったら結界に保存
      if (this.getCurrentCategory().data.length <= 1) {
        this.result.push(this.getCurrentCategory().data[0]);
      }

      this.currentCategoryIdx++;

      if ((this.data.length) === this.currentCategoryIdx) {
        this.end();
        return;
      }

      // データがひとつしかなかったら一つ飛ばし
      if (this.getCurrentCategory().data.length <= 1) {
        // 結果に保存
        this.result.push(this.getCurrentCategory().data[0]);
        this.goNextCategory();
      }
    },

    getCompetitor: function() {
      // ２つ以上あることを保証した上で実行
      var suffled = _.shuffle(this.getCurrentCategory().data);
      return [suffled[0], suffled[1]];
    },

    getCurrentCategory: function() {
      return this.data[this.currentCategoryIdx];
    },

    end: function() {
      console.log('end', this.result);
      this.model.send(this.result);
    }
  };

  var Model = function () {};
  Model.prototype = {
    send: function(data) {
      $.ajax({
        type:"post",
        url:"", // TODO
        data:JSON.stringify({"id":data}),
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
