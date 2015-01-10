// 気が向いたらちゃんと書く＼(^o^)／
;(function() {

  var data = JSON.parse($('#js-json-mymoe').html());
  console.log(data);

  // ダミーだよ
  // 中身は違うとこんな配列で帰ってくると素敵
  var Scene = function (data, model) {
    this.data = data;
    this.model = model;
    this.$left = $('#js-block-left');
    this.$right = $('#js-block-right');
    this.$categoryName = $('#js-text-cat-name');
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
      if (this.getCurrentCategory().entries.length <= 1) {
        this.goNextCategory();
      }

      this.render();
    },

    // 配列を整形するところまでやるか
    compare: function(e) {
      // クリックした方に仕込まれてるIDは負けた方のID
      var entryId = $(e.target).data('lost-id');
      var entries = this.getCurrentCategory().entries;
      
      // 削除
      // TODO:いけてないので動いたら治す
      this.getCurrentCategory().entries = entries.filter(function(val){
        return +val.entryId !== +entryId;
      });
    },

    render: function() {
      var competitor = this.getCompetitor();

      this.$left
        .text(competitor[0].entryName)
        .data('lost-id', competitor[1].entryId);
      this.$right
        .text(competitor[1].entryName)
        .data('lost-id', competitor[0].entryId);
      this.$categoryName.text(this.getCurrentCategory().categoryName);

    },

    // 色々やらせすぎ
    goNextCategory: function() {
      // データがひとつしかなかったら結界に保存
      if (this.getCurrentCategory().entries.length <= 1) {
        this.result.push(this.getCurrentCategory().entries[0]);
      }

      this.currentCategoryIdx++;

      if ((this.data.length) === this.currentCategoryIdx) {
        this.end();
        return;
      }

      // データがひとつしかなかったら一つ飛ばし
      if (this.getCurrentCategory().entries.length <= 1) {
        this.goNextCategory();
      }
    },

    getCompetitor: function() {
      // ２つ以上あることを保証した上で実行
      var suffled = _.shuffle(this.getCurrentCategory().entries);
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
          console.log(data);
          alert('成功');
        },
        error: function() {
        }
      });
    }
  };

  new Scene(data, new Model());

})();
