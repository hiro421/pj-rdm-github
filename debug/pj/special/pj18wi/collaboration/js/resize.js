$(function() {
  var $body = $('body');
  // 置換の対象とするclass属性。
  var $elem = $('.js-image-switch');
  // 置換の対象とするsrc属性の末尾の文字列。
  var sp = '_sp.';
  var pc = '_pc.';
  // 画像を切り替えるウィンドウサイズ。
  var replaceWidth = 769;
  var tabMinWidth = 427;

  function imageSwitch() {

    var windowWidth = parseInt($(window).width());

    $elem.each(function() {
      var $this = $(this);
      if(windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });

    if(windowWidth >= replaceWidth) {
      $body.removeClass('spw');
      $body.addClass('pcw');
    } else {
      $body.removeClass('pcw');
      $body.addClass('spw');
    }

    // if(windowWidth >= tabMinWidth && windowWidth < replaceWidth) {
    //   $body.addClass('tabw');
    // } else {
    //   $body.removeClass('tabw');
    // }

  }
  imageSwitch();

  // 動的なリサイズは操作後0.2秒経ってから処理を実行する。
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 200);
  });
});