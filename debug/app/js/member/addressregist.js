/** 
 *    @fileoverview For front page
 *    @version 2017-07-01
 *    @require jQuery Ver.1.11.2 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @require PostalInfo.js
 *    @description For Member Regist&Modify page
 */
//Item Detail Page -----------------------------------------------
function AddressRegistPage() {
    this.initialize();
}
AddressRegistPage.prototype = {
    PAGE_COMPONENTS : {
        POST_INFO_ROW     : "#postInfoRow",
        POST_CODE         : "#postCode",
        POST_BUTTON       : "#postButton",
        POST_INFO_ERR_MSG : "#postInfoErrMsg",
        ADDRESS1          : "#address1",
        ADDRESS2          : "#address2",
        ADDRESS3          : "#address3",
        ADDRESS_PART1     : "#addressPart1",
        ADDRESS_PART2     : "#addressPart2"
    },
    initialize : function() {
        var instance = this;
        //Validation
//        if (typeof parameters == "undefined" || typeof parameters.itemData == "undefined") {
//            return;
//        } else {
//            instance.ItemData = parameters.itemData;
//            //Do Brand Name Replacement
//            instance.ItemData.brandName = CommonUtils.getBrandReplacement(instance.ItemData.brandName);
//        }
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
        
        //Initialize Disp Info
        instance.buildDispComponent();
        //Post Button Click Event
        instance.buildPostBtnEvent();
    },
    //Initialize Disp Info
    buildDispComponent : function() {
        var instance = this;
        $(function () {
            if ($("select").find("option:selected").hasClass("no-select")) {
                $("select").css({"color": "#dcdcdc"});
            }
        });
        $("select").on("change", function () {
            if ($(this).find("option:selected").hasClass("no-select")) {
                $(this).css({"color": "#dcdcdc"});
            } else {
                $(this).css({"color": "#000"});
            }
        });
    },
    //PostButton Event
    buildPostBtnEvent : function() {
        var instance = this;
        instance.PAGE_COMPONENTS.POST_BUTTON.click(function() {
            var postCode = instance.PAGE_COMPONENTS.POST_CODE.val();
            if (CommonUtils.isNotNull(postCode)) {
                instance.PAGE_COMPONENTS.POST_INFO_ROW.removeClass("c-form__group--error");
                instance.PAGE_COMPONENTS.POST_INFO_ERR_MSG.text("");
                PostalInfo.searchAddress(postCode, function(processResult){
                    if (processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_STATUS] == COMMON_CONSTS.HTTP_COMMON.ENUM.PROCESS_STATUS.SUCCESS) {
                        var addressInfo = processResult[COMMON_CONSTS.SEARCH_ADDRESS_API.RESPONSE.ADDRESS_INFO];
                        var prefecture = CommonUtils.nullToBlank(addressInfo.prefecture);
                        var city = CommonUtils.nullToBlank(addressInfo.city);
                        var town = CommonUtils.nullToBlank(addressInfo.town);
                        instance.PAGE_COMPONENTS.ADDRESS1.val(prefecture);
                        instance.PAGE_COMPONENTS.ADDRESS2.val(city);
                        instance.PAGE_COMPONENTS.ADDRESS3.val(town);
                        instance.PAGE_COMPONENTS.ADDRESS_PART1.text(prefecture + city);
                        instance.PAGE_COMPONENTS.ADDRESS_PART2.text(town);
                    } else {
                        if (!instance.PAGE_COMPONENTS.POST_INFO_ROW.hasClass("c-form__group--error")) {
                            instance.PAGE_COMPONENTS.POST_INFO_ROW.addClass("c-form__group--error");
                        }
                        if (processResult[COMMON_CONSTS.HTTP_COMMON.RESPONSE.PROCESS_ERROR_CODE] == COMMON_CONSTS.SEARCH_ADDRESS_API.ENUM.ERROR_CODE.DATA_TYPE_ERROR) {
                            instance.PAGE_COMPONENTS.POST_INFO_ERR_MSG.text(COMMON_CONSTS.SEARCH_ADDRESS_API.MESSAGES.POSTCODE_DATA_TYPE_ERR);
                        } else {
                            instance.PAGE_COMPONENTS.POST_INFO_ERR_MSG.text(COMMON_CONSTS.SEARCH_ADDRESS_API.MESSAGES.POSTAL_INFO_NOT_FOUND);
                        }
                    }
                });
            } else {
                if (!instance.PAGE_COMPONENTS.POST_INFO_ROW.hasClass("c-form__group--error")) {
                    instance.PAGE_COMPONENTS.POST_INFO_ROW.addClass("c-form__group--error");
                }
                instance.PAGE_COMPONENTS.POST_INFO_ERR_MSG.text(COMMON_CONSTS.SEARCH_ADDRESS_API.MESSAGES.POSTCODE_INPUT_REQUIRED);
            }
        });
    }
};
