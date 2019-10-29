import picturefill from 'picturefill';
import $ from 'jquery';
import isMobile from 'ismobilejs';
import AOS from 'aos';
import ScrollMagic from 'scrollmagic';
import magnificPopup from 'magnific-popup';
import Model from "../../../../../common/js/Model";
import ColorSelect from "../../../../../common/js/ColorSelect";

$(document).ready(function () {
    $(function () {
        $(".popup-iframe").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 200,
            preloader: !1,
            fixedContentPos: !1,
            iframe: {
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1"
                    }
                }
            }
        })
    });
    AOS.init({
        offset: 100,
        duration: 800,
        easing: 'ease-in-out-cubic',
        delay: 20,
        once: true
    });

    let controller = new ScrollMagic.Controller({});
    let pie1 = new ScrollMagic.Scene({
        triggerElement: '#LeadGraph',
        triggerHook: .5,
        reverse: false
    })
        .on("enter", function () {
            $('#pie1draw').addClass('angle240 active');
            $('#pie1txt').addClass('active');
        })
        .addTo(controller);

    $('.modelimg').each(function () {
        new Model($(this));
    });

    $('.models-opener').click(function () {
        let target = $(this).parent();
        target.toggleClass('open');
    });

    $('.color-select').each(function () {
        new ColorSelect($(this));
    });

    $('#ToggleMenu').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-show');
    });
    $('.main-menu a').click(function () {
        $('body').removeClass('menu-show');
    });

    $('.accordion').click(function(e){
        e.preventDefault();
        let target = $(this).attr('data-accord');
        if($(this).hasClass('open')){
            $('#'+target).slideDown(500);
            $('.accordion.close'+'[data-accord="'+target+'"]').show();
            $(this).hide();
        }else{
            $('#'+target).slideUp(500);
            $('body,html').animate({scrollTop: $('#'+target).offset().top - 400}, 500, 'swing');
            $('.accordion.open'+'[data-accord="'+target+'"]').show();
            $(this).hide();
        }
    });
    $('a[href^="#"]').click(function () {
        let speed = 400;
        let href = $(this).attr("href");
        let target = $(href == "" ? 'html' : href);
        let position = target.offset().top;
        $('body,html').animate({scrollTop: position}, speed, 'swing');
        return false;
    });

    var o = $('#fixedCartBtn');
    $(window).on("load scroll resize", function () {
        if ($(window).scrollTop() >= 400) {
            o.fadeIn("normal")
        } else if ($(window).scrollTop() < 400) {
            o.fadeOut("normal");
        }
    });

    $(window).on("load scroll", function () {
        var oo = ( $(window).scrollTop()) / ( $(document).height() -$(window).height()) ;
        oo =  Math.floor($(window).height() - $(window).height() * oo);
        if (oo < 100) {
            $('#fixedCartBtn').css({bottom: "100px"})
        } else {
            $('#fixedCartBtn').css({bottom: oo + "px"})
        }
    });
});