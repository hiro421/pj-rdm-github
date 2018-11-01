// JavaScript Document
// -------------------------------------------------------------------
// Parallax - main visual
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	var box = $('.mainVisual > .inner');
	var textArea = $('.textArea', box);
	var timer = -1;
	
	/*
		アニメーション開始
	*/
	Ts.onFontLoaded(function(){
		//box.addClass('anime');
		
		getParams();
		timer = setTimeout(function(){
			timer = null;
			scrollFnc();
		}, 4600);
	});
  
  $(window).on('load',function(){
    $('.mainVisual > .inner').addClass("anime");
  });
  
	/*
		各種値取得
	*/
	var textAreaH;
	var getParams = function(){
		textAreaH = textArea.outerHeight(false);
	};

	/*
		スクロール時処理
	*/
	var scrollFnc = function(){
		if(timer !== null){
			return;
		}
		
		var scroll = $(window).scrollTop();
		if(scroll < 0){
			return;
		}

		var percent = Math.abs(scroll) / textAreaH;
		scroll *= percent * -1 * 0.3;
		textArea.css('transform', 'translateY(' + scroll + '%)');
	};

	/*
		イベント登録、実行
	*/
	$(window).on('resize', function(){
		getParams();
		scrollFnc();
	});
	$(window).on('scroll', scrollFnc);
});

// -------------------------------------------------------------------
// Slider - line up
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	$('.anneBlock02 .slider').slick({
		centerMode: true,
		centerPadding: '0px',
		speed: 500,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					speed: 500,
					variableWidth: false
				}
			}
		]
	});
});

// -------------------------------------------------------------------
// Slider - item informations
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	// items
	$('.anneBlock04 .slider02').slick({
		arrows: false,
		dots: true,
		fade: true
	});
	
	// popup
	$('.popup').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'3',
			'opacity':'1'
		});
		$('.modalBlock01 .closeWrap').css('display','block');
		$('.modalBlock01 .closeBtn').css('display','block');
	});
	$('.closeWrap').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'-10',
			'opacity':'0'
		});
		$(this).css('display','none');
	});
	$('.closeBtn').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'-10',
			'opacity':'0'
		});
		$(this).css('display','none');
	});

	$('.modalBlock01 .slider').slick({
		autoplay: true,
		autoplaySpeed: 2000
	});
});

// -------------------------------------------------------------------
// Movie popup
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	$('.popup-iframe').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 200,
		preloader: false,
		fixedContentPos: false,
		iframe: {
			patterns: {
				youtube: {
					index: 'youtube.com', 
					id: 'v=', 
					src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1&iv_load_policy=1'
				}
			}
		}
	});
});

// -------------------------------------------------------------------
// Movie popup
// -------------------------------------------------------------------
// carousel
$(function() {
	
  var video = $('#videoTop');
  video.on('ended', function () {
    $(this).animate({
      'opacity': 0,
      'z-index': -1
    });
    $(".keyMovie_movie").addClass("end");
  });
	
});