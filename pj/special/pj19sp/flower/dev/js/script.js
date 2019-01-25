$(function() {
  var $body = $('body');

  // ==================================================
  // slide
/*
  $('.slide').each(function () {
    var num = $(this).find('li').length;
    var time = 7400;
    if(num == 3 && $(this).hasClass('slideAni01')){
      setInterval(function(){
        var selectImage = $('.slideAni01 li.active').index();
        selectImage++;
        if (selectImage == num){
          selectImage = 0;
        }
        $('.slideAni01 li').removeClass('active');
        $('.slideAni01 li').eq(selectImage).addClass('active');
      },time);
    }else if (num == 2 && $(this).hasClass('slideAni02')) {
      setInterval(function(){
        var selectImage = $('.slideAni02 li.active').index();
        selectImage++;
        if (selectImage == num){
          selectImage = 0;
        }
        $('.slideAni02 li').removeClass('active');
        $('.slideAni02 li').eq(selectImage).addClass('active');
      },time);
    }else if (num == 2 && $(this).hasClass('slideAni03')) {
      setInterval(function(){
        var selectImage = $('.slideAni03 li.active').index();
        selectImage++;
        if (selectImage == num){
          selectImage = 0;
        }
        $('.slideAni03 li').removeClass('active');
        $('.slideAni03 li').eq(selectImage).addClass('active');
      },time);
    }else if (num == 2 && $(this).hasClass('slideAni04')) {
      setInterval(function(){
        var selectImage = $('.slideAni04 li.active').index();
        selectImage++;
        if (selectImage == num){
          selectImage = 0;
        }
        $('.slideAni04 li').removeClass('active');
        $('.slideAni04 li').eq(selectImage).addClass('active');
      },time);
    }
  });
*/
  // ==================================================
  // scrollanimation  
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    $('.fade-in').each(function(){
      var POS = $(this).offset().top;  
      var windowHeight = $(window).height(); 
      if (scroll > POS - windowHeight + windowHeight/3){
        $(this).addClass('on')
      }
    });
    $('.fade-up').each(function(){
      var POS = $(this).offset().top;  
      var windowHeight = $(window).height(); 
      if (scroll > POS - windowHeight + windowHeight/4){
        $(this).addClass('on')
      }
    });
    $('.txt-anime01').each(function(){
      var POS = $(this).offset().top;  
      var windowHeight = $(window).height(); 
      if (scroll > POS - windowHeight + windowHeight/5){
        $(this).addClass('on')
      }
    });
   });
  $('.fade-inLoad').each(function(){
    $(this).addClass('on')
  });
  $('.head_txt01').each(function(){
    $(this).addClass('on')
  });
  $('.head_txt02').each(function(){
    $(this).addClass('on')
  });
  
  $('a[href^="#"]').click(function() {
      var speed = 1000;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
   
  $(window).on('load scroll', function() {
      $('.para01 img').css({
          top: parallaxFunc(-100, -600, 3000, 4300)
      });
      $('.para02 img').css({
          top: parallaxFunc(0, -200, 5000, 6200)
      });
      $('.para03 img').css({
          top: parallaxFunc(0, -100, 6500, 7700)
      });
      $('.para04 img').css({
          top: parallaxFunc(0, -140, 8500, 9700)
      });
  });
   
  /**
   * パララックス要素の現在の値を返す
   * @param num moveStart   (required) パララックスで動かす要素の開始地点での値
   * @param num moveEnd     (required) パララックスで動かす要素の終了地点での値
   * @param num scrollStart (required) パララックスで動かすスクロール範囲の開始地点
   * @param num scrollEnd   (required) パララックスで動かすスクロール範囲の終了地点
   * @return num
   */
  function parallaxFunc(moveStart, moveEnd, scrollStart, scrollEnd) {
      var winScroll = $(window).scrollTop();
      var winHeight = $(window).height();
      // スクロール判定の基準位置
      var scrollPos = winScroll + winHeight;
   
      // 現在の値の取得
      var currentVal;
      // スクロール範囲に到達していない場合
      if(scrollPos < scrollStart) {
          currentVal = moveStart;
   
      // スクロール範囲を過ぎている場合
      } else if(scrollPos > scrollEnd) {
          currentVal = moveEnd;
   
      // スクロール範囲内の場合
      } else {
          // スクロール範囲
          var scrollRange = scrollEnd - scrollStart;
          // 移動範囲
          var moveRange = Math.abs(moveEnd - moveStart);
          // 進行方向
          var direction = moveStart < moveEnd ? 1 : -1;
          // 進捗率1%あたり進む距離
          var moveRate = moveRange / 100 * direction;
          // 現在の進捗率
          var progressRate = (scrollPos - scrollStart) / scrollRange * 100;
   
          currentVal = moveStart + progressRate * moveRate;
      }
      return currentVal;
  }
  
});