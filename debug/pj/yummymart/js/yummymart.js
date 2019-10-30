jQuery.noConflict();
(function($) {
	$(function() {
		//slider
		//$('#yummyMainVisual').flexslider({
		//	animation: "slide",
		//	controlNav: true
		//});

		//function demo01() {
//    $(this).next().slideToggle(300);
//}
// 
//$(".toggle").click(demo01);
//$(".toggle img[src*='_off']").addClass("current");
//    $(".toggle img").click(function(){
//        if ($(this).attr("src")){
//            $(this).attr("src",$(this).attr("src").replace("_off.", "_cur."));
//        }
//    },function(){
//        if ($(this).attr("src") && !$(this).hasClass("current") ){
//            $(this).attr("src",$(this).attr("src").replace("_cur.", "_off."));
//        }
//    });

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

		$("#yummyRanking .trigger").on('click', function() {
			if ($("+.acoCont", this).css("display") == "none" && $("#yummyAbout .acoCont").css("display") == "block" ) {
				$("#yummyAbout .acoCont").css("display","none");
				$("#yummyAbout .trigger").removeClass("active-submenu");
				$("#yummyAbout .trigger").addClass("none-submenu");
				$("#yummyAbout .trigger").children("img").attr("src", $("#yummyAbout .trigger").children("img").attr("src").replace("_on.", "_off."));
				$(".wrap03").animate({"marginTop":"0"});
			} else if ($("+.acoCont", this).css("display") == "none" && $("#yummyAbout .acoCont").css("display") == "none" ) {
				$(".wrap03").animate({"marginTop":"0"});
			} else if ($("+.acoCont", this).css("display") == "block" && $("#yummyAbout .acoCont").css("display") == "block" ) {
				$(".wrap03").css({"marginTop":"1140px"});
			} else if ($("+.acoCont", this).css("display") == "block" && $("#yummyAbout .acoCont").css("display") == "none" ) {
				$(".wrap03").animate({"marginTop":"0"});
			}
		});
		
		$("#yummyAbout .trigger").on('click', function() {
			if ($("+.acoCont", this).css("display") == "none" && $("#yummyRanking .acoCont").css("display") == "block" ) {
				$("#yummyRanking .acoCont").css("display","none");
				$("#yummyRanking .trigger").removeClass("active-submenu");
				$("#yummyRanking .trigger").addClass("none-submenu");
				$("#yummyRanking .trigger").children("img").attr("src", $("#yummyRanking .trigger").children("img").attr("src").replace("_on.", "_off."));
				$(".wrap03").animate({"marginTop":"1140px"});
			} if ($("+.acoCont", this).css("display") == "none" && $("#yummyRanking .acoCont").css("display") == "none" ) {
				$(".wrap03").animate({"marginTop":"1140px"});
			} if ($("+.acoCont", this).css("display") == "block" && $("#yummyRanking .acoCont").css("display") == "block" ) {
				$(".wrap03").animate({"marginTop":"0"});
			} if ($("+.acoCont", this).css("display") == "block" && $("#yummyRanking .acoCont").css("display") == "none" ) {
				$(".wrap03").animate({"marginTop":"0"});
			}
		});
		
		//aco
		$("#yummyAbout .acoCont").css("display", "none");
		$("#yummyRanking .acoCont").css("display", "none");
		$(".trigger").on('click', function() {
			if ($("+.acoCont", this).css("display") == "none") {
				$(this).addClass("active-submenu");
				$(this).removeClass("none-submenu");
				$("+.acoCont", this).slideDown(200);
				$(this).children("img").attr("src", $(this).children("img").attr("src").replace("_off.", "_on."));
			} else {
				$(this).removeClass("active-submenu");
				$(this).addClass("none-submenu");
				$("+.acoCont", this).slideUp(200);
				$(this).children("img").attr("src", $(this).children("img").attr("src").replace("_on.", "_off."));
			}
		});
		
		//scroll
		$('a.anchor[href^=#]').on('click', function() {
			var speed = 400;
			var href = $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$('body,html').animate({
				scrollTop: position
			}, speed, 'easeOutExpo');
			return false;
		});
		
		//menu
		var mySlidebars = new $.slidebars();
		$('#menuBtn').on('click', function() {
			mySlidebars.toggle('right');
		});
		$('#yummyGnavi a.anchor').on('click', function() {
			mySlidebars.toggle('right');
		});
		
		//insta
		var feed = new Instafeed({
			get: 'user',
			userId: 956652201,
			accessToken: '956652201.66417ae.7b323e15e8954376b7e00f7af5539672',
			clientId: '66417aebf61a4d598cd13f9e2fa379a5',
			sortBy: 'random',
			resolution: 'standard_resolution',
			//並び順をランダムに
			links: true,
			//画像リンク取得
			limit: 5,
			//取得する画像数を設定
			template: '<li><a href="{{link}}" target="_blank"><img src="{{image}}"/></a></li>'
		});
		feed.run();
		//height
		;
		(function($) {
			$.fn.tile = function(columns) {
				var tiles, max, c, h, last = this.length - 1,
					s;
				if (!columns) columns = this.length;
				this.each(function() {
					s = this.style;
					if (s.removeProperty) s.removeProperty("height");
					if (s.removeAttribute) s.removeAttribute("height");
				});
				return this.each(function(i) {
					c = i % columns;
					if (c == 0) tiles = [];
					tiles[c] = $(this);
					h = tiles[c].height();
					if (c == 0 || h > max) max = h;
					if (i == last || c == columns - 1) $.each(tiles, function() {
						this.height(max);
					});
				});
			};
		})(jQuery);
		$('.thumbArea .item .itemTitle').tile(4);
		
		$('img.rollover').hover(function(){
			$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
				}, function(){
				   if (!$(this).hasClass('current')) {
				   $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
			}
		});
	});
	$(window).load(function () {
			$('img.rollover').hover(function(){
				$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
					}, function(){
					   if (!$(this).hasClass('current')) {
					   $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
				}
			});
		});
})(jQuery);