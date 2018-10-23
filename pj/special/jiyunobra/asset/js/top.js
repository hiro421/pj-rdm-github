// ***********************************************
// TOP JS
// ***********************************************
$(function(){
	$('.fadeVoice').on('scroll', function(){
		var elmHeight = $(this).outerHeight()*.9;
		console.log(elmHeight);
		$(this).find('ul').find('li').each(function(){
			var elmTop = $(this).position().top;
			if(elmTop < elmHeight && elmTop > 0 ){
				$(this).addClass('active');
			} else{
				$(this).removeClass('active');
			}
		});
	});
	$('.fadeVoice').scroll();
  setTimeout(function(){
        $("body").addClass("loaded");
    },1000);
});

//$(window).on('load',function(){
//    $("body").addClass("loaded");
//});

//var ps = new PerfectScrollbar('.topBlock07 .box');

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
					src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
				}
			}
		}
	});
  
  var video = $('#videoTop');
  video.on('ended', function () {
    $(this).animate({
      'opacity': 0,
      'z-index': -1
    });
    $(".keyMovie_movie").addClass("end");
  });
  
});
