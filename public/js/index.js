// 気が向いたらちゃんと書く＼(^o^)／
;(function() {
  var selectedIds = [];

  var onClickItem = function(e) {
    var $target = $(e.target);
    var id = $target.data('item-id');

    if(!$target.data('is-selected')) {
      select($target, id);
    } else {
      unselect($target, id);
    }
  };

  var select = function ($target, id) {
    $target
      .addClass('is-selected')
      .data('is-selected', true);
    selectedIds.push(id);
  };

  var unselect = function ($target, id) {
    $target
      .removeClass('is-selected')
      .data('is-selected', false);
    selectedIds.some(function(val, i){
      if (val === id) {
        selectedIds.splice(i,1);    
      }
    });
  };

  var onClickNext = function() {
    console.log('next', selectedIds);
    var categoryId = $('#js-category-id').text();

    $.ajax({
      type:"post",
      url:"/moe", // TODO
      data:JSON.stringify({"id":selectedIds, "categoryId": categoryId}),
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
