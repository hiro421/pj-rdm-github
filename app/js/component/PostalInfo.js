/** 
 *    @fileoverview For front page
 *    @version 2016-12-21
 *    @require jQuery Ver.1.11.2 and above
 *    @require main.css or Other Style for StoreStock
 *    @require CommonParams.js
 *    @require CommonUtils.js
 */
//Store Stock Info -----------------------------------------------
var PostalInfo = (function() {
    return {
        //Postal Info List Panel
        PostalInfoComponents: {},
        PostalInfoSetting: {
            PostalInfo: {
                tag: "<div></div>",
                attr: {
                    "id": "PostalInfo",
                    "class": "postModalWrap"
                },
                Title: {
                    tag: "<p></p>",
                    attr: {
                        "class": "title"
                    },
                    text: "\u4f4f\u6240\u691c\u7d22"
                },
                Body: {
                    tag: "<p></p>",
                    attr: {
                        "class": "about"
                    },
                    MainPanel: {
                        tag: "<div></div>",
                        attr: {
                            "id": "modal_detail"
                        },
                        ItemListPanel: {
                            tag: "<div></div>",
                            attr: {
                                "class": "c-rule"
                            },
                            DetailMsg: {
                                tag: "<h3></h3>",
                                text : "\u4e0b\u8a18\u304b\u3089\u8a72\u5f53\u3059\u308b\u4f4f\u6240\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002"
                            }
                        }
                    }
                },
                SelectBtn: {
                    tag: "<button></button>",
                    attr: {
                        "class": "c-btn"
                    },
                    text: "\u78ba\u5b9a"
                },
                CloseBtnFloat: {
                    tag: "<button></button>",
                    attr: {
                        "title": "Close (Esc)",
                        "type": "button",
                        "class": "mfp-close"
                    },
                    text: "\u00d7",
                    mouseenter : function() {
                        jQuery("#PostalInfo > .mfp-close").css("opacity", "1");
                    },
                    mouseleave : function() {
                        jQuery("#PostalInfo > .mfp-close").css("opacity", "0.65");
                    }
                }
            }
        },
        PostalItemSetting: {
            PostalItem: {
                tag: "<div></div>",
                attr: {
                    "class": "ziplist"
                },
                Radio: {
                    tag: "<input></input>",
                    attr: {
                        "type": "radio",
                        "class": "c-form__radio",
                        "name": "PostalItem"
                    }
                },
                Label: {
                    tag: "<label></label>",
                    attr: {
                        "for": ""
                    }
                }
            }
        },
        //Others
        ShadowOverlayComponents: {},
        ShadowOverlaySetting: {
            OverlayPanel: {
                tag: "<div></div>",
                attr: {
                    "id": "ShadowOverlay",
                    "class": "overlay",
                    "style": "display:none;position:fixed;top:0;left:0;z-index:9999;cursor:pointer;width:100%;height:100%;background:rgba(0,0,0,0.8);"
                },
                Loading: {
                    tag: "<div></div>",
                    attr: {
                        "style": "display:none;width:100%;height:100%;position:absolute;left:0px;top:0px;background:rgb(255, 255, 255);z-index:999999;background-image:url(data:image/gif;base64,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);background-position:center;background-repeat:no-repeat;"
                    }
                }
            }
        },
        //Search Address by PostCode
        isProcessing : false,
        searchAddress: function(postCode, callback) {
            if (PostalInfo.isProcessing) {
                return;
            }
            PostalInfo.isProcessing = true;
            //Validation
            if (!CommonUtils.isNotNull(postCode) || !CommonUtils.isNotNull(callback) || typeof callback != "function") {
                console.error("Parameter Error.[doSearchAddress]");
                return;
            }
            //delete [-]
            postCode = CommonUtils.fullToHalf(postCode).replace("-", "");
            var urlParams = {};
            urlParams[COMMON_CONSTS.SEARCH_ADDRESS_API.REQUEST.POSTCODE] = postCode;
            jQuery.ajax({
                method       :    "get",
                async        :    true,
                dataType     :    "json",
                timeout      :    10000,
                url          :    COMMON_CONSTS.URLS.SEARCH_ADDRESS_API,
                data         :    urlParams,
                beforeSend   : function(xhr, settings){
                    if (CommonUtils.isNotNull(PostalInfo.PostalInfoComponents.PostalInfo)) {
                        PostalInfo.PostalInfoComponents.PostalInfo.remove();
                    }
                    if (CommonUtils.isNotNull(PostalInfo.ShadowOverlayComponents.OverlayPanel)) {
                        PostalInfo.ShadowOverlayComponents.OverlayPanel.remove();
                    }
                },
                complete: function(xhr, status){
                    PostalInfo.isProcessing = false;
                },
                success : function(data, status, xhr){
                    var processResult = {};
                    if (data.status == COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS) {
                        if (data.address_list.length > 1) {
                            //Create PostalInfoPanel
                            CommonUtils.createHtmlConponent(PostalInfo.PostalInfoSetting, PostalInfo.PostalInfoComponents, null);
                            jQuery("body").append(PostalInfo.PostalInfoComponents.PostalInfo);
                            //Create ShadowOverlayWhole
                            CommonUtils.createHtmlConponent(PostalInfo.ShadowOverlaySetting, PostalInfo.ShadowOverlayComponents, null);
                            jQuery("body").append(PostalInfo.ShadowOverlayComponents.OverlayPanel);
                            //CloseBtnFloat CloseEvent
                            jQuery(PostalInfo.PostalInfoComponents.CloseBtnFloat).click(function() {
                                if (jQuery(PostalInfo.ShadowOverlayComponents.OverlayPanel).length > 0) {
                                    jQuery(PostalInfo.ShadowOverlayComponents.OverlayPanel).fadeOut(500, function(){
                                        jQuery(this).remove();
                                    });
                                }
                                if (jQuery(PostalInfo.PostalInfoComponents.PostalInfo).length > 0) {
                                    jQuery(PostalInfo.PostalInfoComponents.PostalInfo).fadeOut(500, function(){
                                        jQuery(this).remove();
                                    });
                                }
                            });
                            //ShadowOverlay CloseEvent
                            jQuery(PostalInfo.ShadowOverlayComponents.OverlayPanel).click(function() {
                                jQuery(PostalInfo.PostalInfoComponents.CloseBtnFloat).click();
                            });
                            jQuery(PostalInfo.ShadowOverlayComponents.OverlayPanel).fadeIn(200);
                            //Show ShadowOverlay
                            jQuery(PostalInfo.ShadowOverlayComponents.OverlayPanel).fadeIn(200, function(){
                                //Show Processing
                                var loadingStyles = {
                                    "width": "50px",
                                    "height": "50px",
                                    "top": ((jQuery(window).height()-50)/2),
                                    "left" : ((jQuery(window).width()-50)/2)
                                };
                                jQuery(PostalInfo.ShadowOverlayComponents.Loading).css(loadingStyles);
                                jQuery(PostalInfo.ShadowOverlayComponents.Loading).fadeIn(500, function() {
                                    var postalInfo = jQuery(PostalInfo.PostalInfoComponents.PostalInfo);
                                    //Create Data
                                    var selected = null;
                                    jQuery.each(data.address_list, function(index, value){
                                        if (!CommonUtils.isNotNull(value)) {
                                            return;
                                        }
                                        var prefecture = CommonUtils.nullToBlank(value.prefecture);
                                        var city = CommonUtils.nullToBlank(value.city);
                                        var town = CommonUtils.nullToBlank(value.town);
                                        var postalId = "postal" + index;
                                        
                                        var postalItemComponents = {};
                                        CommonUtils.createHtmlConponent(PostalInfo.PostalItemSetting, postalItemComponents, null);
                                        jQuery(PostalInfo.PostalInfoComponents.ItemListPanel).append(postalItemComponents.PostalItem);
                                        postalItemComponents.Radio.attr("id", postalId);
                                        postalItemComponents.Radio.val(index);
                                        postalItemComponents.Radio.change(function(){
                                            selected = value;
                                            PostalInfo.PostalInfoComponents.SelectBtn.addClass("c-btn--black");
                                        });
                                        postalItemComponents.Label.text(prefecture + city + town);
                                        postalItemComponents.Label.attr("for", postalId);
                                    });
                                    PostalInfo.PostalInfoComponents.SelectBtn.click(function(){
                                        if (CommonUtils.isNotNull(selected)) {
                                            processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_STATUS] = COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS;
                                            processResult[COMMON_CONSTS.SEARCH_ADDRESS_API.RESPONSE.ADDRESS_INFO] = selected;
                                            callback(processResult);
                                            jQuery(PostalInfo.PostalInfoComponents.CloseBtnFloat).click();
                                        }
                                    });
                                    
                                    var mainPanelWidth = postalInfo.innerWidth();
                                    var mainPanelHeight = postalInfo.innerHeight();
                                    var borderLeftWidth = parseInt(postalInfo.css("border-left-width"), 10);
                                    var borderRightWidth = parseInt(postalInfo.css("border-right-width"), 10);
                                    var borderTopWidth = parseInt(postalInfo.css("border-top-width"), 10);
                                    var borderBottomWidth = parseInt(postalInfo.css("border-bottom-width"), 10);
                                    mainPanelWidth += isNaN(borderLeftWidth)?0:borderLeftWidth;
                                    mainPanelWidth += isNaN(borderRightWidth)?0:borderRightWidth;
                                    mainPanelHeight += isNaN(borderTopWidth)?0:borderTopWidth;
                                    mainPanelHeight += isNaN(borderBottomWidth)?0:borderBottomWidth;
                                    
                                    var heightPos = jQuery(window).height()>mainPanelHeight+88?jQuery(window).height()-mainPanelHeight:88;
                                    var topPos = jQuery(window).scrollTop() + heightPos/2;
                                    jQuery(PostalInfo.ShadowOverlayComponents.Loading).animate({
                                        "width": mainPanelWidth,
                                        "height": mainPanelHeight,
                                        "top": heightPos/2,
                                        "left": ((jQuery(window).width()-mainPanelWidth)/2)
                                    }, 500, function(){
                                        jQuery(PostalInfo.ShadowOverlayComponents.Loading).fadeOut(500, function(){
                                            jQuery(PostalInfo.ShadowOverlayComponents.Loading).remove();
                                        });
                                        //MainPanel CSS
                                        var contentStyles = {
                                            //"position" : "fixed",
                                            //"position" : "absolute",
                                            //"z-index" : "10000",
                                            "top" : topPos,
                                            "left" : ((jQuery(window).width()-mainPanelWidth)/2)
                                            //,"margin" : "0px"
                                        };
                                        jQuery(PostalInfo.PostalInfoComponents.PostalInfo).css(contentStyles);
                                        jQuery(PostalInfo.PostalInfoComponents.PostalInfo).fadeIn(200);
                                    });
                                });
                            });
                        } else if (data.address_list.length == 1) {
                            processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_STATUS] = COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS;
                            processResult[COMMON_CONSTS.SEARCH_ADDRESS_API.RESPONSE.ADDRESS_INFO] = data.address_list[0];
                            callback(processResult);
                        } else {
                            processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_STATUS] = COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.ERROR;
                            processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_ERROR_CODE] = COMMON_CONSTS.HTTP_COMMON.ENUM.ERROR_CODE.SYSTEM;
                            callback(processResult);
                        }
                    } else {
                        processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_STATUS] = COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.ERROR;
                        processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_ERROR_CODE] = data[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_ERROR_CODE];
                        callback(processResult);
                    }
                },
                error : function(xhr,status,error){
                    var processResult = {};
                    processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_STATUS] = COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.ERROR;
                    processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_ERROR_CODE] = COMMON_CONSTS.HTTP_COMMON.ENUM.ERROR_CODE.SYSTEM;
                    callback(processResult);
                }
            });
        }
    }
})();