jQuery.noConflict();
(function($) {
	$(function() {
		//accordion
		$(".toggle").on('click', function() {
			if ($("+.child", this).css("display") == "none") {
				$(this).addClass("active-submenu");
				$(this).removeClass("none-submenu");
				$("+.child", this).slideDown(200);
			} else {
				$(this).removeClass("active-submenu");
				$(this).addClass("none-submenu");
				$("+.child", this).slideUp(200);
			}
		});
		
	});
})(jQuery);


