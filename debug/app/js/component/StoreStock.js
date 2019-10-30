/** 
 *    @fileoverview For front page
 *    @version 2016-12-21
 *    @require jQuery Ver.1.11.2 and above
 *    @require lib.js(jQuery.Cookie)
 *    @require main.css or Other Style for StoreStock
 *    @require CommonParams.js
 *    @require CommonUtils.js
 */
////Prefecture List -----------------------------------------------
//var storeStockInstance = null;
//buildPrefectureList = function() {
//    //Analyze Response Data from Scene7
//    if (typeof respJson == "undefined" || respJson == null) {
//        detailPageInstance.ColorImageInfo = {};
//    } else {
//        detailPageInstance.ColorImageInfo = CommonUtils.processSecen7RespJson(respJson);
//    }
//    //Build Item Detail Photo(pc only)
//    if (!CommonUtils.isTabletPanel()) {
//        detailPageInstance.buildItemDetailPhoto();
//    }
//    //Call Color Click Event
//    if (detailPageInstance.SelectedColorComponents != null) {
//        detailPageInstance.SelectedColorComponents.ColorImage.click();
//    }
//}
var GoogleDistanceService = null;
var FCStoreList = ["4102"];
//Store Stock Info -----------------------------------------------
function StoreStock(parameters) {
    this.initialize(parameters);
}
StoreStock.prototype = {
    itemCode              : null,
    dispColorCode         : null,
    dispSkuCode           : null,
    previousid            : null,
    SizeData              : null,
    isDistanceExists      : false,
    isProcessing          : false,
    COLOR_IMAGE_PARAM     : "?wid=100&op_usm=1,1,10,0&resMode=sharp2",
    SelectedColorComponents : null,
    StoreStockComponents: {},
    StoreStockSetting   : {
        StoreStockPanel : {
            tag : "<div></div>",
            attr : {
                "id" : "modalStock",
                "class" : "modalStock",
                "style" : "display:none;"
            },
            Inner : {
                tag : "<div></div>",
                attr : {
                    "class" : "inner"
                },
                Title : {
                    tag : "<h2></h2>",
                    text : "STORE INVENTORY",
                    SubTitle : {
                        tag : "<span></span>",
                        attr : {
                            "class" : "parts-subTitle",
                            "style" : "display:block;font-size:1.1rem;margin-top:5px;"
                        },
                        text : "\u5e97\u8217\u5728\u5eab"
                    }
                },
                InfoWrapper : {
                    tag : "<div></div>",
                    attr : {
                        "class" : "wrap"
                    },
                    ItemErrMsg : {
                        tag : "<p></p>",
                        attr : {
                            "style" : "display:none;text-align:center;"
                        }
                    },
                    ItemTitle : {
                        tag : "<p></p>",
                        attr : {
                            "class" : "name"
                        }
                    },
                    ColorPanel : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "left"
                        },
                        ColorSelector : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "selectColor"
                            },
                            ColorTitle : {
                                tag : "<b></b>",
                                text : "Color"
                            },
                            ColorList : {
                                tag : "<ul></ul>"
                            }
                        }
                    },
                    SizeCondPanel : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "right"
                        },
                        SizePanel : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "selectSize"
                            },
                            ColorTitle : {
                                tag : "<b></b>",
                                text : "Select Size"
                            },
                            SizeSelector : {
                                tag : "<div></div>",
                                attr : {
                                    "class" : "selectWrap size"
                                },
                                SizeList : {
                                    tag : "<select></select>"
                                }
                            }
                        },
                        CondPanel : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "selectStore"
                            },
                            CondTable : {
                                tag : "<table></table>",
                                CondPrefRow : {
                                    tag : "<tr></tr>",
                                    CondPrefTitle : {
                                        tag : "<th></th>",
                                        text : "\u90fd\u9053\u5e9c\u770c"
                                    },
                                    CondPrefData : {
                                        tag : "<td></td>",
                                        CondPrefSelector : {
                                            tag : "<div></div>",
                                            attr : {
                                                "class" : "selectWrap def"
                                            },
                                            CondPrefList : {
                                                tag : "<select></select>",
                                                CondPrefBlank : {
                                                    tag : "<option></option>",
                                                    text : "\u6307\u5b9a\u306a\u3057",
                                                    attr : {
                                                        "value" : COMMON_CONSTS.STORE_STOCK_INFO_API.ENUM.PREF_CODE_ENTIRE
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                CondStoreRow : {
                                    tag : "<tr></tr>",
                                    CondStoreTitle : {
                                        tag : "<th></th>",
                                        text : "\u5e97\u8217\u540d"
                                    },
                                    CondStoreData : {
                                        tag : "<td></td>",
                                        CondStoreInput : {
                                            tag : "<input></input>",
                                            attr : {
                                                "type" : "text",
                                                "placeholder" : "\u65b0\u5bbf"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    SearchBtn : {
                        tag : "<button></button>",
                        attr : {
                            "class" : "searchBtn"
                        },
                        text : "\u691c\u7d22"
                    },
                    FavSearchBtn : {
                        tag : "<button></button>",
                        attr : {
                            "class" : "favBtn"
                        },
                        text : "\u304a\u6c17\u306b\u5165\u308a\u5e97\u8217\u3067\u691c\u7d22"
                    },
                    ResultPanel : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "storeList",
                            "style" : "display:none;"
                        },
                        ResultMessage : {
                            tag : "<p></p>",
                            attr : {
                                "class" : "nonText"
                            }
                        },
                        FavComment : {
                            tag : "<p></p>",
                            FavCommentMark : {
                                tag : "<span></span>"
                            },
                            text_1 : "\u3092\u30bf\u30c3\u30d7\u3059\u308b\u3068\u3001",
                            FavCommentNewLine : {
                                tag : "<br/>"
                            },
                            text_2 : "\u304a\u6c17\u306b\u5165\u308a\u5e97\u8217\u306b\u767b\u9332\u3067\u304d\u307e\u3059"
                        },
                        StoreTable : {
                            tag : "<table></table>",
                            StoreHead : {
                                tag : "<thead></thead>",
                                StoreHeadRow : {
                                    tag : "<tr></tr>",
                                    StoreHeadStoreName : {
                                        tag : "<th></th>",
                                        text : "\u5e97\u8217\u540d"
                                    },
                                    StoreHeadDistanceName : {
                                        tag : "<th></th>",
                                        text : "\u8ddd\u96e2",
                                        attr : {
                                            "style" : "display:none;"
                                        }
                                    },
                                    StoreHeadStockName : {
                                        tag : "<th></th>",
                                        text : "\u5728\u5eab"
                                    }
                                }
                            },
                            StoreBody : {
                                tag : "<tbody></tbody>"
                            }
                        },
                        CautionInfo : {
                            tag : "<div></div>",
                            attr : {
                                "class" : "caution"
                            },
                            CautionTitle : {
                                tag : "<p></p>",
                                attr : {
                                    "class" : "trigger"
                                },
                                text : "\u5728\u5eab\u8868\u793a\u306b\u3064\u3044\u3066\u306e\u3054\u6ce8\u610f"
                            },
                            CautionContent : {
                                tag : "<p></p>",
                                attr : {
                                    "class" : "acoCont"
                                },
                                text_1 : " \u203b\u5728\u5eab\u72b6\u6cc1\u306f20\u5206\u6bce\u306b\u66f4\u65b0\u306e\u305f\u3081\u3001",
                                text_2 : "\u3054\u6765\u5e97\u6642\u306b\u5728\u5eab\u304c\u306a\u3044\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002<br/>",
                                text_3 : "\u8a73\u3057\u304f\u306f\u5404\u5e97\u8217\u3078\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002<br/><br/>",
                                text_4 : "\u203b\u8868\u793a\u4fa1\u683c\u306fWEB\u30b5\u30a4\u30c8\u3067\u306e\u4fa1\u683c\u3067\u3059\u3002<br/>",
                                text_5 : "\u5e97\u8217\u306e\u8ca9\u58f2\u4fa1\u683c\u3068\u7570\u306a\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002<br/><br/>",
                                text_6 : "\u203b\u5404\u5e97\u8217\u3067\u5546\u54c1\u306e\u304a\u53d6\u308a\u5bc4\u305b\u304c\u3067\u304d\u307e\u3059\u3002<br/>",
                                text_7 : "\uff08YUMMYMART\u3001SALON\u3001\u30a2\u30a6\u30c8\u30ec\u30c3\u30c8\u5e97\u3001\u79cb\u7530\u5e97\u3084\u4e00\u90e8\u5546\u54c1\u3092\u9664\u304f\uff09<br/>",
                                text_8 : "\u300c",
                                BackOrderLink : {
                                    tag : "<a></a>",
                                    attr : {
                                        "href" : "/al/info/backorder/"
                                    },
                                    text : "WEB\u3067\u9078\u3093\u3067\u30b9\u30c8\u30a2\u3067\u304a\u8a66\u3057"
                                },
                                text_9 : "\u300d\u3092\u3054\u5229\u7528\u3044\u305f\u3060\u304f\u304b\u3001\u5404\u5e97\u8217\u3078\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002"
                            }
                        }
                    }
                },
                CloseBtn : {
                    tag : "<div></div>",
                    attr : {
                        "class" : "closeBtn"
                    },
                    CloseMark : {
                        tag : "<span></span>"
                    },
                    text : "CLOSE"
                }
            }
        }
    },
    //Color Item
    ColorItemSetting : {
        ColorItem : {
            tag : "<li></li>",
            ColorPic : {
                tag : "<div></div>",
                attr : {
                    "class" : "pic"
                },
                ColorPicImg : {
                    tag : "<img></img>"
                }
            },
            ColorInfo : {
                tag : "<p></p>",
                ColorIconInfo : {
                    tag : "<span></span>"
                }
            }
        }
    },
    //List Item
    ListItemSetting : {
        ListItem : {
            tag : "<option></option>"
        }
    },
    //Store Row
    StoreRowSetting : {
        StoreRow : {
            tag : "<tr></tr>",
            StoreNameData : {
                tag : "<th></th>",
                FavMark : {
                    tag : "<span></span>",
                    attr : {
                        "class" : "ico"
                    }
                },
                StoreName : {
                    tag : "<a></a>",
                    attr : {
                        "target" : "_blank"
                    }
                }
            },
            DistanceData : {
                tag : "<td></td>",
                attr : {
                    "style" : "display:none;"
                }
            },
            StockData : {
                tag : "<td></td>",
                attr : {
                    "name" : "storeStockAmount"
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
                "style" : "display:none;position:fixed;top:0;left:0;z-index:9999;cursor:pointer;width:100%;height:100%;background:rgba(0,0,0,0.6);"
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
        storeStockInstance = this;
        if (typeof parameters == "undefined" || typeof parameters.itemCode == "undefined") {
            return;
        }
        
        instance.itemCode = parameters.itemCode;
        if (typeof parameters.dispSkuCode != "undefined") {
            instance.dispSkuCode = parameters.dispSkuCode;
        } else if (typeof parameters.dispColorCode != "undefined") {
            instance.dispColorCode = parameters.dispColorCode;
        }
        if (typeof parameters.previousid != "undefined") {
            instance.previousid = parameters.previousid;
        }
        
        //Delete Purchase Panel if exists
        if (jQuery("#" + instance.StoreStockSetting.StoreStockPanel.attr.id).length > 0) {
            jQuery("#" + instance.StoreStockSetting.StoreStockPanel.attr.id).remove();
        }
        //Drop Overlay Panel if exists
        if (jQuery("#" + instance.ShadowOverlaySetting.OverlayPanel.attr.id).length > 0) {
            jQuery("#" + instance.ShadowOverlaySetting.OverlayPanel.attr.id).remove();
        }
        //Clear Components
        instance.StoreStockComponents = {};
        instance.ShadowOverlayComponents = {};
        //Clear SizeData
        instance.SizeData = {};
    },
    //Common Process
    build : function() {
        var instance = this;
        
        //Create StoreStockPanel
        CommonUtils.createHtmlConponent(instance.StoreStockSetting, instance.StoreStockComponents, null);
        jQuery("body").append(instance.StoreStockComponents.StoreStockPanel);
        
        //Create ShadowOverlayWhole
        CommonUtils.createHtmlConponent(instance.ShadowOverlaySetting, instance.ShadowOverlayComponents, null);
        jQuery("body").append(instance.ShadowOverlayComponents.OverlayPanel);
        
        //Close Event
        jQuery(instance.StoreStockComponents.CloseBtn).click(function() {
            if (jQuery(instance.ShadowOverlayComponents.OverlayPanel).length > 0) {
                jQuery(instance.ShadowOverlayComponents.OverlayPanel).fadeOut(500, function(){
                    jQuery(this).remove();
                });
            }
            if (jQuery(instance.StoreStockComponents.StoreStockPanel).length > 0) {
                jQuery(instance.StoreStockComponents.StoreStockPanel).fadeOut(500, function(){
                    jQuery(this).remove();
                });
            }
        });
        jQuery(instance.ShadowOverlayComponents.OverlayPanel).click(function() {
            jQuery(instance.StoreStockComponents.CloseBtn).click();
        });
        //Caution
        jQuery(instance.StoreStockComponents.CautionTitle).click(function() {
            if (jQuery(instance.StoreStockComponents.CautionContent).is(":visible")) {
                jQuery(this).removeClass("active-submenu");
                jQuery(this).addClass("none-submenu");
                jQuery(instance.StoreStockComponents.CautionContent).slideUp(200);
            } else {
                jQuery(this).addClass("active-submenu");
                jQuery(this).removeClass("none-submenu");
                jQuery(instance.StoreStockComponents.CautionContent).slideDown(200);
            }
        });
        //SearchBtn Click Event
        jQuery(instance.StoreStockComponents.SearchBtn).click(function() {
            instance.getStoreStock(false);
            //sitecatalyst
            if (typeof s_gi == "function") {
                var s=s_gi(s_account);
                s.linkTrackVars='events';
                s.linkTrackEvents='event27';
                s.events='event27';
                s.tl(this,'o','Storesearch');
            }
        });
        //FavSearchBtn Click Event
        jQuery(instance.StoreStockComponents.FavSearchBtn).click(function() {
            instance.getStoreStock(true);
            //sitecatalyst
            if (typeof s_gi == "function") {
                var s=s_gi(s_account);
                s.linkTrackVars='events';
                s.linkTrackEvents='event28';
                s.events='event28';
                s.tl(this,'o','Storelike');
            }
        });
        //Show ShadowOverlay
        jQuery(instance.ShadowOverlayComponents.OverlayPanel).fadeIn(200, function(){
            instance.getItemInfo();
            instance.getPrefList();
        });
    },
    getPrefList : function() {
        var instance = this;
        //Get Prefecture Common Data
        var prefListPolicy = new PagePolicy();
        prefListPolicy.putCommonData(COMMON_CONSTS.COMMON_DATA_API.REQUEST.PREFECTURE_LIST);
        var buildPrefList = function(){
            var prefList = pagePolicy.getCommonData(COMMON_CONSTS.COMMON_DATA_API.REQUEST.PREFECTURE_LIST);
            if (!CommonUtils.isNotNull(prefList)) {return;}
            instance.StoreStockComponents.CondPrefList.empty();
            instance.StoreStockComponents.CondPrefList.append(instance.StoreStockComponents.CondPrefBlank);
            jQuery.each(prefList, function(index, value){
                var prefItemComponents = {};
                CommonUtils.createHtmlConponent(instance.ListItemSetting, prefItemComponents, null);
                prefItemComponents.ListItem.val(value["CODE"]);
                prefItemComponents.ListItem.text(value["NAME"]);
                instance.StoreStockComponents.CondPrefList.append(prefItemComponents.ListItem);
            });
            //Restore Pre Pref Info
            var prePrefCode = jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.PREVIOUS_PREF_CODE);
            if (CommonUtils.isNotNull(prePrefCode)) {
                instance.StoreStockComponents.CondPrefList.val(prePrefCode);
            } else {
                instance.StoreStockComponents.CondPrefList.val(COMMON_CONSTS.DEFAULT_PREFECTURE_CODE);
            }
            //Delete Pref Common Data
            pagePolicy.removeCommonData(COMMON_CONSTS.COMMON_DATA_API.REQUEST.PREFECTURE_LIST);
            pagePolicy.removeParameterValue(COMMON_CONSTS.PAGE_POLICY.PARAMETER_NAMES.SUCCESS_FUNCTION, buildPrefList);
        };
        prefListPolicy.addParameter(COMMON_CONSTS.PAGE_POLICY.PARAMETER_NAMES.SUCCESS_FUNCTION, buildPrefList);
        CommonUtils.getCommonData(prefListPolicy);
    },
    getItemInfo : function() {
        var instance = this;
        var urlParams = {};
        urlParams[COMMON_CONSTS.ITEM_DETAIL_INFO_API.REQUEST.ITEM_CODE] = instance.itemCode;
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
                jQuery(instance.ShadowOverlayComponents.Loading).css(loadingStyles);
                jQuery(instance.ShadowOverlayComponents.Loading).fadeIn(500);
            },
            complete: function(xhr, status){
                if (CommonUtils.isTabletPanel()) {
                    jQuery(instance.StoreStockComponents.StoreStockPanel).css({"width":"94%"});
                }
                var storeStockPanel = jQuery(instance.StoreStockComponents.StoreStockPanel);
                var mainPanelWidth = storeStockPanel.innerWidth();
                var mainPanelHeight = storeStockPanel.innerHeight();
                var borderLeftWidth = parseInt(storeStockPanel.css("border-left-width"), 10);
                var borderRightWidth = parseInt(storeStockPanel.css("border-right-width"), 10);
                var borderTopWidth = parseInt(storeStockPanel.css("border-top-width"), 10);
                var borderBottomWidth = parseInt(storeStockPanel.css("border-bottom-width"), 10);
                mainPanelWidth += isNaN(borderLeftWidth)?0:borderLeftWidth;
                mainPanelWidth += isNaN(borderRightWidth)?0:borderRightWidth;
                mainPanelHeight += isNaN(borderTopWidth)?0:borderTopWidth;
                mainPanelHeight += isNaN(borderBottomWidth)?0:borderBottomWidth;
                
                var heightPos = jQuery(window).height()>mainPanelHeight?jQuery(window).height()-mainPanelHeight:0;
                //var topPos = (CommonUtils.isTabletPanel()?jQuery(window).scrollTop():0) + heightPos/2;
                var topPos = jQuery(window).scrollTop() + heightPos/2;
                jQuery(instance.ShadowOverlayComponents.Loading).animate({
                    "width": mainPanelWidth,
                    "height": mainPanelHeight,
                    "top": heightPos/2,
                    "left": ((jQuery(window).width()-mainPanelWidth)/2)
                }, 500, function(){
                    jQuery(instance.ShadowOverlayComponents.Loading).fadeOut(500, function(){
                        jQuery(instance.ShadowOverlayComponents.Loading).remove();
                    });
                    //MainPanel CSS
                    var contentStyles = {
                        //"position" : "fixed",
                        "position" : "absolute",
                        "z-index" : "10000",
                        "top" : topPos,
                        "left" : ((jQuery(window).width()-mainPanelWidth)/2),
                        "margin" : "0px"
                    };
                    jQuery(instance.StoreStockComponents.StoreStockPanel).css(contentStyles);
                    jQuery(instance.StoreStockComponents.StoreStockPanel).fadeIn(200);
                });
            },
            success: function(responseText, status, xhr){
                if (responseText.status == "1") {
                    //SECCESS
                    instance.buildItemInfoPanel(responseText);
                } else {
                    //ERROR
                    instance.buildItemInfoGetErrPanel(responseText.message);
                }
            },
            error: function(xhr,status,error){
                instance.buildItemInfoGetErrPanel(COMMON_CONSTS.MESSAGES.SYSTEM_ERR_MESSAGE);
            }
        });
    },
    buildItemInfoGetErrPanel : function(message) {
        var instance = this;
        instance.StoreStockComponents.ItemErrMsg.text(message);
        instance.StoreStockComponents.ItemErrMsg.css("display", "block");
        instance.StoreStockComponents.ItemTitle.css("display", "none");
        instance.StoreStockComponents.ColorPanel.css("display", "none");
        instance.StoreStockComponents.SizeCondPanel.css("display", "none");
        instance.StoreStockComponents.SearchBtn.css("display", "none");
        instance.StoreStockComponents.FavSearchBtn.css("display", "none");
        instance.StoreStockComponents.ResultPanel.css("display", "none");
    },
    buildItemInfoPanel : function(itemInfo) {
        var instance = this;
        //ItemName
        var dispItemName = CommonUtils.nullToBlank(itemInfo.itemInfo[0].dispItemName);
        instance.StoreStockComponents.ItemTitle.text(dispItemName);

        //Color Info
        jQuery.each(itemInfo.itemInfo[0].colorInfo, function(colorIndex, colorInfo){
            var colorName = CommonUtils.nullToBlank(colorInfo.colorName);
            var colorCode = CommonUtils.nullToBlank(colorInfo.colorCode);
            var colorImageUrl = CommonUtils.nullToBlank(colorInfo.colorImageUrl);
            var colorIconNameList = CommonUtils.nullToBlank(colorInfo.colorIconList);
            var sizeList = CommonUtils.nullToBlank(colorInfo.skuInfo);
            //Create ColorItem
            var colorItemComponents = {};
            CommonUtils.createHtmlConponent(instance.ColorItemSetting, colorItemComponents, null);
            instance.StoreStockComponents.ColorList.append(colorItemComponents.ColorItem);
            colorImageUrl += instance.COLOR_IMAGE_PARAM;
            colorItemComponents.ColorPicImg.attr("src", colorImageUrl);
            if (colorIconNameList.length > 0) {
                colorItemComponents.ColorIconInfo.text(colorIconNameList[0]);
            }
            if (colorName.length > 0) {
                colorItemComponents.ColorPicImg.attr("alt", colorName);
                colorItemComponents.ColorInfo.append(colorName);
            }
            
            //Judge Disp Color
            if (instance.dispSkuCode != null) {
                jQuery.each(sizeList, function(skuIndex, skuInfo){
                    //Size Info
                    var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
                    if (instance.dispSkuCode == skuCode) {
                        instance.dispColorCode = colorCode;
                        return false;
                    }
                });
            }
            //Judge Disp Color
            if (colorIndex == 0 || instance.dispColorCode == colorCode) {
                //Set Default Disp
                instance.SelectedColorComponents = colorItemComponents;
            }
            
            //----Color Click Event
            jQuery(colorItemComponents.ColorPic).click(function() {
                //Set Selecting Color
                instance.SelectedColorComponents = colorItemComponents;
                //Exchange Active Color
                var preActiveColor = instance.StoreStockComponents.ColorList.find("li.active");
                // if not initialization
                if (preActiveColor.length > 0 && !jQuery(colorItemComponents.ColorItem).is(preActiveColor)) {
                    // Reset active color
                    preActiveColor.removeClass("active");
                    // Reset default select size
                    instance.dispSkuCode = null;
                }
                jQuery(colorItemComponents.ColorItem).addClass("active");
                
                //Install Size
                instance.buildSizeList(sizeList);
            });
        });
        //Disp The Color
        instance.SelectedColorComponents.ColorPic.click();
    },
    buildSizeList : function(skuList) {
        var instance = this;
        
        instance.StoreStockComponents.SizeList.empty();
        jQuery.each(skuList, function(index, skuInfo){
            //Size Info
            var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
            var sizeName = CommonUtils.nullToBlank(skuInfo.sizeName);
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
            var sizeItem = jQuery("<option></option>");
            instance.StoreStockComponents.SizeList.append(sizeItem);
            sizeItem.val(skuCode);
            sizeItem.text(sizeItemText);
            //Set Sku Info
            if (typeof instance.SizeData[skuCode] == "undefined") {
                instance.SizeData[skuCode] = {};
            }
            if (!CommonUtils.isNotNull(instance.SizeData[skuCode].skuCode)) {
                jQuery.extend(instance.SizeData[skuCode], {
                    skuCode               : skuCode,
                    sizeName              : sizeName,
                    stockStatus           : stockStatus,
                    stockStatusText       : stockStatusText
                });
            }
        });
        //Bind Size onChange Event
        instance.StoreStockComponents.SizeList.unbind();
        jQuery(instance.StoreStockComponents.SizeList).change(function() {
            var skuCode = jQuery(this).val();
            var skuInfo = instance.SizeData[skuCode];
            instance.buildSizePanel(skuInfo);
        });
        if (instance.dispSkuCode != null && instance.dispSkuCode.length > 0) {
            var skuItem = instance.StoreStockComponents.SizeList.find("option[value='" + instance.dispSkuCode + "']");
            if (skuItem.length > 0) {
                instance.StoreStockComponents.SizeList.val(instance.dispSkuCode);
            }
        }
        instance.StoreStockComponents.SizeList.change();
    },
    buildSizePanel : function(skuInfo) {
        var instance = this;
        
        var skuCode = CommonUtils.nullToBlank(skuInfo.skuCode);
        var storeStock = CommonUtils.nullToBlank(skuInfo.storeStock);

        //Store Stock Info
        var storeStockRows = instance.StoreStockComponents.StoreBody.find("tr");
        if (storeStockRows.length > 0) {
            jQuery.each(storeStockRows, function(index, storeStockRow) {
                var stockAmountTag = jQuery(storeStockRow).find("td[name='storeStockAmount']");
                var storeCode = jQuery(storeStockRow).attr("storeCode");
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
                        var showMessage = StoreStock.prototype.FCStoreMessages.InquiryMessage;
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
    getStoreStock : function(onlyFav) {
        var instance = this;
        if (instance.isProcessing) return;
        //Reset distance flag
        instance.isDistanceExists = false;
        //Set Processing
        instance.isProcessing = true;
        
        onlyFav = typeof onlyFav != "undefined" && onlyFav != null && onlyFav;
        var urlParams = {};
        //ItemCode
        urlParams[COMMON_CONSTS.STORE_STOCK_INFO_API.REQUEST.ITEM_CODE] = instance.itemCode;
        //FavStore
        var favStore = jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE);
        if (CommonUtils.isNotNull(favStore) && (favStore = JSON.parse(favStore)).length > 0) {
            urlParams[COMMON_CONSTS.STORE_STOCK_INFO_API.REQUEST.FAV_STORE_CODE] = favStore;
        } else if (onlyFav) {
            //Show fail panel if onlyFav
            instance.buildStoreStockFailPanel(COMMON_CONSTS.MESSAGES.STORE_STOCK_INFO_FAIL);
            instance.isProcessing = false;
            return;
        }
        //Other Search Condition
        if (!onlyFav) {
            //PrefCode
            var prefCode = instance.StoreStockComponents.CondPrefList.val();
            if (CommonUtils.isNotNull(prefCode)) {
                urlParams[COMMON_CONSTS.STORE_STOCK_INFO_API.REQUEST.PREFECTURE_CODE] = prefCode;
                if (prefCode != COMMON_CONSTS.STORE_STOCK_INFO_API.ENUM.PREF_CODE_ENTIRE) {
                    //Put PrefCode into Cookie
                    jQuery.cookie.raw = true;
                    jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.PREVIOUS_PREF_CODE, prefCode, {path: "/", expires:365*100})
                }
            }
            //StoreName
            var storeName = instance.StoreStockComponents.CondStoreInput.val();
            if (CommonUtils.isNotNull(storeName)) {
                urlParams[COMMON_CONSTS.STORE_STOCK_INFO_API.REQUEST.STORE_NAME] = storeName;
            }
        }

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
                instance.StoreStockComponents.StoreBody.empty();
            },
            complete     : function(xhr, status){
                instance.isProcessing = false;
            },
            success      : function(responseText, status, xhr){
                if (responseText.status == COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS) {
                    //validate GPS(geolocation)
                    if (CommonUtils.isMobile() && "geolocation" in navigator) {
                        //if geolocation available
                        navigator.geolocation.getCurrentPosition(function(position){
                            //if getCurrentPosition successed
                            instance.getDistanceDataPreproccess(responseText.storeStock, position);
                        }, function(error) {
                            //if getCurrentPosition failed
                            //(error.PERMISSION_DENIED, error.POSITION_UNAVAILABLE, error.TIMEOUT, error.UNKNOWN_ERROR)
                            console.error(error);
                            instance.buildStoreStockPanel(responseText.storeStock, COMMON_CONSTS.MESSAGES.GPS_FAIL);
                        });
                    } else {
                        //if geolocation unavailable
                        instance.buildStoreStockPanel(responseText.storeStock);
                    }
                } else {
                    //ERROR
                    instance.buildStoreStockFailPanel(COMMON_CONSTS.MESSAGES.STORE_STOCK_INFO_FAIL);
                }
            },
            error        : function(xhr,status,error){
                //ERROR
                instance.buildStoreStockFailPanel(COMMON_CONSTS.MESSAGES.STORE_STOCK_INFO_FAIL);
            }
        });
    },
    getDistanceDataPreproccess : function(storeStockList, position) {
        var instance = this;
        //get placeid list
        var placeids = jQuery.map(storeStockList, function(storeStock) {
            if (CommonUtils.isNotNull(storeStock.placeId)) {
                return {placeId:storeStock.placeId};
            }
        });
        if (CommonUtils.isNotNull(position) || placeids.length > 0) {
            //Get distance use GoogleMap
            if (GoogleDistanceService == null) {
                var googleMapUrl = CommonUtils.stringFormat(COMMON_CONSTS.URLS.GOOGLE_MAPS_API_URL,
                        [COMMON_CONSTS.GOOGLE.KEYS.MAIN, COMMON_CONSTS.GOOGLE.LIBRARIES.PLACES]);
                jQuery.getScript(googleMapUrl).done(function(script, textStatus){
                    try {
                        GoogleDistanceService = new google.maps.DistanceMatrixService();
                        instance.getDistanceData(storeStockList, position, placeids);
                    } catch(e) {
                        instance.buildStoreStockPanel(storeStockList, COMMON_CONSTS.MESSAGES.GPS_FAIL);
                    }
                }).fail(function(jqxhr, settings, exception){
                    console.error(exception);
                    instance.buildStoreStockPanel(storeStockList, COMMON_CONSTS.MESSAGES.GPS_FAIL);
                });
            } else {
                try {
                    instance.getDistanceData(storeStockList, position, placeids);
                } catch(e) {
                    instance.buildStoreStockPanel(storeStockList, COMMON_CONSTS.MESSAGES.GPS_FAIL);
                }
            }
        } else {
            instance.buildStoreStockPanel(storeStockList);
        }
    },
    getDistanceData : function(storeStockList, position, placeids, startIndex) {
        var instance = this;
        //origin
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //
        if (typeof startIndex == "undefined") {
            startIndex = 0;
        }
        var endIndex = placeids.length;
        if (endIndex - startIndex > COMMON_CONSTS.GOOGLE.DISTANCE_MATRIX_POS_LIMIT) {
            endIndex = startIndex + COMMON_CONSTS.GOOGLE.DISTANCE_MATRIX_POS_LIMIT;
        }
        var currentPlaceids = placeids.slice(startIndex, endIndex);
        
        GoogleDistanceService.getDistanceMatrix({
            origins: [latLng],
            destinations: currentPlaceids,
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function(response, status){
            if (status === google.maps.DistanceMatrixStatus.OK) {
                jQuery.each(currentPlaceids, function(placeIndex, placeid){
                    //Fix rows to 0(only one origin)
                    var distanceinfo = response.rows[0].elements[placeIndex];
                    if (distanceinfo.status === google.maps.DistanceMatrixStatus.OK) {
                        //Append distance info to StoreStoreList
                        jQuery.each(storeStockList, function(storeIndex, storeInfo){
                            if (placeid.placeId === storeInfo.placeId) {
                                jQuery.extend(storeStockList[storeIndex], {
                                    distance     : distanceinfo.distance.value,
                                    distanceText : distanceinfo.distance.text
                                });
                                instance.isDistanceExists = true;
                                return false;
                            }
                        });
                    }
                });
                if (endIndex < placeids.length) {
                    startIndex = endIndex;
                    instance.getDistanceData(storeStockList, position, placeids, startIndex);
                } else {
                    instance.buildStoreStockPanel(storeStockList);
                }
            } else {
                instance.buildStoreStockPanel(storeStockList, COMMON_CONSTS.MESSAGES.GPS_FAIL);
            }
        });
    },
    buildStoreStockPanel : function(storeStockList, gpsFailMsg) {
        var instance = this;
        instance.StoreStockComponents.ResultMessage.css("display", "none");
        instance.StoreStockComponents.FavComment.css("display", "");
        instance.StoreStockComponents.StoreTable.css("display", "");
        instance.StoreStockComponents.CautionInfo.css("display", "");
        instance.StoreStockComponents.ResultPanel.css("display", "");
        instance.StoreStockComponents.StoreHeadDistanceName.css("display", "none");
        //Sort Store List
        var favStore = jQuery.cookie(COMMON_CONSTS.HTTP_COMMON.COOKIE.FAVORITE_STORE);
        var favStoreExists = CommonUtils.isNotNull(favStore) && (favStore = JSON.parse(favStore)).length > 0;
        storeStockList.sort(function(val1, val2) {
            var order1 = 0, order2 = 0;
            //Sort by FavStore added order
            if (favStoreExists) {
                if (typeof val1.distance != "undefined" || typeof val2.distance != "undefined") {
                    order1 = jQuery.inArray(val1.storeCode, favStore)<0?9:1;
                    order2 = jQuery.inArray(val2.storeCode, favStore)<0?9:1;
                } else {
                    order1 = (order1 = jQuery.inArray(val1.storeCode, favStore))<0?9999:order1;
                    order2 = (order2 = jQuery.inArray(val2.storeCode, favStore))<0?9999:order2;
                }
            }
            //Sort by Distance asc
            if (order1 == order2) {
                order1 = val1.distance;
                order2 = val2.distance;
                if (isNaN(order1)) {
                    order1 = isNaN(val2.distance)?9:order2+1;
                }
                if (isNaN(order2)) {
                    order2 = isNaN(val1.distance)?9:order1+1;
                }
            }
            return order1 - order2;
        });
        
        jQuery.each(storeStockList, function(index, storeInfo){
            var storeStockRowComponents = {};
            CommonUtils.createHtmlConponent(instance.StoreRowSetting, storeStockRowComponents, null);
            instance.StoreStockComponents.StoreBody.append(storeStockRowComponents.StoreRow);
            //Store Code
            storeStockRowComponents.StoreRow.attr("storeCode", storeInfo.storeCode);
            //Fav Icon
            if (jQuery.inArray(storeInfo.storeCode, favStore) > -1) {
                storeStockRowComponents.FavMark.addClass("active");
            }
            // Fav Icon click
            storeStockRowComponents.FavMark.click(function() {
                if (jQuery(this).hasClass("active")) {
                    jQuery(this).removeClass("active");
                    CommonUtils.removeFavStore(storeInfo.storeCode);
                } else {
                    jQuery(this).addClass("active");
                    CommonUtils.saveFavStore(storeInfo.storeCode);
                }
            });
            //Store Name
            storeStockRowComponents.StoreName.text(storeInfo.dispStoreName);
            if (CommonUtils.isNotNull(storeInfo.storeUrl)) {
                storeStockRowComponents.StoreName.attr("href", storeInfo.storeUrl);
            } else {
                storeStockRowComponents.StoreName.attr("style", "text-decoration:none;cursor:default;");
            }
            //Distance
            if (instance.isDistanceExists) {
                storeStockRowComponents.DistanceData.css("display", "");
                instance.StoreStockComponents.StoreHeadDistanceName.css("display", "");
                if (CommonUtils.isNotNull(storeInfo.distanceText)) {
                    storeStockRowComponents.DistanceData.text(storeInfo.distanceText);
                } else {
                    storeStockRowComponents.DistanceData.text("--");
                }
            }
            //Store Stock Info
            jQuery.each(storeInfo.skuStockList, function (index, skuInfo) {
                // Merge to SizeInfoList
                if (typeof instance.SizeData[skuInfo.skuCode] == "undefined") {
                    instance.SizeData[skuInfo.skuCode] = {};
                }
                var storeStock = instance.SizeData[skuInfo.skuCode].storeStock;
                if (!jQuery.isArray(storeStock)) {
                    storeStock = jQuery.makeArray(storeStock);
                }
                storeStock = jQuery.merge(storeStock, [{storeCode : storeInfo.storeCode, storeStockAmount : skuInfo.stockAmount, storeStockURL : storeInfo.storeUrl}]);
                instance.SizeData[skuInfo.skuCode].storeStock = storeStock;
            });
        });
        //GPS Fail Message
        if (CommonUtils.isNotNull(gpsFailMsg)) {
            instance.StoreStockComponents.ResultMessage.text(gpsFailMsg);
            instance.StoreStockComponents.ResultMessage.css("display", "");
        } else {
            instance.StoreStockComponents.ResultMessage.text("");
            instance.StoreStockComponents.ResultMessage.css("display", "none");
        }
        //Call Size Change Event
        instance.StoreStockComponents.SizeList.change();
    },
    buildStoreStockFailPanel : function(message) {
        var instance = this;
        instance.StoreStockComponents.ResultMessage.text(message);
        instance.StoreStockComponents.ResultMessage.css("display", "");
        instance.StoreStockComponents.FavComment.css("display", "none");
        instance.StoreStockComponents.StoreTable.css("display", "none");
        instance.StoreStockComponents.CautionInfo.css("display", "none");
        instance.StoreStockComponents.ResultPanel.css("display", "");
    }
};
