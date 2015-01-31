// 気が向いたらちゃんと書く＼(^o^)／
;(function($) {

  // pixiv画像のローダー
  var Loader = function () {
    this.$imgElm = $('#js-img-pixiv');
    this.$textLoading = $('#js-text-pixiv-loading');
    this.imgUrl = null;
    this.initialize();
  };

  Loader.prototype = {
    initialize: function() {
      if(!this.hasImage()) return;
      this.imgUrl = this.$imgElm.data('src');
    },

    hasImage: function() {
      return !!this.$imgElm.size;
    },

    load: function() {
      var img = new Image();
      $(img).one('load', this.show.bind(this));
      img.src = this.imgUrl;
    },

    show: function() {
      this.$imgElm
        .addClass('img-pixiv')
        .removeClass('img-pixiv-loading')
        .attr('src', this.imgUrl);
      this.$textLoading.hide();
    }
  }

  var loader = new Loader();
  if (loader.hasImage()) {
    loader.load();
  }

})($);
