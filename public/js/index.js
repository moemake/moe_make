// 気が向いたらちゃんと書く＼(^o^)／
;(function() {

  // ごめん適当
  function getPageSize() {
    return Math.max(
      document.body.clientHeight,
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );
  }

  // LoadingView
  var LoadingView = function() {
    this.initialize();
  };

  LoadingView.prototype = {
    initialize: function() {
      this.$elem = $('#js-loading');
      this.$overlay = $('#js-overlay');
    },

    show: function() {
      this.$elem.addClass('show');
      this.$overlay
        .removeClass("js-hide")
        .addClass("js-show");
      this.$overlay.css({height: getPageSize() + 'px'});
    },

    hide: function() {
      this.$elem.removeClass('show');
      this.$overlay
        .removeClass("js-show")
        .addClass("js-hide");
    }
  };

  var loadingView = new LoadingView();

  var entries = [];

  var onClickItem = function(e) {
    var $target = $(e.currentTarget);
    var id = $target.data('item-id');
    var entry = $target.data('item-entry');

    if(!$target.data('is-selected')) {
      select($target, id, entry);
    } else {
      unselect($target, id);
    }
  };

  var select = function ($target, id, name) {
    $target
      .addClass('is-selected')
      .data('is-selected', true);
    entries.push( { entryId : id, entryName: name });
  };

  var unselect = function ($target, id) {
    $target
      .removeClass('is-selected')
      .data('is-selected', false);
    entries.some(function(val, i){
      if (val.id === id) {
        entries.splice(i,1);    
      }
    });
  };

  var onClickNext = function(e) {
    var categoryId = $('#js-category-id').text();
    var categoryName = $('#js-category-name').text();
    var isLast = $(e.target).data('is-last') ? true : false;
    console.log(isLast);

    loadingView.show();
    $.ajax({
      type:"post",
      url:"/moe", // TODO
      data:JSON.stringify({
        "entries":entries, 
        "categoryId": categoryId, 
        "categoryName" : categoryName
      }),
      contentType: 'application/json',
      dataType: "json",
      success: function(data) {
        loadingView.hide();
        location.href = isLast ? '/moe_competition' : '/moe?categoryId=' + data.nextCategoryId;
      },
      error: function() {
        loadingView.hide();
        alert('失敗ｗｗ');
      }
    });
  };

  $('.js-item').on('click', onClickItem);
  $('.js-btn-next').on('click', onClickNext);
  $('#js-neko3').on('click', function(e) {
    var $target = $(e.target);
    if ($target.hasClass('anim')) {
      $target.removeClass('anim');
    } else {
      $target.addClass('anim');
    }
  });
})();
