var SP_MAX_WIDTH = 768;

function isPc(){
	if(window.innerWidth > SP_MAX_WIDTH){
		return true;
	}
  //tab height
  $(window).on('load',function(){
    if($('.js-tab-slideArea .slick-dots li:nth-child(1)').hasClass('slick-active')){
      $("#item_nudy").css('margin-top','-76.8vw');
    }
    $('.js-tab-slideArea .slick-dots li:nth-child(1)').on('click', function () {
      $("#item_nudy").css('margin-top','-76.8vw');
    });
    $('.js-tab-slideArea .slick-dots li:nth-child(2)').on('click', function () {
        $("#item_nudy").css('margin-top','-8vw');
    });
    $('.js-tab-slideArea .slick-dots li:nth-child(3)').on('click', function () {
        $("#item_nudy").css('margin-top','-26.5vw');
    });
  });
	return false;
}

$(document).ready(function(){
  var ua = navigator.userAgent;
  if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    $("body").addClass("android");
  }
  
  
	var elmWin = $(window);

	elmWin.on('resize.jsImageSwitch', function(){
		var strOldLast = '_pc';
		var strNewLast = '_sp';
		if(isPc()){
			strOldLast = '_sp';
			strNewLast = '_pc';
		}

		$('img.jsImageSwitch[src*="' + strOldLast + '"]').each(function(){
			var objSrc = devideSrcUrl(this.getAttribute('src'));
			if(objSrc.name.slice(-3) != strOldLast){
				return;
			}

			this.setAttribute('src', objSrc.name.slice(0, -3) + strNewLast + objSrc.extension);
		});
	});

	elmWin.trigger('resize.jsImageSwitch');
});


function devideSrcUrl(strSrc){
	var objReturn = {
		name: '',
		extension: ''
	};

	if(strSrc == null || strSrc.length == 0){
		return objReturn;
	}

	var nExtIdx = strSrc.lastIndexOf('.');
	objReturn.name = strSrc.slice(0, nExtIdx);
	objReturn.extension = strSrc.slice(nExtIdx);

	return objReturn;
}

// Animation
$(function() {
	$('.effect-top').each(function(){
		var imgPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll > imgPos - windowHeight + 100){
			$(this).addClass('anima-top');
		}
	});
  $('.effect-left').each(function(){
		var imgPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll > imgPos - windowHeight + 100){
			$(this).addClass('anima-left');
		}
	});
  $('.effect-right').each(function(){
		var imgPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll > imgPos - windowHeight + 100){
			$(this).addClass('anima-right');
		}
	});
	$('.effect-top-a').each(function(){
		var imgPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll > imgPos - windowHeight + 0){
			$(this).addClass('anima-top');
		}
	});
	$('.effect-top-b').each(function(){
		var imgPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll > imgPos - windowHeight + 0){
			$(this).addClass('anima-top');
			$(this).removeClass('anima-top');
		}
	});
	$('.effect-horizon').each(function() {
		var imgPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll > imgPos - windowHeight + 100){
			$(this).addClass('anima-horizon');
		}
	});
    $(window).scroll(function (){
        $('.effect-top').each(function(){
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + 100){
                $(this).addClass('anima-top');
            }
        });
        $('.effect-left').each(function(){
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + 100){
                $(this).addClass('anima-left');
            }
        });
        $('.effect-right').each(function(){
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + 100){
                $(this).addClass('anima-right');
            }
        });
				$('.effect-top-a').each(function(){
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + 0){
                $(this).addClass('anima-top');
            }
        });
				$('.effect-top-b').each(function(){
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + 0){
                $(this).addClass('anima-top');
							$(this).removeClass('anima-top');
            }
        });
        $('.effect-horizon').each(function() {
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + 100){
                $(this).addClass('anima-horizon');
            }
        });
        $('.fixed-cartBtn').each(function(){
            var imgPos = $("#item_nudy").offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + 100){
                $(this).addClass('scrolled');
            } else{
              $(this).removeClass('scrolled');
            }
        });
        $('.fixed-cartBtn').each(function(){
            var scroll = $(window).scrollTop();
            if (scroll > 300){
                $(this).addClass('show');
            } else{
              $(this).removeClass('show');
            }
        });
    });
});

// mainslider
$(function () {
  $('.main_slider .slides').slick({
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    easing:'easeOutQuint',
    speed:1000,
    dots: false
  });
  $('.labo03_slider_wrap .slides').slick({
    arrows: true,
    easing:'easeOutQuint',
    dots: true
  });
});
// slider
$(function () {
  var slider = '.js-tab-slideArea';
  $('.js-tab-slideArea').slick({
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    initialSlide: 0,
    swipe: false,
    adaptiveHeight: false,
    fade: true
  });
  $('.js-tabBox_slidePic01').slick({
    arrows: true,
    easing:'easeOutQuint',
    dots: false
  });
  $('.js-tabBox_slidePic02').slick({
    arrows: true,
    easing:'easeOutQuint',
    dots: false
  });
  $('.js-tabBox_slidePic03').slick({
    arrows: true,
    easing:'easeOutQuint',
    dots: false
  });
});
//popup
$(function () {
  var v1 = document.getElementById("video01");
  var v2 = document.getElementById("video02");
  var v3 = document.getElementById("video03");
  $('a[href*="youtube.com/watch"]').magnificPopup({
    type: 'iframe',
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
        }
      }
    },
    mainClass: 'mfp-fade',
    preloader: false,
    fixedContentPos: false,
    callbacks: {
      open: function() {
        v1.pause();
        v2.pause();
        v3.pause();
      },
      close: function() {
        v1.play();
        v2.play();
        v3.play();
      }
      // e.t.c.
    }
  });
});

  setRandomClass1();
  setRandomClass2();
  setRandomClass3();
  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    setInterval(function () {
        setRandomClass1();
        setRandomClass2();
        setRandomClass3();
    }, 800);
  } else{
    setInterval(function () {
        setRandomClass1();
        setRandomClass2();
        setRandomClass3();
    }, 1500);
  }
  

  function setRandomClass1() {
      var ul = $(".js-gumi.bg-left");
      var items = ul.find(".bg");
      var number = items.length;
      var random = Math.floor((Math.random() * number));
      items.removeClass("on");
      items.eq(random).addClass("on");
  }
  function setRandomClass2() {
      var ul = $(".js-gumi.bg-right");
      var items = ul.find(".bg");
      var number = items.length;
      var random = Math.floor((Math.random() * number));
      items.removeClass("on");
      items.eq(random).addClass("on");
  }
  function setRandomClass3() {
      var ul = $("#bannerList .js-gumi");
      var items = ul.find(".bg");
      var number = items.length;
      var random = Math.floor((Math.random() * number));
      items.removeClass("on");
      items.eq(random).addClass("on");
  }

$(function () {
  $(window).on('load scroll', function () {
    var winH = $(window).height();
    var scroll = $(window).scrollTop();
    var bottom = winH - (scroll * 0.2)
    if (bottom < 100) {
      $('.fixed-cartBtn').css({
        bottom: 100 + "px"
      });
    } else {
      $('.fixed-cartBtn').css({
        bottom: bottom + "px"
      });
    }
  });
});

$(window).on('load',function(){
  $("body").addClass("loaded");
});
