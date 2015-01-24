// 気が向いたらちゃんと書く＼(^o^)／
;(function() {
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
        location.href = isLast ? '/moe_competition' : '/moe?categoryId=' + data.nextCategoryId;
      },
      error: function() {
          alert('(・＊・)アナル〜');
      }
    });
  };

  var onClickEnd = function() {
    console.log('end');
  };

  $('.js-item').on('click', onClickItem);
  $('#js-btn-next').on('click', onClickNext);

  $('#js-neko3').on('click', function(e) {
    var $target = $(e.target);
    if ($target.hasClass('anim')) {
      $target.removeClass('anim');
    } else {
      $target.addClass('anim');
    }
  });
})();
