/** 
 *    @fileoverview For front page
 *    @version 2017-07-24
 *    @require jQuery Ver.1.11.2 and above
 *    @require lib.js(jQuery.Cookie)
 *    @require Slick Ver.1.5.9 and above
 *    @require Slidebars Ver.0.10.3 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @description For Catalog No Need page
 */
//Item Detail Page -----------------------------------------------
var catalogNoNeedPageInstance = null;
function CatalogNoNeedPage(parameters) {
    this.initialize(parameters);
}
CatalogNoNeedPage.prototype = {
    // Brand Name Replace Policy
    CATALOG_NAME_REPLACE_MAPPING : {
        "PJ" : "PEACH JOHN \u30ab\u30bf\u30ed\u30b0",
        "SL" : "SALON by PEACH JOHN \u30ab\u30bf\u30ed\u30b0"
    },
    ITEM_COMPONENTS : {
        CATALOG_CHECK_BOX_LIST : "#catalogCheckBoxList"
    },
    CatalogItemSetting : {
        CatalogListDiv : {
            tag : "<div></div>",
            attr : {
                "class" : "c-form__group u-m-bottom-15px"
            },
            CatalogListInput : {
                tag : "<input></input>",
                attr : {
                    "class" : "c-form__checkbox checkBox01",
                    "type" : "checkbox",
                    "name" : "noNeedCatalog"
                }
            },
            CatalogListLabel : {
                tag : "<label></label>",
                attr : {
                    "class" : "c-form__checkbox-label"
                }
            }
        }
    },
    initialize : function(parameters) {
        var instance = this;
        catalogNoNeedPageInstance = this;
        // Validation
        if (typeof parameters == "undefined" || typeof parameters.catalogNoNeed == "undefined") {
            return;
        } else {
            instance.CatalogNoNeed = parameters.catalogNoNeed;
            // Do Brand Name Replacement
            instance.CatalogNoNeed.catalogList = catalogNoNeedPageInstance.getBrandReplacement(instance.CatalogNoNeed.catalogList);
        }
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
        if (instance.CatalogNoNeed == null || instance.CatalogNoNeed.catalogList.length == 0) {
            //Not Exist Item
            return;
        }
        instance.buildCatalogListPanel();
    },
    /**
     * @description Replace brandName of item to replacement
     */
    getBrandReplacement : function(catalogList) {
        for (var i = 0; i < catalogList.length; ++ i) {
            if (typeof CatalogNoNeedPage.prototype.CATALOG_NAME_REPLACE_MAPPING[catalogList[i].catalogName] != "undefined") {
                catalogList[i].catalogName = CatalogNoNeedPage.prototype.CATALOG_NAME_REPLACE_MAPPING[catalogList[i].catalogName];
            }
        }
        return catalogList;
    },
    /**
     * @description Build CatalogList Panel
     */
    buildCatalogListPanel : function() {
        var instance = this;
        //Catalog List
        jQuery.each(instance.CatalogNoNeed.catalogList, function(index, catalog){
            var catalogCode = CommonUtils.nullToBlank(catalog.catalogCode);
            var catalogName = CommonUtils.nullToBlank(catalog.catalogName);

            //Create CatalogItem
            var catalogItemComponents = {};
            CommonUtils.createHtmlConponent(instance.CatalogItemSetting, catalogItemComponents, null);
            instance.ITEM_COMPONENTS.CATALOG_CHECK_BOX_LIST.append(catalogItemComponents.CatalogListDiv);
            catalogItemComponents.CatalogListInput.attr("value", catalogCode);
            catalogItemComponents.CatalogListLabel.text(catalogName);
            
        });
    }
}
