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

  var Scene = function () {
    this.$left = $('#js-block-left');
    this.$right = $('#js-block-rigitn');
    this.addEvent();
  };

  Scene.prototype = {
    addEvent : function () {
      this.$left.on('click', this.compare);
      this.$right.on('click', this.compare);
               };

    compare: function(e) {
      e.target()

    },

    render: function() {
    }

    next: 
  }




})();
