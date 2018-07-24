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
});

$(window).on('load',function(){
    $("body").addClass("loaded");
});

var ps = new PerfectScrollbar('.topBlock07 .box');
