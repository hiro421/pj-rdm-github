/** 
 *    @fileoverview For front page
 *    @version 2017-09-01
 *    @require jQuery Ver.1.11.2 and above
 *    @require Papa Parse Ver.4.3.2 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 */
//Store Stock Info -----------------------------------------------
function FloorCMS(params) {
    this.initialize(params);
}
FloorCMS.prototype = {
    NEW_FLAG_DAYS  : 7 * 86400000,
    DATA_KEYS : {
        NO             : "No",
        IMG_URL        : "imageUrl",
        LINK_URL       : "linkUrl",
        START_DATETIME : "startDateTime",
        END_DATETIME   : "endDateTime",
        CATEGORIES     : "categories",
        BRAND          : "brand",
        SORT           : "sort",
        TITLE          : "title",
        DESCRIPTION    : "description",
        SPECIAL_FLAG   : "specialFlag",
        DATA_TOGGLES   : "dataToggles"
    },
    CATEGORY_ATTRIBUTE : {
        "BRA"      : {"data-toggle" : "category_bra"},
        "INNER"    : {"data-toggle" : "category_inner"},
        "ROOMWEAR" : {"data-toggle" : "category_roomware"},
        "FASHION"  : {"data-toggle" : "category_fashion"},
        "BEAUTY"   : {"data-toggle" : "category_beauty"},
        "CAMPAIGN" : {"data-toggle" : "category_sale"}
    },
    BRAND_ATTRIBUTE : {
        "PEACH JOHN"             : {"data-toggle" : "brand_peachjohn"},
        "SALON \\nby PEACH JOHN" : {"data-toggle" : "brand_salon"},
        "YUMMYMART"              : {"data-toggle" : "brand_yummy"}
    },
    CATEGORY_MAPPING : {
        "/pj/bra/"                          : ["BRA"],
        "/pj/inner/"                        : ["INNER"],
        "/pj/room/"                         : ["ROOMWEAR"],
        "/pj/fashion/"                      : ["FASHION"],
        "/pj/beauty/"                       : ["BEAUTY"],
        "/pj/sale/"                         : ["CAMPAIGN"],
        "/pj/special/contents/"             : ["BRA","INNER","ROOMWEAR","FASHION","CAMPAIGN","BEAUTY"]
        ,"/webshop/Ming_FloorCMS_TEST.html" : ["BRA"]
    },
    SHOW_ALL_ITEM_TEXT : "{0}\u3092\u5168\u3066\u898b\u308b",
    PAGE_COMPONENTS : {
        DATA_FILTER_TITLE    : "#dataFilterTitle",
        CATEGORY_PANEL       : "#categoryPanel",
        CATEGORY_LIST        : "#categoryList",
        BRAND_PANEL          : "#brandPanel",
        BRAND_LIST           : "#brandList",
        CONTENTS_TITLE       : "#contentsTitle",
        CONTENTS_PANEL       : "#contentsPanel",
        CONTENTS_LIST        : "#contentsList",
        SPECIAL_TITLE        : "#specialTitle",
        SPECIAL_PANEL        : "#specialPanel",
        SPECIAL_LIST         : "#specialList",
        SEARCH_MENU          : "#searchPanel",
        SEARCH_CATEGORY_TITLE: "#searchCategoryTitle",
        SEARCH_CATEGORY_LIST : "#searchCategoryList"
    },
    CategoryItemSetting : {
        Item : {
            tag : "<li></li>",
            attr : {
                "class" : "categories"
            },
            Title : {
                tag : "<b></b>",
                attr : {
                    "class" : "trigger none-submenu"
                },
                Link : {
                    tag : "<a></a>",
                    attr : {
                        "href" : "javascript:void(0);"
                    },
                    text : ""
                }
            },
            SubItemList : {
                tag : "<ul></ul>",
                attr : {
                    "class" : "acoCont inline-list inline-list-border",
                    "style" : "display: none;"
                },
                BtnBox : {
                    tag : "<div></div>",
                    attr : {
                        "class" : "btnBox",
                        "style" : "display:none;"
                    },
                    RankingBtn : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "submenu-button"
                        },
                        RankingLink : {
                            tag : "<a></a>",
                            attr : {
                                "href" : ""
                            },
                            text : "\u4eba\u6c17\u30e9\u30f3\u30ad\u30f3\u30b0"
                        }
                    },
                    BtnBlank : {
                        tag : "<div></div>",
                        attr : {
                            "style" : "display:inline;"
                        },
                        html : "\n"
                    },
                    ShowAllBtn : {
                        tag : "<div></div>",
                        attr : {
                            "class" : "submenu-button"
                        },
                        ShowAllLink : {
                            tag : "<a></a>",
                            attr : {
                                "href": ""
                            },
                            text : "\u5168\u3066\u898b\u308b"
                        }
                    }
                }
            }
        }
    },
    ContentsItemSetting : {
        Item : {
            tag: "<li></li>",
            attr: {
                "class": "mix-target"
            },
            Link: {
                tag: "<a></a>",
                attr: {
                    "href": ""
                },
                ImgPanel: {
                    tag: "<div></div>",
                    attr: {
                        "class": "p-item_list__image"
                    },
                    Image: {
                        tag: "<img></img>",
                        attr: {
                            "src": "/app/img/common/blank.png",
                            "data-original" : "",
                            "class" : "lazy",
                            "alt" : "",
                            "style" : "max-width:230px;height:auto;"
                        }
                    }
                },
                Title : {
                    tag: "<div></div>",
                    attr: {
                        "class": "p-item_list__title"
                    }
                },
                Text : {
                    tag: "<div></div>",
                    attr: {
                        "class": "p-item_list__text"
                    }
                },
                Date : {
                    tag: "<div></div>",
                    attr: {
                        "class": "p-item_list__date"
                    }
                }
            }
        }
    },
    instance : null,
    sysDate  : null,
    categoryName : null,
    categoryType : null,
    initialize : function(params) {
        instance = this;
        instance.sysDate = CommonUtils.getSysDate();
        //Initialize variate
        instance.categoryType = null;
        //Get categoryType
        if (CommonUtils.isNotNull(params) && CommonUtils.isNotNull(params.pathname)) {
            $.each(instance.CATEGORY_MAPPING, function(name, value){
                if (params.pathname.indexOf(name) > -1) {
                    instance.categoryName = name;
                    instance.categoryType = value;
                    return false;
                }
            });
        }
        //Initialize Page Component 
        $.each(this.PAGE_COMPONENTS, function(name, value){
            if (value != null) {
                instance.PAGE_COMPONENTS[name] = $(value);
            }
        });
    },
    build : function() {
        if (!CommonUtils.isNotNull(instance.categoryType)) {
            return;
        }
        //Load SearchMenu Info
        instance.buildFloorCategory();
        //Load Contents Info
        CommonUtils.loadCsv({
            filePath: COMMON_CONSTS.FILES.CMS_CONTENTS_URL, 
            callBack: instance.buildPage
        });
    },
    buildPage : function(result) {
        if (typeof result != "object" || !CommonUtils.isNotNull(result.data)) {
            return;
        }
        var categoryKeys = new Array();
        var brandKeys = new Array();
        var datas = $.map(result.data, function(value, index) {
            var startDate = new Date(value[instance.DATA_KEYS.START_DATETIME]);
            var endDate = new Date(value[instance.DATA_KEYS.END_DATETIME]);
            if (instance.sysDate >= startDate && instance.sysDate <= endDate) {
                //Analyze if the Record is should be shown in this Page
                var categories = value[instance.DATA_KEYS.CATEGORIES].split(",");
                var targetCategories = $.map(categories, function(category) {
                    if ($.inArray(category, instance.categoryType) > -1) {
                        //Create Keys
                        categoryKeys.push(category);
                        return category;
                    } 
                });
                //If is Target Record
                if (targetCategories.length > 0) {
                    //Create Brand Keys
                    if (CommonUtils.isNotNull(value[instance.DATA_KEYS.BRAND])) {
                        brandKeys.push(value[instance.DATA_KEYS.BRAND]);
                    }
                    //Append Data-Toggle Info
                    value[instance.DATA_KEYS.DATA_TOGGLES] = targetCategories;
                    return value;
                }
            }
        });

        //Sort Category Keys
        var cBaseKeys = Object.keys(instance.CATEGORY_ATTRIBUTE);
        categoryKeys.sort(function(val1, val2) {
            return cBaseKeys.indexOf(val1) - cBaseKeys.indexOf(val2);
        });
        //Build Category List
        instance.buildCategoryList($.unique(categoryKeys));
        
        //Sort Brand Keys
        var bBaseKeys = Object.keys(instance.BRAND_ATTRIBUTE);
        brandKeys.sort(function(val1, val2) {
            return bBaseKeys.indexOf(val1) - bBaseKeys.indexOf(val2);
        });
        //Build Brand List
        instance.buildBrandList($.unique(brandKeys));

        //Sort Contents Data
        datas.sort(function(val1, val2) {
            var count1 = 0, count2 = 0;
            //order by startDateTime desc, category, sort
            //01.Start Datetime
            var date1 = new Date(val1[instance.DATA_KEYS.START_DATETIME]);
            var date2 = new Date(val2[instance.DATA_KEYS.START_DATETIME]);
            count1 += date1<date2?10000:0;
            count2 += date1>date2?10000:0;
            //02.category
            // index value of val1
            var array1 = val1[instance.DATA_KEYS.CATEGORIES].split(",");
            var index1 = categoryKeys.length;
            $.each(array1, function(index, category) {
                var index = cBaseKeys.indexOf(category);
                if (index > -1 && index < index1) {
                    index1 = index;
                }
            });
            //count1 += index1*1000;
            // index value of val2
            var array2 = val2[instance.DATA_KEYS.CATEGORIES].split(",");
            var index2 = categoryKeys.length;
            $.each(array2, function(index, category) {
                var index = cBaseKeys.indexOf(category);
                if (index > -1 && index < index2) {
                    index2 = index;
                }
            });
            //count2 += index2*1000;
            count1 += parseInt(index1>index2?1000:0, 10);
            count2 += parseInt(index2>index1?1000:0, 10);
            
            //03.Brand
            // index value of val1
            var brand1 = val1[instance.DATA_KEYS.BRAND];
            var bIndex1 = brandKeys.indexOf(brand1);
            
            //count1 += index1*100;
            // index value of val2
            var brand2 = val2[instance.DATA_KEYS.BRAND];
            var bIndex2 = brandKeys.indexOf(brand2);
            
            //count2 += index2*100;
            count1 += parseInt(bIndex1>bIndex2?100:0, 10);
            count2 += parseInt(bIndex2>bIndex1?100:0, 10);
            
            //04.sort
            count1 += parseInt(CommonUtils.nvl(val1[instance.DATA_KEYS.SORT], 99), 10);
            count2 += parseInt(CommonUtils.nvl(val2[instance.DATA_KEYS.SORT], 99), 10);
            
            return count1 - count2;
        });
        //Build Contents List
        instance.buildContentsList(datas);
        //Build Special List
        instance.buildSpecialList(datas);
        //Build Page Mixitup
        instance.buildPageMixitup();
        //Build Page Display
        instance.buildPageDisplay();
    },
    /**
     * Build Category Button
     */
    buildCategoryList : function(categoryKeys) {
        if (instance.PAGE_COMPONENTS.CATEGORY_PANEL.length == 0 || instance.PAGE_COMPONENTS.CATEGORY_LIST.length == 0) {
            return;
        }
        if (!CommonUtils.isNotNull(categoryKeys)) {
            instance.PAGE_COMPONENTS.CATEGORY_PANEL.hide();
            return;
        }
        //Clear CategoryList
        instance.PAGE_COMPONENTS.CATEGORY_LIST.empty();
        //Create Category Buttons
        $.each(categoryKeys, function(index, value){
            var attribute = instance.CATEGORY_ATTRIBUTE[value];
            if (!CommonUtils.isNotNull(attribute) || !CommonUtils.isNotNull(attribute["data-toggle"])) {
                return;
            }
            var btn = $("<button></button>").attr({
                "class":"filter-btn toggle-btn",
                "data-toggle":"."+attribute["data-toggle"]
                }).html(value.replace(/\\n/g, "<br>"));
            instance.PAGE_COMPONENTS.CATEGORY_LIST.append(btn);
        });
        //Show Category Buttons
        if (instance.PAGE_COMPONENTS.CATEGORY_LIST.children().length > 0) {
            instance.PAGE_COMPONENTS.DATA_FILTER_TITLE.css("display", "");
            instance.PAGE_COMPONENTS.CATEGORY_PANEL.css("display", "");
        }
    },
    /**
     * Build Brand Button
     */
    buildBrandList : function(brandKeys) {
        if (instance.PAGE_COMPONENTS.BRAND_PANEL.length == 0 || instance.PAGE_COMPONENTS.BRAND_LIST.length == 0) {
            return;
        }
        if (!CommonUtils.isNotNull(brandKeys)) {
            instance.PAGE_COMPONENTS.BRAND_PANEL.hide();
            return;
        }
        //Clear BrandList
        instance.PAGE_COMPONENTS.BRAND_LIST.empty();
        //Create Brand Buttons
        $.each(brandKeys, function(index, value){
            var attribute = instance.BRAND_ATTRIBUTE[value];
            if (!CommonUtils.isNotNull(attribute) || !CommonUtils.isNotNull(attribute["data-toggle"])) {
                return;
            }
            var btn = $("<button></button>").attr({
                "class":"filter-btn toggle-btn",
                "data-toggle":"."+attribute["data-toggle"]
                }).html(value.replace(/\\n/g, "<br>"));
            instance.PAGE_COMPONENTS.BRAND_LIST.append(btn);
        });
        //Show Brand Buttons
        if (instance.PAGE_COMPONENTS.BRAND_LIST.children().length > 0) {
            instance.PAGE_COMPONENTS.DATA_FILTER_TITLE.css("display", "");
            instance.PAGE_COMPONENTS.BRAND_PANEL.css("display", "");
        }
    },
    /**
     * Build Contents
     */
    buildContentsList : function(dataList) {
        if (instance.PAGE_COMPONENTS.CONTENTS_PANEL.length == 0 || instance.PAGE_COMPONENTS.CONTENTS_LIST.length == 0) {
            return;
        }
        if (!CommonUtils.isNotNull(dataList)) {
            instance.PAGE_COMPONENTS.CONTENTS_PANEL.hide();
            return;
        }
        //Clear ContentsList
        instance.PAGE_COMPONENTS.CONTENTS_LIST.empty();
        //Create Contents
        $.each(dataList, function(index, value){
            if (value[instance.DATA_KEYS.SPECIAL_FLAG] != 0) {
                //continue to Next if it is a Special Item
                return;
            }
            
            var contentsComponents = {};
            CommonUtils.createHtmlConponent(instance.ContentsItemSetting, contentsComponents, null);
            //Set Display Info.
            var title = CommonUtils.nullToBlank(value[instance.DATA_KEYS.TITLE]);
            var openDate = new Date(value[instance.DATA_KEYS.START_DATETIME]);
            contentsComponents.Link.attr({"href":value[instance.DATA_KEYS.LINK_URL]});
            contentsComponents.Image.attr({"data-original":value[instance.DATA_KEYS.IMG_URL],"alt":title});
            contentsComponents.Title.html(title.replace(/\\n/g, "<br>"));
            contentsComponents.Text.html(CommonUtils.nullToBlank(value[instance.DATA_KEYS.DESCRIPTION]).replace(/\\n/g, "<br>"));
            contentsComponents.Date.text(openDate.getFullYear() + "." + (openDate.getMonth()+1) + "." + openDate.getDate());
            if (instance.sysDate.getTime() < openDate.getTime() + instance.NEW_FLAG_DAYS) {
                contentsComponents.Date.addClass("new");
            }
            // Create Data-Toggle
            $.each(value[instance.DATA_KEYS.DATA_TOGGLES], function(index, value){
                var attribute = instance.CATEGORY_ATTRIBUTE[value];
                if (!CommonUtils.isNotNull(attribute) || !CommonUtils.isNotNull(attribute["data-toggle"])) {
                    return;
                }
                contentsComponents.Item.addClass(attribute["data-toggle"]);
            });
            var brandToggle = instance.BRAND_ATTRIBUTE[value[instance.DATA_KEYS.BRAND]];
            if (CommonUtils.isNotNull(brandToggle) && CommonUtils.isNotNull(brandToggle["data-toggle"])) {
                contentsComponents.Item.addClass(brandToggle["data-toggle"]);
            }
            
            instance.PAGE_COMPONENTS.CONTENTS_LIST.append(contentsComponents.Item);
        });
        //Show Contents List
        if (instance.PAGE_COMPONENTS.CONTENTS_LIST.children().length > 0) {
            instance.PAGE_COMPONENTS.CONTENTS_TITLE.css("display", "");
            instance.PAGE_COMPONENTS.CONTENTS_PANEL.css("display", "");
        }
    },
    /**
     * Build Special
     */
    buildSpecialList : function(dataList) {
        if (instance.PAGE_COMPONENTS.SPECIAL_PANEL.length == 0 || instance.PAGE_COMPONENTS.SPECIAL_LIST.length == 0) {
            return;
        }
        if (!CommonUtils.isNotNull(dataList)) {
            instance.PAGE_COMPONENTS.SPECIAL_PANEL.hide();
            return;
        }
        //Clear Special List
        instance.PAGE_COMPONENTS.SPECIAL_LIST.empty();
        //Create Special Item
        $.each(dataList, function(index, value){
            if (value[instance.DATA_KEYS.SPECIAL_FLAG] != 1) {
                //continue to Next if it is not a Special Item
                return;
            }
            
            var contentsComponents = {};
            CommonUtils.createHtmlConponent(instance.ContentsItemSetting, contentsComponents, null);
            //Set Display Info.
            var title = CommonUtils.nullToBlank(value[instance.DATA_KEYS.TITLE]);
            var openDate = new Date(value[instance.DATA_KEYS.START_DATETIME]);
            contentsComponents.Link.attr({"href":value[instance.DATA_KEYS.LINK_URL]});
            contentsComponents.Image.attr({"data-original":value[instance.DATA_KEYS.IMG_URL],"alt":title});
            contentsComponents.Title.html(title.replace(/\\n/g, "<br>"));
            contentsComponents.Text.html(CommonUtils.nullToBlank(value[instance.DATA_KEYS.DESCRIPTION]).replace(/\\n/g, "<br>"));
            //DateInfo of Special Item is unnecessary 
            //contentsComponents.Date.text(openDate.getFullYear() + "." + (openDate.getMonth()+1) + "." + openDate.getDate());
            instance.PAGE_COMPONENTS.SPECIAL_LIST.append(contentsComponents.Item);
        });
        //Show Special List
        if (instance.PAGE_COMPONENTS.SPECIAL_LIST.children().length > 0) {
            instance.PAGE_COMPONENTS.SPECIAL_TITLE.css("display", "");
            instance.PAGE_COMPONENTS.SPECIAL_PANEL.css("display", "");
        }
    },
    buildPageMixitup : function() {
        //mixitup
        if ((instance.PAGE_COMPONENTS.CATEGORY_LIST.length == 0 || instance.PAGE_COMPONENTS.CATEGORY_LIST.children().length == 0)
                && (instance.PAGE_COMPONENTS.BRAND_LIST.length == 0 || instance.PAGE_COMPONENTS.BRAND_LIST.children().length == 0)) {
            return;
        }
        var activePage = 1;
        var activeLimit = 16;
        var mixer = mixitup("#contentsPanel", {
            load : {
                page : activePage
            },
            animation : {
                effects : "fade",
                duration : 700
            },
            classNames : {
                block : "item",
                elementToggle : "toggle-btn",
                elementFilter : "filter-btn"
                //elementFilter : 'category-btn'
                ,elementSort : "sort-btn"
            },
            selectors : {
                target : ".mix-target"
            },
            multifilter : {
                enable : true,
                logicWithinGroup : "or",
                logicBetweenGroups : "and"
            },
            pagination : {
                limit : activeLimit,
                hidePageListIfSinglePage : true
            },
            callbacks : {
                onMixStart : function(state) {
                    if (state.activePagination.limit === activeLimit
                            && state.activePagination.page === activePage)
                        ;
                    activePage = state.activePagination.page;
                    activeLimit = state.activePagination.limit;
                    //paginationCallback();
                    $("body,html").animate({
                        scrollTop : $("#categoryPanel").offset().top - 140
                    }, 800);
                }
            }
        });
    },
    buildPageDisplay : function() {
        $('.p-item_list__text').tile();
        $("img.lazy").lazyload({
            effect : "fadeIn",
            event : "mixitup"
        });
        $(window).on("load", function() {
            $("img.lazy").trigger("mixitup");
        });
        $("img.lazy").trigger("mixitup");
    },
    buildFloorCategory : function() {
        //If is not Mobile or Category List is not exists, interrupt the process
        if (!CommonUtils.isMobile() || instance.PAGE_COMPONENTS.SEARCH_CATEGORY_LIST.length == 0) {
            return;
        }
        //Read Category File
        CommonUtils.getCategoryInfos({
            callBack : function(categoryInfo){
                //Category Info
                $.each(categoryInfo, function(floorName, floorValue){
                    if (!CommonUtils.isNotNull(floorName) || !CommonUtils.isNotNull(floorValue)) {
                        return;
                    }
                    var floorUrl = floorValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.URL];
                    var pCategories = floorValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.PCG.PCGS];
                    var srGroups = floorValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.SR.SR_LIST];
                    if (instance.categoryName != floorUrl || (!CommonUtils.isNotNull(pCategories) && !CommonUtils.isNotNull(srGroups))) {
                        return;
                    }
                    //Clear Search Category List
                    instance.PAGE_COMPONENTS.SEARCH_CATEGORY_LIST.empty();
                    //Create Categories
                    if (CommonUtils.isNotNull(pCategories)) {
                        $.each(pCategories, function(pcgName, pcgValue){
                            if (!CommonUtils.isNotNull(pcgValue)) return;
                            var pcgType = pcgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE];
                            var pcgUrl = pcgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.URL];
                            var pcgCode = CommonUtils.getUrlParamMap(pcgUrl)[CommonUtils.nullToBlank(pcgType)];
                            if (pcgType == COMMON_CONSTS.CATEGORY_INFOS_URL.ENUM.TYPES.PCG) {
                                var preItem = null;
                                var rankingUrl = null;
                                //Create Item Component
                                var categoryItemComponents = {};
                                CommonUtils.createHtmlConponent(instance.CategoryItemSetting, categoryItemComponents, null);
                                //Title Text
                                categoryItemComponents.Link.text(pcgName);
                                //Create ShowAll Menu
                                if (CommonUtils.isNotNull(pcgUrl)) {
                                    var showAllLink = $("<a></a>").attr("href", pcgUrl).text(CommonUtils.stringFormat(instance.SHOW_ALL_ITEM_TEXT, [pcgName]));
                                    preItem = $("<li></li>").addClass("first").append(showAllLink);
                                    categoryItemComponents.SubItemList.prepend(preItem);
                                }
                                //Create Category Items
                                var categories = pcgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.CG.CGS];
                                if (CommonUtils.isNotNull(categories)) {
                                    $.each(categories, function(name, value){
                                        var type = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE];
                                        var url = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.URL];
                                        if (type == COMMON_CONSTS.CATEGORY_INFOS_URL.ENUM.TYPES.RANKING) {
                                            rankingUrl = CommonUtils.nvl(url, null);
                                        } else {
                                            var link = $("<a></a>").attr("href", url).text(name);
                                            var item = $("<li></li>").append(link);
                                            if (CommonUtils.isNotNull(preItem)) {
                                                preItem.after(item);
                                            } else {
                                                categoryItemComponents.SubItemList.prepend(item);
                                            }
                                            preItem = item;
                                            //categoryItemComponents.SubItemList.prepend(showAllItem);
                                        }
                                    });
                                }
                                //Append
                                if (categoryItemComponents.SubItemList.children().length > 0) {
                                    if (CommonUtils.isNotNull(pcgUrl) && CommonUtils.isNotNull(rankingUrl)) {
                                        categoryItemComponents.RankingLink.attr("href", rankingUrl);
                                        categoryItemComponents.ShowAllLink.attr("href", pcgUrl);
                                        categoryItemComponents.BtnBox.css("display","");
                                    }
                                    instance.PAGE_COMPONENTS.SEARCH_CATEGORY_LIST.append(categoryItemComponents.Item);
                                }
                            }
                        });
                    }
                    //Create Series
                    if (CommonUtils.isNotNull(srGroups)) {
                        $.each(srGroups, function(srgName, srgValue){
                            var srInfos = srgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.SR.SRS];
                            if (!CommonUtils.isNotNull(srInfos)) return;
                            
                            //Create Item Component
                            var categoryItemComponents = {};
                            CommonUtils.createHtmlConponent(instance.CategoryItemSetting, categoryItemComponents, null);
                            //Title Text
                            categoryItemComponents.Link.text(srgName);
                            
                            $.each(srInfos, function(name, value){
                                var type = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE];
                                var url = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.URL];
                                var link = $("<a></a>").attr("href", url).text(name);
                                var item = $("<li></li>").append(link);
                                categoryItemComponents.SubItemList.append(item);
                            });
                            //Append
                            if (categoryItemComponents.SubItemList.children().length > 0) {
                                instance.PAGE_COMPONENTS.SEARCH_CATEGORY_LIST.append(categoryItemComponents.Item);
                            }
                        });
                    }
                    //
                    if (instance.PAGE_COMPONENTS.SEARCH_CATEGORY_LIST.children().length > 0) {
                        instance.PAGE_COMPONENTS.SEARCH_CATEGORY_TITLE.css("display", "")
                        instance.PAGE_COMPONENTS.SEARCH_CATEGORY_LIST.css("display", "");
                    }
                    
                    return false;
                });
                //Rebind Click event of .trigger
                $(".trigger").off("click.accordion").on("click.accordion", function() {
                    if ($(this).next().is(":visible")) {
                        $(this).removeClass("active-submenu");
                        $(this).addClass("none-submenu");
                        $("+.acoCont", this).slideUp(200);
                    } else {
                        $(this).addClass("active-submenu");
                        $(this).removeClass("none-submenu");
                        $("+.acoCont", this).slideDown(200);
                    }
                });
            }
        });
    }
};
//launch
jQuery(document).ready(function(){
    var floorCMS = new FloorCMS({pathname:$(location).attr("pathname")})
    floorCMS.build();
});