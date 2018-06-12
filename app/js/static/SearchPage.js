/** 
 *    @fileoverview For front page
 *    @version 2017-10-13
 *    @require jQuery Ver.1.11.2 and above
 *    @require lib.js(selectordie)
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @description For Search Page(/pj/search/)
 */
//Search Page -----------------------------------------------
function SearchPage() {
    this.initialize();
}
SearchPage.prototype = {
    PAGE_COMPONENTS : {
        GENRE              : "#genre",
        CATEGORY_ROW       : "#categoryRow",
        CATEGORY           : "#category",
        SERIES_ROW         : "#seriesRow",
        SERIES             : "#series",
        SEARCH_FORM        : "#searchForm",
        BUTTON_SEARCH      : "#btnSearch",
        FILTER_LABEL       : "label.filterLabelCheck",
        KEYWORD            : "#searchWord",
        PRICE_TYPE         : "#priceType",
        SIZE_GROUP         : "input[name='_sg']",
        COLOR_GROUP        : "input[name='_bcg']",
        PRICE_FROM         : "#priceFrom",
        PRICE_TO           : "#priceTo",
        SOLDOUT_FILTER     : "input[name='itemSrcFlt']"
    },
    initialize : function() {
        var instance = this;
        //Initialize Page Component 
        jQuery.each(this.PAGE_COMPONENTS, function(name, value){
            if (value != null) {
                instance.PAGE_COMPONENTS[name] = $(value);
            }
        });
    },
    //Common Process
    build : function() {
        var instance = this;
        //Build Category(Genre, Category, Series)
        instance.buildCategory();
        //Filter Label Click Event
        instance.PAGE_COMPONENTS.FILTER_LABEL.click(function(e){
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).find("input").prop("checked", false);
            } else {
                if ($(this).hasClass("single")) {
                    $(this).parents("li").siblings().find("label.filterLabelCheck").removeClass("active");
                    $(this).parents("li").siblings().find("input").prop("checked", false);
                }
                $(this).addClass("active");
                $(this).find("input").prop("checked", true);
            }
            e.preventDefault();
        });
        //Search Button Click Event
        instance.PAGE_COMPONENTS.BUTTON_SEARCH.click(function(e){
            instance.PAGE_COMPONENTS.SEARCH_FORM.submit();
        });
        //Form Submit
        instance.PAGE_COMPONENTS.SEARCH_FORM.submit(function(){
            //KeyWord
            var keyword = instance.PAGE_COMPONENTS.KEYWORD.val();
            if (!CommonUtils.isNotNull(keyword)) {
                instance.PAGE_COMPONENTS.KEYWORD.remove();
            }
            //Price Type
            var priceType = instance.PAGE_COMPONENTS.PRICE_TYPE.val();
            if (!CommonUtils.isNotNull(priceType)) {
                instance.PAGE_COMPONENTS.PRICE_TYPE.remove();
            }
            //Category
            var category = instance.PAGE_COMPONENTS.CATEGORY.val();
            if (!CommonUtils.isNotNull(category)) {
                instance.PAGE_COMPONENTS.CATEGORY.remove();
            }
            //Series
            var series = instance.PAGE_COMPONENTS.SERIES.val();
            if (!CommonUtils.isNotNull(series)) {
                instance.PAGE_COMPONENTS.SERIES.remove();
            }
            //PCategory
            var genre = instance.PAGE_COMPONENTS.GENRE.val();
            if (!CommonUtils.isNotNull(genre) || CommonUtils.isNotNull(category) || CommonUtils.isNotNull(series)) {
                instance.PAGE_COMPONENTS.GENRE.remove();
            }
            //Size Group
            var sizeGroup = instance.PAGE_COMPONENTS.SIZE_GROUP.filter(":checked");
            if (sizeGroup.length > 0) {
                var sizeGroupVal = sizeGroup.map(function(){ return $(this).val(); }).get().join('-');
                instance.PAGE_COMPONENTS.SEARCH_FORM.append($("<input></input>").attr({"name":"_sg", "type":"hidden"}).val(sizeGroupVal));
            }
            instance.PAGE_COMPONENTS.SIZE_GROUP.remove();
            //Color Group
            var colorGroup = instance.PAGE_COMPONENTS.COLOR_GROUP.filter(":checked");
            if (colorGroup.length == 0) {
                instance.PAGE_COMPONENTS.COLOR_GROUP.remove();
            }
            //Price
            var priceFrom = instance.PAGE_COMPONENTS.PRICE_FROM.val();
            var priceTo = instance.PAGE_COMPONENTS.PRICE_TO.val();
            if (CommonUtils.isNotNull(priceFrom) && CommonUtils.isNotNull(priceTo)) {
                if (parseInt(priceFrom) > parseInt(priceTo)) {
                    instance.PAGE_COMPONENTS.PRICE_FROM.val(priceTo);
                    instance.PAGE_COMPONENTS.PRICE_TO.val(priceFrom);
                }
            } else {
                if (!CommonUtils.isNotNull(priceFrom)) {
                    instance.PAGE_COMPONENTS.PRICE_FROM.remove();
                }
                if (!CommonUtils.isNotNull(priceTo)) {
                    instance.PAGE_COMPONENTS.PRICE_TO.remove();
                }
            }
        });
    },
    buildCategory : function() {
        var instance = this;
        //Read Category File
        CommonUtils.getCategoryInfos({
            callBack : function(categoryInfo){
                //Category Info
                var categories = {};
                $.each(categoryInfo, function(floorName, floorValue){
                    if (!CommonUtils.isNotNull(floorName) || !CommonUtils.isNotNull(floorValue)) {
                        return;
                    }
                    var pCategories = floorValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.PCG.PCGS];
                    if (CommonUtils.isNotNull(pCategories)) {
                        //Floor Group
                        var floorList = $("<optgroup></optgroup>").attr({"label":floorName});
                        //Floor Category Info
                        $.each(pCategories, function(pcgName, pcgValue){
                            if (!CommonUtils.isNotNull(pcgValue)) {
                                return;
                            }
                            //Append PCG to Genre
                            var pcgType = pcgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE];
                            var pcgUrl = pcgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.URL];
                            var pcgCode = CommonUtils.getUrlParamMap(pcgUrl)[CommonUtils.nullToBlank(pcgType)];
                            if (pcgType == COMMON_CONSTS.CATEGORY_INFOS_URL.ENUM.TYPES.PCG) {
                                var itemKey = pcgCode;
                                if (!CommonUtils.isNotNull(itemKey)) {
                                    itemKey = pcgName;
                                }
                                floorList.append($("<option></option>").val(CommonUtils.nullToBlank(pcgCode)).text(pcgName).data("itemKey", itemKey));
                                categories[itemKey] = {};
                                categories[itemKey][COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE] = pcgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE];
                                categories[itemKey][COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.CG.CGS] = pcgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.CG.CGS];
                            }
                        });
                        // Add to Genre when PCG Exists
                        if (floorList.children().length > 0) {
                            instance.PAGE_COMPONENTS.GENRE.append(floorList);
                        }
                        
                        //Update
                        instance.PAGE_COMPONENTS.GENRE.selectOrDie("destroy").selectOrDie({
                            size : 10
                        });
                        instance.PAGE_COMPONENTS.GENRE.change(function() {
                            //Clear Category List
                            instance.PAGE_COMPONENTS.CATEGORY.val(null);
                            instance.PAGE_COMPONENTS.CATEGORY.find("option:not(:selected)").remove();
//                            instance.PAGE_COMPONENTS.CATEGORY_LIST.empty();
                            
                            var itemKey = $(this).find("option:selected").data("itemKey");
                            var pcgInfo = categories[itemKey];
                            if (CommonUtils.isNotNull(itemKey) && CommonUtils.isNotNull(pcgInfo)) {
                                //Get SizeGroup Condition(OneTime Solution)
                                //Create CG Info
                                var cgInfos = pcgInfo[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.CG.CGS];
                                if (CommonUtils.isNotNull(cgInfos)) {
                                    $.each(cgInfos, function(name, value){
                                        var type = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE];
                                        var url = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.URL];
                                        var code = CommonUtils.getUrlParamMap(url)[CommonUtils.nullToBlank(type)];
                                        //var code = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.CODE];
                                        if (type == COMMON_CONSTS.CATEGORY_INFOS_URL.ENUM.TYPES.CG && CommonUtils.isNotNull(code)) {
                                            instance.PAGE_COMPONENTS.CATEGORY.append($("<option></option>").val(code).text(name));
                                        }
                                    });
                                }
                            }
                            
                            instance.PAGE_COMPONENTS.CATEGORY.selectOrDie("destroy").selectOrDie();
                            if (instance.PAGE_COMPONENTS.CATEGORY.children().length > 1) {
                                //Show Category Row
                                if (!instance.PAGE_COMPONENTS.CATEGORY_ROW.is(':visible')) {
                                    instance.PAGE_COMPONENTS.CATEGORY_ROW.velocity("slideDown", {
                                        duration: 200,
                                        complete: function() {
                                            instance.PAGE_COMPONENTS.CATEGORY.selectOrDie("destroy").selectOrDie({
                                                size : 10
                                            });
                                        }
                                    });
                                }
                            } else {
                                //Hide Category Row
                                if (instance.PAGE_COMPONENTS.CATEGORY_ROW.is(':visible')) {
                                    instance.PAGE_COMPONENTS.CATEGORY_ROW.velocity("slideUp", { duration: 200 });
                                }
                            }
                        });
                    }
                    //Create Series List
                    // [Please Select]
                    var srGroups = floorValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.SR.SR_LIST];
                    if (CommonUtils.isNotNull(srGroups)) {
                        $.each(srGroups, function(srgName, srgValue){
                            var srInfos = srgValue[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.SR.SRS];
                            if (CommonUtils.isNotNull(srInfos)) {
                                $.each(srInfos, function(name, value){
                                    var type = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.TYPE];
                                    var url = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.URL];
                                    var code = CommonUtils.getUrlParamMap(url)[CommonUtils.nullToBlank(type)];
                                    //var code = value[COMMON_CONSTS.CATEGORY_INFOS_URL.RESPONSE.COMMON.CODE];
                                    if (type == COMMON_CONSTS.CATEGORY_INFOS_URL.ENUM.TYPES.SR && CommonUtils.isNotNull(code)) {
                                        instance.PAGE_COMPONENTS.SERIES.append($("<option></option>").val(code).text(name));
                                    }
                                });
                            }
                        });
                    }
                });
                //Show/Hide Series
                instance.PAGE_COMPONENTS.SERIES.selectOrDie("destroy").selectOrDie();
                if (instance.PAGE_COMPONENTS.SERIES.children().length > 1) {
                    if (!instance.PAGE_COMPONENTS.SERIES_ROW.is(':visible')) {
                        instance.PAGE_COMPONENTS.SERIES_ROW.velocity("slideDown", {
                            duration: 200,
                            complete: function() {
                                instance.PAGE_COMPONENTS.SERIES.selectOrDie("destroy").selectOrDie({
                                    size : 10
                                });
                            }
                        });
                    }
                } else {
                    if (instance.PAGE_COMPONENTS.SERIES_ROW.is(':visible')) {
                        instance.PAGE_COMPONENTS.SERIES_ROW.velocity("slideUp", { duration: 200 });
                    }
                }
            }
        });
    }
};

//launch
$(document).ready(function(){
    new SearchPage().build();
});