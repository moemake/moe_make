// 気が向いたらちゃんと書く＼(^o^)／
;(function($) {

  // pixiv画像のローダー
  var Loader = function (data) {
    this.imgUrl = data.pixivImage;
    this.pixivUrl = data.pixivUrl;
    this.imgId = Loader.imgId;
    Loader.imgId++;
  };

  Loader.imgId = 0;
  Loader.$wrapImg = $('#js-wrap-img');

  Loader.prototype = {
    load: function() {
      this.createLoading();
      var img = new Image();
      $(img).one('load', this.render.bind(this));
      img.src = this.imgUrl;
    },

    createLoading: function() {
      Loader.$wrapImg.append('<div id="js-pixiv-loading-' + this.imgId + '" class="m-b-xxl"><img id="js-img-pixiv" class="img-pixiv-loading" src="/img/ahe/0.png" />');
    },

    render: function() {
      // 雑ｗ
      $('#js-pixiv-loading-' + this.imgId).remove();
      var html = '<div><a href="' + this.pixivUrl + '" target="_blank"><img id="js-img-pixiv" class="img-pixiv" src="' + this.imgUrl + '" /></a></div>';
      Loader.$wrapImg.append($(html));
    }
  };

  var ImageModel = function(keywords) {
    this.keywords = keywords;
    this.foundImageNum = 0;
    this.calledApiNum = 0;
  };

  ImageModel.prototype = {
    getAllImage: function() {
      for (var i = 0, l = this.keywords.length; i < l; i++) {
        this.get(this.keywords[i]);
      }
    },

    get: function(pixivKeyword) {
      var that = this;
      $.ajax({
        type:        'get',
        url:         '/pixiv',
        data:        {pixivKeyword: pixivKeyword},
        contentType: 'application/json',
        dataType:    'json',
        success: function(data) {
          that.calledApiNum++;

          if (data.pixivUrl != '') {
            that.foundImageNum++;
            var loader = new Loader(data);
            loader.load();
          }

          if (that.foundImageNum === 0 &&
            that.calledApiNum === that.keywords.length) {
            $('#js-wrap-img').html('<p>見つかりませんでした。</p>');
          }
        },
        error: function() {
          alert('エラーｗｗ');
        }
      });
    }
  }

  function main() {
    var json = JSON.parse($('#js-json-pixivkeyword').html());
    var pixivKeyword = json.pixivKeyword;
    // TODO(furukawa san): こんな感じでキーワードを配列でもらえると並列でfetchします
    // JSONはmoe_result.ejsに埋め込んであります
    var pixivKeywords = ['ぴかちゅー', 'マリオ', 'アスナ' ];
    var imageModel = new ImageModel();
    var imageModel = new ImageModel(pixivKeywords);
    imageModel.getAllImage();
  }

  $(window).on('load', main);

})($);
