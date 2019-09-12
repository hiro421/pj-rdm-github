/** 
 *    @fileoverview For Common
 *    @version 2017-03-31
 *    @require jQuery Ver.1.11.2 and above
 *    @require lib.js(jQuery.Cookie)
 *    @require CommonParams.js
 */
var CommonUtils = (function() {
    return {
        stringFormat : function(format, values) {
            var result = format;
            jQuery.each(values, function (i, n) {
                result = result.replace(new RegExp("({)" + i + "(})", "g"), n);
            });
            return result;
        },
        numberFormat : function(num) {
            var regNum = new RegExp("\\d+", "g");
            if (regNum.test(num)) {
                num = num.toString().replace(new RegExp("(\\d)(?=(\\d{3})+(?!\\d))", "g"), "$1" + ",");
                return num;
            }
            return NaN;
        },
        halfToFull : function(value) {
            if (CommonUtils.isNotNull(value)) {
                value = value.replace(/[A-Za-z0-9]/g, function(s) {
                    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
                });
            }
            return value;
        },
        fullToHalf : function(value) {
            if (CommonUtils.isNotNull(value)) {
                value = value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
                    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                });
            }
            return value;
        },
        nullToBlank : function(value) {
            if (typeof value == "undefined" || value == null) {
                value = "";
            }
            return value;
        },
        nvl : function(value, insteadValue) {
            if (CommonUtils.isNotNull(value)) return value;
            else return insteadValue;
        },
        isNotNull : function(value) {
            var retValue = true;
            retValue &= (typeof value != "undefined");
            retValue &= (value != null);
            if (typeof value == "string" || jQuery.isArray(value)) {
                retValue &= (value.length > 0);
            }
            return retValue == true;
        },
        /**
         * @description conponentSetting must be a Tree Structure Setting
         */
        createHtmlConponent : function(conponentSetting, conponentPool, appendToConponent) {
            var node = null;
            //Loop Tree Node
            jQuery.each(conponentSetting, function(settingName, settingValue) {
                if (settingName == "tag") {
                    if (typeof settingValue == "string") {
                        node = jQuery(settingValue);
                    } else {
                        node = settingValue;
                    }
                    if (appendToConponent != null) {
                        jQuery(appendToConponent).append(node);
                    }
                } else if (settingName == "attr" && node != null) {
                    jQuery(node).attr(settingValue);
                } else if (new RegExp("^text[-_]?[\\d]*$", "g").test(settingName) && node != null) {
                    jQuery(node).append(settingValue);
                } else if (settingName == "html" && node != null) {
                    jQuery(node).html(settingValue);
                } else if (typeof settingValue == "function") {
                    jQuery(node).bind(settingName, function(){settingValue()});
                } else if (typeof settingValue.tag != "undefined") {
                    var subNode = CommonUtils.createHtmlConponent(settingValue, conponentPool, node);
                    if (node == null) {
                        node = subNode;
                    }
                    conponentPool[settingName] = subNode;
                }
            });
            return node;
        },
        /**
         * @description Get system common data by PagePolicy
         * @dataPolicy instance of PagePolicy
         */
        getCommonData: function(dataPolicy) {
            jQuery.ajax({
                method       :    "post",
                async        :    true,
                dataType     :    "json",
                timeout      :    10000,
                url          :    COMMON_CONSTS.URLS.COMMON_DATA_API,
                data         :    JSON.stringify(dataPolicy.commonDataInfo),
                contentType  :    "application/json; charset=UTF-8",
                success      : function(data, status, xhr){
                    var callBack = dataPolicy.getParameter(COMMON_CONSTS.PAGE_POLICY.PARAMETER_NAMES.SUCCESS_FUNCTION);
                    var dataStatus = data[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_STATUS];
                    if (dataStatus == COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS) {
                        jQuery.each(dataPolicy.commonDataInfo, function(dataName) {
                            var dataValue = data[dataName];
                            if (typeof dataValue == "undefined") {
                                dataValue = null;
                            }
                            dataPolicy.putCommonData(dataName, dataValue);
                        });
                    } else {
                        console.error("An error has occurred during getCommonData process");
                        callBack = dataPolicy.getParameter(COMMON_CONSTS.PAGE_POLICY.PARAMETER_NAMES.ERROR_FUNCTION);
                    }
                    if (jQuery.isArray(callBack)) {
                        jQuery.each(callBack, function(index, callBackFunc) {
                            if (typeof callBackFunc == "function") {
                                callBackFunc();
                            }
                        });
                    } else if (typeof callBack == "function") {
                        callBack();
                    }
                },
                error        : function(xhr,status,error){
                    console.error("An error has occurred during getCommonData process");
                    var callBack = dataPolicy.getParameter(COMMON_CONSTS.PAGE_POLICY.PARAMETER_NAMES.ERROR_FUNCTION);
                    if (jQuery.isArray(callBack)) {
                        jQuery.each(callBack, function(index, callBackFunc) {
                            if (typeof callBackFunc == "function") {
                                callBackFunc();
                            }
                        });
                    } else if (typeof callBack == "function") {
                        callBack();
                    }
                }
            });
        },
        /**
         * @description Load file contents
         */
        loadContents: function(filePath, callback) {
            if (!CommonUtils.isNotNull(filePath)) {
                callback("");
                return;
            }
            //Line経由の画面の場合、禁止リストを利用する
            if(CommonUtils.isNotNull(pagePolicy.getFormData(COMMON_CONSTS.HTTP_COMMON.REQUEST.CALINKTOKEN)) && 
            		pagePolicy.getFormData(COMMON_CONSTS.HTTP_COMMON.REQUEST.CALINKTOKEN) != "" && (COMMON_CONSTS.LINE_CONNECT_BLOCK.indexOf(filePath) >= 0)){
            	callback("");
                return;
            }
           
            jQuery.ajax({
                method       :    "get",
                async        :    true,
                dataType     :    "text",
                timeout      :    10000,
                url          :    filePath,
                beforeSend   : function(xhr, settings){
                    if (++loadingContentsCount == 1) {
                        jQuery.holdReady(true);
                    }
                },
                complete: function(xhr, status){
                    if (--loadingContentsCount == 0) {
                        jQuery.holdReady(false);
                    }
                },
                success      : function(data, status, xhr){
                    callback(data);
                },
                error        : function(xhr,status,error){
                    callback("");
                }
            });
        },
        /**
         * @description Get Secen7 image data
         */
        findItemColorImages: function(colorImgSetArray, callback) {
            if (typeof colorImgSetArray == "undefined" || typeof callback == "undefined" || callback == null) {
                console.error("Parameter Error.[findItemColorImages]");
            }
            var urlParams = {};
            urlParams["req"] = "set,json,UTF-8";
            if (colorImgSetArray == null) {
                colorImgSetArray = new Array();
            }
            urlParams["imageset"] = colorImgSetArray.join(",");
            jQuery(document).ready(function(){
                jQuery.ajax({
                    type          : "get",
                    url           : COMMON_CONSTS.URLS.SCENE7_SET_IMAGE_URL,
                    dataType      : "jsonp",
                    crossDomain   : true,
                    data          : urlParams,
                    jsonp         : "handler",
                    jsonpCallback : callback,
                    error         :function(xhr,status,error){
                        console.log(error + "[findItemColorImages]");
                        callback(null);
                    }
                });
            });
        },
        /**
         * @description Reform Secen7 response
         */
        reformSecen7Data : function(respJson) {
            var retValue = {};
            if (typeof respJson == "undefined" || respJson == null 
                || respJson.set.type == "empty" || respJson.set.type == "unknown") {
                return retValue;
            }
            
            var pjMark = CommonUtils.nullToBlank(respJson.set.n) + "/";
            var itemGroups = respJson.set.type === "img_set" ? [respJson] : respJson.set.item;
            //Reform
            jQuery(itemGroups).each(function(index, itemGroup) {
                if (typeof this.set !== "undefined") {
                    var colorCode = CommonUtils.nullToBlank(itemGroup.set.n).replace(pjMark, "");
                    var colorImageArray = new Array();
                    retValue[colorCode] = colorImageArray;

                    var items = jQuery.isArray(itemGroup.set.item)?itemGroup.set.item:[itemGroup.set.item];
                    jQuery.each(items, function(index, item) {
                        var colorImageItem = null;
                        if (typeof item.i != "undefined" && typeof item.i.n != "undefined") {
                            colorImageItem = CommonUtils.nullToBlank(item.i.n).replace(pjMark, "");
                        } else if (typeof item.s != "undefined" && typeof item.s.n != "undefined") {
                            colorImageItem = CommonUtils.nullToBlank(item.s.n).replace(pjMark, "");
                        }
                        if (colorImageItem != null) {
                            colorImageArray.push(colorImageItem);
                        }
                    });
                }
            });
            return retValue;
        },
        /**
         * @description Excute postback to current page
         */
        doPostBack: function(actionName, formData, formName) {
            var form = null;
            if (CommonUtils.isNotNull(formName)) {
                form = jQuery("form[name='" + formName + "']");
            }
            if (jQuery(form).length == 0) {
                form = jQuery("<form></form>");
                form.attr("method", "post");
                form.attr("action", jQuery(location).attr("pathname"));
                jQuery("body").append(form);
            }
            //actionName
            var paramAction = form.find("input[name='" + COMMON_CONSTS.HTTP_COMMON.REQUEST.ACTION_NAME + "']");
            if (paramAction.length == 0) {
                paramAction = jQuery("<input type='hidden'></input>");
                paramAction.attr("name", COMMON_CONSTS.HTTP_COMMON.REQUEST.ACTION_NAME);
                form.append(paramAction);
            }
            paramAction.val(actionName);
            //Form Data
            if (typeof formData != "undefined") {
                jQuery.each(formData, function(name, value) {
                    var dataInput = jQuery("<input type='hidden'></input>");
                    dataInput.attr("name", name);
                    dataInput.val(value);
                    form.append(dataInput);
                });
            }
            form.submit();
            return false;
        },
        /**
         * @description Send post request
         */
        doSendPost: function(postUrl, formData) {
            var form = jQuery("<form></form>");
            form.attr("method", "post");
            form.attr("action", postUrl);
            //Form Data
            if (typeof formData != "undefined") {
                jQuery.each(formData, function(name, value) {
                    var dataInput = jQuery("<input type=\"text\"></input>");
                    dataInput.attr("name", name);
                    dataInput.val(value);
                    form.append(dataInput);
                });
            }
            jQuery("body").append(form);
            form.submit();
            return false;
        },
        doSendRedirect: function(url) {
            if (CommonUtils.isNotNull(url)) {
                location.href = url;
            }
            return false;
        },
        /**
         * @description Replace brandName of item to replacement
         */
        getBrandReplacement: function(brandName) {
            if (typeof COMMON_CONSTS.BRAND_NAME_REPLACE_MAPPING[brandName] != "undefined") {
                return COMMON_CONSTS.BRAND_NAME_REPLACE_MAPPING[brandName];
            } else {
                return brandName;
            }
        },
        /**
         * @description Store the StoreCode of Favorite Store
         */
        saveFavStore : function(storeCode) {
            if (!CommonUtils.isNotNull(storeCode)) {
                return;
            }
            //Get FavStore from Cookie
            var favStore = jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE);
            if (CommonUtils.isNotNull(favStore) && (favStore = JSON.parse(favStore)).length > 0) {
                //If Cookie Exists
                if (jQuery.inArray(storeCode, favStore) > -1) {
                    //If StoreCode Exists in Cookie
                    favStore = jQuery.grep(favStore, function(value, index) {
                        return value != storeCode;
                    });
                }
            } else {
                //If Not Exists
                favStore = new Array();
            }
            favStore.push(storeCode);
            jQuery.cookie.raw = true;
            jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE, JSON.stringify(favStore), {path: "/", expires:365*100});
        },
        /**
         * @description Delete the StoreCode of Favorite Store
         */
        removeFavStore : function(storeCode) {
            if (!CommonUtils.isNotNull(storeCode)) {
                return;
            }
            //Get FavStore from Cookie
            var favStore = jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE);
            //If StoreCode Exists in Cookie
            if (CommonUtils.isNotNull(favStore) && (favStore = JSON.parse(favStore)).length > 0
                && jQuery.inArray(storeCode, favStore) > -1) {
                favStore = jQuery.grep(favStore, function(value, index) {
                    return value != storeCode;
                });
                if (favStore.length > 0) {
                    jQuery.cookie.raw = true;
                    jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE, JSON.stringify(favStore), {path: "/", expires:365*100});
                } else {
                    jQuery.removeCookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE, {path: "/"});
                }
            }
        },
        /**
         * @description Is current device mobile
         */
        isMobile: function() {
            return currentDevice.Mobile;
        },
        /**
         * @description Is current device tablet display
         */
        isTabletPanel: function() {
            return jQuery(window).width() <= 768;
        },
        /**
         * @description Get url parameters map from current url
         */
        getCurrentUrlParamMap: function() {
            var retValue = {};
            var urlParam = window.location.search;
            if (CommonUtils.isNotNull(urlParam) && urlParam.indexOf("?") > -1) {
                urlParam = urlParam.slice(urlParam.indexOf("?") + 1);
                var paramArr = urlParam.split("&");
                jQuery(paramArr).each(function(index, value) {
                    var param = value.split("=");
                    retValue[param[0]] = param[1];
                });
            }
            return retValue;
        },
        /**
         * @description Get url parameters map from parameter
         */
        getUrlParamMap: function(urlParam) {
            var retValue = {};
            if (CommonUtils.isNotNull(urlParam) && urlParam.indexOf("?") > -1) {
                urlParam = urlParam.slice(urlParam.indexOf("?") + 1);
                var paramArr = urlParam.split("&");
                jQuery(paramArr).each(function(index, value) {
                    var param = value.split("=");
                    retValue[param[0]] = param[1];
                });
            }
            return retValue;
        },
        /**
         * @description Common Popup
         */
        showPopup: function(targetId) {
            //Delete AllElement Panel if exists
            if (jQuery("#" + COMMON_CONSTS.PopupPanelSetting.MainPanel.attr.id).length > 0) {
                jQuery("#" + COMMON_CONSTS.PopupPanelSetting.MainPanel.attr.id).remove();
            }
            //Drop Overlay Panel if exists
            if (jQuery("#" + COMMON_CONSTS.OverlaySetting.OverlayPanel.attr.id).length > 0) {
                jQuery("#" + COMMON_CONSTS.OverlaySetting.OverlayPanel.attr.id).remove();
            }
            //Create PopupPanel
            var popupComponents = {};
            var overlayComponents = {};
            //  PopupPanel
            CommonUtils.createHtmlConponent(COMMON_CONSTS.PopupPanelSetting, popupComponents, null);
            jQuery("body").append(popupComponents.MainPanel);
            //  OverlayPanel
            CommonUtils.createHtmlConponent(COMMON_CONSTS.OverlaySetting, overlayComponents, null);
            jQuery("body").append(overlayComponents.OverlayPanel);
            
            //Close Event
            jQuery(popupComponents.CloseBtnFloat).click(function() {
                if (jQuery(overlayComponents.OverlayPanel).length > 0) {
                    jQuery(overlayComponents.OverlayPanel).fadeOut(500, function(){
                        jQuery(this).remove();
                    });
                }
                if (jQuery(popupComponents.MainPanel).length > 0) {
                    jQuery(popupComponents.MainPanel).fadeOut(500, function(){
                        jQuery(this).remove();
                    });
                }
            });
            jQuery(overlayComponents.OverlayPanel).click(function() {
                jQuery(popupComponents.CloseBtnFloat).click();
            });
            
            //Show ShadowOverlay
            jQuery(overlayComponents.OverlayPanel).fadeIn(200, function(){
                //Show Processing
                var loadingStyles = {
                    "width": "50px",
                    "height": "50px",
                    "top": ((jQuery(window).height()-50)/2),
                    "left" : ((jQuery(window).width()-50)/2)
                };
                jQuery(overlayComponents.Loading).css(loadingStyles);
                jQuery(overlayComponents.Loading).fadeIn(200, function(){
                    if (CommonUtils.isNotNull(targetId) && jQuery("#" + targetId).length > 0) {
                        var target = jQuery("#" + targetId).clone();
                        if (!target.is(":visible")) {
                            target.css("display", "");
                        }
                        //popupMain.append(target);
                        popupComponents.Content.prepend(target);
                    }
                    var popupMain = popupComponents.MainPanel;
                    if (CommonUtils.isTabletPanel()) {
                        popupMain.css({"width":"94%", "padding":"15px"});
                    }
                    //
                    var mainPanelWidth = popupMain.innerWidth();
                    var mainPanelHeight = popupMain.innerHeight();
                    var borderLeftWidth = parseInt(popupMain.css("border-left-width"), 10);
                    var borderRightWidth = parseInt(popupMain.css("border-right-width"), 10);
                    var borderTopWidth = parseInt(popupMain.css("border-top-width"), 10);
                    var borderBottomWidth = parseInt(popupMain.css("border-bottom-width"), 10);
                    mainPanelWidth += isNaN(borderLeftWidth)?0:borderLeftWidth;
                    mainPanelWidth += isNaN(borderRightWidth)?0:borderRightWidth;
                    mainPanelHeight += isNaN(borderTopWidth)?0:borderTopWidth;
                    mainPanelHeight += isNaN(borderBottomWidth)?0:borderBottomWidth;
                    
                    var heightPos = jQuery(window).height()>mainPanelHeight+88?jQuery(window).height()-mainPanelHeight:88;
                    var topPos = jQuery(window).scrollTop() + heightPos/2;
                    jQuery(overlayComponents.Loading).animate({
                        "width": mainPanelWidth,
                        "height": mainPanelHeight,
                        "top": heightPos/2,
                        "left": ((jQuery(window).width()-mainPanelWidth)/2)
                    }, 500, function(){
                        jQuery(overlayComponents.Loading).fadeOut(500, function(){
                            jQuery(overlayComponents.Loading).remove();
                        });
                        //MainPanel CSS
                        var contentStyles = {
                            "position" : "absolute",
                            "z-index" : "10000",
                            "top" : topPos,
                            "left" : ((jQuery(window).width()-mainPanelWidth)/2),
                            "margin" : "0"
                        };
                        jQuery(popupComponents.MainPanel).css(contentStyles);
                        jQuery(popupComponents.MainPanel).fadeIn(200);
                    });
                });
            });
        },
        /**
         * @description Common Popup
         */
        showContents: function(contentUrl, styles) {
            //Delete AllElement Panel if exists
            if (jQuery("#" + COMMON_CONSTS.PopupPanelSetting.MainPanel.attr.id).length > 0) {
                jQuery("#" + COMMON_CONSTS.PopupPanelSetting.MainPanel.attr.id).remove();
            }
            //Drop Overlay Panel if exists
            if (jQuery("#" + COMMON_CONSTS.OverlaySetting.OverlayPanel.attr.id).length > 0) {
                jQuery("#" + COMMON_CONSTS.OverlaySetting.OverlayPanel.attr.id).remove();
            }
            //Create PopupPanel
            var popupComponents = {};
            var overlayComponents = {};
            //  PopupPanel
            CommonUtils.createHtmlConponent(COMMON_CONSTS.PopupPanelSetting, popupComponents, null);
            jQuery("body").append(popupComponents.MainPanel);
            //  OverlayPanel
            CommonUtils.createHtmlConponent(COMMON_CONSTS.OverlaySetting, overlayComponents, null);
            jQuery("body").append(overlayComponents.OverlayPanel);
            
            //Close Event
            jQuery(popupComponents.CloseBtnFloat).click(function() {
                if (jQuery(overlayComponents.OverlayPanel).length > 0) {
                    jQuery(overlayComponents.OverlayPanel).fadeOut(500, function(){
                        jQuery(this).remove();
                    });
                }
                if (jQuery(popupComponents.MainPanel).length > 0) {
                    jQuery(popupComponents.MainPanel).fadeOut(500, function(){
                        jQuery(this).remove();
                    });
                }
            });
            jQuery(popupComponents.CloseBtn).css("display", "");
            jQuery(popupComponents.CloseBtn).click(function() {
                jQuery(popupComponents.CloseBtnFloat).click();
            });
            jQuery(overlayComponents.OverlayPanel).click(function() {
                jQuery(popupComponents.CloseBtnFloat).click();
            });
            
            if (CommonUtils.isNotNull(styles)) {
                jQuery.each(styles, function(selector, style) {
                    var taget = $(selector);
                    if (taget.length > 0) {
                        taget.css(style);
                    }
                });
            }
            //Show ShadowOverlay
            jQuery(overlayComponents.OverlayPanel).fadeIn(200, function () {
                //Get Contents
                jQuery.ajax({
                    method: "get",
                    async: true,
                    dataType: "text",
                    timeout: 10000,
                    url: contentUrl,
                    beforeSend: function (xhr, settings) {
                        //Show Processing
                        var loadingStyles = {
                            "width": "50px",
                            "height": "50px",
                            "top": ((jQuery(window).height() - 50) / 2),
                            "left": ((jQuery(window).width() - 50) / 2)
                        };
                        jQuery(overlayComponents.Loading).css(loadingStyles);
                        jQuery(overlayComponents.Loading).fadeIn(500);
                    },
                    complete: function (xhr, status) {
                        var mainPanel = jQuery(popupComponents.MainPanel);
                        //Css Customize
                        if (CommonUtils.isNotNull(styles)) {
                            jQuery.each(styles, function(selector, style) {
                                //var taget = mainPanel.find(selector);
                                var taget = $(selector);
                                if (taget.length > 0) {
                                    taget.css(style);
                                }
                            });
                        }
                        //Set Position
                        if (CommonUtils.isTabletPanel()) {
                            mainPanel.css({"max-width": "94%"});
                        }
                        var mainPanelWidth = mainPanel.innerWidth();
                        var mainPanelHeight = mainPanel.innerHeight();
                        var borderLeftWidth = parseInt(mainPanel.css("border-left-width"), 10);
                        var borderRightWidth = parseInt(mainPanel.css("border-right-width"), 10);
                        var borderTopWidth = parseInt(mainPanel.css("border-top-width"), 10);
                        var borderBottomWidth = parseInt(mainPanel.css("border-bottom-width"), 10);
                        mainPanelWidth += isNaN(borderLeftWidth) ? 0 : borderLeftWidth;
                        mainPanelWidth += isNaN(borderRightWidth) ? 0 : borderRightWidth;
                        mainPanelHeight += isNaN(borderTopWidth) ? 0 : borderTopWidth;
                        mainPanelHeight += isNaN(borderBottomWidth) ? 0 : borderBottomWidth;
                        
                        var heightPos = jQuery(window).height()>mainPanelHeight+88?jQuery(window).height()-mainPanelHeight:88;
                        var topPos = jQuery(window).scrollTop() + heightPos / 2;
                        jQuery(overlayComponents.Loading).animate({
                            "width": mainPanelWidth,
                            "height": mainPanelHeight,
                            "top": heightPos / 2,
                            "left": ((jQuery(window).width() - mainPanelWidth) / 2)
                        }, 500, function () {
                            jQuery(overlayComponents.Loading).fadeOut(500, function () {
                                jQuery(overlayComponents.Loading).remove();
                            });
                            //MainPanel CSS
                            var contentStyles = {
                                "position": "absolute",
                                "z-index": "10000",
                                "top": topPos,
                                "left": ((jQuery(window).width() - mainPanelWidth) / 2),
                                "margin": "0"
                            };
                            jQuery(popupComponents.MainPanel).css(contentStyles);
                            jQuery(popupComponents.MainPanel).fadeIn(200);
                        });
                    },
                    success: function (data) {
                        jQuery(popupComponents.Content).prepend(data);
                    },
                    error: function (xhr, status, error) {
                        jQuery(popupComponents.Content).css("color", "#ff0000");
                        jQuery(popupComponents.Content).text(COMMON_CONSTS.MESSAGES.SYSTEM_ERR_MESSAGE);
                    }
                });
            });
        },
        /**
         * @description Get Category Infos.
         */
        getCategoryInfos: function(params) {
            var callBack = null;
            if (!CommonUtils.isNotNull(params) || !CommonUtils.isNotNull(params.callBack)) {
                console.error("function [getCategoryInfos].Not Enough Arguments.");
                return;
            }
            callBack = params.callBack;
            CommonUtils.loadContents(COMMON_CONSTS.FILES.CATEGORY_INFOS_URL, function(contents){
                if (!CommonUtils.isNotNull(contents)) {
                    console.error("function [getCategoryInfos].Not Found CategoryInfos.");
                    return;
                }
                var categoryInfo = null;
                if (CommonUtils.isNotNull(contents)) {
                    categoryInfo = JSON.parse(contents);
                }
                if (jQuery.isArray(callBack)) {
                    jQuery.each(callBack, function(index, callBackFunc) {
                        if (typeof callBackFunc == "function") {
                            callBackFunc(categoryInfo);
                        }
                    });
                } else if (typeof callBack == "function") {
                    callBack(categoryInfo);
                }
            });
        },
        /**
         * @description Load Csv File.
         * @require PapaParse lib
         */
        loadCsv: function(params) {
            if (!CommonUtils.isNotNull(params) || !CommonUtils.isNotNull(params.filePath)
                    || !CommonUtils.isNotNull(params.callBack)) {
                console.error("function [loadCsv].Not Enough Arguments.");
                return;
            }
            var readCsv = function() {
                Papa.parse(params.filePath, {
                    delimiter: CommonUtils.nvl(params.delimiter, ','),
                    //newline: "",
                    quoteChar: CommonUtils.nvl(params.quoteChar, '"'),
                    //header: false,
                    header: CommonUtils.nvl(params.header, true),
                    //dynamicTyping: false,
                    //preview: 0,
                    //encoding: "UTF-8",
                    //worker: false,
                    worker: CommonUtils.nvl(params.worker, false),
                    comments: CommonUtils.nvl(params.comments, false),
                    //step: undefined,
                    complete: params.callBack,
                    error: params.callBack,
                    download: CommonUtils.nvl(params.download, true),
                    //skipEmptyLines: false,
                    skipEmptyLines: CommonUtils.nvl(params.skipEmptyLines, true),
                    //chunk: undefined,
                    //fastMode: undefined,
                    //beforeFirstChunk: undefined,
                    withCredentials: CommonUtils.nvl(params.withCredentials, undefined)
                });
            }
            if (typeof Papa == "undefined" || !CommonUtils.isNotNull(Papa)) {
                jQuery.getScript( "/app/js/lib/papaparse.min.js" )
                .done(function() {
                    readCsv();
                })
                .fail(function(jqxhr, settings, exception) {
                    console.error(exception);
                    params.callBack(null, null);
                });
            } else {
                readCsv();
            }
        },
        /**
         * @description get Selected System Date.
         */
        getSysDate: function() {
            var currentDomain = location.hostname;
            if (COMMON_CONSTS.SYS_DATE_SETTING[currentDomain]) {
                if (typeof COMMON_CONSTS.SYS_DATE_SETTING[currentDomain] != "undefined" && CommonUtils.isNotNull(COMMON_CONSTS.SYS_DATE_SETTING[currentDomain])) {
                         return new Date(COMMON_CONSTS.SYS_DATE_SETTING[currentDomain]);
                     }
            }
            return new Date();
        }
    }
})();
