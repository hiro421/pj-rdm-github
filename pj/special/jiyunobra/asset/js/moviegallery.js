// ***********************************************
// voice JS
// ***********************************************

// youtube
$(function(){
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
});