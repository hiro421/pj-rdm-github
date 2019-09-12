/** 
 *    @fileoverview For Common
 *    @version 2016-11-11
 *    @require jQuery Ver.1.4.2 and above
 */
var COMMON_CONSTS = {
    SYSTEM_CONDITION : {
        LOW_LOAD_MODE : false
    },
    //Stock Status
    STOCK_STATUS : {
        STOP    : "1",
        STOCK_1 : "2",
        STOCK_2 : "3",
        FEW_1   : "4",
        FEW_2   : "5",
        INSTOCK_1 : "6",
        INSTOCK_2 : "7",
        RESERVE_1 : "8",
        RESERVE_2 : "9",
        SOLD_OUT  : "10",
        NONE      : "-1"
    },
    //Page Policy
    PAGE_POLICY : {
        FORM_DATA_NAMES : {
            PREVIOUS_ID : "previousid",
            TOKEN : "token",
            ACTION_NAME : "actionNameTxt"
        },
        PARAMETER_NAMES : {
            SUCCESS_FUNCTION   : "successFunc",
            ERROR_FUNCTION     : "errorFunc"
        }
    },
    //Http Communication
    URLS : {
        SCENE7_SET_IMAGE_URL : "//peachjohn.scene7.com/is/image/PeachJohn/",
        GOOGLE_MAPS_API_URL  : "//maps.googleapis.com/maps/api/js?key={0}&libraries={1}",
        SOCIALPLUS_JSAPI     : "https://api.socialplus.jp/peachjohn/PJ-DEV/jsapi/",
        POST_CODE_DETAIL_URL : "http://www.post.japanpost.jp/zipcode/",
        PRIVACY_CONTENT_URL  : "/app/lbi/member/privacyPolicy.lbi",
        MEMBER_RULE_URL      : "/app/lbi/member/memberRule.lbi",
        ITEM_LIST_PJ_PAGE    : "/pjitem/list/",
        SHOPPING_BAG_PAGE    : "/shopping/bag/",
        SIZE_GUIDE_PAGE      : "/pj/size/",
        WISH_LIST_PAGE       : "/member/wishlist/",
        ALL_ELEMENT_PAGE     : "/pjitem/seibun/?item={0}",
        COMMON_DATA_API      : "/common/commondata/?encode=utf8",
        ADD_SHOPPING_BAG_API : "/item/addshoppingbag/",
        ITEM_DETAIL_INFO_API : "/item/detailinfo/",
        ADD_WISH_LIST_API    : "/item/addwishlist/",
        STORE_STOCK_INFO_API : "/stock/storestock/?encode=utf8",
        SEARCH_ADDRESS_API   : "/member/searchAddress/",
        WITHDRAW_PAGE        : "/member/withdrawalconfirm/",
        CATALOG_TERM_PAGE    : "/member/catalognoneed/",
        MYPAGE_PJ_PAGE       : "/member/pjmypage/",
        BRA_ELECTION_PAGE    : "/item/braelectioniteminfo/",
        LOGIN_PAGE           : "/member/login/"
    },
    FILES : {
        CATEGORY_INFOS_URL   : "/app/config/json/CategoryInfos.json",
        CMS_CONTENTS_URL     : "/app/config/cms/ContentList.csv"
    },
    DYNAMIC_PATHS : ["/member","/pjitem","/shopping","/inquiry","/address","/info","/dwr","/item","/catalog","/check","/friend","/questionnaire","/review","/contents_d","/common/commondata","/stock/storestock","/product","/store-out"],
    HTTP_COMMON : {
        ENUM : {
            PROCESS_STATUS : {
                SUCCESS : 1,
                ERROR   : 0
            },
            ERROR_CODE : {
                WITHOUT_LOGIN : 101,
                PARAMETER     : 201,
                SESSION       : 301,
                SYSTEM        : 901
            }
        },
        REQUEST : {
            PREVIOUS_ID : "previousid",
            TOKEN : "token",
            ACTION_NAME : "actionNameTxt",
            CALINKTOKEN : "caLinkToken"
        },
        RESPONSE : {
            PROCESS_STATUS     : "status",
            PROCESS_ERROR_CODE : "errorCode"
        },
        COOKIE : {
            FAVORITE_STORE     : "favStore",
            PREVIOUS_PREF_CODE : "prePrefCode",
            VOTED_FLG          : "VotedFlg"
        }
    },
    GOOGLE : {
        KEYS : {
            MAIN : "AIzaSyByO-P66OqkytYUFMPyGdki_8AEOflKQX4"
        },
        LIBRARIES : {
            PLACES : "places"
        },
        DISTANCE_MATRIX_POS_LIMIT : 25
    },
    COMMON_DATA_API : {
        REQUEST : {
            LOGIN_STATUS        : "loginStatus",
            CART_TOTAL_COUNT    : "cartTotalCount",
            CART_TOTAL_PRICE    : "cartTotalPrice",
            PREFECTURE_LIST     : "prefectureList",
            DELIVERY_FREE_PRICE : "deliveryFreePrice"
        }
    },
    CATEGORY_INFOS_URL : {
        ENUM : {
            TYPES : {
                FL      : "_fl",
                PCG     : "_pcg",
                CG      : "_cg",
                SR      : "_sr",
                RANKING : "_rk"
            }
        },
        RESPONSE : {
            COMMON : {
                TYPE : "type",
                URL  : "url",
                CODE : "code"
            },
            PCG : {
                PCGS : "PCategories"
            },
            CG : {
                CGS : "Categories"
            },
            SR : {
                SR_LIST : "SeriesList",
                SRS     : "Series"
            }
        }
    },
    ADD_SHOPPING_BAG_API : {
        REQUEST : {
            SKU_CODE  : "sku_code",
            ORDER_NUM : "order_num",
            BRAND     : "brand"
        }
    },
    ITEM_DETAIL_INFO_API : {
        ENUM : {
            ICON_KBN : {
                ICON_URL : 1,
                ICON_NAME : 2
            }
        },
        REQUEST : {
            ITEM_CODE    : "_it",
            SKU_CODE     : "_sku",
            CHANNEL_CODE : "_cnl",
            MEDIA_KBN    : "_mdk",
            ICON_KBN     : "_ick"
        }
    },
    ADD_WISH_LIST_API : {
        ENUM : {
            ERROR_CODE : {
                REGISTED : 203
            }
        },
        REQUEST : {
            SKU_CODE       : "_sku",
            MEDIA_KBN      : "_mdk",
            MEDIA_NO       : "_mdn",
            MEDIA_CLASS_NO : "_mcn",
            SCREEN_ID      : "_sci"
        }
    },
    STORE_STOCK_INFO_API : {
        ENUM : {
            PREF_CODE_ENTIRE : "0"
        },
        REQUEST : {
            ITEM_CODE      : "_it",
            FAV_STORE_CODE : "_fsc",
            PREFECTURE_CODE: "_pfc",
            STORE_NAME     : "_stn"
        }
    },
    SOCIALPLUS_JSAPI : {
        ENUM : {
            ACCOUNT_ID : "peachjohn",
            SITE_ID    : "PJ-DEV"
        }
    },
    SEARCH_ADDRESS_API : {
        ENUM : {
            ERROR_CODE : {
                DATA_TYPE_ERROR : 202
            }
        },
        REQUEST : {
            POSTCODE : "_zip_code"
        },
        RESPONSE: {
            ADDRESS_INFO : "addressInfo"
        },
        MESSAGES : {
            POSTCODE_INPUT_REQUIRED : "\u300c\u90f5\u4fbf\u756a\u53f7\u300d\u306f\u3001\u5fc5\u9808\u5165\u529b\u9805\u76ee\u3067\u3059\u3002",
            POSTCODE_DATA_TYPE_ERR  : "\u300c\u90f5\u4fbf\u756a\u53f7\u300d\u306f\u30017\u6841\u534a\u89d2\u6570\u5b57\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
            POSTAL_INFO_NOT_FOUND   : "\u90f5\u4fbf\u756a\u53f7\u306b\u8a72\u5f53\u3059\u308b\u4f4f\u6240\u304c\u3042\u308a\u307e\u305b\u3093\u3002"
        }
    },
    ITEM_LIST_PJ_PAGE : {
        ENUM : {
            ANY_LIST_SALON_START_WITH : "sa_",
            ANY_LIST_YUMMY_START_WITH : "yummy",
            ANY_LIST_YM_START_WITH : "ym"
        },
        REQUEST : {
            ANY_LIST_CODE       : "_al",
            ANY_LIST_GROUP_CODE : "_alg"
        }
    },
    //Message
    MESSAGES : {
        STORE_STOCK_NO_HANDLING : "\u53d6\u6271\u3044\u306a\u3057",
        SYSTEM_ERR_MESSAGE : "\u30b7\u30b9\u30c6\u30e0\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002",
        ADD_TO_CART_SUCCESS : "\u5546\u54c1\u304c\u8ffd\u52a0\u3055\u308c\u307e\u3057\u305f",
        ADD_TO_CART_FAIL : "\u5546\u54c1\u3092\u30ab\u30fc\u30c8\u306b\u8ffd\u52a0\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f",
        ADD_WISH_LIST_FAIL : "\u307b\u3057\u3044\u3082\u306e\u30ea\u30b9\u30c8\u306b\u767b\u9332\u3067\u304d\u307e\u305b\u3093\u3002",
        STORE_STOCK_INFO_FAIL : "\u53d6\u308a\u6271\u3044\u5e97\u8217\u306f\u3042\u308a\u307e\u305b\u3093",
        ALL_ELEMENT_INFO_FAIL : "\u5168\u6210\u5206\u60c5\u5831\u306e\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
        GPS_FAIL : "Cannot get location information."
    },
    //Label Message
    LABEL_MESSAGES : {
        STORE_STOCK_EXISTS : "\u5728\u5eab {0}\u70b9",
        STORE_STOCK_NOT_EXISTS : "\u5728\u5eab\u306a\u3057",
        ALL_ELEMENT_NOT_EXISTS : "\u6210\u5206\u60c5\u5831\u304c\u3042\u308a\u307e\u305b\u3093"
    },
    //Brand Name Replace Policy
    BRAND_NAME_REPLACE_MAPPING : {
        "\uff39\uff35\uff2d\uff2d\uff39\u3000\uff2d\uff21\uff32\uff34" : "YUMMY MART",
        "\uff33\uff21\uff2c\uff2f\uff2e\u3000\uff42\uff59\u3000\uff30\uff2a" : "SALON by PEACHJOHN",
        "\uff30\uff2a\u3000\uff22\uff25\uff21\uff35\uff34\uff39" : "PJ BEAUTY",
        "\uff30\uff2a" : "PEACH JOHN"
    },
    PAGE_IDS : {
        ITEM_DETAIL_PJ   : "WE011002",
        ITEM_DETAILON_PJ : "WE011011",
        ITEM_LIST_PJ     : "WE011001",
        ITEM_LISTON_PJ   : "WE011013"
    },
    REGEXP : {
        STOCK_TEXT_DATE_REMOVER : /\(.*?\)$/
    },
    DEFAULT_PREFECTURE_CODE : 13,
    //Common Popup Panel
    PopupPanelSetting   : {
        MainPanel : {
            tag : "<div></div>",
            attr : {
                "id" : "CommonPopupPanel",
                //"class" : "p-modal",
                "style" : "display:none;max-width:800px;max-height:600px;width:auto;height:auto;margin:auto;background:#fff;text-align:center;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;"
            },
            Content : {
                tag : "<div></div>",
                attr : {
                    //"id" : "CommonPopupPanel",
                    "class" : "p-modal",
                    "style" : "max-width:800px;max-height:600px;width:auto;height:auto;overflow:auto;margin:auto;background:#fff;padding:30px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;"
                },
                CloseBtn: {
                    tag: "<button></button>",
                    attr: {
                        "class": "c-btn c-btn--white closeBtn",
                        "style" : "display:none;"
                    },
                    text: "\u00d7 \u9589\u3058\u308b"
                }
            },
            CloseBtnFloat : {
                tag : "<button></button>",
                attr : {
                    "title" : "Close (Esc)",
                    "type" : "button",
                    "class" : "CloseBtnFloat",
                    "style" : "top:-44px;overflow:visible;cursor:pointer;background:transparent;border:0;-webkit-appearance:none;display:block;outline:none;margin:0;padding:0;z-index:1046;box-shadow:none;touch-action:manipulation;width:44px;height:44px;line-height:44px;position:absolute;right:0;text-decoration:none;text-align:center;opacity:0.65;color:#FFF;font-style:normal;font-size:28px;font-family:Arial,Baskerville,monospace;-webkit-user-select:none;-moz-user-select:none;user-select:none;"
                },
                text : "\u00d7",
                mouseenter : function() {
                    jQuery("#CommonPopupPanel > .CloseBtnFloat").css("opacity", "1");
                },
                mouseleave : function() {
                    jQuery("#CommonPopupPanel > .CloseBtnFloat").css("opacity", "0.65");
                }
            }
        }
    },
    //Common Overlay
    OverlaySetting   : {
        OverlayPanel : {
            tag : "<div></div>",
            attr : {
                "id" : "CommonOverlay",
                "class" : "overlay",
                "style" : "display:none;position:fixed;top:0;left:0;z-index:9999;cursor:pointer;width:100%;height:100%;background:rgba(0,0,0,0.8);"
            },
            Loading : {
                tag : "<div></div>",
                attr : {
                    "style" : "display:none;width:100%;height:100%;position:absolute;left:0px;top:0px;background:rgb(255, 255, 255);z-index:999999;background-image:url(data:image/gif;base64,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);background-position:center;background-repeat:no-repeat;"
                }
            }
        }
    },
    //Selected System Date
    SYS_DATE_SETTING   : {
        "momo.preview-testsite.peachjohn.co.jp" : "2019/07/31 15:00:00",
        "09ngs-momo.qaenv-ext.peachjohn.co.jp" : "2019/07/31 15:00:00"
    },
    //BlockList of LINE Connect
    LINE_CONNECT_BLOCK : ["/app/lbi/common/header.lbi", "/app/lbi/common/sp-menu.lbi", "/app/lbi/common/footer.lbi", "/app/lbi/member/regist/rt_ranking1.lbi", "/app/lbi/member/regist/rt_userhistory.lbi", "/common/front/library/cust-complete-txt.lbi"]
};

/**
 * PagePolicy Area.
 */
function PagePolicy() {}
PagePolicy.prototype = {
    //Page Form Data
    formDataPool           : {},
    setFormData            : function(name, value) {
        this.formDataPool[name] = value;
    },
    getFormData            : function(name) {
        var retValue = this.formDataPool[name];
        if (typeof retValue == "undefined") {
            retValue = null;
        }
        return retValue;
    },
    clearFormData          : function() {
        this.formDataPool = {};
    },
    removeFormData         : function(name) {
        this.formDataPool[name] = undefined;
        try {
            delete this.formDataPool[name];
        }catch(e){}
    },
    //Page Parameter
    parameterPool         : {},
    clearParameter        : function() {
        this.parameterPool = {};
    },
    removeParameter  : function(paramName) {
        this.parameterPool[paramName] = undefined;
        try {
            delete this.parameterPool[paramName];
        }catch(e){}
    },
    removeParameterValue : function(paramName, target) {
        var retValue = false;
        var paramValue = this.parameterPool[paramName];
        if (CommonUtils.isNotNull(paramValue)) {
            if (jQuery.isArray(paramValue)) {
                var index = jQuery.inArray(target, paramValue);
                if (index > -1) {
                    paramValue.splice(index,1);
                    retValue = true;
                }
            } else if (jQuery(paramValue).is(target)) {
                this.removeParameter(paramName);
            }
        }
        return retValue;
    },
    putParameter           : function(paramName, paramValue) {
        this.parameterPool[paramName] = paramValue;
    },
    addParameter           : function(paramName, paramValue) {
        var param = this.parameterPool[paramName];
        if (!jQuery.isArray(param)) {
            param = jQuery.makeArray(param);
        }
        param = jQuery.merge(param, [paramValue]);
        this.parameterPool[paramName] = param;
    },
    getParameter           : function(paramName) {
        var retValue = this.parameterPool[paramName];
        if (typeof retValue == "undefined") {
            retValue = null;
        }
        return retValue;
    },
    //Common Data Info
    commonDataInfo         : {},
    putCommonData          : function(dataName, dataValue) {
        if (typeof dataValue == "undefined") {
            dataValue = null;
        }
        this.commonDataInfo[dataName] = dataValue;
    },
    removeCommonData       : function(dataName) {
        this.commonDataInfo[dataName] = undefined;
        try {
            delete this.commonDataInfo[dataName];
        }catch(e){}
    },
    clearCommonData        : function() {
        this.commonDataInfo = {};
    },
    existCommonData        : function(dataName) {
        var retValue = false;
        if (typeof this.commonDataInfo[dataName] != "undefined") {
            retValue = true;
        }
        return retValue;
    },
    getCommonData          : function(dataName) {
        var retValue = this.commonDataInfo[dataName];
        if (typeof retValue == "undefined") {
            retValue = null;
        }
        return retValue;
    }
}

/**
 * Global Variable.
 */
//Common PagePolicy
var pagePolicy = new PagePolicy();
pagePolicy.putCommonData(COMMON_CONSTS.COMMON_DATA_API.REQUEST.LOGIN_STATUS);
pagePolicy.putCommonData(COMMON_CONSTS.COMMON_DATA_API.REQUEST.CART_TOTAL_COUNT);
jQuery(document).ready(function(){
    CommonUtils.getCommonData(pagePolicy);
});
//Device
var currentDevice = (function(u) {
    return {
        Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
        Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
    };
})(window.navigator.userAgent.toLowerCase());
//Num of Contents in Loading(CommonUtils.loadContents)
loadingContentsCount = 0;