$(function() {
  var $body = $('body');

  // ==================================================
  // slide
  $('.slide').each(function () {
    var num = $(this).find('li').length;
    var time = 4000;
    if(num == 4 && $(this).hasClass('slideAni01')){
      setInterval(function(){
        var selectImage = $('.slideAni01 li.active').index();
        selectImage++;
        if (selectImage == num){
          selectImage = 0;
        }
        $('.slideAni01 li').removeClass('active');
        $('.slideAni01 li').eq(selectImage).addClass('active');
      },time);
    }else if (num == 4 && $(this).hasClass('slideAni03')) {
      setInterval(function(){
        var selectImage = $('.slideAni03 li.active').index();
        selectImage++;
        if (selectImage == num){
          selectImage = 0;
        }
        $('.slideAni03 li').removeClass('active');
        $('.slideAni03 li').eq(selectImage).addClass('active');
      },time);
    }else{
      setInterval(function(){
        var selectImage = $('.slideAni02 li.active').index();
        selectImage++;
        if (selectImage == 3){
          selectImage = 0;
        }
        $('.slideAni02 li').removeClass('active');
        $('.slideAni02 li').eq(selectImage).addClass('active');
      },time);
    }
  });
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
      if (scroll > POS - windowHeight + windowHeight/3){
        $(this).addClass('on')
      }
    });
   });
  $('.fade-inLoad').each(function(){
    $(this).addClass('on')
  });
});