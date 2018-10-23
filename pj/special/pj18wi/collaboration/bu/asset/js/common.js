// ***********************************************
// headerJS
// ***********************************************
// openMenu
$(function(){
	$(".navBtn").on("click", function() {
		$("#grobalNav").toggleClass('active');
	});
});

// ***********************************************
// smoothScroll
// ***********************************************
// general
$(function(){
	 $('a[href^="#"]').on('click',function() {
			var speed = 400;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			
			return false;
		 
	 });
});

$(function(){
  $(window).on('load resize',function(){
    var mH = $('#grobalNav').innerHeight();
    var wH = $(window).height();
    if(mH > wH){
    	// div#examplに高さを加える
    	$('#grobalNav ul').css('height',wH - 150 +'px'); 
    } else{
      $('#grobalNav ul').css('height','auto'); 
    }
  });
});