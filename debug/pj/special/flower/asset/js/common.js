//scrollreveal
window.sr = ScrollReveal({ reset: false ,mobile: true, viewFactor:0.2});
sr.reveal( '.fade01', { origin: 'bottom' , distance: '0', duration: 1300 , scale: 1, delay :200 ,opacity: 0,});
sr.reveal( '.fade02', { origin: 'bottom' , distance: '0', duration: 1800 , scale: 1, delay :200 ,opacity: 0,});
sr.reveal( '.fade03', { origin: 'bottom' , distance: '0', duration: 2000 , scale: 1, delay :300 ,opacity: 0,});
sr.reveal( '.fade04', { origin: 'bottom' , distance: '0', duration: 2300 , scale: 1, delay :400 ,opacity: 0,});
sr.reveal( '.slide01', { origin: 'bottom' , distance: '10%', duration: 1300 , scale: 1, delay :100 ,opacity: 0,});
sr.reveal( '.slide02', { origin: 'bottom' , distance: '20%', duration: 1800 , scale: 1, delay :200 ,opacity: 0,});
sr.reveal( '.slide03', { origin: 'bottom' , distance: '30%', duration: 2000 , scale: 1, delay :300 ,opacity: 0,});
sr.reveal( '.slide04', { origin: 'bottom' , distance: '30%', duration: 2300 , scale: 1, delay :400 ,opacity: 0,});

$(function(){
    //slider
    $('.slider').slick({
        arrows:false,
        dots:true,
        fade:true
    });

    //scroll bar
    $(".scrollBar").mCustomScrollbar({
        scrollInertia: 0
    });

    // smoothScroll
	 $('a[href^="#"]').on('click',function() {
			var speed = 800;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			
			return false;
		 
	 });
});

$(window).on('load',function(){
    $('#flowerArea').addClass("loaded");
    setTimeout(function(){
      $('.main_txt').addClass("loaded");
    },1000);
});