// 気が向いたらちゃんと書く＼(^o^)／
;(function($) {

  // pixiv画像のローダー
  var Loader = function (data) {
    this.$imgElm = $('#js-img-pixiv');
    this.$textLoading = $('#js-text-pixiv-loading');
    this.$wrapImg = $('#js-wrap-img');
    this.imgUrl = data.pixivImage;
    this.pixivUrl = data.pixivUrl;
  };

  Loader.prototype = {
    load: function() {
      // なかったら
      if (!this.imgUrl) {
        this.render();
        return;
      }
      var img = new Image();
      $(img).one('load', this.render.bind(this));
      img.src = this.imgUrl;
    },

    render: function() {
      var html = '<p>見つかりませんでした。</p>';
      if (this.imgUrl) {
        html = '<a href="' + this.pixivUrl + '" target="_blank"><img id="js-img-pixiv" class="img-pixiv" src="' + this.imgUrl + '" /></a>';
      }
      // 雑ｗ
      this.$wrapImg.html(html);
    }
  }

  function main() {
    var json = JSON.parse($('#js-json-pixivkeyword').html());
    var pixivKeyword = json.pixivKeyword;

    $.ajax({
      type:        'get',
      url:         '/pixiv',
      data:        {pixivKeyword: pixivKeyword},
      contentType: 'application/json',
      dataType:    'json',
      success: function(data) {
        var loader = new Loader(data);
        loader.load();
      },
      error: function() {
        alert('エラーｗｗ');
      }
    });

  }


  $(window).on('load', main);

})($);
