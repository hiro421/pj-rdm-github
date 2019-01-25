$(function() {
  var $body = $('body');
  // �u���̑ΏۂƂ���class�����B
  var $elem = $('.js-image-switch');
  // �u���̑ΏۂƂ���src�����̖����̕�����B
  var sp = '_sp.';
  var pc = '_pc.';
  // �摜��؂�ւ���E�B���h�E�T�C�Y�B
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

  // ���I�ȃ��T�C�Y�͑����0.2�b�o���Ă��珈�������s����B
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 200);
  });
});