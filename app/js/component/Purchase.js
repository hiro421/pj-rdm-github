/** 
 *    @fileoverview For front page
 *    @version 2016-12-21
 *    @require jQuery Ver.1.11.2 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @require Purchase.css or Other Style for Purchase
 */
//RepurchaseItemReviewBtn -----------------------------------------------
function Purchase(parameters) {
    this.initialize(parameters);
}

Purchase.prototype = {
    itemCode                   : null,
    dispColorCode              : null,
    dispSkuCode                : null,
    previousid                 : null,
    MAIN_IMAGE_PARAM          : "?wid=280&op_usm=1,1,10,0&resMode=sharp2",
    COLOR_IMAGE_PARAM          : "?wid=100&op_usm=1,1,10,0&resMode=sharp2",
    PurchaseItemInfo       : null,
    PurchaseSkuInfo        : null,
    SelectedColorComponents: null,
    PurchasePanelComponents: {},
    PurchasePanelSetting   : {
        //Main Panel
        PurchasePanel : {
            tag : "<div></div>",
            attr : {
                "id" : "PurchasePanel",
                "class" : "add-tyo-cart",
                "style" : "display:none;"
            },
            //Header
            PurchaseHeader : {
                tag : "<header></header>",
                //Close
                text : "ADD to CART",
                PurchaseHeaderSpan : {
                    tag : "<span></span>",
                    text : "\u30ab\u30fc\u30c8\u306b\u5546\u54c1\u3092\u8ffd\u52a0"
                }
            },
            //Form
            PurchaseForm : {
                tag : "<form></form>",
                attr : {
                    "action" : "#"
                },
                PurchaseContainer : {
                    tag : "<div></div>",
                    attr : {
                        "class" : "container"
                    },
                    PurchaseMessage : {
                        tag : "<p></p>",
                        attr : {
                            "class" : "errorTxt",
                            "style" : "display:none;"
                        }
                    },
                    PurchaseItemName : {
                        tag : "<strong></strong>",
                        attr : {
                            "class" : "product-name"
                        },
                        PurchaseItemNameLink : {
                            tag : "<a></a>",
                            attr : {
                                "href" : ""
                            }
                        }
                    },
                    PurchaseItemPic : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "mainPic"
                        },
                        PurchaseItemPicImg : {
                            tag : "<img></img>",
                            attr : {
                                "src" : "//peachjohn.scene7.com/is/image/PeachJohn/DUMMY"
                            }
                        }
                    },
                    PurchaseItemSelectWrap : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "selectWrap"
                        },
                        PurchaseItemSelectColor : {
                            tag : "<div></div>",
                            attr : {
                            "id" : "selectColor",
                                "class" : "selectColor"
                            },
                            PurchaseItemSelectColorTitle : {
                                tag : "<b></b>",
                                text : "Color"
                            },
                            PurchaseItemSelectColorList : {
                                tag : "<ul></ul>",
                                attr : {
                                    "class" : "slides"
                                }
                            }
                        },
                        PurchaseItemSelectSize : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "stockSizeInfo"
                            },
                            PurchaseItemSelectSizeTitle : {
                                tag : "<b></b>",
                                text : "Select Size"
                            },
                            PurchaseItemSelectSizeWrap : {
                                tag : "<div></div>",
                                attr : {
                                    "class" : "wrap"
                                },
                                PurchaseItemSelectSizeSelect : {
                                    tag : "<div></div>",
                                    attr : {
                                        "class" : "sizeSelect"
                                    },
                                    PurchaseItemSelectSizeList : {
                                        tag : "<select></select>"
                                    }
                                },
                                PurchaseItemSelectSizeGuide : {
                                    tag : "<div></div>",
                                    attr : {
                                    "id" : "check-size",
                                        "class" : "sizeguide"
                                    },
                                    PurchaseItemSelectSizeGuideLink : {
                                        tag : "<a></a>",
                                        attr : {
                                        "href" : COMMON_CONSTS.URLS.SIZE_GUIDE_PAGE,
                                            "target" : "_blank"
                                        },
                                        text : "Size Guide"
                                    }
                                }
                            }
                        }
                    },
                    PurchaseConfirmPanel : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "confirm-panel"
                        },
                        PurchaseConfirmText : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "textWrap",
                                "style" : "display:none;"
                            },
                            PurchaseConfirmTextContent : {
                                tag : "<p></p>"
                            }
                        },
                        PurchaseConfirmInfo : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "sizePriceInfo"
                            },
                            PurchaseConfirmInfoList : {
                                tag : "<dl></dl>",
                                PurchaseConfirmItemCodeTitle : {
                                    tag : "<dt></dt>",
                                    text : "Code"
                                },
                                PurchaseConfirmItemCodeValue : {
                                    tag : "<dd></dd>",
                                    attr : {
                                        "id" : "product-code"
                                    }
                                },
                                PurchaseConfirmInventoryTitle : {
                                    tag : "<dt></dt>",
                                    text : "Inventory"
                                },
                                PurchaseConfirmInventoryValue : {
                                    tag : "<dd></dd>",
                                    attr : {
                                        "id" : "product-inventory"
                                    }
                                },
                                PurchaseConfirmColorNameTitle : {
                                    tag : "<dt></dt>",
                                    text : "Color"
                                },
                                PurchaseConfirmColorNameValue : {
                                    tag : "<dd></dd>",
                                    attr : {
                                        "id" : "product-color"
                                    }
                                },
                                PurchaseConfirmSizeNameTitle : {
                                    tag : "<dt></dt>",
                                    text : "Size"
                                },
                                PurchaseConfirmSizeNameValue : {
                                    tag : "<dd></dd>",
                                    attr : {
                                        "id" : "product-size"
                                    }
                                },
                                PurchaseConfirmSizeDetailTitle : {
                                    tag : "<dt></dt>",
                                    text : "Size Detail(cm)"
                                },
                                PurchaseConfirmSizeDetailValue : {
                                    tag : "<dd></dd>",
                                    attr : {
                                        "id" : "product-detail"
                                    }
                                },
                                PurchaseConfirmPriceTitle : {
                                    tag : "<dt></dt>",
                                    text : "Price"
                                },
                                PurchaseConfirmPriceValue : {
                                    tag : "<dd></dd>",
                                    attr : {
                                        "id" : "product-price"
                                    }
                                },
                                PurchaseConfirmQuantityTitle : {
                                    tag : "<dt></dt>",
                                    text : "Quantity"
                                },
                                PurchaseConfirmQuantityContainer : {
                                    tag : "<dd></dd>",
                                    attr : {
                                        "id" : "product-quantity"
                                    },
                                    PurchaseConfirmQuantitySpan : {
                                        tag : "<span></span>"
                                    },
                                    PurchaseConfirmQuantityList : {
                                        tag : "<select></select>",
                                        html : "<option value=\"1\">1</option>" +
                                        "<option value=\"2\">2</option>" +
                                        "<option value=\"3\">3</option>" +
                                        "<option value=\"4\">4</option>" +
                                        "<option value=\"5\">5</option>" +
                                        "<option value=\"6\">6</option>" +
                                        "<option value=\"7\">7</option>" +
                                        "<option value=\"8\">8</option>" +
                                        "<option value=\"9\">9</option>"
                                    }
                                },
                            }
                        },
                        PurchaseConfirmTotalPrice : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "price"
                            },
                            text : "\u5408\u3000\u8a08 ",
                            PurchaseConfirmTotalPriceSpan : {
                                tag : "<span></span>"
                            }
                        },
                        PurchaseConfirmFooter : {
                            tag : "<footer></footer>",
                            PurchaseConfirmFooterClose : {
                                tag : "<a></a>",
                                attr : {
                                    "class" : "btn-close white",
                                    "href" : "javascript:void(0);",
                                    "id" : "product-selector-dialog-close"
                                },
                                PurchaseConfirmFooterCloseSpan : {
                                    tag : "<span></span>",
                                    text : "\u9589\u3058\u308b"
                                }
                            },
                            PurchaseConfirmFooterAddCart : {
                                tag : "<a></a>",
                                attr : {
                                    "class" : "btn-view",
                                    "href" : "javascript:void(0);",
                                    "id" : "product-selector-dialog-addcart"
                                },
                                //Add to Cart
                                text : "\u30ab\u30fc\u30c8\u306b\u5165\u308c\u308b"
                            },
                            PurchaseConfirmFooterShowCart : {
                                tag : "<a></a>",
                                attr : {
                                    "class" : "btn-view",
                                    "href" : "javascript:void(0);",
                                    "style" : "display:none;"
                                },
                                //Show Shoppingbag
                                text : "\u30ab\u30fc\u30c8\u3092\u898b\u308b"
                            }
                        },
                        PurchaseConfirmLoadingPanel : {
                            tag : "<div></div>",
                            attr : {
                                "style" : "width:100%;height:100%;position:absolute;left:0px;top:0px;background:rgb(255, 255, 255);z-index:999999;display:none;background-image:url(data:image/gif;base64,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);background-position:center;background-repeat:no-repeat;"
                            }
                        }
                    }
                }
            }
        }
    },
    //Color Item
    PurchaseItemColorSetting : {
        PurchaseItemSelectColorItem : {
            tag : "<li></li>",
            PurchaseItemSelectColorPic : {
                tag : "<div></div>",
                attr : {
                    "class" : "pic"
                },
                PurchaseItemSelectColorPicImg : {
                    tag : "<img></img>"
                }
            },
            PurchaseItemSelectColorInfo : {
                tag : "<p></p>",
                PurchaseItemSelectColorInfoIcon : {
                    tag : "<span></span>"
                }
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
                "style" : "display:none;"
            },
            Loading : {
                tag : "<div></div>",
                attr : {
                    //"class" : "PurchaseLoadingPanel"
                    "style" : "display:none;width:100%;height:100%;position:absolute;left:0px;top:0px;background:rgb(255, 255, 255);z-index:999999;background-image:url(data:image/gif;base64,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);background-position:center;background-repeat:no-repeat;"
                }
            }
        }
    },
    
    initialize : function(parameters) {
        if (typeof parameters == "undefined") {
            return;
        }
        
        if (typeof parameters.itemCode != "undefined") {
            this.itemCode = parameters.itemCode;
        }
        if (typeof parameters.dispSkuCode != "undefined") {
            this.dispSkuCode = parameters.dispSkuCode;
        } else if (typeof parameters.dispColorCode != "undefined") {
            this.dispColorCode = parameters.dispColorCode;
        }
        if (typeof parameters.previousid != "undefined") {
            this.previousid = parameters.previousid;
        }
    },
    //Common Process
    initializePurchasePanel : function() {
        var purchaseInstance = this;
        //Delete Purchase Panel if exists
        if (jQuery("#" + this.PurchasePanelSetting.PurchasePanel.attr.id).length > 0) {
            jQuery("#" + this.PurchasePanelSetting.PurchasePanel.attr.id).remove();
        }
        //Drop Overlay Panel if exists
        if (jQuery("#" + this.ShadowOverlaySetting.OverlayPanel.attr.id).length > 0) {
            jQuery("#" + this.ShadowOverlaySetting.OverlayPanel.attr.id).remove();
        }
        //Clear Components
        purchaseInstance.PurchasePanelComponents = {};
        purchaseInstance.ShadowOverlayComponents = {};
        purchaseInstance.PurchaseItemInfo = {};
        purchaseInstance.PurchaseSkuInfo = {};
        
        //Create ItemInfoPanel
        var itemInfoPanel = CommonUtils.createHtmlConponent(purchaseInstance.PurchasePanelSetting, purchaseInstance.PurchasePanelComponents, null);
        jQuery(this.PurchasePanelComponents.PurchasePanel).appendTo("body");
        
        //Create ShadowOverlayWhole
        var shadowOverlay = CommonUtils.createHtmlConponent(purchaseInstance.ShadowOverlaySetting, purchaseInstance.ShadowOverlayComponents, null);
        jQuery(this.ShadowOverlayComponents.OverlayPanel).appendTo("body");
        
        //Close Event
        jQuery(purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterClose).click(function() {
            if (jQuery(purchaseInstance.ShadowOverlayComponents.OverlayPanel).length > 0) {
                jQuery(purchaseInstance.ShadowOverlayComponents.OverlayPanel).fadeOut(500, function(){
                    jQuery(this).remove();
                });
            }
            if (jQuery(purchaseInstance.PurchasePanelComponents.PurchasePanel).length > 0) {
                jQuery(purchaseInstance.PurchasePanelComponents.PurchasePanel).fadeOut(500, function(){
                    jQuery(this).remove();
                });
            }
        });
        jQuery(purchaseInstance.ShadowOverlayComponents.OverlayPanel).click(function() {
            jQuery(purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterClose).click();
        });
        
        //Show Shopping Bag
        jQuery(purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterShowCart).click(function() {
            var showShoppingBagUrl = COMMON_CONSTS.URLS.SHOPPING_BAG_PAGE;
            if (jQuery(purchaseInstance.previousid).length > 0) {
                showShoppingBagUrl += "?" + COMMON_CONSTS.HTTP_COMMON.REQUEST.PREVIOUS_ID + "=" + purchaseInstance.previousid;
            }
            window.location.href = showShoppingBagUrl;
        });
        
        //Show ShadowOverlay
        jQuery(purchaseInstance.ShadowOverlayComponents.OverlayPanel).fadeIn(200, function(){
            purchaseInstance.getItemPurchaseInfo();
        });

    },
    getItemPurchaseInfo : function() {
        var purchaseInstance = this;
        var urlParams = {};
        urlParams[COMMON_CONSTS.ITEM_DETAIL_INFO_API.REQUEST.ITEM_CODE] = purchaseInstance.itemCode;
        urlParams[COMMON_CONSTS.ITEM_DETAIL_INFO_API.REQUEST.ICON_KBN] = COMMON_CONSTS.ITEM_DETAIL_INFO_API.ENUM.ICON_KBN.ICON_NAME;
        jQuery.ajax({
            method       :    "GET",
            async        :    true,
            dataType     :    "json",
            timeout      :    10000,
            url          :    COMMON_CONSTS.URLS.ITEM_DETAIL_INFO_API,
            data         :    urlParams,
            beforeSend   : function(xhr, settings){
                //Show Processing
                var loadingStyles = {
                    "width": "50px",
                    "height": "50px",
                    "top": ((jQuery(window).height()-50)/2),
                    "left" : ((jQuery(window).width()-50)/2)
                };
                jQuery(purchaseInstance.ShadowOverlayComponents.Loading).css(loadingStyles);
                jQuery(purchaseInstance.ShadowOverlayComponents.Loading).fadeIn(500);
            },
            complete: function(xhr, status){
                var purchasePanel = jQuery(purchaseInstance.PurchasePanelComponents.PurchasePanel);
                var mainPanelWidth = purchasePanel.innerWidth();
                var mainPanelHeight = purchasePanel.innerHeight();
                var borderLeftWidth = parseInt(purchasePanel.css("border-left-width"), 10);
                var borderRightWidth = parseInt(purchasePanel.css("border-right-width"), 10);
                var borderTopWidth = parseInt(purchasePanel.css("border-top-width"), 10);
                var borderBottomWidth = parseInt(purchasePanel.css("border-bottom-width"), 10);
                mainPanelWidth += isNaN(borderLeftWidth)?0:borderLeftWidth;
                mainPanelWidth += isNaN(borderRightWidth)?0:borderRightWidth;
                mainPanelHeight += isNaN(borderTopWidth)?0:borderTopWidth;
                mainPanelHeight += isNaN(borderBottomWidth)?0:borderBottomWidth;
                
                var heightPos = jQuery(window).height()>mainPanelHeight?jQuery(window).height()-mainPanelHeight:0;
                var topPos = (CommonUtils.isTabletPanel()?jQuery(window).scrollTop():0) + heightPos/2;
                jQuery(purchaseInstance.ShadowOverlayComponents.Loading).animate({
                    "width": mainPanelWidth,
                    "height": mainPanelHeight,
                    "top": heightPos/2,
                    "left": ((jQuery(window).width()-mainPanelWidth)/2)
                }, 500, function(){
                    jQuery(purchaseInstance.ShadowOverlayComponents.Loading).fadeOut(500, function(){
                        jQuery(purchaseInstance.ShadowOverlayComponents.Loading).remove();
                    });
                    //MainPanel CSS
                    var contentStyles = {
                        "top" : topPos,
                        "left" : ((jQuery(window).width()-mainPanelWidth)/2),
                        "margin" : "0px"
                    };
                    jQuery(purchaseInstance.PurchasePanelComponents.PurchasePanel).css(contentStyles);
                    jQuery(purchaseInstance.PurchasePanelComponents.PurchasePanel).fadeIn(200);
                });
            },
            success: function(responseText, status, xhr){
                purchaseInstance.PurchaseItemInfo = responseText;
                if (responseText.status == "1") {
                    //SECCESS
                    purchaseInstance.createItemPurchasePanel();
                } else {
                    //ERROR
                    purchaseInstance.createItemInfoGetErrPanel(responseText.message);
                }
            },
            error: function(xhr,status,error){
                purchaseInstance.createItemInfoGetErrPanel(COMMON_CONSTS.MESSAGES.SYSTEM_ERR_MESSAGE);
            }
        });
    },
    createItemInfoGetErrPanel : function(message) {
        var purchaseInstance = this;
        purchaseInstance.PurchasePanelComponents.PurchasePanel.removeClass().addClass("add-tyo-cart error");
        purchaseInstance.PurchasePanelComponents.PurchaseMessage.text(message);
        purchaseInstance.PurchasePanelComponents.PurchaseMessage.css("display", "block");
        purchaseInstance.PurchasePanelComponents.PurchaseItemName.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseItemPic.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseItemSelectWrap.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmPanel.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterShowCart.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseContainer.append(purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooter);
    },
    createItemPurchasePanel : function() {
        var purchaseInstance = this;
        //ItemName
        var dispItemName = CommonUtils.nullToBlank(this.PurchaseItemInfo.itemInfo[0].dispItemName);
        this.PurchasePanelComponents.PurchaseItemNameLink.text(dispItemName);
        //ItemDetailUrl
        var itemDetailUrl = CommonUtils.nullToBlank(this.PurchaseItemInfo.itemInfo[0].itemDetailUrl);
        this.PurchasePanelComponents.PurchaseItemNameLink.attr("href",itemDetailUrl);
        
        //Color Info
        jQuery.each(this.PurchaseItemInfo.itemInfo[0].colorInfo, function(colorInfoIndex, colorInfo){
            var colorName = CommonUtils.nullToBlank(colorInfo.colorName);
            var colorCode = CommonUtils.nullToBlank(colorInfo.colorCode);
            var colorImageUrl = CommonUtils.nullToBlank(colorInfo.colorImageUrl);
            var colorIconNameList = CommonUtils.nullToBlank(colorInfo.colorIconList);
            var skuInfoList = CommonUtils.nullToBlank(colorInfo.skuInfo);
            //Create ColorItem
            var colorItemComponents = {};
            var itemColorSetting = purchaseInstance.PurchaseItemColorSetting;
            var colorItemPanel = CommonUtils.createHtmlConponent(itemColorSetting, colorItemComponents, null);
            purchaseInstance.PurchasePanelComponents.PurchaseItemSelectColorList.append(colorItemComponents.PurchaseItemSelectColorItem);
            colorImageUrl += purchaseInstance.COLOR_IMAGE_PARAM;
            colorItemComponents.PurchaseItemSelectColorPicImg.attr("src", colorImageUrl);
            if (colorIconNameList.length > 0) {
                colorItemComponents.PurchaseItemSelectColorInfoIcon.text(colorIconNameList[0]);
            }
            if (colorName.length > 0) {
                colorItemComponents.PurchaseItemSelectColorPicImg.attr("alt", colorName);
                colorItemComponents.PurchaseItemSelectColorInfo.append(colorName);
            }
            
            //Judge Disp Color
            if (purchaseInstance.dispSkuCode != null) {
                jQuery.each(skuInfoList, function(skuInfoIndex, skuInfo){
                    //Size Info
                    var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
                    if (purchaseInstance.dispSkuCode == skuCode) {
                        purchaseInstance.dispColorCode = colorCode;
                        return false;
                    }
                });
            }
            
            //Judge Disp Color
            if (colorInfoIndex == 0 || purchaseInstance.dispColorCode == colorCode) {
                //Set Default Disp
                purchaseInstance.SelectedColorComponents = colorItemComponents;
            }
            
            //----Color Click Event
            jQuery(colorItemComponents.PurchaseItemSelectColorPic).click(function() {
                //Set Selecting Color
                purchaseInstance.SelectedColorComponents = colorItemComponents;
                //Do Nothing when Selected
                //if (jQuery(colorItemComponents.PurchaseItemSelectColorItem).hasClass("active")) {
                //    return;
                //}
                //If Purchased Panel is showing, back to Purchase Panel
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmText.css("display", "none");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.css("display", "block");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterShowCart.css("display", "none");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList.css("display", "block");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantitySpan.css("display", "none");
                //Clear SkuInfo
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmItemCodeValue.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmInventoryValue.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmColorNameValue.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmSizeNameValue.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmSizeDetailValue.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmPriceValue.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantitySpan.text("");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList.css("display", "block");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList.val("1");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmTotalPriceSpan.empty();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.unbind();
                
                //Create Item Preview Image
                jQuery(".add-tyo-cart .selectColor ul li.active").removeClass();
                jQuery(colorItemComponents.PurchaseItemSelectColorItem).removeClass().addClass("active");
                //Color Image Change
                var cloneColorImg = jQuery(purchaseInstance.PurchasePanelComponents.PurchaseItemPicImg).clone().removeAttr("id");
                cloneColorImg.appendTo(purchaseInstance.PurchasePanelComponents.PurchaseItemPicImg.parent());
                purchaseInstance.PurchasePanelComponents.PurchaseItemPicImg.parent().css("position", "relative");
                var colorImgColorStyles = {
                    "max-width": purchaseInstance.PurchasePanelComponents.PurchaseItemPicImg.parent().width() + "px",
                    "position": "absolute",
                    "top" : "0px",
                    "left" : "0px",
                    "z-index" : "10001"
                };
                cloneColorImg.css(colorImgColorStyles);
                //Replace image size to MainImage
                var colorPicImgSrc = colorItemComponents.PurchaseItemSelectColorPicImg.attr("src");
                colorPicImgSrc = colorPicImgSrc.replace(purchaseInstance.COLOR_IMAGE_PARAM, purchaseInstance.MAIN_IMAGE_PARAM);
                purchaseInstance.PurchasePanelComponents.PurchaseItemPicImg.attr("src", colorPicImgSrc);
                cloneColorImg.fadeOut(500, function(){
                    cloneColorImg.remove();
                });
                //Create ColorItem
                purchaseInstance.composeItemPurchaseColorDispInfo(colorInfo);
                //Create SizeItem
                purchaseInstance.composeItemPurchaseSizeList(skuInfoList);
            });
            //Disp The Color
            //if (purchaseInstance.dispColorCode != null && purchaseInstance.dispColorCode == colorCode) {
            //    jQuery(colorItemComponents.PurchaseItemSelectColorPic).click();
            //}
        });
        //Disp The Color
        purchaseInstance.SelectedColorComponents.PurchaseItemSelectColorPic.click();
    },
    composeItemPurchaseColorDispInfo : function(colorInfo) {
        var purchaseInstance = this;
        var colorName = CommonUtils.nullToBlank(colorInfo.colorName);
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmColorNameValue.text(colorName);
    },
    composeItemPurchaseSizeList : function(skuInfoList) {
        var purchaseInstance = this;
        
        //Create SizeItem
        jQuery(purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList).empty();
        //Sort by dispSort
        skuInfoList.sort(function(val1, val2) {
            var sort1 = 10000, sort2 = 10000;
            if (CommonUtils.isNotNull(val1.dispSort)) {
                sort1 = parseInt(val1.dispSort, 10);
            }
            if (CommonUtils.isNotNull(val2.dispSort)) {
                sort2 = parseInt(val2.dispSort, 10);
            }
            return sort1 - sort2;
        });

        //Create SizeItem
        jQuery(purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList).empty();
        jQuery.each(skuInfoList, function(skuInfoIndex, skuInfo){
            //Size Info
            var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
            var sizeName = CommonUtils.nullToBlank(skuInfo.sizeName);
            var specDetailSize = CommonUtils.nullToBlank(skuInfo.specDetailSize);
            var mediaKbn = CommonUtils.nullToBlank(skuInfo.mediaKbn);
            var stockStatus = CommonUtils.nullToBlank(skuInfo.stockStatus);
            var stockStatusText = CommonUtils.nullToBlank(skuInfo.stockStatusText);
            var exSalePrice = CommonUtils.nullToBlank(skuInfo.exSalePrice);
            var salePrice = CommonUtils.nullToBlank(skuInfo.salePrice);
            var taxDisplayExplainText = CommonUtils.nullToBlank(skuInfo.taxDisplayExplainText);
            //Not Exists Size
            if (sizeName == "") {
                //OneSize
                sizeName = "\u30ef\u30f3\u30b5\u30a4\u30ba";
            }
            var sizeItem = jQuery("<option></option>");
            purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList.append(sizeItem);
            sizeItem.val(skuCode);
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
            sizeItem.text(sizeItemText);
            //Set Sku Info
            purchaseInstance.PurchaseSkuInfo[skuCode] = {
                skuCode               : skuCode,
                sizeName              : sizeName,
                specDetailSize        : specDetailSize,
                mediaKbn              : mediaKbn,
                stockStatus           : stockStatus,
                stockStatusText       : stockStatusText,
                exSalePrice           : exSalePrice,
                salePrice             : salePrice,
                taxDisplayExplainText : taxDisplayExplainText
            };
        });
        purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList.unbind();
        if (purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList.children().length > 0) {
            jQuery(purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList).change(function() {
                var skuCode = jQuery(this).val();
                var skuInfo = purchaseInstance.PurchaseSkuInfo[skuCode];
                purchaseInstance.composeItemPurchaseSizeDispInfo(skuInfo);
            });
            if (purchaseInstance.dispSkuCode != null) {
                var skuItem = purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList.find("option[value='" + purchaseInstance.dispSkuCode + "']");
                if (skuItem.length > 0) {
                    purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList.val(purchaseInstance.dispSkuCode);
                    purchaseInstance.dispSkuCode = null;
                }
            }
            purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSizeList.change();
        } else {
            //No Size Exists in this Color
            if (skuInfoList.length == 1) {
                //Hide SizeListPanel
                jQuery(purchaseInstance.PurchasePanelComponents.PurchaseItemSelectSize).css("display","none");
                //add Size Click Event to Color
                var skuInfo = skuInfoList[0];
                //Set Size Info
                purchaseInstance.composeItemPurchaseSizeDispInfo(skuInfo);
            }
        }
    },
    composeItemPurchaseSizeDispInfo : function(skuInfo) {
        var purchaseInstance = this;
        
        var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
        var sizeName = CommonUtils.nullToBlank(skuInfo.sizeName);
        var specDetailSize = CommonUtils.nullToBlank(skuInfo.specDetailSize);
        var mediaKbn = CommonUtils.nullToBlank(skuInfo.mediaKbn);
        var stockStatus = CommonUtils.nullToBlank(skuInfo.stockStatus);
        var stockStatusText = CommonUtils.nullToBlank(skuInfo.stockStatusText);
        var exSalePrice = CommonUtils.nullToBlank(skuInfo.exSalePrice);
        var salePrice = CommonUtils.nullToBlank(skuInfo.salePrice);
        var taxDisplayExplainText = CommonUtils.nullToBlank(skuInfo.taxDisplayExplainText);
        
        //If Purchased Panel is showing, back to Purchase Panel
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmText.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.empty();
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.css("display", "block");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterShowCart.css("display", "none");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList.css("display", "block");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantitySpan.css("display", "none");
        //Set SkuInfo
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmItemCodeValue.text(skuCode.substr(0, 7) + "-" + skuCode.substr(7, 2) + "-" + skuCode.substr(9));
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmInventoryValue.text(stockStatusText);
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmSizeNameValue.text(sizeName);
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmSizeDetailValue.text(specDetailSize);
        
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmPriceValue.empty();
        if (exSalePrice > salePrice) {
            var exSalePricePanel = jQuery("<span></span>").text("\u00A5" + CommonUtils.numberFormat(exSalePrice) + "\u2192").css("color", "rgb(51,51,51)");
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmPriceValue.append(exSalePricePanel);
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmPriceValue.append(" \u00A5" + CommonUtils.numberFormat(salePrice) + taxDisplayExplainText).css("color", "#FF5252");
        } else {
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmPriceValue.append("\u00A5" + CommonUtils.numberFormat(salePrice) + taxDisplayExplainText).css("color", "#333");
        }
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList.val("1");
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmTotalPriceSpan.text("\u00A5" + CommonUtils.numberFormat(salePrice) + taxDisplayExplainText);

        //Amount Changed
        jQuery(purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList).unbind();
        jQuery(purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList).change(function() {
            var totalPrice = salePrice * jQuery(this).val();
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmTotalPriceSpan.text("\u00A5" + CommonUtils.numberFormat(totalPrice) + taxDisplayExplainText);
        });
        //Validate StockStatus(Hide Inventory)
        if (jQuery.inArray(stockStatus, 
                [COMMON_CONSTS.STOCK_STATUS.STOP, COMMON_CONSTS.STOCK_STATUS.STOCK_1, COMMON_CONSTS.STOCK_STATUS.FEW_1, 
                COMMON_CONSTS.STOCK_STATUS.SOLD_OUT, COMMON_CONSTS.STOCK_STATUS.NONE]) > -1) {
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmInventoryTitle.css("display", "none");
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmInventoryValue.css("display", "none");
        } else {
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmInventoryTitle.css("display", "inline-block");
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmInventoryValue.css("display", "inline-block");
        }
        //Validate StockStatus(Disable PurchaseButton)
        purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.unbind();
        if (jQuery.inArray(stockStatus, 
                [COMMON_CONSTS.STOCK_STATUS.STOP, COMMON_CONSTS.STOCK_STATUS.SOLD_OUT, COMMON_CONSTS.STOCK_STATUS.NONE]) > -1) {
            var cartDisabledCss = {
                "background" : "#7d7d7d",
                "pointer-events": "none",
                "cursor" : "default"
            };
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.css(cartDisabledCss);
        } else {
            var cartEnabledCss = {
                "background" : "#000",
                "pointer-events": "auto",
                "cursor" : "pointer"
            };
            purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.css(cartEnabledCss);
            //AddToCart Click
            jQuery(purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart).click(function() {
                var amount = purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList.val();
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantitySpan.text(amount);
                purchaseInstance.doItemPurchaseAddShoppingCart(skuCode, amount, mediaKbn);
                //sitecatalyst
                if (typeof s_gi == "function") {
                    var s=s_gi(s_account);
                    s.linkTrackVars='events,products';
                    //s.products=';'+purchaseInstance.itemCode;
                    s.linkTrackEvents='scAdd';
                    s.events='scAdd';
                    s.tl(true,'o','Shoppingbag');
                }
            });
        }
    },
    doItemPurchaseAddShoppingCart : function(skuCode, itemAmount, itemBrand) {
        var purchaseInstance = this;
        
        var urlParams = {};
        urlParams[COMMON_CONSTS.ADD_SHOPPING_BAG_API.REQUEST.SKU_CODE] = skuCode;
        urlParams[COMMON_CONSTS.ADD_SHOPPING_BAG_API.REQUEST.ORDER_NUM] = itemAmount;
        urlParams[COMMON_CONSTS.ADD_SHOPPING_BAG_API.REQUEST.BRAND] = itemBrand;
        jQuery.ajax({
            method       :    "GET",
            async        :    true,
            dataType     :    "json",
            timeout      :    10000,
            url          :    COMMON_CONSTS.URLS.ADD_SHOPPING_BAG_API,
            data         :    urlParams,
            beforeSend   : function(xhr, settings){
                //Show Processing
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmLoadingPanel.fadeIn(500);
            },
            complete     : function(xhr, status){
                //Hide Processing
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmLoadingPanel.fadeOut(500);
            },
            success      : function(responseText, status, xhr){
                if (responseText.status == "1") {
                    //SECCESS
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmText.css("background-color", "#000").css("display", "block");
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.text(COMMON_CONSTS.MESSAGES.ADD_TO_CART_SUCCESS);
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.css("color", "#fff")
                    
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantityList.css("display", "none");
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmQuantitySpan.css("display", "block");
                    
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterAddCart.css("display", "none");
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmFooterShowCart.css("display", "block");
                    //Reflect Header
                    CommonUtils.getCommonData(pagePolicy);
                } else {
                    //ERROR
                    if (responseText.statusText.length <= 20) {
                        purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.text(responseText.statusText);
                    } else {
                        purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.text(COMMON_CONSTS.MESSAGES.ADD_TO_CART_FAIL);
                    }
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmText.css("background-color", "#eee").css("display", "block");
                    purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.css("color", "#bf0000")
                }
            },
            error        : function(xhr,status,error){
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.text(COMMON_CONSTS.MESSAGES.SYSTEM_ERR_MESSAGE);
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmText.css("background-color", "#eee").css("display", "block");
                purchaseInstance.PurchasePanelComponents.PurchaseConfirmTextContent.css("color", "#bf0000");
            }
        });
    }
};
