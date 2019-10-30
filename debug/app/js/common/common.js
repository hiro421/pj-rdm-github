//(function($) {
//    $(function() {
//        initPage();
//    });
//    initPage = function() {
//        listControl();
//        readControl();
//    }
//})(jQuery);
//(function($) {
//    listControl = function() {
//        var initialized = false;
//
//        function listControlClear() {
//            $('.viewBtn a').each(function() {
//                $(this).removeClass('active');
//            });
//        }
//
//        function listControlInit() {
//            if (!initialized) {
//                // read cookie
//                var viewMode = $.cookie('SC_LIST_VIEW_MODE');
//                switch (viewMode) {
//                    case 'view1':
//                    case 'view2':
//                        break;
//                    default:
//                        viewMode = 'view1';
//                        break;
//                }
//                // select view mode
//                $('.viewBtn a.' + viewMode).addClass('active');
//                // flag set
//                initialized = true;
//            }
//
//            if ($('.viewBtn a.view1').hasClass('active')) {
//                $('#itemsList').addClass('view-mode1');
//                $('#itemsList').removeClass('view-mode2');
//            };
//            if ($('.viewBtn a.view2').hasClass('active')) {
//                $('#itemsList').addClass('view-mode2');
//                $('#itemsList').removeClass('view-mode1');
//            };
//        };
//
//        // attach
//        $('.viewBtn a').on('click', function() {
//            if ($(this).hasClass('active')) {
//                // do nothing
//                return false;
//            }
//            // get view mode
//            listControlClear();
//            var viewMode = $(this).attr('class').replace(/.*(view\d).*/, '$1');
//            $('.' + viewMode).addClass('active');
//            listControlInit();
//            // save view mode to cookie
//            $.cookie('SC_LIST_VIEW_MODE', viewMode, {
//                expires: 7
//            });
//            return false;
//        });
//        // call init
//        setTimeout(listControlInit, 0);
//        return true;
//    };
//
//    readControl = function() {
//        var initialized = false;
//
//        function readControlClear() {
//            $('.readBtn a').each(function() {
//                $(this).removeClass('active');
//            });
//        };
//
//        function readControlInit() {
//            if (!initialized) {
//                // read cookie
//                var viewReadMode = $.cookie('SC_LIST_VIEW_READ_MODE');
//                switch (viewReadMode) {
//                    case 'viewOn':
//                    case 'viewff':
//                        break;
//                    default:
//                        viewReadMode = 'viewOn';
//                        break;
//                }
//                // select view mode
//                $('.readBtn a.' + viewReadMode).addClass('active');
//                // flag set
//                initialized = true;
//            }
//
//            if ($('.readBtn a.viewOn').hasClass('active')) {
//                $('#itemsList').addClass('view-readOn');
//                $('#itemsList').removeClass('view-readOff');
//            };
//            if ($('.readBtn a.viewOff').hasClass('active')) {
//                $('#itemsList').addClass('view-readOff');
//                $('#itemsList').removeClass('view-readOn');
//            };
//        };
//
//        // attach
//        $('.readBtn a').on('click', function() {
//            if ($(this).hasClass('active')) {
//                // do nothing
//                return false;
//            }
//            // get view mode
//            readControlClear();
//            var viewReadMode = $(this).attr('class').replace(/.*(view(?:On|Off)).*/, '$1');
//            $('.' + viewReadMode).addClass('active');
//            readControlInit();
//            // save view mode to cookie
//            $.cookie('SC_LIST_VIEW_READ_MODE', viewReadMode, {
//                expires: 7
//            });
//            return false;
//        });
//        // call init
//        setTimeout(readControlInit, 0);
//        return true;
//    };
//
//})(jQuery);

(function($) {
    $(function() {
//        //top
//        $('.mainPicArea .slides').slick({
//            arrows: true,
//            dots: true,
//            autoplay: true,
//            autoplaySpeed: 4000,
//            easing: "easeOutExpo"
//        });
//        $('.mainBannarArea .slides').slick({
//            arrows: true,
//            dots: true,
//            autoplay: true,
//            autoplaySpeed: 4000,
//            easing: "easeOutExpo"
//        });
        /* Ph.3 よりスライドの内容を動的に読み込むようになったので、ここで初期化はしない
        $('.carouselArea .mainSlides').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            easing: "easeOutExpo",
            asNavFor: '.carouselArea .menuSlides'
        });
        $('.carouselArea .menuSlides').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.carouselArea .mainSlides',
            dots: false,
            arrows: true,
            centerMode: true,
            variableWidth: true,
            easing: "easeOutExpo",
            focusOnSelect: true
        });
        */
//        $('.topRecommendItems .slides').slick({
//            arrows: true,
//            dots: false,
//            easing: "easeOutExpo"
//        });
        
//        //modal stock
//        $('.popupStock').magnificPopup({
//            type: 'inline',
//            alignTop: true,
//            mainClass: 'mfp-fade',
//            removalDelay: 160,
//            preloader: false,
//            fixedContentPos: false,
//            overflowY: 'scroll' 
//        });
//        $(document).on('click', '.modalStock .closeBtn', function (e) { 
//            e.preventDefault();
//            $.magnificPopup.close();
//          });
//        $(".modalStock .storeList table .ico").on('click', function() {
//            $(this).toggleClass("active");
//         });
         
        //aco
        if (!CommonUtils.isMobile()) {
            $( '.categories .categories .categories .trigger' ).on( 'click', function( e ) {
                e.stopImmediatePropagation();
            } );
            $( '.categories.pickUp .categories .trigger' ).on( 'click', function( e ) {
                e.stopImmediatePropagation();
            } );
        }
        $(".trigger").on('click.accordion', function() {
            //if ($("+.acoCont", this).is(":hidden")) {
            if ($(this).next().is(":visible")) {
                $(this).removeClass("active-submenu");
                $(this).addClass("none-submenu");
                $("+.acoCont", this).slideUp(200);
            } else {
                $(this).addClass("active-submenu");
                $(this).removeClass("none-submenu");
                $("+.acoCont", this).slideDown(200);
            }
//            if ($("+.acoCont", this).css("display") === "none") {
//                $(this).addClass("active-submenu");
//                $(this).removeClass("none-submenu");
//                $("+.acoCont", this).velocity("slideDown", {
//                    duration: 200
//                });
//            } else {
//                $(this).removeClass("active-submenu");
//                $(this).addClass("none-submenu");
//                $("+.acoCont", this).velocity("slideUp", {
//                    duration: 200
//                });
//            }
        });
        
//        $(".acoCloseBtn").on('click', function() {
//            $(this).parent(".acoCont").velocity("slideUp", {
//                  duration: 200
//            });
//            $(this).parents().prev(".trigger").removeClass("active-submenu");
//            $(this).parents().prev(".trigger").addClass("none-submenu");
//        });

        //pagetop
        $("#back-top, #back-filter").css("display", "none");
        $(window).scroll(function() {
            if ($(window).scrollTop() > 400) {
                $("#back-top, #back-filter").fadeIn(200);
            } else {
                $("#back-top, #back-filter").fadeOut(200);
            }
        });
//        $('#back-filter').on('click', function() {
//            $('html, body').stop().animate({
//                scrollTop: $('#filter').offset().top - 60
//            }, 500, 'easeOutCubic');
//        });
        $('#back-top').on('click', function() {
            $('html, body').stop().animate({
                scrollTop: 0
            }, 500, 'easeOutCubic');
        });
        
//        //pagetop
//        var _width = $(window).width();
//        if (_width <= 768) {
//            $("#footFixedBtn").css("display", "none");
//            $(window).scroll(function() {
//                if ($(window).scrollTop() > 400) {
//                    $("#footFixedBtn").fadeIn(200);
//                } else {
//                    $("#footFixedBtn").fadeOut(200);
//                }
//            });
//        } else{
//            $("#footFixedBtn").css("display", "none");
//        }

        //select
        $(".select select").selectOrDie();
//        //detail
//        $(".itemDetailContainer .selectArea .filterLabelCheck input[type=checkbox]").on('click', function() {
//            if ($(this).prop('checked')) {
//                $(".itemDetailContainer .selectArea .filterLabelCheck input[type=checkbox]").prop('checked', false);
//                $(this).prop('checked', true);
//            }
//        });
//        $(".itemDetailContainer .selectArea .selectCup .filterLabelCheck").on('click', function() {
//            $(".itemDetailContainer .selectArea .selectCup .filterLabelCheck").removeClass("active");
//            $(this).addClass("active");
//        });
//        $(".itemDetailContainer .selectArea .selectUnder .filterLabelCheck").on('click', function() {
//            $(".itemDetailContainer .selectArea .selectUnder .filterLabelCheck").removeClass("active");
//            $(this).addClass("active");
//        });


//        $('.itemDetailContainer #slider .slides').slick({
//            slidesToShow: 1,
//            slidesToScroll: 1,
//            arrows: true,
//            dots: true,
//            fade: false,
//            easing: "easeOutExpo",
//            asNavFor: '.itemDetailContainer #carousel .slides'
//        });
//        $('.itemDetailContainer #carousel .slides').slick({
//            asNavFor: '.itemDetailContainer #slider .slides',
//            dots: false,
//            arrows: false,
//            slidesToShow: 0,
//            easing: "easeOutExpo",
//            focusOnSelect: true
//        });
        

//        //quantity 
//        $('.selectQuantity .minus').on('click', function() {
//            minus(this.form.amount);
//        });
//        $('.selectQuantity .plus').on('click', function() {
//            plus(this.form.amount);
//        });

//        function plus(chk) {
//            chk.value++;
//            if (chk.value === 10) {
//                chk.value = 9;
//            }
//        }
//
//        function minus(chk) {
//            chk.value--;
//            if (chk.value === 0) {
//                chk.value = 1;
//            }
//        }

        //tab
//        $('.reviewVoiceArea .tab > li').on('click', function() {
//            var index = $('.reviewVoiceArea .tab li').index(this);
//            $('.reviewVoiceArea .content > li').css('display', 'none');
//            $('.reviewVoiceArea .content > li').eq(index).css('display', 'block');
//            $('.reviewVoiceArea .tab > li').removeClass('active');
//            $(this).addClass('active');
//        });

        //slider
//        var coordinateItemSlider = $(".coordinateItems .slides");
//        coordinateItemSlider.owlCarousel({
//            items: 3,
//            itemsDesktop: [1199, 3],
//            itemsDesktopSmall: [979, 3],
//            itemsTablet: [768, 3],
//            itemsTabletSmall: false,
//            itemsMobile: [479, 2],
//            navigation: true,
//            pagination: false,
//            responsiveBaseWidth: ".coordinateItems .owl-carousel"
//        });
//        var recommendItemSlider = $(".recommendItems .slides");
//        recommendItemSlider.owlCarousel({
//            items: 4,
//            itemsDesktop: [1199, 4],
//            itemsDesktopSmall: [979, 4],
//            itemsTablet: [768, 4],
//            itemsTabletSmall: false,
//            itemsMobile: [479, 2],
//            navigation: true,
//            pagination: false,
//            responsiveBaseWidth: ".recommendItems .owl-carousel"
//        });
//        var rankingItemSlider = $(".rankingItems .slides");
//        rankingItemSlider.owlCarousel({
//            items: 6,
//            itemsDesktop: [1199, 6],
//            itemsDesktopSmall: [979, 6],
//            itemsTablet: [768, 6],
//            itemsTabletSmall: false,
//            itemsMobile: [479, 3],
//            navigation: true,
//            pagination: false,
//            responsiveBaseWidth: ".rankingItems .owl-carousel"
//        });
        
        
//        $('.recommendItems .btnWrap a').tile();

        //search
//        $(".searchArea .filterLabelCheck input[type=checkbox]").on('change', function() {
//            $(this).parent().toggleClass("active");
//        });
//        $(".searchArea .filterLabelCheck").on('click', function() {
//            $(this).toggleClass("active");
//        });
//        $(".hideTable").hide();
//        
//        var headerHight = 50; //ヘッダの高さ
//        $('#footFixedBtn .nav02 a[href^=#]').click(function(){
//            var href= $(this).attr("href");
//            var target = $(href === "#" || href === "" ? 'html' : href);
//            var position = target.offset().top-headerHight; //ヘッダの高さ分位置をずらす
//            $("html, body").animate({scrollTop:position}, 550, "easeOutExpo");
//            return false;
//        });

        
//        //stars more
//        $(".costomerReview .detailBtn").on('click', function() {
//            $(this).toggleClass("active");
//            $(this).next().fadeToggle(200);
//            return false;
//        });

        //resize init
        $(window).on("load resize", initResize);
        function initResize() {
            var _width = $(window).width();
            if (_width <= 768) {
                  
                //gnavi
                $('.commonNavWrap01 .store,.commonNavWrap01 .service,.commonNavWrap01 .open').addClass("none-submenu");
                $('.commonNavWrap01 .store,.commonNavWrap01 .service,.commonNavWrap01 .open').removeClass("active-submenu");
                $('.commonNavWrap01 .store + .acoCont,.commonNavWrap01 .service + .acoCont,.commonNavWrap01 .open + .acoCont').css({"display":"none"});
//                //mypage
//                $('.myPageContainer .menuArea li a').tile();
                // change
//                $('.sortArea.top .itemCount').insertAfter('.sortArea.top');
//console.log($('.detailPic').length);
//console.log($('.topLayout01 .leftColumn').length);
//console.log($('.informationArea .titleWrap .linkTextBtn').length);
//console.log($('.pagenationArea.top .itemCount').length);
//console.log($('.itemDetailContainer .tags'));
//                $('.itemDetailContainer .picArea #carousel').insertAfter('.itemDetailContainer .selectArea .selectColor');
//                $('.itemDetailContainer .selectArea .headInfo .tags').insertBefore('.itemDetailContainer .selectArea .headInfo .catName');
//                $('.detailPic').insertBefore('.reviewVoiceArea');
//                $('.topLayout01 .leftColumn').insertAfter('.topContainer .mainPicArea');
//                $('.informationArea .titleWrap .linkTextBtn').insertAfter('.informationArea .titleWrap');
//                $('.pagenationArea.top .itemCount').insertAfter('.pagenationArea.top .pagenation');
//                $('.itemDetailContainer .tags').insertBefore('.itemDetailContainer .picArea');
//                $('.itemDetailList').insertAfter('.productDetail div .subText');
//                $('.reviewVoiceArea .content > li').removeAttr('style');
//                //color
//                var sliderImg = $('.itemDetailContainer #selectColor .slides li').length;
//                  if(sliderImg > 4){
//                    $('.itemDetailContainer #selectColor .slides').slick({
//                        slidesToShow: 5,
//                        slidesToScroll: 3,
//                        centerPadding: '40px',
//                        arrows: true,
//                        dots: false,
//                        fade: false,
//                        infinite: true,
//                        centerMode: false,
//                        easing: "easeOutExpo"
//                    });
//                  }
            } else {
//                  var wH = $(window).innerHeight();
//                  var wW = $(window).innerWidth();
//                  var divH = $(".add-tyo-cart").innerHeight(); 
//                  var divW = $(".add-tyo-cart").innerWidth(); 
//                  $("body").css("height", wH + "px");
//                  $(".add-tyo-cart").css("margin-top", "-" + divH / 2 + "px");
//                  $(".add-tyo-cart").css("margin-left", "-" + divW / 2 + "px");
                //gnavi
                $('.commonNavWrap01 .store,.commonNavWrap01 .service,.commonNavWrap01 .open').removeClass("none-submenu");
                $('.commonNavWrap01 .store,.commonNavWrap01 .service,.commonNavWrap01 .open').addClass("active-submenu");
                $('.commonNavWrap01 .store + .acoCont,.commonNavWrap01 .service + .acoCont,.commonNavWrap01 .open + .acoCont').css({"display":"block"});
                //mypage
//                $('.myPageContainer .menuArea li a').tile();
                // change
//                $('.itemDetailContainer .selectArea #carousel').insertAfter('.itemDetailContainer .picArea #slider');
//                $('.topContainer .leftColumn').insertBefore('.topLayout01 .rightColumn');
//                $('.informationArea .linkTextBtn').insertAfter('.informationArea .titleWrap h2');
//                $('.pagenationArea.top .pagenation').insertAfter('.pagenationArea.top .itemCount');
                //$('.itemDetailContainer #selectColor .slides').slick("unslick");
//                $('.itemDetailContainer .tags').insertBefore('.itemDetailContainer .selectArea .headInfo .itemName');
//                $('.itemDetailList').insertBefore('.reviewVoiceArea');
                //$('#footFixedBtn').css({"display":"block"});
            }
        } //init

        // sp only
//        var _ua = (function(u) {
//            return {
//                Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
//                Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
//            };
//        })(window.navigator.userAgent.toLowerCase());
        
        //if (_ua.Mobile || (Flamingo && Flamingo.dataUrl().indexOf('peachjohnpc') === -1)) {
        if (CommonUtils.isMobile()) {
			
			//drawer
			var mySlidebars = new $.slidebars();
			$.slidebars({
				siteClose: true,
				scrollLock: true
			});
            //fixed
            var winScroll;
            window.onscroll = function() {
                winScroll = window.pageYOffset;
            };
            var fixedBox = $("#header");
            var boxTop = 35;
            $(window).on('scroll', function() {
                if (winScroll >= boxTop && $(window).width() < 768) {
                    fixedBox.addClass("fixed");
                    fixedBox.css("margin-top", "-35px");
                    $("#wrapper").css("margin-top", "85px");
									if($("body").hasClass('salon')){
											fixedBox.removeClass("fixed");
											fixedBox.css("margin-top", "0");
											$("#wrapper").css("margin-top", "0");
									}
                } else {
                    fixedBox.removeClass("fixed");
                    fixedBox.css("margin-top", "0px");
                    $("#wrapper").css("margin-top", "0px");
                }
            });
            //sp gnavi disabled
            $('.commonNavWrap01 .categories .categories .categories > a.trigger,.commonNavWrap01 .categories.pickUp .categories .trigger').on("click", function() {
                return false;
            });
            
            if (!CommonUtils.isTabletPanel()) {
                $(".commonNavWrap01 > div > ul > li > ul > li > div > div > ul > li > a.trigger").on('click', function() {
                    $(this).off();
                    $("+.acoCont", this).off();
                });
            }
            
//            if ($(window).width() < 768) {
//                $('.itemSearchArea > b,#carousel > b,.productDetail > b').on('click', function() {
//                    if ($("+ul,+div", this).css("display") == "none") {
//                        $(this).addClass("active-submenu");
//                        $(this).removeClass("none-submenu");
//                        $("+ul,+div", this).velocity("slideDown", {
//                            duration: 200
//                        });
//                    } else {
//                        $(this).removeClass("active-submenu");
//                        $(this).addClass("none-submenu");
//                        $("+ul,+div", this).velocity("slideUp", {
//                            duration: 200
//                        });
//                    }
//                });
//            }
        
//            //sortSp 
//            var sortAreaSpSelect = $(".sortAreaSpSelect");
//            sortAreaSpSelect.hide();
//            $('.sortAreaSp b').on('click', function() {
//                if (sortAreaSpSelect.css("display") == "none") {
//                    $(this).addClass("active");
//                    $(this).velocity({
//                        width: "100%"
//                    }, {
//                        duration: 200,
//                        easing: 'easeOutExpo',
//                        complete: function() {
//                            sortAreaSpSelect.velocity("slideDown", {
//                                duration: 200
//                            });
//                        }
//                    });
//                } else {
//                    sortAreaSpSelect.velocity("slideUp", {
//                        duration: 200,
//                        complete: function() {
//                            $('.sortAreaSp b').velocity({
//                                width: "47%"
//                            }, {
//                                duration: 200,
//                                complete: function() {
//                                    $('.sortAreaSp b').removeClass("active");
//                                }
//                            });
//        
//                        }
//                    });
//                }
//            });
            
//            //reviewSp 
//            var reviewWrap = $(".costomerReview .wrap");
//            reviewWrap.hide();
//            $('.costomerReview b').on('click', function() {
//                if (reviewWrap.css("display") == "none") {
//                    $(this).addClass("active");
//                    $(this).velocity({
//                        width: "100%"
//                    }, {
//                        duration: 200,
//                        easing: 'easeOutExpo',
//                        complete: function() {
//                            reviewWrap.velocity("slideDown", {
//                                duration: 200
//                            });
//                        }
//                    });
//                } else {
//                    reviewWrap.velocity("slideUp", {
//                        duration: 200,
//                        complete: function() {
//                            $('.costomerReview b').velocity({
//                                width: "100%"
//                            }, {
//                                duration: 200,
//                                complete: function() {
//                                    $('.costomerReview b').removeClass("active");
//                                }
//                            });
//        
//                        }
//                    });
//                }
//            });
            
//            var staffVoiceWrap = $(".staffVoice .wrap");
//            staffVoiceWrap.hide();
//            $('.staffVoice b').on('click', function() {
//                if (staffVoiceWrap.css("display") == "none") {
//                    $(this).addClass("active");
//                    $(this).velocity({
//                        width: "100%"
//                    }, {
//                        duration: 200,
//                        easing: 'easeOutExpo',
//                        complete: function() {
//                            staffVoiceWrap.velocity("slideDown", {
//                                duration: 200
//                            });
//                        }
//                    });
//                } else {
//                    staffVoiceWrap.velocity("slideUp", {
//                        duration: 200,
//                        complete: function() {
//                            $('.staffVoice b').velocity({
//                                width: "100%"
//                            }, {
//                                duration: 200,
//                                complete: function() {
//                                    $('.staffVoice b').removeClass("active");
//                                }
//                            });
//        
//                        }
//                    });
//                }
//            });
        } else {}
		
		var $li = $("#header .gnavi .category > ul > li").hover(
			function () {
				var self = this;
				hovertimer = setTimeout(function(){
					$(self).addClass('show');
				}, 300);
			},
			function () {
				clearTimeout(hovertimer);
				$li.removeClass('show');
			}
		);
		
		if (CommonUtils.isTabletPanel()) {
			$('#header .gnavi .category > ul > li')
			  .on( 'touchstart', function(){
				$(this).addClass( 'show' );
			}).on( 'touchend', function(){
				$(this).removeClass( 'show' );
			});
		}
    });
})(jQuery);

/** 
 *    @fileoverview For front page
 *    @version 2014-10-22
 *    @require jQuery Ver.1.4.2 or above
 */

showShadowWithOpacity = function(overlayID, overlayContentID) {
    var jQueryOverlayID = "#" + overlayID;
    var jQueryOverlayContentID = "#" + overlayContentID;

    jQuery(window).load(function(){
        if (jQuery(jQueryOverlayID).length == 0
                || (jQuery(jQueryOverlayContentID).length > 0 
                        && jQuery(jQueryOverlayContentID).children().length == 0)) {
            return;
        }
        
        jQuery(jQueryOverlayID).show();
        
        if (jQuery(jQueryOverlayContentID).length > 0) {
            //reLocationContent
            resizeOverlayHeight(jQueryOverlayID, jQueryOverlayContentID);
            displayOverlayContentInOverlayMid(jQueryOverlayID, jQueryOverlayContentID);
            jQuery(jQueryOverlayContentID).animate({opacity: 1.0}, 500);
        }
    });
}

closeShadowOpacity = function(overlayID, overlayContentID) {
    var jQueryOverlayID = "#" + overlayID;
    var jQueryOverlayContentID = "#" + overlayContentID;
    
    if (jQuery(jQueryOverlayID).length == 0) {
        return;
    }
    
    if (jQuery(jQueryOverlayContentID).length > 0) {
        jQuery(jQueryOverlayContentID).animate({opacity: 0.1}, 400, 
            function() {
                jQuery(jQueryOverlayID).hide();
            }
        );
    } else {
        jQuery(jQueryOverlayID).animate({opacity: 0.1}, 400, 
            function() {
                jQuery(jQueryOverlayID).hide();
            }
        );
    }
}

displayOverlayContentInOverlayMid = function(jQueryOverlayID, jQueryOverlayContentID) {
    var contentStyles = {
        "top" : ((jQuery(jQueryOverlayID).height()-jQuery(jQueryOverlayContentID).height())/2),
        "left" : ((jQuery(jQueryOverlayID).width()-jQuery(jQueryOverlayContentID).width())/2)
    };
    jQuery(jQueryOverlayContentID).css(contentStyles);
}

resizeOverlayHeight = function(jQueryOverlayID, jQueryOverlayContentID) {
    if (jQuery(jQueryOverlayID).height() == 0) {
        jQuery(jQueryOverlayID).height(jQuery(jQueryOverlayContentID).height() + 10);
    }
}