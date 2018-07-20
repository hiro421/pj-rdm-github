// ***********************************************
// QUESTIONNAIRE JS
// ***********************************************
// youtube
$(function(){
	$('.popup-iframe').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 200,
		preloader: false,
		fixedContentPos: false
	});
});

// autoHeight
;(function ($, window, document, undefined){

    (commonSetup = function(){}).prototype = {
        init : function() {
            this.autoHeight();
        },

        autoHeight : function() {
            /*
             * jquery-auto-height.js
             *
             * Copyright (c) 2010 Tomohiro Okuwaki (http://www.tinybeans.net/blog/)
             * Licensed under MIT Lisence:
             * http://www.opensource.org/licenses/mit-license.php
             * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
             *
             * Since:   2010-04-19
             * Update:  2013-08-16
             * version: 0.04
             * Comment:
             *
             * jQuery 1.2 <-> 1.10.2
             *
             */
            (function($){
                $.fn.autoHeight = function(options){
                    var op = $.extend({

                        column  : 0,
                        clear   : 0,
                        height  : 'minHeight',
                        reset   : '',
                        descend : function descend (a,b){ return b-a; }

                    },options || {});

                    var self = $(this);
                    var n = 0,
                        hMax,
                        hList = new Array(),
                        hListLine = new Array();
                        hListLine[n] = 0;

                    self.each(function(i){
                        if (op.reset == 'reset') {
                            $(this).removeAttr('style');
                        }
                        var h = $(this).height();
                        hList[i] = h;
                        if (op.column > 1) {
                            if (h > hListLine[n]) {
                                hListLine[n] = h;
                            }
                            if ( (i > 0) && (((i+1) % op.column) == 0) ) {
                                n++;
                                hListLine[n] = 0;
                            };
                        }
                    });

                    hList = hList.sort(op.descend);
                    hMax = hList[0];

                    var ie6 = typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined";
                    if (op.column > 1) {
                        for (var j=0; j<hListLine.length; j++) {
                            for (var k=0; k<op.column; k++) {
                                if (ie6) {
                                    self.eq(j*op.column+k).height(hListLine[j]);
                                } else {
                                    self.eq(j*op.column+k).css(op.height,hListLine[j]);
                                }
                                if (k == 0 && op.clear != 0) {
                                    self.eq(j*op.column+k).css('clear','both');
                                }
                            }
                        }
                    } else {
                        if (ie6) {
                            self.height(hMax);
                        } else {
                            self.css(op.height,hMax);
                        }
                    }
                };
            })(jQuery);
        }
    };

    $(function() {
        window.cmn = new commonSetup();
        window.cmn.init();
    })

})(jQuery, window, document);

$.event.add(window, "load resize", function(){
    var e=document.createElement('div');
    var s=document.createTextNode('S');
    e.appendChild(s);
    e.style.visibility="hidden";
    e.style.position="absolute";
    e.style.top="0";
    $('body>div:first-child').append(e);
    var defHeight=e.offsetHeight;
    var outerWidthSet=$(window).outerWidth();
    checkBoxSize=function(){
    if(defHeight!=e.offsetHeight){
        $('.questionnaireBlock03 .list li >div').autoHeight({column:2,reset:'reset',height:'min-height'});
            defHeight=e.offsetHeight
        }
    };
    $('.questionnaireBlock03 .list li >div').autoHeight({column:2,reset:'reset',height:'min-height'});
    setInterval(checkBoxSize,0.01);
});