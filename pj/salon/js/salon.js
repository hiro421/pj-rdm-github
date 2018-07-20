var currentWidth = window.innerWidth || document.documentElement.clientWidth;
var swichWidth = 767;
var myWidthLoad = jQuery(window).width();

jQuery(function() {

    //searchaco
	//jQuery( '.store .acoCont:not(:first)' ).hide();
	jQuery( '.store .trigger' ).addClass("active-submenu");
	jQuery(".search .acoCont").css("display", "none");
    if (currentWidth > swichWidth) {
        jQuery(".search .acoCont").css("display", "block");
    } else {
        jQuery(".search .acoCont").css("display", "none");
    }
    jQuery(window).resize(function() {
        var currentWidth = window.innerWidth || document.documentElement.clientWidth;
        var myWidth = $(window).width();
        if (myWidthLoad != myWidth) {
            if (currentWidth <= swichWidth) {
				jQuery(".search .trigger").removeClass("active-submenu");
                jQuery(".search .acoCont").css("display", "none");
            } else {
                jQuery(".search .acoCont").css("display", "block");
            }
        }
    });
	
    //aco
    var _touchStart = ('ontouchstart' in document) ? 'touchstart' : 'click';
    jQuery(".trigger").on('click', function() {
        if (jQuery("+.acoCont", this).css("display") == "none") {
            jQuery(this).addClass("active-submenu");
            jQuery(this).removeClass("none-submenu");
            jQuery("+.acoCont", this).slideDown(200);
        } else {
            jQuery(this).removeClass("active-submenu");
            jQuery(this).addClass("none-submenu");
            jQuery("+.acoCont", this).slideUp(200);
        }
    });

    //slider
    jQuery('.topHeadBlock .slides').slick({
      arrows: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      appendArrows: $('.topHeadBlock__slide__nav'),
      appendDots: $('.topHeadBlock__slide__nav'),
      easing: "easeOutExpo"
    });

    var owl1 = jQuery(".checkedItemArea .slides");
    owl1.owlCarousel({
        items: 6,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [979, 6],
        itemsTablet: [768, 4],
        itemsTabletSmall: false,
        itemsMobile: [479, 4],
        navigation: true,
        pagination: false,
        responsiveBaseWidth: ".checkedItemArea .owl-carousel"
    });

    var owl2 = jQuery(".rankingArea .slides");
    owl2.owlCarousel({
        items: 5,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 5],
        itemsTablet: [768, 3],
        itemsTabletSmall: false,
        itemsMobile: [479, 3],
        navigation: true,
        pagination: false,
        responsiveBaseWidth: ".rankingArea .owl-carousel"
    });

    var owl3 = jQuery(".storeSec .slider .slides");
    owl3.owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
  
    var owl4 = jQuery(".recommendArea .slides");
    owl4.owlCarousel({
        items: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 4],
        itemsTablet: [768, 3],
        itemsTabletSmall: false,
        itemsMobile: [479, 3],
        navigation: true,
        pagination: false,
        responsiveBaseWidth: ".recommendArea .owl-carousel"
    });

    //gnavi	 
    jQuery('.menuBtn').on('click', function() {
        if (jQuery('#gnavi').css('display') == 'block') {
            jQuery('#gnavi').fadeOut();
        } else {
            jQuery('#gnavi').fadeIn();
        }
    });
    jQuery('.closeBtn,.gnaviInner').click(function() {
        jQuery('#gnavi').fadeOut();
    });

    //select
    var custom_selectbox = function(select, obj) {
        var set_selectbox = function() {
            var value = jQuery(this).find('option:selected').html();
            jQuery(select).find(obj).find('span').html(value);
        }
        jQuery(select).find('select').each(set_selectbox).on('change', set_selectbox);
    }
    custom_selectbox('.p01', '.i01');
    custom_selectbox('.p02', '.i02');
    custom_selectbox('.p03', '.i03');
    custom_selectbox('.p04', '.i04');
    custom_selectbox('.p05', '.i05');
    custom_selectbox('.p06', '.i06');
    custom_selectbox('.p07', '.i07');
    custom_selectbox('.p08', '.i08');


    //pagetop
    jQuery("#back-top").css("display", "none");
    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() > 400) {
            jQuery("#back-top").fadeIn(200);
        } else {
            jQuery("#back-top").fadeOut(200);
        }
    });
    jQuery('#back-top').click(function() {
        jQuery('html, body').stop().animate({
            scrollTop: 0
        }, 500, 'easeOutCubic');
    });



    //scroll
    jQuery('a.anchor[href^=#]').on('click', function() {
        var speed = 400;
        var href = jQuery(this).attr("href");
        var target = jQuery(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        jQuery('body,html').animate({
            scrollTop: position
        }, speed, 'easeOutExpo');
        return false;
    });

    //height
    (function(jQuery) {
        jQuery.fn.tile = function(columns) {
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
                tiles[c] = jQuery(this);
                h = tiles[c].height();
                if (c == 0 || h > max) max = h;
                if (i == last || c == columns - 1) jQuery.each(tiles, function() {
                    this.height(max);
                });
            });
        };
    })(jQuery);
    jQuery('.thumbArea .item .itemTitle').tile(4);

    if (navigator.userAgent.indexOf('Android') > 0) {
        jQuery(".openmap").each(function() {
            url = jQuery(this).attr("href").replace("maps:", "http://maps.google.com?");
            jQuery(this).attr("href", url);
        });
    }

    jQuery('#topBtnAreaSub ul li').on('click', function() {
        jQuery(this).children("img.def").css({
            opacity: "0"
        });
        jQuery(this).children("a.over").css({
            display: "block"
        });
        setTimeout(function() {
            jQuery(this).children("img.def").css({
                display: "none"
            });
        }, 500);
    });

    jQuery('.style01').customSelect();
  
    jQuery('.popup-youtube').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });

});


jQuery(window).load(function() {
    jQuery('.rankingArea .item b').tile();
});
jQuery(window).load(function() {
    if (currentWidth > swichWidth) {
        jQuery('.rankingListArea ul li.row1 .text').tile(3);
        jQuery('.rankingListArea ul li.row2 .text').tile(3);
        jQuery('.rankingListArea ul li.row3 .text').tile(4);
        jQuery('.rankingListArea ul li.row1 .name').tile(3);
        jQuery('.rankingListArea ul li.row2 .name').tile(3);
        jQuery('.rankingListArea ul li.row3 .name').tile(4);
        jQuery('.pickUpArea ul li').tile(2);
		jQuery('#itemsList ul li .name').tile(3);
		jQuery('.columnListArea ul li p').tile(4);
    } else {
        jQuery('.rankingListArea ul li').removeClass(".row1");
        jQuery('.rankingListArea ul li').removeClass(".row2");
        jQuery('.rankingListArea ul li').removeClass(".row3");
        jQuery('.rankingListArea ul li .text').tile(2);
        jQuery('.rankingListArea ul li .name').tile(2);
		jQuery('#itemsList ul li .name').tile(2);
		jQuery('.columnListArea ul li p').tile(2);
    }
});

jQuery(window).resize(function() {
    var currentWidth = window.innerWidth || document.documentElement.clientWidth;
    if (currentWidth <= swichWidth) {
        jQuery('.rankingListArea ul li').removeClass(".row1");
        jQuery('.rankingListArea ul li').removeClass(".row2");
        jQuery('.rankingListArea ul li').removeClass(".row3");
        jQuery('.rankingListArea ul li .text').tile(2);
        jQuery('.rankingListArea ul li .name').tile(2);
		jQuery('#itemsList ul li .name').tile(2);
		jQuery('.columnListArea ul li p').tile(2);
    } else {
		jQuery('.rankingListArea ul li.row1 .text').tile(3);
        jQuery('.rankingListArea ul li.row2 .text').tile(3);
        jQuery('.rankingListArea ul li.row3 .text').tile(4);
        jQuery('.rankingListArea ul li.row1 .name').tile(3);
        jQuery('.rankingListArea ul li.row2 .name').tile(3);
        jQuery('.rankingListArea ul li.row3 .name').tile(4);
        jQuery('.pickUpArea ul li').tile(2);
		jQuery('#itemsList ul li .name').tile(3);
		jQuery('.columnListArea ul li p').tile(4);
    }
});

//include
function gNavi(){
    var html = "";
	html += '<div id="gnavi">';
	html += '	<div class="gnaviInner">';
	html += '		<div class="wrap">';
	html += '			<div class="head">';
	html += '				<p class="title"><img src="img/common/gnavi_title_menu.png" alt="MENU"/></p>';
	html += '				<div class="closeBtn"><img src="img/common/gnavi_close_btn_head.png" alt="close"/></div>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<ul>';
	html += '					<li><a href="https://www.peachjohn.co.jp/member/login/">ログイン／会員登録</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/shopping/bag/">カート</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/member/wishlist/">ほしいものリスト</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/?cliplist&salon">お気に入り</a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<p class="stitle"><img src="img/common/gnavi_title_category.png" alt="CATEGORY"/></p>';
	html += '				<ul>';
	html += '					<li><a href="/pjitem/list/?_al=sa_all&count=150&_iid=0&outlet=include&sort=6">全てのアイテム</a></li>';
	html += '					<li><a href="/pjitem/list/?_al=sa_bra&count=150&_iid=0&outlet=include&sort=6">ブラジャー</a></li>';
	html += '					<li><a href="/pjitem/list/?_al=sa_lin&count=150&_iid=0&outlet=include&sort=6">ランジェリー</a></li>';
	html += '					<li><a href="/pjitem/list/?_al=sa_room&count=150&_iid=0&outlet=include&sort=6">ルームウェア</a></li>';
	html += '					<li><a href="/pjitem/list/?_al=sa_oth&count=150&_iid=0&outlet=include&sort=6">グッズ</a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<p class="stitle"><img src="img/common/gnavi_title_special.png" alt="SPECIAL"/></p>';
	html += '				<ul>';
  html += '					<li><a href="/pj/salon/ranking/">ランキング</a></li>';
  html += '					<li><a href="/pj/salon/column/">すべてのアイテム</a></li>';
  html += '					<li><a href="/pj/salon/pickup/">口コミ人気アイテム</a></li>';
  html += '					<li><a href="/pj/salon/column/">コラム</a></li>';
	html += '					<li><a href="http://peachjohn.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://peachjohn.scene7.com/s7/emailFriend&serverUrl=http://peachjohn.scene7.com/is/image/&config=Scene7SharedAssets/Universal_HTML5_eCatalog&contenturl=http://peachjohn.scene7.com/skins/&config2=companypreset&asset=PeachJohn/SLvol22&direction=left" target="_blank">LOOKBOOK</a></li>';
  html += '					<li><a href="https://www.youtube.com/watch?v=Mg0pt533lXU" class="popup-youtube">MOVIE</a></li>';
	html += '					<li><a href="/pj/salon/store/">ストア</a></li>';
	html += '					<li><a href="/pj/salon/about/">SALON by PEACH JOHNについて</a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box bannerArea">';
	html += '				<ul>';
	html += '					<li><a href="http://www.peachjohn.co.jp/"><img src="img/common/gnavi_foot_banner01.png" alt="PEACH JOHN"/></a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/pj/beauty/"><img src="img/common/gnavi_foot_banner02.png" alt="PEACH JOHN Beauty"/></a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/pj/yummymart/"><img src="img/common/gnavi_foot_banner03.png" alt="YUMMY MART"/></a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<ul class="fnavi clearfix">';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/faq/">お問い合わせ</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/info/about/">会社概要</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/rule/privacy_policy.html">プライバシーポリシー</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/info/browser/">推奨環境</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/rule/">ご利用ガイド</a></li>';
	html += '				</ul>';
	html += '				<div class="closeBtn foot"><a href="javascript:void(0)" onClick="setmenu(false);"><img src="img/common/gnavi_close_btn_bottom.png" alt=""/></a></div>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
    document.write(html);
}