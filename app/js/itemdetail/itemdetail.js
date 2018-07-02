/** 
 *    @fileoverview For front page
 *    @version 2016-12-21
 *    @require jQuery Ver.1.11.2 and above
 *    @require lib.js(jQuery.Cookie)
 *    @require Slick Ver.1.5.9 and above
 *    @require Slidebars Ver.0.10.3 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @description For Item Detail page
 */
//Color Photo -----------------------------------------------
var detailPageInstance = null;
var FCStoreList = ["4102"];
function processScene7ImageData(respJson) {
    //Analyze Response Data from Scene7
    if (typeof respJson == "undefined" || respJson == null) {
        detailPageInstance.ColorImageInfo = {};
    } else {
        detailPageInstance.ColorImageInfo = CommonUtils.reformSecen7Data(respJson);
    }
    //Build Item Detail Photo(pc only)
    if (!CommonUtils.isTabletPanel()) {
        detailPageInstance.buildItemDetailPhoto();
    }
    //Call Color Click Event
    if (detailPageInstance.SelectedColorComponents != null && detailPageInstance.completeCount > 0) {
        detailPageInstance.SelectedColorComponents.ColorImage.click();
    }
    
    detailPageInstance.completeCount++;
}
//Item Detail Page -----------------------------------------------
function ItemDetailPage(parameters) {
    this.initialize(parameters);
}
ItemDetailPage.prototype = {
    PAGE_PARAMETERS : {
        ACTION_ADD_WISH_LIST : "doAddWish",
        ACTION_READ_REVIEW : "doReadReview",
        ACTION_ADD_REVIEW : "doAddReview"
    },
    COLOR_IMAGE_PARAM    : "?wid=100&op_usm=1,1,10,0&resMode=sharp2",
    SHOPPING_IMAGE_PARAM : "?wid=95&op_usm=1,1,10,0&resMode=sharp2",
    PREVIEW_IMAGE_PARAM  : "?wid=640&op_usm=1,1,10,0&resMode=sharp2",
    ITEM_ADDITIONAL_CSV  : "/app/config/itemdetail/{0}.csv",
    SP_HEADER_HEIGHT : 50,
    LOAD_COMPLETE_COUNT : 2,
    completeCount : 0,
    ITEM_COMPONENTS : {
        PAGE_CONTENTS : "#contents",
        //SCREEN_ID : "#screen_id",
        CLIP_LIST_BTN : "#cliplistBtn",
        ITEM_NAME : "#itemName",
        ITEM_ICON : "#itemIcon",
        SALE_PRICE : "#salePrice",
        SIZE_GUIDE : "#check-size a",
        COLOR_PANEL : "#selectColor",
        COLOR_SELECTOR : "#selectColorList",
        SIZE_SELECTOR_PANEL : "#sizeSelectorPanel",
        SIZE_SELECTOR : "#sizeList",
        STORE_STOCK_PANEL : "#storeStockTable",
        STORE_STOCK_BTN : "#storeStockBtn",
        
        SKU_SIZE_DETAIL : "#skuSizeDetail",
        SKU_PRICE : "#skuPrice",
        SKU_CODE : "#skuCode",
        SKU_INVENTORY_TITLE : "#skuInventoryTitle",
        SKU_INVENTORY : "#skuInventory",
        SKU_AMOUNT : "#skuAmount",
        PREVIEW_IMAGE_SLIDER : "#slider",
        PREVIEW_IMAGE_CAROUSEL : "#carousel",
        PREVIEW_IMAGE_CAROUSEL_SLIDES : null,
        
        QUANTITY_MINUS : ".selectQuantity .minus",
        QUANTITY_PLUS : ".selectQuantity .plus",
        QUANTITY_VALUE : "#skuAmount",
        ADD_TO_CART : "#btnAddCart",
        ADD_TO_WISH_LIST : "#btnWishList",
        REVIEW_VOICE_TAB_LIST : ".reviewVoiceArea .tab > li",
        REVIEW_VOICE_CONTENT_LIST : ".reviewVoiceArea .content > li",
        PRODUCT_DETAIL : "#productDetail",
        PRODUCT_DETAIL_WRAP : "#productDetail > .wrap",
        CUSTOMER_REVIEW : "#customerReview",
        REVIEW_STAR_DETAIL : "#reviewStarDetail",
        STAFF_VOICE : "#staffVoice",
        
        RTOASTER_ADD_TO_CART_POPUP : "#RtoasterAddToCart",
        RELATED_ITEMS_SLIDE : ".coordinateItems .slides",
        RECOMMEND_ITEMS_SLIDE : ".recommendItems .slides",
        FOOT_FIXED_NAVI : "#footFixedBtn",
        REVIEW_VOICE_AREA : "#reviewVoiceArea",
        SP_RECOMMEND_ITEMS : "#rt_auto_detail6",
        
        MAIN_INFO_PANEL : "#main"
    },
    //Item(ColorCode) and Video's URL
    ITEM_VIDEO_ITEMS : {
        "1018070": {
            "101807001": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018070?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018070.mp4"
                ],
                "index": 2
            },
            "101807002": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018070?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018070.mp4"
                ],
                "index": 2
            },
            "101807003": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018070?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018070.mp4"
                ],
                "index": 2
            },
            "101807004": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018070?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018070.mp4"
                ],
                "index": 2
            },
            "101807005": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018070?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018070.mp4"
                ],
                "index": 2
            },
            "101807006": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018070?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018070-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018070.mp4"
                ],
                "index": 2
            }
        },
        "1018470": {
            "101847001": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018470?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018470.mp4"
                ],
                "index": 2
            },
            "101847002": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018470?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018470.mp4"
                ],
                "index": 2
            },
            "101847003": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018470?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018470.mp4"
                ],
                "index": 2
            },
            "101847004": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018470?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018470.mp4"
                ],
                "index": 2
            },
            "101847005": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018470?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018470.mp4"
                ],
                "index": 2
            },
            "101847006": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1018470?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1018470-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1018470.mp4"
                ],
                "index": 2
            }
        },
        "1019043": {
            "101904301": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904302": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904303": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904304": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904305": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904306": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904307": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904308": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904309": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904310": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            },
            "101904311": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1019043?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1019043-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1019043.mp4"
                ],
                "index": 2
            }
        },
        "1020625": {
            "102062501": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062502": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062503": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062504": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062505": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062506": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062507": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062508": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062509": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062510": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            },
            "102062511": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020625?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020625-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020625.mp4"
                ],
                "index": 2
            }
        },
        "1020653": {
            "102065300": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020653?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020653",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020653.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020653-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020653.mp4"
                ],
                "index": 2
            }
        },
        "1020660": {
            "102066000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020660?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020660",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020660.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020660-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020660.mp4"
                ],
                "index": 2
            }
        },
        "1020724": {
            "102072400": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020724?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020724",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020724.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020724-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020724.mp4"
                ],
                "index": 2
            }
        },
        "1020793": {
            "102079301": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020793?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020793",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020793.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020793-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020793.mp4"
                ],
                "index": 2
            },
            "102079302": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020793?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020793",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020793.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020793-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020793.mp4"
                ],
                "index": 2
            }
        },
        "1020797": {
            "102079701": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020797?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020797",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020797.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020797-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020797.mp4"
                ],
                "index": 2
            },
            "102079702": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020797?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020797",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020797.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020797-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020797.mp4"
                ],
                "index": 2
            }
        },
        "1020799": {
            "102079900": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020799?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020799",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020799.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020799-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020799.mp4"
                ],
                "index": 2
            }
        },
        "1020801": {
            "102080100": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020801?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020801",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020801.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020801-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020801.mp4"
                ],
                "index": 2
            }
        },
        "1020802": {
            "102080200": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020802?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020802",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020802.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020802-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020802.mp4"
                ],
                "index": 2
            }
        },
        "1020841": {
            "102084100": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020841?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020841",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020841.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020841-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020841.mp4"
                ],
                "index": 2
            }
        },
        "1020860": {
            "102086000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020860?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020860",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020860.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020860-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020860.mp4"
                ],
                "index": 2
            }
        },
        "1020870": {
            "102087000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020870?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020870",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020870.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020870-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020870.mp4"
                ],
                "index": 2
            }
        },
        "1020901": {
            "102090100": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020901?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020901",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020901.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020901-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020901.mp4"
                ],
                "index": 2
            }
        },
        "1020950": {
            "102095000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020950?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020950",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020950.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020950-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020950.mp4"
                ],
                "index": 2
            }
        },
        "1020951": {
            "102095100": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020951?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020951",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020951.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020951-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020951.mp4"
                ],
                "index": 2
            }
        },
        "1020971": {
            "102097100": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020971?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020971",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020971.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020971-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020971.mp4"
                ],
                "index": 2
            }
        },
        "1020990": {
            "102099000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1020990?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020990",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020990.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1020990-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1020990.mp4"
                ],
                "index": 2
            }
        },
        "1021024": {
            "102102400": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021024?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021024",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021024.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021024-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021024.mp4"
                ],
                "index": 2
            }
        },
        "1021252": {
            "102125200": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021252?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021252",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021252.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021252-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021252.mp4"
                ],
                "index": 2
            }
        },
        "1021254": {
            "102125400": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021254?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021254",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021254.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021254-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021254.mp4"
                ],
                "index": 2
            }
        },
        "1021330": {
            "102133000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021330?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021330",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021330.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021330-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021330.mp4"
                ],
                "index": 2
            }
        },
        "1021496": {
            "102149600": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021496?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021496",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021496.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021496-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021496.mp4"
                ],
                "index": 2
            }
        },
        "1021522": {
            "102152200": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021522?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021522",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021522.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021522-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021522.mp4"
                ],
                "index": 2
            }
        },
        "1021523": {
            "102152300": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021523?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021523",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021523.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021523-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021523.mp4"
                ],
                "index": 2
            }
        },
        "1021563": {
            "102156300": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021563?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021563",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021563.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021563-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021563.mp4"
                ],
                "index": 2
            }
        },
        "1021702": {
            "102170200": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021702?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021702",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021702.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021702-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021702.mp4"
                ],
                "index": 2
            }
        },
        "1021704": {
            "102170400": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021704?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021704",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021704.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021704-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021704.mp4"
                ],
                "index": 2
            }
        },
        "1021710": {
            "102171000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021710?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021710",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021710.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021710-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021710.mp4"
                ],
                "index": 2
            }
        },
        "1021775": {
            "102177500": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021775?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021775",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021775.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021775-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021775.mp4"
                ],
                "index": 2
            }
        },
        "1021776": {
            "102177600": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021776?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021776",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021776.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021776-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021776.mp4"
                ],
                "index": 2
            }
        },
        "1021792": {
            "102179200": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021792?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021792",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021792.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021792-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021792.mp4"
                ],
                "index": 2
            }
        },
        "1021886": {
            "102188600": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021886?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021886",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021886.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021886-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021886.mp4"
                ],
                "index": 2
            }
        },
        "1021887": {
            "102188700": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021887?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021887",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021887.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021887-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021887.mp4"
                ],
                "index": 2
            }
        },
        "1021902": {
            "102190200": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1021902?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021902",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021902.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1021902-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1021902.mp4"
                ],
                "index": 2
            }
        },
        "1022000": {
            "102200000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1022000?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022000",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022000.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022000-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1022000.mp4"
                ],
                "index": 2
            }
        },
        "1022010": {
            "102201000": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1022010?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022010",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022010.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022010-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1022010.mp4"
                ],
                "index": 2
            }
        },
        "1022061": {
            "102206100": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1022061?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022061",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022061.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022061-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1022061.mp4"
                ],
                "index": 2
            }
        },
        "1022071": {
            "102207100": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1022071?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022071",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022071.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022071-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1022071.mp4"
                ],
                "index": 2
            }
        },
        "1022073": {
            "102207300": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1022073?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022073",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022073.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022073-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1022073.mp4"
                ],
                "index": 2
            }
        },
        "1022093": {
            "102209300": {
                "poster": "//peachjohn.scene7.com/is/image/PeachJohn/1022093?fit=constrain,1&wid=1024&hei=715",
                "video": [
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022093",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022093.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/1022093-AVS.m3u8",
                    "//peachjohn.scene7.com/is/content/PeachJohn/movie/1022093.mp4"
                ],
                "index": 2
            }
        }
    },
    ItemData : null,
    ColorImageInfo : null,
    SelectedColorComponents : null,
    SizeInfoList : null,
    AttentionItemSetting : {
        AttentionItem : {
            tag : "<span></span>",
            attr : {
                "style" : "color:#ff0000;font-weight:bold;"
            }
        }
    },
    ImageItemSetting : {
        ImageItem : {
            tag : "<li></li>",
            Image : {
                tag : "<img></img>"
            }
        }
    },
    VideoItemSetting : {
        VideoItem : {
            tag : "<li></li>",
            attr : {
                "data-type" : "video",
                "style" : "position:relative;"
            },
            Video : {
                tag : "<video></video>",
                attr : {
                    "style" : "width:100%;height:auto;",
                    "muted" : "",
                    //"loop" : "",
                    //"autoplay" : "autoplay",
                    "preload" : "auto"
                }
            },
            PlayButton : {
                tag : "<div></div>",
                attr : {
                    "style" : "width:80px;height:80px;pointer-events:none;position:absolute;top:0px;left0px;z-index:10000;opacity:1;background-position:-0px -320px;background-image:url(//peachjohn.scene7.com/is/image/Scene7SharedAssets/IconEffect_video_sprite?scl=1&fmt=png-alpha);"
                }
            }
        }
    },
    ColorItemSetting : {
        ColorItem : {
            tag : "<li></li>",
            ColorImagePanel : {
                tag : "<div></div>",
                attr : {
                    "class" : "pic"
                },
                ColorImage : {
                    tag : "<img></img>"
                }
            },
            ColorInfoPanel : {
                tag : "<p></p>",
                ColorIcon1 : {
                    tag : "<span></span>"
                },
                ColorIcon2 : {
                    tag : "<span></span>"
                }
            }
        }
    },
    FavStoreStockSetting : {
        StoreStockRow : {
            tag : "<tr></tr>",
            StoreTitle : {
                tag : "<th></th>",
                FavIcon : {
                    tag : "<span></span>",
                    attr : {
                        "class" : "ico active"
                    }
                },
                StoreName : {
                    tag : "<a></a>",
                    attr : {
                        "target" : "_blank",
                        "href" : "javascript:void(0)"
                    }
                }
            },
            StockInfo : {
                tag : "<td></td>",
                attr : {
                    "name" : "storeStockAmount"
                },
                text : "--"
            }
        }
    },
    AddToCartPopupSetting : {
        MainPanel : {
            tag : "<div></div>",
            attr : {
                "id" : "item-popup",
                "class" : "item-popup"
            },
            Info : {
                tag : "<div></div>",
                attr : {
                    "class" : "shopping-info"
                },
                InfoHeader : {
                    tag : "<header></header>",
                    text : "ADD to CART",
                    HeaderMessage : {
                        tag : "<span></span>",
                        text : "\u5546\u54c1\u304c\u8ffd\u52a0\u3055\u308c\u307e\u3057\u305f"
                    }
                },
                InfoBody : {
                    tag : "<div></div>",
                    attr : {
                        "class" : "box"
                    },
                    Section : {
                        tag : "<section></section>",
                        ImagePanel : {
                            tag : "<figure></figure>",
                            Image : {
                                tag : "<img></img>",
                                attr : {
                                    "width" : "95",
                                    "height" : "111"
                                    ,"src" : "//peachjohn.scene7.com/is/image/PeachJohn/DUMMY?wid=190&amp;op_usm=1%2C1%2C10%2C0&amp;resMode=sharp2"
                                }
                            }
                        },
                        DataHolder : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "holder"
                            },
                            DataTable : {
                                tag : "<table></table>",
                                DataHead : {
                                    tag : "<thead></thead>",
                                    TitleRow : {
                                        tag : "<tr></tr>",
                                        Title : {
                                            tag : "<th></th>",
                                            attr : {
                                                "colspan" : "2"
                                            },
                                            TitleText : {
                                                tag : "<span></span>"
                                            },
                                            ItemPrice : {
                                                tag : "<span></span>"
                                            }
                                        }
                                    }
                                },
                                DataBody : {
                                    tag : "<tbody></tbody>",
                                    ColorRow : {
                                        tag : "<tr></tr>",
                                        ColorTitle : {
                                            tag : "<th></th>",
                                            text : "\u30ab\u30e9\u30fc",
                                        },
                                        ColorValue : {
                                            tag : "<td></td>",
                                            ColorValueBlock : {
                                                tag : "<span></span>",
                                                attr : {
                                                    "class" : "color"
                                                }
                                            }
                                        }
                                    },
                                    SizeRow : {
                                        tag : "<tr></tr>",
                                        SizeTitle : {
                                            tag : "<th></th>",
                                            text : "\u30b5\u30a4\u30ba",
                                        },
                                        SizeValue : {
                                            tag : "<td></td>",
                                            SizeValueBlock : {
                                                tag : "<span></span>",
                                                attr : {
                                                    "class" : "size"
                                                }
                                            }
                                        }
                                    },
                                    AmountRow : {
                                        tag : "<tr></tr>",
                                        AmountTitle : {
                                            tag : "<th></th>",
                                            text : "\u6570\u91cf",
                                        },
                                        AmountValue : {
                                            tag : "<td></td>",
                                            AmountValueBlock : {
                                                tag : "<span></span>",
                                                attr : {
                                                    "class" : "amount"
                                                },
                                                text : "1"
                                            },
                                            AmountValueAppend : {
                                                tag : "<span></span>",
                                                text : "\u500b"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                TotalPrice : {
                    tag : "<div></div>",
                    attr : {
                        "class" : "price"
                    },
                    text : "\u5408\u3000\u8a08",
                    TotalPriceValue : {
                        tag : "<span></span>"
                    }
                },
                ErrMessage : {
                    tag : "<div></div>",
                    attr : {
                        "style" : "display:none;border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc;font-size:16px;line-height:1;padding:10px 10px 9px;"
                    }
                }
            },
            DeliveryMsgHolder : {
                tag : "<div></div>",
                attr : {
                    "class" : "popup-message-holder"
                }
            },
            Footer : {
                tag : "<footer></footer>",
                CloseBtn : {
                    tag : "<a></a>",
                    attr : {
                        "id" : "product-selector-dialog-close",
                        "class" : "btn-close white",
                        "href" : "javascript:void(0);"
                    },
                    CloseBtnText : {
                        tag : "<span></span>",
                        text : "\u9589\u3058\u308b"
                    },
                    click : function() {
                        $("#item-popup").remove();
                    }
                },
                ShowCartBtn : {
                    tag : "<a></a>",
                    attr : {
                        "class" : "btn-view",
                        "href" : COMMON_CONSTS.URLS.SHOPPING_BAG_PAGE
                    },
                    text : "\u30ab\u30fc\u30c8\u3092\u898b\u308b"
                }
            },
            RtoasterArea : {
                tag : "<div></div>"
            },
            Loading : {
                tag : "<div></div>",
                attr : {
                    "style" : "width:100%;height:100%;position:absolute;left:0px;top:0px;background:rgb(255, 255, 255);z-index:999999;background-image:url(data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=);background-position:center;background-repeat:no-repeat;"
                }
            }
        }
    },
    //All Element
    AllElementComponents : {},
    AllElementSetting   : {
        ModalWrap : {
            tag : "<div></div>",
            attr : {
                "id" : "AllElementPanel",
                "class" : "seibunModalWrap modalWrap",
                "style" : "display:none;"
            },
            Title : {
                tag : "<p></p>",
                attr : {
                    "class" : "title"
                },
                text : "\u5168\u6210\u5206\u30fb\u4f7f\u7528\u4e0a\u306e\u6ce8\u610f"
            },
            ItemName : {
                tag : "<p></p>",
                attr : {
                    "class" : "itemName"
                }
            },
            Detail : {
                tag : "<p></p>",
                attr : {
                    "class" : "about"
                }
            },
            CloseBtn : {
                tag : "<div></div>",
                attr : {
                    "class" : "closeBtn popup-modal-close"
                },
                text : "\u00d7 \u9589\u3058\u308b"
            },
            CloseBtnFloat : {
                tag : "<button></button>",
                attr : {
                    "title" : "Close (Esc)",
                    "type" : "button",
                    "class" : "mfp-close"
                },
                text : "\u00d7"
            }
        }
    },
    //Others
    ShadowOverlayComponents : {},
    ShadowOverlaySetting   : {
        OverlayPanel : {
            tag : "<div></div>",
            attr : {
                "id" : "ShadowOverlay",
                "class" : "overlay",
                "style" : "display:none;position:fixed;top:0;left:0;z-index:9999;cursor:pointer;width:100%;height:100%;background:rgba(0,0,0,0.8);"
            },
            Loading : {
                tag : "<div></div>",
                attr : {
                    "style" : "display:none;width:100%;height:100%;position:absolute;left:0px;top:0px;background:rgb(255, 255, 255);z-index:999999;background-image:url(data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=);background-position:center;background-repeat:no-repeat;"
                }
            }
        }
    },
    FCStoreMessages : {
        InquiryMessage : "\u554f\u3044\u5408\u308f\u305b"
    },
    
    initialize : function(parameters) {
        var instance = this;
        detailPageInstance = this;
        //Validation
        if (typeof parameters == "undefined" || typeof parameters.itemData == "undefined") {
            return;
        } else {
            instance.ItemData = parameters.itemData;
            //Do Brand Name Replacement
            instance.ItemData.brandName = CommonUtils.getBrandReplacement(instance.ItemData.brandName);
        }
        //Initialize SkuInfo
        instance.SizeInfoList = {};
        //Initialize Page Component 
        jQuery.each(this.ITEM_COMPONENTS, function(name, value){
            if (value != null) {
                instance.ITEM_COMPONENTS[name] = $(value);
            }
        });
    },
    //Common Process
    build : function() {
        var instance = this;
        //Item Data Validation
        if (instance.ItemData == null || instance.ItemData.itemCode.length == 0) {
            //Not Exist Item
            return;
        } else if (instance.ItemData.colorInfo.length == 0) {
            console.error("No ColorInfo is exists.");
            return;
        }
        //Get Scene7 image data
        var imgSets = jQuery.map(instance.ItemData.colorInfo, function(colorInfo) {
            return colorInfo.imgSet;
        });
        if (imgSets == null) {
            imgSets = new Array();
        }
        imgSets.push(instance.ItemData.commonColorCode);
        CommonUtils.findItemColorImages(imgSets, "processScene7ImageData");
        //Build Item
        instance.buildItemPanel();
        //Build Page
        instance.buildPageComponent();
        //Build Favorite Store Stock
        instance.buildFavStoreStock();
        
        //Disp The Color
        if (detailPageInstance.completeCount > 0) {
            instance.SelectedColorComponents.ColorImage.click();
        }
        
        //Load Additional ItemInfo
        CommonUtils.loadCsv({
            filePath: CommonUtils.stringFormat(instance.ITEM_ADDITIONAL_CSV, [instance.ItemData.itemCode]), 
            callBack: instance.buildAddInfo
        })
        
        instance.completeCount++;
    },
    buildFavStoreStock : function() {
        var instance = this;
        
        var urlParams = {};
        //FavStore
        var favStore = $.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE);
        if (COMMON_CONSTS.SYSTEM_CONDITION.LOW_LOAD_MODE
            || typeof instance.ITEM_COMPONENTS.STORE_STOCK_PANEL === "undefined"
            || !CommonUtils.isNotNull(favStore) || (favStore = JSON.parse(favStore)).length == 0) {
            return;
        }
        urlParams[COMMON_CONSTS.STORE_STOCK_INFO_API.REQUEST.FAV_STORE_CODE] = favStore;
        //ItemCode
        urlParams[COMMON_CONSTS.STORE_STOCK_INFO_API.REQUEST.ITEM_CODE] = instance.ItemData.itemCode;

        jQuery.ajax({
            method       :    "post",
            async        :    true,
            dataType     :    "json",
            timeout      :    10000,
            url          :    COMMON_CONSTS.URLS.STORE_STOCK_INFO_API,
            data         :    JSON.stringify(urlParams),
            contentType  :    "application/json; charset=UTF-8",
            beforeSend   : function(xhr, settings){
                //Clear StoreStock Panel
                instance.ITEM_COMPONENTS.STORE_STOCK_PANEL.empty();
            },
            complete     : function(xhr, status){
                //Show StoreStock Panel
                instance.ITEM_COMPONENTS.STORE_STOCK_PANEL.css("display", "");
            },
            success      : function(responseText, status, xhr){
                if (responseText.status == COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS) {
                    //Sort by FavStore added order
                    responseText.storeStock.sort(function(val1, val2) {
                        return $.inArray(val1.storeCode, favStore) - $.inArray(val2.storeCode, favStore);
                    });
                    jQuery.each(responseText.storeStock, function (index, storeInfo) {
                        //SUCCESS
                        var storeStockComponents = {};
                        CommonUtils.createHtmlConponent(instance.FavStoreStockSetting, storeStockComponents, null);
                        // Fav Icon click
                        storeStockComponents.FavIcon.click(function() {
                            if ($(this).hasClass("active")) {
                                $(this).removeClass("active");
                                CommonUtils.removeFavStore(storeInfo.storeCode);
                            } else {
                                $(this).addClass("active");
                                CommonUtils.saveFavStore(storeInfo.storeCode);
                            }
                        });
                        // Store Name
                        storeStockComponents.StoreName.text(storeInfo.dispStoreName);
                        // Store Link
                        if (CommonUtils.isNotNull(storeInfo.storeUrl)) {
                            storeStockComponents.StoreName.attr("href", storeInfo.storeUrl);
                            
                        } else {
                            storeStockComponents.StoreName.attr("style", "text-decoration:none;cursor:default;");
                        }
                        storeStockComponents.StoreStockRow.attr("storeCode", storeInfo.storeCode);
                        //jQuery.data(storeStockComponents.StoreStockRow, "storeCode", storeInfo.storeCode);
                        instance.ITEM_COMPONENTS.STORE_STOCK_PANEL.append(storeStockComponents.StoreStockRow);
                        // Store Stock Info
                        jQuery.each(storeInfo.skuStockList, function (index, skuInfo) {
                            // Merge to SizeInfoList
                            if (typeof instance.SizeInfoList[skuInfo.skuCode] == "undefined") {
                                instance.SizeInfoList[skuInfo.skuCode] = {};
                            }
                            var storeStock = instance.SizeInfoList[skuInfo.skuCode].storeStock;
                            if (!jQuery.isArray(storeStock)) {
                                storeStock = jQuery.makeArray(storeStock);
                            }
                            storeStock = jQuery.merge(storeStock, [{storeCode : storeInfo.storeCode, storeStockAmount : skuInfo.stockAmount, storeStockURL : storeInfo.storeUrl}]);
                            instance.SizeInfoList[skuInfo.skuCode].storeStock = storeStock;
                        });
                    });
                    //Call Color Click Event
                    if (instance.SelectedColorComponents != null) {
                        instance.SelectedColorComponents.ColorImage.click();
                    }
                } else {
                    //ERROR
                    instance.ITEM_COMPONENTS.STORE_STOCK_PANEL.text(COMMON_CONSTS.MESSAGES.STORE_STOCK_INFO_FAIL);
                }
            },
            error        : function(xhr,status,error){
                //ERROR
                instance.ITEM_COMPONENTS.STORE_STOCK_PANEL.text(COMMON_CONSTS.MESSAGES.STORE_STOCK_INFO_FAIL);
            }
        });
    },
    buildPageComponent : function() {
        var instance = this;
        //All Element
        if (typeof instance.ITEM_COMPONENTS.PRODUCT_DETAIL != "undefined") {
            var allElementBtn = $(".ingredientsText");
            if (allElementBtn.length > 0) {
                allElementBtn.click(function() {
                    instance.buildAllElementPanel($(this));
                });
            }
        }
        //Review Voice Tab
        if (typeof instance.ITEM_COMPONENTS.REVIEW_VOICE_TAB_LIST != "undefined") {
            instance.ITEM_COMPONENTS.REVIEW_VOICE_TAB_LIST.click(function() {
                var index = instance.ITEM_COMPONENTS.REVIEW_VOICE_TAB_LIST.index(this);
                instance.ITEM_COMPONENTS.REVIEW_VOICE_CONTENT_LIST.css("display", "none");
                instance.ITEM_COMPONENTS.REVIEW_VOICE_CONTENT_LIST.eq(index).css("display", "block");
                instance.ITEM_COMPONENTS.REVIEW_VOICE_TAB_LIST.removeClass("active");
                $(this).addClass("active");
                return false;
            });
        }
        //Review Detail Btn
        if (typeof instance.ITEM_COMPONENTS.REVIEW_STAR_DETAIL != "undefined") {
            instance.ITEM_COMPONENTS.REVIEW_STAR_DETAIL.click(function() {
                $(this).toggleClass("active");
                $(this).next().fadeToggle(200);
                return false;
            });
        }
        //Related Items
        if (typeof instance.ITEM_COMPONENTS.RELATED_ITEMS_SLIDE != "undefined") {
            instance.ITEM_COMPONENTS.RELATED_ITEMS_SLIDE.owlCarousel({
                items: 3,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [979, 3],
                itemsTablet: [768, 3],
                itemsTabletSmall: false,
                itemsMobile: [479, 2],
                navigation: true,
                pagination: false,
                responsiveBaseWidth: ".coordinateItems .owl-carousel"
            });
        }
        //Recommend Items
        if (typeof instance.ITEM_COMPONENTS.RECOMMEND_ITEMS_SLIDE != "undefined") {
            instance.ITEM_COMPONENTS.RECOMMEND_ITEMS_SLIDE.owlCarousel({
                items: 4,
                itemsDesktop: [1199, 4],
                itemsDesktopSmall: [979, 4],
                itemsTablet: [768, 4],
                itemsTabletSmall: false,
                itemsMobile: [479, 2],
                navigation: true,
                pagination: false,
                responsiveBaseWidth: ".recommendItems .owl-carousel"
            });
        }
        //Foot Fixed Navi
        instance.ITEM_COMPONENTS.FOOT_FIXED_NAVI.css("display", "none");
        //Store Stock
        if (typeof instance.ITEM_COMPONENTS.STORE_STOCK_BTN != "undefined") {
            instance.ITEM_COMPONENTS.STORE_STOCK_BTN.click(function() {
                var dispColorCode = null;
                if (instance.SelectedColorComponents != null) {
                    dispColorCode = instance.SelectedColorComponents.ColorImage.attr("code");
                }
                var dispSkuCode = instance.ITEM_COMPONENTS.SIZE_SELECTOR.val();
                if (typeof dispSkuCode == "undefined") {
                    dispSkuCode = null;
                }
                var storeStock = new StoreStock({itemCode: instance.ItemData.itemCode, dispColorCode: dispColorCode, dispSkuCode: dispSkuCode});
                storeStock.build();
                //SiteCatalyst
                if (typeof s_gi == "function") {
                    var s=s_gi(s_account);
                    s.tl(this,'o','Storestock');
                }
            });
        }
        
        //Tablet Design
        if (CommonUtils.isTabletPanel()) {
            //Navi Menu
            $(window).scroll(function() {
                if ($(window).scrollTop() > 400) {
                    instance.ITEM_COMPONENTS.FOOT_FIXED_NAVI.css("display", "block");
                    instance.ITEM_COMPONENTS.FOOT_FIXED_NAVI.fadeIn(200);
                } else {
                    instance.ITEM_COMPONENTS.FOOT_FIXED_NAVI.fadeOut(200);
                }
            });
            //Item Review Navi
            var itemReviewNavi = instance.ITEM_COMPONENTS.FOOT_FIXED_NAVI.find(".nav01 a");
            if (itemReviewNavi.length > 0) {
                //Height of Header
                itemReviewNavi.click(function(){
                    if (instance.ITEM_COMPONENTS.REVIEW_VOICE_AREA.length > 0) {
                        //Shift the Height of Header
                        var position = instance.ITEM_COMPONENTS.REVIEW_VOICE_AREA.offset().top - instance.SP_HEADER_HEIGHT;
                        $("html, body").animate({scrollTop:position}, 550, "easeOutExpo");
                        return false;
                    }
                });
            }
            //Related Item Navi
            var relatedItemsNavi = instance.ITEM_COMPONENTS.FOOT_FIXED_NAVI.find(".nav02 a");
            if (relatedItemsNavi.length > 0) {
                //Height of Header
                relatedItemsNavi.click(function(){
                    if (instance.ITEM_COMPONENTS.SP_RECOMMEND_ITEMS.length > 0) {
                        //Shift the Height of Header
                        var position = instance.ITEM_COMPONENTS.SP_RECOMMEND_ITEMS.offset().top - instance.SP_HEADER_HEIGHT;
                        $("html, body").animate({scrollTop:position}, 550, "easeOutExpo");
                        return false;
                    }
                });
            }
            //Add To Cart
            var addToCartNavi = instance.ITEM_COMPONENTS.FOOT_FIXED_NAVI.find(".nav03 a");
            if (addToCartNavi.length > 0) {
                addToCartNavi.click(function(){
                    var dispColorCode = null;
                    if (instance.SelectedColorComponents != null) {
                        dispColorCode = instance.SelectedColorComponents.ColorImage.attr("code");
                    }
                    var dispSkuCode = instance.ITEM_COMPONENTS.SIZE_SELECTOR.val();
                    if (typeof dispSkuCode == "undefined") {
                        dispSkuCode = null;
                    }
                    var purchase = new Purchase({itemCode: instance.ItemData.itemCode, dispColorCode: dispColorCode, dispSkuCode: dispSkuCode});
                    purchase.initializePurchasePanel();
                });
            }
        }
        //Mobile Only Design
        if (CommonUtils.isMobile()) {
            //Product Detail
            //var productDetailWrap = instance.ITEM_COMPONENTS.PRODUCT_DETAIL.find("> div");
            //instance.ITEM_COMPONENTS.PRODUCT_DETAIL.find("b").click(function(){
            //    if (productDetailWrap.is(":hidden")) {
            //        $(this).removeClass("none-submenu");
            //        $(this).addClass("active-submenu");
            //        productDetailWrap.slideDown(200);
            //    } else {
            //        $(this).removeClass("active-submenu");
            //        $(this).addClass("none-submenu");
            //        productDetailWrap.slideUp(200);
            //    }
            //});
            //Customer Review 
            var reviewWrap = instance.ITEM_COMPONENTS.CUSTOMER_REVIEW.find(".wrap");
            //reviewWrap.hide();
            instance.ITEM_COMPONENTS.CUSTOMER_REVIEW.find("b").addClass("active");
            instance.ITEM_COMPONENTS.CUSTOMER_REVIEW.find("b").click(function(){
                if (reviewWrap.is(":hidden")) {
                    $(this).addClass("active");
                    reviewWrap.slideDown(200);
                } else {
                    $(this).removeClass("active");
                    reviewWrap.slideUp(200);
                }
            });
            //Staff Voice
            var staffVoiceWrap = instance.ITEM_COMPONENTS.STAFF_VOICE.find(".wrap");
            staffVoiceWrap.hide();
            instance.ITEM_COMPONENTS.STAFF_VOICE.find("b").click(function(){
                if (staffVoiceWrap.is(":hidden")) {
                    $(this).addClass("active");
                    staffVoiceWrap.slideDown(200);
                } else {
                    $(this).removeClass("active");
                    staffVoiceWrap.slideUp(200);
                }
            });
            //
        }
        //resize init
        $(window).on("load resize", initResize);
        function initResize() {
            if (CommonUtils.isTabletPanel()) {
                instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL.insertAfter('.itemDetailContainer .selectArea .selectColor');
                instance.ITEM_COMPONENTS.ITEM_ICON.insertBefore('.itemDetailContainer .picArea');
                //$('.itemDetailList').insertAfter('.productDetail div .subText');
                //$('.itemDetailPic').insertBefore('.itemDetailList');
            } else {
                instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL.insertAfter('.itemDetailContainer .picArea #slider');
                instance.ITEM_COMPONENTS.ITEM_ICON.insertBefore('.itemDetailContainer .selectArea .headInfo .itemName');
                //$('.itemDetailList').insertBefore('.reviewVoiceArea');
                //$('.itemDetailPic').insertBefore('.itemDetailList');
            }
        }
    },
    buildItemPanel : function() {
        var instance = this;
        //Item Icon
        instance.ITEM_COMPONENTS.ITEM_ICON.empty();
        if (instance.ItemData.iconList.length > 0) {
            jQuery.each(instance.ItemData.iconList, function (index, icon) {
                var iconComponents = {};
                CommonUtils.createHtmlConponent(instance.ImageItemSetting, iconComponents, null);
                iconComponents.Image.attr("src", icon.iconPath);
                iconComponents.Image.attr("alt", icon.iconName);
                instance.ITEM_COMPONENTS.ITEM_ICON.append(iconComponents.ImageItem);
            });
        }
        //Item BrandName
        instance.ITEM_COMPONENTS.ITEM_NAME.empty();
        if (instance.ItemData.brandName.length > 0) {
            instance.ITEM_COMPONENTS.ITEM_NAME.append(instance.ItemData.brandName);
            instance.ITEM_COMPONENTS.ITEM_NAME.append($("<br />"));
        }
        instance.ITEM_COMPONENTS.ITEM_NAME.append(instance.ItemData.itemName);
        //Item Price
        instance.ITEM_COMPONENTS.SALE_PRICE.empty();
        var exSalePrice = instance.ItemData.priceInfo.exSalePrice;
        var salePrice = instance.ItemData.priceInfo.salePrice;
        var mutiPrice = instance.ItemData.priceInfo.mutiPrice;
        if (exSalePrice > salePrice) {
            var salePriceComponents = {};
            CommonUtils.createHtmlConponent(instance.AttentionItemSetting, salePriceComponents, null);
            salePriceComponents.AttentionItem.text("\u00A5" + CommonUtils.numberFormat(salePrice))
            instance.ITEM_COMPONENTS.SALE_PRICE.append("\u00A5" + CommonUtils.numberFormat(exSalePrice));
            instance.ITEM_COMPONENTS.SALE_PRICE.append("\u2192");
            instance.ITEM_COMPONENTS.SALE_PRICE.append(salePriceComponents.AttentionItem);
        } else {
            instance.ITEM_COMPONENTS.SALE_PRICE.append("\u00A5" + CommonUtils.numberFormat(salePrice));
        }
        if (mutiPrice) {
            instance.ITEM_COMPONENTS.SALE_PRICE.append("\uff5e");
        }
        instance.ITEM_COMPONENTS.SALE_PRICE.append(instance.ItemData.taxDisplayExplainWord);
        //Size Guide
        instance.ITEM_COMPONENTS.SIZE_GUIDE.attr("href", COMMON_CONSTS.URLS.SIZE_GUIDE_PAGE);
        //Quantity Plus
        instance.ITEM_COMPONENTS.QUANTITY_MINUS.click(function() {
            var value = instance.ITEM_COMPONENTS.QUANTITY_VALUE.val();
            if (--value == 0) {
                value = 1;
            }
            instance.ITEM_COMPONENTS.QUANTITY_VALUE.val(value);
        });
        //Quantity Minus
        instance.ITEM_COMPONENTS.QUANTITY_PLUS.click(function() {
            var value = instance.ITEM_COMPONENTS.QUANTITY_VALUE.val();
            if (++value == 10) {
                value = 9;
            }
            instance.ITEM_COMPONENTS.QUANTITY_VALUE.val(value);
        });
        //ClipList
        if (typeof instance.ITEM_COMPONENTS.CLIP_LIST_BTN != "undefined") {
            //Data ID
            //instance.ITEM_COMPONENTS.CLIP_LIST_BTN.attr("data-id", instance.ItemData.itemCode);
            instance.ITEM_COMPONENTS.CLIP_LIST_BTN.data("id", instance.ItemData.itemCode);
            //Data Name
            var dataName = instance.ItemData.brandName;
            if (CommonUtils.isNotNull(dataName)) {
                dataName += "\uff0f";
            }
            dataName += instance.ItemData.itemName;
            instance.ITEM_COMPONENTS.CLIP_LIST_BTN.data("name", dataName);
            //Data Img
            var dataImg = instance.ItemData.colorInfo[0].colorImage;
            instance.ITEM_COMPONENTS.CLIP_LIST_BTN.data("img", dataImg);
        }
        
        //Build Color
        instance.buildColorPanel();
    },
    buildColorPanel : function() {
        var instance = this;
        //Color Info
        jQuery.each(instance.ItemData.colorInfo, function(index, colorInfo){
            var colorCode = CommonUtils.nullToBlank(colorInfo.imgSet);
            var colorName = CommonUtils.nullToBlank(colorInfo.colorName);
            var colorImageUrl = CommonUtils.nullToBlank(colorInfo.colorImage);
            var isSelected = colorInfo.selected;
            var selectSize = CommonUtils.nullToBlank(colorInfo.selectSize);
            var colorIconName = new Array();
            jQuery.each(colorInfo.iconName, function(index, iconName){
                colorIconName.push(CommonUtils.nullToBlank(iconName));
            });
            var priceInfo = CommonUtils.nullToBlank(colorInfo.priceInfo);
            var sizeList = CommonUtils.nullToBlank(colorInfo.sizeInfo);

            //Create ColorItem
            var colorItemComponents = {};
            CommonUtils.createHtmlConponent(instance.ColorItemSetting, colorItemComponents, null);
            instance.ITEM_COMPONENTS.COLOR_SELECTOR.append(colorItemComponents.ColorItem);
            // ColorImage
            colorImageUrl += instance.COLOR_IMAGE_PARAM;
            colorItemComponents.ColorImage.attr("src", colorImageUrl).attr("code", colorCode);
            // ColorIcon
            if (colorIconName.length > 0) {
                colorItemComponents.ColorIcon1.text(colorIconName[0]);
                colorItemComponents.ColorIcon2.text(colorIconName[1]);
            }
            // ColorName
            if (colorName.length > 0) {
                colorItemComponents.ColorImage.attr("alt", colorName);
                colorItemComponents.ColorInfoPanel.append(colorName);
            }
            //Judge Disp Color
            if (index == 0 || isSelected) {
                //Set Default Disp
                instance.SelectedColorComponents = colorItemComponents;
            }
            
            //----Color Click Event
            $(colorItemComponents.ColorImagePanel).click(function() {
                //Do Nothing when Selected
                //if ($(colorItemComponents.ColorItem).hasClass("active")) {
                //    return;
                //}
                //Set Selecting Color
                instance.SelectedColorComponents = colorItemComponents;
                //Exchange active color
                var preActiveColor = instance.ITEM_COMPONENTS.COLOR_SELECTOR.find("li.active");
                // if not initialization
                if (preActiveColor.length > 0 && !$(colorItemComponents.ColorItem).is(preActiveColor)) {
                    // Reset active color
                    preActiveColor.removeClass("active");
                    // Reset default select size
                    selectSize = null;
                    // Set Color Price
                    instance.ITEM_COMPONENTS.SALE_PRICE.empty();
                    var exSalePrice = priceInfo.exSalePrice;
                    var salePrice = priceInfo.salePrice;
                    var mutiPrice = priceInfo.mutiPrice;
                    if (exSalePrice > salePrice) {
                        var salePriceComponents = {};
                        CommonUtils.createHtmlConponent(instance.AttentionItemSetting, salePriceComponents, null);
                        salePriceComponents.AttentionItem.text("\u00A5" + CommonUtils.numberFormat(salePrice))
                        instance.ITEM_COMPONENTS.SALE_PRICE.append("\u00A5" + CommonUtils.numberFormat(exSalePrice));
                        instance.ITEM_COMPONENTS.SALE_PRICE.append("\u2192");
                        instance.ITEM_COMPONENTS.SALE_PRICE.append(salePriceComponents.AttentionItem);
                    } else {
                        instance.ITEM_COMPONENTS.SALE_PRICE.append("\u00A5" + CommonUtils.numberFormat(salePrice));
                    }
                    if (mutiPrice) {
                        instance.ITEM_COMPONENTS.SALE_PRICE.append("\uff5e");
                    }
                    instance.ITEM_COMPONENTS.SALE_PRICE.append(instance.ItemData.taxDisplayExplainWord);
                }
                $(colorItemComponents.ColorItem).addClass("active");
                //Create Item Preview Image
                var imageWhenNotExists = colorItemComponents.ColorImage.attr("src");
                imageWhenNotExists = imageWhenNotExists.replace(instance.COLOR_IMAGE_PARAM, instance.PREVIEW_IMAGE_PARAM);
                var imageList = instance.photoSwitcher(colorCode, imageWhenNotExists);
                //Run Slider
                imageList.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: true,
                    fade: false,
                    easing: "easeOutExpo"
                });
                //Install Size
                instance.installColorSizeList(sizeList, selectSize);
                //Build Item Detail Photo(pc only)
                if (!CommonUtils.isTabletPanel()) {
                    instance.buildItemDetailPhoto(colorCode);
                }
            });
        });
        
        if (CommonUtils.isTabletPanel()) {
            var colorIndex = instance.ITEM_COMPONENTS.COLOR_SELECTOR.children().index(instance.SelectedColorComponents.ColorItem);
            var scrollvalue = 66 * colorIndex;
            instance.ITEM_COMPONENTS.COLOR_PANEL.scrollLeft(scrollvalue);
        }
    },
    photoSwitcher : function(colorCode, imageWhenNotExists) {
        var instance = this;
        //Create Item Preview Image
        var imageList = $("<ul class=\"slides\"></ul>");
        if (instance.ColorImageInfo != null && typeof instance.ColorImageInfo[colorCode] != "undefined" && instance.ColorImageInfo[colorCode].length > 0) {
            var colorImageArray = CommonUtils.nullToBlank(instance.ColorImageInfo[colorCode]);
            jQuery.each(colorImageArray, function (index, colorImage) {
                var imageItemComponents = {};
                CommonUtils.createHtmlConponent(instance.ImageItemSetting, imageItemComponents, null);
                var colorImageSrc = COMMON_CONSTS.URLS.SCENE7_SET_IMAGE_URL + colorImage + instance.PREVIEW_IMAGE_PARAM;
                imageItemComponents.Image.attr("src", colorImageSrc);
                imageList.append(imageItemComponents.ImageItem);
            });
        } else {
            var imageItemComponents = {};
            CommonUtils.createHtmlConponent(instance.ImageItemSetting, imageItemComponents, null);
            imageItemComponents.Image.attr("src", imageWhenNotExists);
            imageList.append(imageItemComponents.ImageItem);
        }
        //Item Video
        var itemVideo = instance.ITEM_VIDEO_ITEMS[instance.ItemData.itemCode];
        if (CommonUtils.isNotNull(itemVideo) && CommonUtils.nullToBlank(instance.ItemData.commonColorCode) != colorCode) {
            //Color Unit Video
            if (CommonUtils.isNotNull(itemVideo[colorCode])) {
                var colorVideo = itemVideo[colorCode];
                instance.createVideoDisp(imageList, colorVideo);
            }
            //Item Unit Video(precedence)
            if (CommonUtils.isNotNull(itemVideo[instance.ItemData.commonColorCode])) {
                var commonVideo = itemVideo[instance.ItemData.commonColorCode];
                instance.createVideoDisp(imageList, commonVideo);
            }
        }
        
        //Fix the Height of Preview Image Slider
        if (instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.height() > 1) {
            instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.height(instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.height());
        }
        //Run Slider
        instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.empty();
        instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.removeData();
        instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.append(imageList);
        
        //Reset carousel
        if (instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES != null) {
            instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES.slick("unslick");
            instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES = null;
        }
        return imageList;
    },
    createVideoDisp : function(itemList, videoInfo) {
        var instance = this;
        //Create Video Tag
        var videoItemComponents = {};
        CommonUtils.createHtmlConponent(instance.VideoItemSetting , videoItemComponents, null);
        if (CommonUtils.isNotNull(videoInfo.poster)) {
            videoItemComponents.Video.attr({poster:videoInfo.poster});
        }
        //Video Source Tag
        jQuery.each(videoInfo.video, function(index, videoUrl){
            var source = jQuery("<source></source>");
            source.attr({src:videoUrl});
            videoItemComponents.Video.append(source);
        });
        //Play Button Style
        if (CommonUtils.isMobile()) {
            //Use Natural Button if isMobile
            videoItemComponents.Video.attr("controls", "true");
            videoItemComponents.PlayButton.css("display", "none");
        } else {
            //Use PlayButton if notMoble
            // PlayButton Position
            var playBtnStyles = {
                "top" : (instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.height()-videoItemComponents.PlayButton.height())/2,
                "left" : (instance.ITEM_COMPONENTS.PREVIEW_IMAGE_SLIDER.width()-videoItemComponents.PlayButton.width())/2
            };
            videoItemComponents.PlayButton.css(playBtnStyles);
            //PlayButton Display Event
            videoItemComponents.Video.bind('play', function(){
                videoItemComponents.PlayButton.css("display", "none");
            });
            videoItemComponents.Video.bind('pause', function(){
                videoItemComponents.PlayButton.css("display", "");
            });
        }
        //Create Play Click
        var video = videoItemComponents.Video.get(0);
        videoItemComponents.Video.click(function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        videoItemComponents.PlayButton.click(function() {
            videoItemComponents.OverLay.click();
        });
        //Create Video Event
        videoItemComponents.VideoItem.bind('cssClassChanged', function(){
            if (!videoItemComponents.VideoItem.hasClass("slick-active") && !video.paused) {
                video.pause();
            }
            if (!CommonUtils.isMobile() && videoItemComponents.VideoItem.hasClass("slick-active") && video.paused) {
                video.play();
            }
        });
        // Add To List
        var index = 2;
        if (CommonUtils.isNotNull(videoInfo.index)) {
            index = videoInfo.index;
        }
        if (itemList.children().length > index) {
            //Insert into the Index if ListSize is Larger
            videoItemComponents.VideoItem.insertBefore(itemList.children(":eq(" + index + ")"));
        } else {
            //Add to Last
            itemList.append(videoItemComponents.VideoItem);
        }
    },
    installColorSizeList : function(skuList, selectSize) {
        var instance = this;
        
        instance.ITEM_COMPONENTS.SIZE_SELECTOR.empty();
        //Sort by dispSort
        skuList.sort(function(val1, val2) {
            var sort1 = 10000, sort2 = 10000;
            if (CommonUtils.isNotNull(val1.dispSort)) {
                sort1 = parseInt(val1.dispSort, 10);
            }
            if (CommonUtils.isNotNull(val2.dispSort)) {
                sort2 = parseInt(val2.dispSort, 10);
            }
            return sort1 - sort2;
        });
        jQuery.each(skuList, function(index, skuInfo){
            //Size Info
            var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
            var sizeName = CommonUtils.nullToBlank(skuInfo.skuName);
            var specDetailSize = CommonUtils.nullToBlank(skuInfo.detail);
            var priceInfo = CommonUtils.nullToBlank(skuInfo.priceInfo);
            var stockStatus = CommonUtils.nullToBlank(skuInfo.stockStatus);
            var stockStatusText = CommonUtils.nullToBlank(skuInfo.stockStatusText);
            //Not Exists Size
            if (sizeName == "") {
                //OneSize
                sizeName = "\u30ef\u30f3\u30b5\u30a4\u30ba";
            }
            //Create sizeItemText
            var sizeItemText = sizeName;
            //Cut stockStatusText if have date
            if (jQuery.inArray(stockStatus, 
                    [COMMON_CONSTS.STOCK_STATUS.STOP, COMMON_CONSTS.STOCK_STATUS.STOCK_1, COMMON_CONSTS.STOCK_STATUS.FEW_1, 
                    COMMON_CONSTS.STOCK_STATUS.SOLD_OUT, COMMON_CONSTS.STOCK_STATUS.NONE]) > -1) {
                sizeItemText += " - " + stockStatusText;
            } else {
                var stockStatusName = stockStatusText.replace(COMMON_CONSTS.REGEXP.STOCK_TEXT_DATE_REMOVER, "");
                sizeItemText += " - " + stockStatusName;
            }
            var sizeItem = $("<option></option>");
            instance.ITEM_COMPONENTS.SIZE_SELECTOR.append(sizeItem);
            sizeItem.val(skuCode);
            sizeItem.text(sizeItemText);
            //Set Sku Info
            if (typeof instance.SizeInfoList[skuCode] == "undefined") {
                instance.SizeInfoList[skuCode] = {};
            }
            if (!CommonUtils.isNotNull(instance.SizeInfoList[skuCode].skuCode)) {
                jQuery.extend(instance.SizeInfoList[skuCode], {
                    skuCode               : skuCode,
                    sizeName              : sizeName,
                    specDetailSize        : specDetailSize,
                    priceInfo             : priceInfo,
                    stockStatus           : stockStatus,
                    stockStatusText       : stockStatusText
                });
            }
        });
        if (instance.ITEM_COMPONENTS.SIZE_SELECTOR.children().length > 0) {
            instance.ITEM_COMPONENTS.SIZE_SELECTOR.unbind();
            $(instance.ITEM_COMPONENTS.SIZE_SELECTOR).change(function() {
                var skuCode = $(this).val();
                var skuInfo = instance.SizeInfoList[skuCode];
                instance.buildSizePanel(skuInfo);
            });
            if (selectSize != null && selectSize.length > 0) {
                var skuItem = instance.ITEM_COMPONENTS.SIZE_SELECTOR.find("option[value='" + selectSize + "']");
                if (skuItem.length > 0) {
                    instance.ITEM_COMPONENTS.SIZE_SELECTOR.val(selectSize);
                }
            }
            instance.ITEM_COMPONENTS.SIZE_SELECTOR.change();
        } else {
            //No Size Exists in this Color
            if (skuList.length == 1) {
                //Hide SizeListPanel
                instance.ITEM_COMPONENTS.SIZE_SELECTOR_PANEL.css("display","none");
                //add Size Click Event to Color
                var skuInfo = skuList[0];
                //Set Size Info
                instance.buildSizePanel(skuInfo);
            }
        }
    },
    buildSizePanel : function(skuInfo) {
        var instance = this;
        
        var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
        var sizeName = CommonUtils.nullToBlank(skuInfo.sizeName);
        var specDetailSize = CommonUtils.nullToBlank(skuInfo.specDetailSize);
        var priceInfo = CommonUtils.nullToBlank(skuInfo.priceInfo);
        var exSalePrice = parseInt(priceInfo.exSalePrice, 10);
        var salePrice = parseInt(priceInfo.salePrice, 10);
        var stockStatus = CommonUtils.nullToBlank(skuInfo.stockStatus);
        var stockStatusText = CommonUtils.nullToBlank(skuInfo.stockStatusText);
        var taxDisplayExplainText = CommonUtils.nullToBlank(instance.ItemData.taxDisplayExplainWord);
        //Store Stock[buildFavStoreStock]
        var storeStock = CommonUtils.nullToBlank(skuInfo.storeStock);
        //preSkuCode
        var preSkuCode = instance.ITEM_COMPONENTS.SKU_CODE.data("skucode");
        
        //Set SkuInfo
        instance.ITEM_COMPONENTS.SKU_SIZE_DETAIL.text(specDetailSize);
        instance.ITEM_COMPONENTS.SKU_CODE.text(skuCode.substr(0, 7) + "-" + skuCode.substr(7, 2) + "-" + skuCode.substr(9));
        instance.ITEM_COMPONENTS.SKU_CODE.data("skucode", skuCode);
        instance.ITEM_COMPONENTS.SKU_INVENTORY.text(stockStatusText);
        instance.ITEM_COMPONENTS.SKU_AMOUNT.val("1");
        
        instance.ITEM_COMPONENTS.SKU_PRICE.empty();
        if (exSalePrice > salePrice) {
            var exSalePricePanel = $("<span></span>").text("\u00A5" + CommonUtils.numberFormat(exSalePrice)).css("color", "rgb(51,51,51)");
            instance.ITEM_COMPONENTS.SKU_PRICE.append(exSalePricePanel);
            instance.ITEM_COMPONENTS.SKU_PRICE.append(" \u2192");
            instance.ITEM_COMPONENTS.SKU_PRICE.append(" \u00A5" + CommonUtils.numberFormat(salePrice) + taxDisplayExplainText).css("color", "#FF5252");
        } else {
            instance.ITEM_COMPONENTS.SKU_PRICE.append("\u00A5" + CommonUtils.numberFormat(salePrice) + taxDisplayExplainText).css("color", "#333");
        }
        //Validate StockStatus(Hide Inventory)
        if (jQuery.inArray(stockStatus, 
                [COMMON_CONSTS.STOCK_STATUS.STOP, COMMON_CONSTS.STOCK_STATUS.STOCK_1, COMMON_CONSTS.STOCK_STATUS.FEW_1, 
                COMMON_CONSTS.STOCK_STATUS.SOLD_OUT, COMMON_CONSTS.STOCK_STATUS.NONE]) > -1) {
            instance.ITEM_COMPONENTS.SKU_INVENTORY_TITLE.css("display", "none");
            instance.ITEM_COMPONENTS.SKU_INVENTORY.css("display", "none");
        } else {
            instance.ITEM_COMPONENTS.SKU_INVENTORY_TITLE.css("display", "inline-block");
            instance.ITEM_COMPONENTS.SKU_INVENTORY.css("display", "inline-block");
        }
        //AddToCart Button Event
        instance.ITEM_COMPONENTS.ADD_TO_CART.unbind();
        if (jQuery.inArray(stockStatus, 
                [COMMON_CONSTS.STOCK_STATUS.STOP, COMMON_CONSTS.STOCK_STATUS.SOLD_OUT, COMMON_CONSTS.STOCK_STATUS.NONE]) > -1) {
            instance.ITEM_COMPONENTS.ADD_TO_CART.addClass("disabled");
        } else {
            instance.ITEM_COMPONENTS.ADD_TO_CART.removeClass("disabled");
            //AddToCart Click
            $(instance.ITEM_COMPONENTS.ADD_TO_CART).click(function() {
                var amount = instance.ITEM_COMPONENTS.QUANTITY_VALUE.val();
                instance.doAddToCart(skuCode, amount);
            });
        }
        //AddToWishList Button Event
        if (typeof preSkuCode == "undefined" || preSkuCode != skuCode) {
            instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.unbind();
            var defaultVal = instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.attr("defaultVal");
            if (CommonUtils.nullToBlank(defaultVal).length > 0) {
                instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.val(defaultVal);
            }
            $(instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST).click(function() {
                instance.doAddWishList(skuCode);
                //sitecatalyst
                if (typeof s_gi == "function") {
                    var s=s_gi(s_account);
                    s.linkTrackVars='events';
                    s.linkTrackEvents='event29';
                    s.events='event29';
                    s.tl(this,'o','detail_wishlist');
                }
            });
        }
        if (instance.ItemData.isAddWishList) {
            instance.ItemData.isAddWishList=false;
            instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.click();
        }
        //Store Stock Info
        var storeStockRows = instance.ITEM_COMPONENTS.STORE_STOCK_PANEL.find("tr");
        if (storeStockRows.length > 0) {
            jQuery.each(storeStockRows, function(index, storeStockRow) {
                var stockAmountTag = $(storeStockRow).find("td[name='storeStockAmount']");
                var storeCode = $(storeStockRow).attr("storeCode");
                var stockAmount = null;
                var stockURL = null;
                if (typeof storeStock != "undefined") {
                    stockAmount = jQuery.map(storeStock, function(stockInfo) {
                        if (stockInfo.storeCode == storeCode) {
                            return stockInfo.storeStockAmount;
                        }
                    });
                    stockURL = jQuery.map(storeStock, function(stockInfo) {
                        if (stockInfo.storeCode == storeCode) {
                            return stockInfo.storeStockURL;
                        }
                    });
                }
                if (CommonUtils.isNotNull(stockAmount)) {
                    stockAmount = stockAmount[0];
                    
                    // check fc store or not.
                    if (jQuery.inArray(storeCode,FCStoreList) > -1) {
                        // set fc store URL to inquiry message.
                        var showMessage = ItemDetailPage.prototype.FCStoreMessages.InquiryMessage;
                        stockAmountTag.empty();
                        stockAmountTag.append(jQuery("<a>").attr({target:"_blank",href :stockURL}).text(showMessage));
                    } else {
                        if (stockAmount > 0) {
                            stockAmountTag.text(CommonUtils.stringFormat(COMMON_CONSTS.LABEL_MESSAGES.STORE_STOCK_EXISTS, [stockAmount]));
                        } else {
                            stockAmountTag.text(COMMON_CONSTS.LABEL_MESSAGES.STORE_STOCK_NOT_EXISTS);
                        }
                    }
                    
                } else {
                    stockAmountTag.text(COMMON_CONSTS.MESSAGES.STORE_STOCK_NO_HANDLING);
                }
            });
        }
    },
    doAddToCart : function(skuCode, amount) {
        var instance = this;
        //Delete Purchase Panel if exists
        if ($("#" + instance.AddToCartPopupSetting.MainPanel.attr.id).length > 0) {
            $("#" + instance.AddToCartPopupSetting.MainPanel.attr.id).remove();
        }
        
        var addToCartComponents = {};
        CommonUtils.createHtmlConponent(instance.AddToCartPopupSetting, addToCartComponents, null);
        //Build Shopping Info
        var skuInfo = instance.SizeInfoList[skuCode];
        // Image
        var colorImage = instance.SelectedColorComponents.ColorImage.attr("src");
        colorImage = colorImage.replace(instance.COLOR_IMAGE_PARAM, instance.SHOPPING_IMAGE_PARAM);
        addToCartComponents.Image.attr("src", colorImage)
        // ItemName
        if (instance.ItemData.brandName.length > 0) {
            addToCartComponents.TitleText.append(instance.ItemData.brandName);
            addToCartComponents.TitleText.append("\uff0f");
        }
        addToCartComponents.TitleText.append(instance.ItemData.itemName);
        // Price
        addToCartComponents.ItemPrice.text("\u00A5" + CommonUtils.numberFormat(skuInfo.priceInfo.salePrice) + instance.ItemData.taxDisplayExplainWord);
        // Color
        var colorCode = instance.SelectedColorComponents.ColorImage.attr("code");
        var colorName = jQuery.map(instance.ItemData.colorInfo, function(colorInfo) {
            if (colorInfo.imgSet == colorCode) {
                return colorInfo.colorName;
            }
        });
        addToCartComponents.ColorValueBlock.text(colorName);
        // Size
        addToCartComponents.SizeValueBlock.text(skuInfo.sizeName);
        // Amount
        addToCartComponents.AmountValueBlock.text(amount);
        // TotalPrice
        var totalPrice = skuInfo.priceInfo.salePrice * amount;
        addToCartComponents.TotalPriceValue.text("\u00A5" + CommonUtils.numberFormat(totalPrice) + instance.ItemData.taxDisplayExplainWord);
        
        //Add to page
        if (typeof instance.ITEM_COMPONENTS.PAGE_CONTENTS != "undefined") {
            instance.ITEM_COMPONENTS.PAGE_CONTENTS.append(addToCartComponents.MainPanel);
        } else {
            $("body").append(addToCartComponents.MainPanel);
        }

        var urlParams = {};
        urlParams[COMMON_CONSTS.ADD_SHOPPING_BAG_API.REQUEST.SKU_CODE] = skuCode;
        urlParams[COMMON_CONSTS.ADD_SHOPPING_BAG_API.REQUEST.ORDER_NUM] = amount;
        urlParams[COMMON_CONSTS.ADD_SHOPPING_BAG_API.REQUEST.BRAND] = pagePolicy.getFormData("brand");
        jQuery.ajax({
            method       :    "GET",
            async        :    true,
            dataType     :    "json",
            timeout      :    10000,
            url          :    COMMON_CONSTS.URLS.ADD_SHOPPING_BAG_API,
            data         :    urlParams,
            beforeSend   : function(xhr, settings){
                //Show Processing
                var marginTop = (-addToCartComponents.MainPanel.parent().offset().top);
                var topPos = instance.ITEM_COMPONENTS.ADD_TO_CART.offset().top - addToCartComponents.MainPanel.height();
                if (topPos < $(window).scrollTop()) {
                    topPos = $(window).scrollTop();
                }
                addToCartComponents.MainPanel.css("top", topPos)
                    .css("margin-top", marginTop)
                    .css("display", "block");
            },
            complete     : function(xhr, status){
                //Hide Processing
                addToCartComponents.Loading.fadeOut(500);
            },
            success      : function(responseText, status, xhr){
                if (responseText.status == "1") {
                    //SUCCESS
                    // sitecatalyst
                    if (typeof s_gi == "function") {
                        var s=s_gi(s_account);
                        s.linkTrackVars='events,products';
                        s.linkTrackEvents='scAdd';
                        s.events='scAdd';
                        s.tl(true,'o','shopping_bag');
                    }
                    // Refresh PageInfo
                    //pagePolicy.clearCommonData();
                    /** item-detail-delivery-free-message.lbi */
                    CommonUtils.loadContents("/app/lbi/item/item-detail-delivery-free-message.lbi", function(contents){
                        addToCartComponents.DeliveryMsgHolder.html(contents);
                        CommonUtils.getCommonData(pagePolicy);
                    });
                    // Add Rtoaster
                    if (typeof instance.ITEM_COMPONENTS.RTOASTER_ADD_TO_CART_POPUP != "undefined") {
                        var addToCartRecommend = instance.ITEM_COMPONENTS.RTOASTER_ADD_TO_CART_POPUP.clone();
                        addToCartComponents.RtoasterArea.append(addToCartRecommend);
                        addToCartRecommend.css("display", "");
                    }
                } else {
                    //ERROR
                    instance.buildAddToCartErr(addToCartComponents, responseText.statusText);
                }
            },
            error        : function(xhr,status,error){
                //ERROR
                instance.buildAddToCartErr(addToCartComponents, COMMON_CONSTS.MESSAGES.SYSTEM_ERR_MESSAGE);
            }
        });
    },
    buildAddToCartErr : function(addToCartContainer, errMsg) {
        addToCartContainer.HeaderMessage.text(COMMON_CONSTS.MESSAGES.ADD_TO_CART_FAIL);
        addToCartContainer.ErrMessage.text(errMsg);
        addToCartContainer.InfoBody.css("display", "none");
        addToCartContainer.TotalPrice.css("display", "none");
        addToCartContainer.DeliveryMsgHolder.css("display", "none");
        addToCartContainer.Footer.css("text-align", "center");
        addToCartContainer.CloseBtn.css("display", "inline-block").css("float", "none");
        addToCartContainer.ShowCartBtn.css("display", "none");
        addToCartContainer.ErrMessage.css("display", "block");
    },
    doAddWishList : function(skuCode) {
        var instance = this;
        
        var urlParams = {};
        urlParams[COMMON_CONSTS.ADD_WISH_LIST_API.REQUEST.SKU_CODE] = skuCode;
        urlParams[COMMON_CONSTS.ADD_WISH_LIST_API.REQUEST.MEDIA_KBN] = pagePolicy.getFormData("brand");
        urlParams[COMMON_CONSTS.ADD_WISH_LIST_API.REQUEST.MEDIA_NO] = pagePolicy.getFormData("media_no");
        urlParams[COMMON_CONSTS.ADD_WISH_LIST_API.REQUEST.MEDIA_CLASS_NO] = pagePolicy.getFormData("media_class_no");
        urlParams[COMMON_CONSTS.ADD_WISH_LIST_API.REQUEST.SCREEN_ID] = pagePolicy.getFormData("screen_id");
        
        jQuery.ajax({
            method       :    "GET",
            async        :    true,
            dataType     :    "json",
            timeout      :    10000,
            url          :    COMMON_CONSTS.URLS.ADD_WISH_LIST_API,
            data         :    urlParams,
            success      : function(responseText, status, xhr){
                if (responseText.status == COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS
                    || responseText.errorCode == COMMON_CONSTS.ADD_WISH_LIST_API.ENUM.ERROR_CODE.REGISTED) {
                    //Success or Already Registed
                    var defaultVal = instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.val();
                    instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.attr("defaultVal", defaultVal);
                    instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.val(responseText.message);
                    instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.addClass("added");
                    //Reset click event to WishList page
                    instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.unbind();
                    $(instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST).click(function() {
                        var formData = jQuery.extend({}, pagePolicy.formDataPool, {sku_code:skuCode});
                        CommonUtils.doSendPost(COMMON_CONSTS.URLS.WISH_LIST_PAGE, formData);
                    });
                } else if (responseText.errorCode == COMMON_CONSTS.HTTP_COMMON.ENUM.ERROR_CODE.WITHOUT_LOGIN) {
                    //Need Login
                    var formData = jQuery.extend({}, pagePolicy.formDataPool, {sku_code:skuCode});
                    CommonUtils.doPostBack(instance.PAGE_PARAMETERS.ACTION_ADD_WISH_LIST, formData);
                } else {
                    //Other Error
                    var defaultVal = instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.val();
                    instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.attr("defaultVal", defaultVal);
                    instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.val(responseText.message);
                }
            },
            error        : function(xhr,status,error){
                //ERROR
                var defaultVal = instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.val();
                instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.attr("defaultVal", defaultVal);
                instance.ITEM_COMPONENTS.ADD_TO_WISH_LIST.val(COMMON_CONSTS.MESSAGES.ADD_WISH_LIST_FAIL);
            }
        });
    },
    //Build All Element Modal Panel
    buildAllElementPanel : function(allElementBtn) {
        var instance = this;
        //All Element Page Url
        var allElementUrl = allElementBtn.attr("dataurl");
        if (!CommonUtils.isNotNull(allElementUrl)) {
            allElementUrl = CommonUtils.stringFormat(COMMON_CONSTS.URLS.ALL_ELEMENT_PAGE, [instance.ItemData.itemCode])
        }
        //Delete AllElement Panel if exists
        if ($("#" + instance.AllElementSetting.ModalWrap.attr.id).length > 0) {
            $("#" + instance.AllElementSetting.ModalWrap.attr.id).remove();
        }
        //Drop Overlay Panel if exists
        if ($("#" + instance.ShadowOverlaySetting.OverlayPanel.attr.id).length > 0) {
            $("#" + instance.ShadowOverlaySetting.OverlayPanel.attr.id).remove();
        }
        //Clear Components
        instance.AllElementComponents = {};
        instance.ShadowOverlayComponents = {};
        
        //Create StoreStockPanel
        CommonUtils.createHtmlConponent(instance.AllElementSetting, instance.AllElementComponents, null);
        $("body").append(instance.AllElementComponents.ModalWrap);
        //Create ShadowOverlayWhole
        CommonUtils.createHtmlConponent(instance.ShadowOverlaySetting, instance.ShadowOverlayComponents, null);
        $("body").append(instance.ShadowOverlayComponents.OverlayPanel);
        
        //Close Event
        $(instance.AllElementComponents.CloseBtn).click(function() {
            if ($(instance.ShadowOverlayComponents.OverlayPanel).length > 0) {
                $(instance.ShadowOverlayComponents.OverlayPanel).fadeOut(500, function(){
                    $(this).remove();
                });
            }
            if ($(instance.AllElementComponents.ModalWrap).length > 0) {
                $(instance.AllElementComponents.ModalWrap).fadeOut(500, function(){
                    $(this).remove();
                });
            }
        });
        $(instance.AllElementComponents.CloseBtnFloat).click(function() {
            $(instance.AllElementComponents.CloseBtn).click();
        });
        $(instance.ShadowOverlayComponents.OverlayPanel).click(function() {
            $(instance.AllElementComponents.CloseBtn).click();
        });
        //Show ShadowOverlay
        $(instance.ShadowOverlayComponents.OverlayPanel).fadeIn(200, function(){
            //Get All Element Data from AllElementPage
            jQuery.ajax({
                method       :    "get",
                async        :    true,
                dataType     :    "html",
                timeout      :    10000,
                url          :    allElementUrl,
                contentType  :    "text/html; charset=Shift_JIS",
                beforeSend   : function(xhr, settings){
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("text/html; charset=Shift_JIS");
                    }
                    //Show Processing
                    var loadingStyles = {
                        "width": "50px",
                        "height": "50px",
                        "top": (($(window).height()-50)/2),
                        "left" : (($(window).width()-50)/2)
                    };
                    $(instance.ShadowOverlayComponents.Loading).css(loadingStyles);
                    $(instance.ShadowOverlayComponents.Loading).fadeIn(500);
                },
                complete: function(xhr, status){
                    var allElementPanel = $(instance.AllElementComponents.ModalWrap);
                    if (CommonUtils.isTabletPanel()) {
                        allElementPanel.css({"width":"94%"});
                    }
                    var mainPanelWidth = allElementPanel.innerWidth();
                    var mainPanelHeight = allElementPanel.innerHeight();
                    var borderLeftWidth = parseInt(allElementPanel.css("border-left-width"), 10);
                    var borderRightWidth = parseInt(allElementPanel.css("border-right-width"), 10);
                    var borderTopWidth = parseInt(allElementPanel.css("border-top-width"), 10);
                    var borderBottomWidth = parseInt(allElementPanel.css("border-bottom-width"), 10);
                    mainPanelWidth += isNaN(borderLeftWidth)?0:borderLeftWidth;
                    mainPanelWidth += isNaN(borderRightWidth)?0:borderRightWidth;
                    mainPanelHeight += isNaN(borderTopWidth)?0:borderTopWidth;
                    mainPanelHeight += isNaN(borderBottomWidth)?0:borderBottomWidth;
                    
                    var heightPos = $(window).height()>mainPanelHeight?$(window).height()-mainPanelHeight:0;
                    //var topPos = (CommonUtils.isTabletPanel()?$(window).scrollTop():0) + heightPos/2;
                    var topPos = $(window).scrollTop() + heightPos/2;
                    $(instance.ShadowOverlayComponents.Loading).animate({
                        "width": mainPanelWidth,
                        "height": mainPanelHeight,
                        "top": heightPos/2,
                        "left": (($(window).width()-mainPanelWidth)/2)
                    }, 500, function(){
                        $(instance.ShadowOverlayComponents.Loading).fadeOut(500, function(){
                            $(instance.ShadowOverlayComponents.Loading).remove();
                        });
                        //MainPanel CSS
                        var contentStyles = {
                            "position" : "absolute",
                            "z-index" : "10000",
                            "top" : topPos,
                            "left" : (($(window).width()-mainPanelWidth)/2),
                            "margin" : "0"
                        };
                        $(instance.AllElementComponents.ModalWrap).css(contentStyles);
                        $(instance.AllElementComponents.ModalWrap).fadeIn(200);
                    });
                },
                success: function(data){
                    var elementTag = $(data).find("table tr > td > table tr > td");
                    if (elementTag.length > 0
                        && elementTag.html().indexOf(COMMON_CONSTS.LABEL_MESSAGES.ALL_ELEMENT_NOT_EXISTS) == -1) {
                        var dispItemName = instance.ItemData.brandName;
                        if (CommonUtils.isNotNull(dispItemName)) {
                            dispItemName += "\uff0f";
                        }
                        dispItemName += instance.ItemData.itemName;
                        instance.AllElementComponents.ItemName.text(dispItemName);
                        instance.AllElementComponents.Detail.html(elementTag.html());
                    } else {
                        instance.AllElementComponents.Detail.attr("style", "color:#ff0000;");
                        instance.AllElementComponents.Detail.text(COMMON_CONSTS.MESSAGES.ALL_ELEMENT_INFO_FAIL);
                    }
                },
                error: function(xhr,status,error){
                    instance.AllElementComponents.Detail.attr("style", "color:#ff0000;");
                    instance.AllElementComponents.Detail.text(COMMON_CONSTS.MESSAGES.ALL_ELEMENT_INFO_FAIL);
                }
            });
        });
    },
    createVideoPhotoItem : function(itemList, videoInfo) {
        var instance = this;
        //Create Video Tag
        var videoItemComponents = {};
        CommonUtils.createHtmlConponent(instance.VideoItemSetting , videoItemComponents, null);
        if (CommonUtils.isNotNull(videoInfo.poster)) {
            videoItemComponents.Video.attr({poster:videoInfo.poster});
        }
        videoItemComponents.Video.css({"vertical-align":"top"});
        //Video Source Tag
        jQuery.each(videoInfo.video, function(index, videoUrl){
            var source = jQuery("<source></source>");
            source.attr({src:videoUrl});
            videoItemComponents.Video.append(source);
        });
        // PlayButton Position
        var playBtnStyles = {
            "top" : "20px",
            "left" : "18px",
            "width" : "20px",
            "height" : "20px",
            "background-position" : "0px 0px",
            "background-size" : "20px 50px"
        };
        videoItemComponents.PlayButton.css(playBtnStyles);
        var video = videoItemComponents.Video.get(0);
        video.pause();
        // Add To List
        var index = 2;
        if (CommonUtils.isNotNull(videoInfo.index)) {
            index = videoInfo.index;
        }
        if (itemList.length > index) {
            //Insert into the Index if ListSize is Larger
            //videoItemComponents.VideoItem.insertBefore(itemList.children(":eq(" + index + ")"));
            itemList.splice(index, 0, videoItemComponents.VideoItem);
        } else {
            //Add to Last
            itemList.push(videoItemComponents.VideoItem);
        }
    },
    //Item Carousel Photo
    buildItemDetailPhoto : function(colorCode) {
        var instance = this;
        //Set CommonColorCode as Default
        if (!CommonUtils.isNotNull(colorCode)) {
            colorCode = instance.ItemData.commonColorCode;
        }
        //Item Detail Photo
        if (CommonUtils.isNotNull(instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL) && CommonUtils.isNotNull(instance.ColorImageInfo)) {
            instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL.empty();
            if (CommonUtils.isNotNull(instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES)) {
                instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES.slick("unslick");
                instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES.remove();
                instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES = null;
            }
            var itemImageArray = CommonUtils.nullToBlank(instance.ColorImageInfo[colorCode]);
            if (itemImageArray.length > 0) {
                itemImageArray = itemImageArray.slice(0);
                //Item Video
                var itemVideo = instance.ITEM_VIDEO_ITEMS[instance.ItemData.itemCode];
                if (CommonUtils.isNotNull(itemVideo) && CommonUtils.nullToBlank(instance.ItemData.commonColorCode) != colorCode) {
                    //Color Unit Video
                    if (CommonUtils.isNotNull(itemVideo[colorCode])) {
                        var colorVideo = itemVideo[colorCode];
                        instance.createVideoPhotoItem(itemImageArray, colorVideo);
                    }
                    //Item Unit Video(precedence)
                    if (CommonUtils.isNotNull(itemVideo[instance.ItemData.commonColorCode])) {
                        var commonVideo = itemVideo[instance.ItemData.commonColorCode];
                        instance.createVideoPhotoItem(itemImageArray, commonVideo);
                    }
                }
                //Create Item Image
                var carouselImgList = $("<ul class=\"slides\"></ul>");
                jQuery.each(itemImageArray, function (index, itemImage) {
                    var imageItem = null;
                    if (typeof itemImage == "object") {
                        carouselImgList.append(itemImage);
                        imageItem = itemImage;
                    } else {
                        var imageItemComponents = {};
                        CommonUtils.createHtmlConponent(instance.ImageItemSetting, imageItemComponents, null);
                        var imageSrc = COMMON_CONSTS.URLS.SCENE7_SET_IMAGE_URL + itemImage + instance.COLOR_IMAGE_PARAM;
                        imageItemComponents.Image.attr("src", imageSrc);
                        carouselImgList.append(imageItemComponents.ImageItem);
                        imageItem = imageItemComponents.ImageItem;
                    }
                    $(imageItem).click(function() {
                        if (instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES != null) {
                            return;
                        }
                        var imageWhenNotExists = COMMON_CONSTS.URLS.SCENE7_SET_IMAGE_URL + itemImage + instance.PREVIEW_IMAGE_PARAM;
                        var sliderImgList = instance.photoSwitcher(colorCode, imageWhenNotExists);
                        sliderImgList.slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: true,
                            dots: true,
                            fade: false,
                            easing: "easeOutExpo",
                            asNavFor: '.itemDetailContainer #carousel .slides'
                        });
                        carouselImgList.slick({
                            asNavFor: '.itemDetailContainer #slider .slides',
                            dots: false,
                            arrows: false,
                            slidesToShow: 0,
                            easing: "easeOutExpo",
                            focusOnSelect: true
                        });
                        sliderImgList.slick("slickGoTo", index);
                        instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL_SLIDES = carouselImgList;
                    });
                });
                instance.ITEM_COMPONENTS.PREVIEW_IMAGE_CAROUSEL.append("<b>Detail Photo</b>").append(carouselImgList).show();
            }
        }
    },
    doRefineScore : function(score) {
        if (CommonUtils.isNotNull(score)) {
            pagePolicy.setFormData('score', score);
        }
        CommonUtils.doPostBack(ItemDetailPage.prototype.PAGE_PARAMETERS.ACTION_READ_REVIEW, pagePolicy.formDataPool);
    },
    /**
     * Build Item Additional Info
     */
    AddtionalInfoSetting : {
        Panel : {
            tag : "<div></div>",
            attr : {
                "class" : "itemDetailList"
            },
            Table : {
                tag : "<table></table>",
                Body : {
                    tag : "<tbody></tbody>",
                    WireRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        WireTitle : {
                            tag : "<th></th>",
                            text : "\u30ef\u30a4\u30e4\u30fc"
                        },
                        WireValue : {
                            tag : "<td></td>"
                        }
                    },
                    PadRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        PadTitle : {
                            tag : "<th></th>",
                            text : "\u30d1\u30c3\u30c9"
                        },
                        PadValue : {
                            tag : "<td></td>"
                        }
                    },
                    BoneRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        BoneTitle : {
                            tag : "<th></th>",
                            text : "\u30dc\u30fc\u30f3"
                        },
                        BoneValue : {
                            tag : "<td></td>"
                        }
                    },
                    HookRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        HookTitle : {
                            tag : "<th></th>",
                            text : "\u30db\u30c3\u30af"
                        },
                        HookValue : {
                            tag : "<td></td>"
                        }
                    },
                    StrapRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        StrapTitle : {
                            tag : "<th></th>",
                            text : "\u30b9\u30c8\u30e9\u30c3\u30d7"
                        },
                        StrapValue : {
                            tag : "<td></td>"
                        }
                    },
                    FunctionRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "class" : "function",
                            "style" : "display:none;"
                        },
                        FunctionTitle : {
                            tag : "<th></th>",
                            text : "\u6a5f\u80fd"
                        },
                        FunctionValue : {
                            tag : "<td></td>",
                            FunctionList : {
                                tag : "<ul></ul>",
                                Function1 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                },
                                Function2 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                },
                                Function3 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                },
                                Function4 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                }
                            }
                        }
                    },
                    SizeInfoRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        SizeInfoTitle : {
                            tag : "<th></th>",
                            text : "\u5bfe\u5fdc\u30ab\u30c3\u30d7"
                        },
                        SizeInfoValue : {
                            tag : "<td></td>"
                        }
                    },
                    SetInfoRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        SetInfoTitle : {
                            tag : "<th></th>",
                            text : "\u30bb\u30c3\u30c8\u5185\u5bb9"
                        },
                        SetInfoValue : {
                            tag : "<td></td>"
                        }
                    },
                    NoteRow : {
                        tag : "<tr></tr>",
                        attr : {
                            "style" : "display:none;"
                        },
                        NoteTitle : {
                            tag : "<th></th>",
                            text : "\u6ce8\u610f\u66f8\u304d"
                        },
                        NoteValue : {
                            tag : "<td></td>",
                            NoteList : {
                                tag : "<ul></ul>",
                                Note1 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                },
                                Note2 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                },
                                Note3 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                },
                                Note4 : {
                                    tag : "<li></li>",
                                    attr : {
                                        "style" : "display:none;"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    AddtionalCsvTitles : {
        ITEM_CODE : "itemCode",
        WIRE      : "wire",
        PAD       : "pad",
        BONE      : "bone",
        HOOK      : "hook",
        STRAP     : "strap",
        FUNCTION1 : "function1",
        FUNCTION2 : "function2",
        FUNCTION3 : "function3",
        FUNCTION4 : "function4",
        SIZE_INFO : "sizeInfo",
        SET_INFO  : "setInfo",
        NOTE1     : "note1",
        NOTE2     : "note2",
        NOTE3     : "note3",
        NOTE4     : "note4"
    },
    buildAddInfo : function(result) {
        var instance = detailPageInstance;
        if (typeof result != "object" || !CommonUtils.isNotNull(result.data) || instance.ITEM_COMPONENTS.MAIN_INFO_PANEL.length == 0) {
            return;
        }
        //Get ItemAddInfo
        var csvInfo = result.data[0];
        //Build Page
        var addtionalInfoComponents = {};
        CommonUtils.createHtmlConponent(instance.AddtionalInfoSetting, addtionalInfoComponents, null);
        instance.ITEM_COMPONENTS.PRODUCT_DETAIL_WRAP.append(addtionalInfoComponents.Panel);
        
        //var itemCode = csvInfo[instance.AddtionalCsvTitles.ITEM_CODE];
        var wire = csvInfo[instance.AddtionalCsvTitles.WIRE];
        if (CommonUtils.isNotNull(wire)) {
            addtionalInfoComponents.WireValue.text(wire);
            addtionalInfoComponents.WireRow.css("display","");
        }
        var pad = csvInfo[instance.AddtionalCsvTitles.PAD];
        if (CommonUtils.isNotNull(pad)) {
            addtionalInfoComponents.PadValue.text(pad);
            addtionalInfoComponents.PadRow.css("display","");
        }
        var bone = csvInfo[instance.AddtionalCsvTitles.BONE];
        if (CommonUtils.isNotNull(bone)) {
            addtionalInfoComponents.BoneValue.text(bone);
            addtionalInfoComponents.BoneRow.css("display","");
        }
        var hook = csvInfo[instance.AddtionalCsvTitles.HOOK];
        if (CommonUtils.isNotNull(hook)) {
            addtionalInfoComponents.HookValue.text(hook);
            addtionalInfoComponents.HookRow.css("display","");
        }
        var strap = csvInfo[instance.AddtionalCsvTitles.STRAP];
        if (CommonUtils.isNotNull(strap)) {
            addtionalInfoComponents.StrapValue.text(strap);
            addtionalInfoComponents.StrapRow.css("display","");
        }
        var function1 = csvInfo[instance.AddtionalCsvTitles.FUNCTION1];
        var function2 = csvInfo[instance.AddtionalCsvTitles.FUNCTION2];
        var function3 = csvInfo[instance.AddtionalCsvTitles.FUNCTION3];
        var function4 = csvInfo[instance.AddtionalCsvTitles.FUNCTION4];
        if (CommonUtils.isNotNull(function1) || CommonUtils.isNotNull(function2) || CommonUtils.isNotNull(function3) || CommonUtils.isNotNull(function4)) {
            addtionalInfoComponents.FunctionRow.css("display","");
        }
        if (CommonUtils.isNotNull(function1)) {
            addtionalInfoComponents.Function1.text(function1);
            addtionalInfoComponents.Function1.css("display","");
        }
        if (CommonUtils.isNotNull(function2)) {
            addtionalInfoComponents.Function2.text(function2);
            addtionalInfoComponents.Function2.css("display","");
        }
        if (CommonUtils.isNotNull(function3)) {
            addtionalInfoComponents.Function3.text(function3);
            addtionalInfoComponents.Function3.css("display","");
        }
        if (CommonUtils.isNotNull(function4)) {
            addtionalInfoComponents.Function4.text(function4);
            addtionalInfoComponents.Function4.css("display","");
        }
        var sizeInfo = csvInfo[instance.AddtionalCsvTitles.SIZE_INFO];
        if (CommonUtils.isNotNull(sizeInfo)) {
            addtionalInfoComponents.SizeInfoValue.text(sizeInfo);
            addtionalInfoComponents.SizeInfoRow.css("display","");
        }
        var setInfo = csvInfo[instance.AddtionalCsvTitles.SET_INFO];
        if (CommonUtils.isNotNull(setInfo)) {
            addtionalInfoComponents.SetInfoValue.text(setInfo);
            addtionalInfoComponents.SetInfoRow.css("display","");
        }
        var note1 = csvInfo[instance.AddtionalCsvTitles.NOTE1];
        var note2 = csvInfo[instance.AddtionalCsvTitles.NOTE2];
        var note3 = csvInfo[instance.AddtionalCsvTitles.NOTE3];
        var note4 = csvInfo[instance.AddtionalCsvTitles.NOTE4];
        if (CommonUtils.isNotNull(note1) || CommonUtils.isNotNull(note1) || CommonUtils.isNotNull(note1) || CommonUtils.isNotNull(note1)) {
            addtionalInfoComponents.NoteRow.css("display","");
        }
        if (CommonUtils.isNotNull(note1)) {
            addtionalInfoComponents.Note1.text(note1);
            addtionalInfoComponents.Note1.css("display","");
        }
        if (CommonUtils.isNotNull(note2)) {
            addtionalInfoComponents.Note2.text(note2);
            addtionalInfoComponents.Note2.css("display","");
        }
        if (CommonUtils.isNotNull(note3)) {
            addtionalInfoComponents.Note3.text(note3);
            addtionalInfoComponents.Note3.css("display","");
        }
        if (CommonUtils.isNotNull(note4)) {
            addtionalInfoComponents.Note4.text(note4);
            addtionalInfoComponents.Note4.css("display","");
        }
    }
};

//Create a closure
(function(){
    //Base Method
    var originalAddClassMethod = jQuery.fn.addClass;
    var originalRemoveClassMethod = jQuery.fn.removeClass;
    //Override
    jQuery.fn.addClass = function(){
        //Execute the original method.
        var result = originalAddClassMethod.apply(this, arguments);
        //trigger a custom event
        jQuery(this).trigger("cssClassChanged");
        //return the original result
        return result;
    }
    jQuery.fn.removeClass = function(){
        //Execute the original method.
        var result = originalRemoveClassMethod.apply(this, arguments);
        //trigger a custom event
        jQuery(this).trigger("cssClassChanged");
        //return the original result
        return result;
    }
})();

/**
 * PagePolicy
 */
if (CommonUtils.isMobile()) {
    pagePolicy.putParameter("RtoasterTopBanner", "/app/lbi/rtoaster/itemdetail/rt_sp_rule_yokoichi.lbi");
    pagePolicy.putParameter("RtoasterAddToCart", "/app/lbi/rtoaster/itemdetail/rt_auto_detail4.lbi");
    pagePolicy.putParameter("RtoasterRecommendItems", "/app/lbi/rtoaster/itemdetail/rt_auto_detail6.lbi");
    pagePolicy.putParameter("RtoasterRecommendInfo", "/app/lbi/rtoaster/itemdetail/rt_recommendInfo_sp.lbi");
    pagePolicy.putParameter("RtoasterCheckedItems", "/app/lbi/rtoaster/itemdetail/rt_userhistory5.lbi");
} else {
    pagePolicy.putParameter("RtoasterTopBanner", "/app/lbi/rtoaster/itemdetail/rt_pc_rule_yokoichi.lbi");
    pagePolicy.putParameter("RtoasterAddToCart", "/app/lbi/rtoaster/itemdetail/rt_auto_detail5.lbi");
    pagePolicy.putParameter("RtoasterRecommendItems", "/app/lbi/rtoaster/itemdetail/rt_auto_detail1.lbi");
    pagePolicy.putParameter("RtoasterRecommendInfo", "/app/lbi/rtoaster/itemdetail/rt_recommendInfo_pc.lbi");
    pagePolicy.putParameter("RtoasterCheckedItems", "/app/lbi/rtoaster/itemdetail/rt_userhistory4.lbi");
}