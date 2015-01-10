// 気が向いたらちゃんと書く＼(^o^)／
;(function() {
  var entries = [];

  var onClickItem = function(e) {
    var $target = $(e.target);
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

  var onClickNext = function() {
    console.log('next', entries);
    var categoryId = $('#js-category-id').text();

    $.ajax({
      type:"post",
      url:"/moe", // TODO
      data:JSON.stringify({"entries":entries, "categoryId": categoryId}),
      contentType: 'application/json',
      dataType: "json",
      success: function(data) {
        // TODO:リダイレクト
        // location.href = '';
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

  $('#js-btn-end').on('click', onClickEnd);
})();
