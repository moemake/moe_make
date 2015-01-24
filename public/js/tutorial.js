;(function(window, $, undefined) {

  var overlay = $('#js-overlay');

  function getPageSize() {
    return Math.max(
      document.body.clientHeight,
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );
  }

  function getVerticalCenter() {
    var screenHeight = (window.orientation === 0) ? screen.availHeight : screen.availWidth;
    var height = Math.min(screenHeight, window.innerHeight);

    return document.body.scrollTop + (height / 2);
  }

  function Tutorial(element) {
    this.element = $(element);
    this.init();
  }

  Tutorial.prototype = {
    init: function() {
      this.tutorial = $("#js-tutorial");
      this.section1 = $("#js-tutorial-section1");
      this.section2 = $("#js-tutorial-section2");
      this.addEvent();
      this.handleOpen();
    },

    addEvent: function() {
      var $btnNext = $("#js-btn-tutorial-next");
      var $btnEnd = $("#js-btn-tutorial-end");
      var $btnReopen = $("#js-btn-tutorial-reopen");

      $btnNext.on("click", this.next.bind(this));
      $btnEnd.on("click", this.end.bind(this));
      $btnReopen.on("click", this.reopen.bind(this));
    },

    handleOpen: function() {
      // TODO: 丁寧にハンドルする
      if (window.localStorage === undefined) return;

      var is_tutorial_finished = localStorage.getItem("is_tutorial_finished");
      if (is_tutorial_finished) return;

      this.open();
      localStorage.setItem("is_tutorial_finished", 1);
    },

    next: function() {
      this.section1.hide();
      this.section2.show();
    },

    end: function() {
      overlay
        .removeClass("js-show")
        .addClass("js-hide");
      this.tutorial
        .removeClass("js-show")
        .addClass("js-hide");
    },

    open: function() {
      overlay
        .removeClass("js-hide")
        .addClass("js-show");
      this.tutorial
        .removeClass("js-hide")
        .addClass("js-show");
      this.center();
      overlay.css({height: getPageSize() + 'px'});
    },

    reopen: function() {
      this.section1.hide();
      this.section2.show();
      this.open();
    },

    center: function() {
      var vHeight = getVerticalCenter();
      var mHeight = this.tutorial[0].offsetHeight;
      var h = vHeight - mHeight/2;
      if (h < 0) {
        h = 0;
      }
      this.tutorial.css({top: h + 'px'});
    }
 };

 window.document.addEventListener('DOMContentLoaded', function() {
   new Tutorial();
 });

})(window, $);
