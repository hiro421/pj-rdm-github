/** 
 *    @fileoverview For front page
 *    @version 2017-07-01
 *    @require jQuery Ver.1.11.2 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @require PostalInfo.js
 *    @description For Member Regist Input page
 */
function MemberRegistPage() {
    this.initialize();
}
MemberRegistPage.prototype = {
    PAGE_COMPONENTS : {
        POST_INFO_ROW     : "#postInfoRow",
        POST_CODE         : "#postCode",
        POST_BUTTON       : "#postButton",
        POST_DETAIL_BUTTON: "#postDetailBtn",
        POST_INFO_ERR_MSG : "#postInfoErrMsg",
        ADDRESS1          : "#address1",
        ADDRESS2          : "#address2",
        ADDRESS3          : "#address3",
        ADDRESS_PART1     : "#addressPart1",
        ADDRESS_PART2     : "#addressPart2",
        AGREE_CHECK       : "#agree",
        PRIVACY_BUTTON    : "#privacyPolicyBtn",
        MEMBER_RULE_BUTTON: "#MemberRuleBtn",
        CONFIRM_BUTTON    : "#confirmBtn",
        STORE_CUST_NO     : "input[name='storeCustNo']"
    },
    initialize : function() {
        var instance = this;
        //Initialize Page Component 
        $.each(this.PAGE_COMPONENTS, function(name, value){
            if (value != null) {
                instance.PAGE_COMPONENTS[name] = $(value);
            }
        });
        //Onetime Solution
        instance.PAGE_COMPONENTS.STORE_CUST_NO.attr("maxlength", "17")
        //Rebind Click
        instance.PAGE_COMPONENTS.CONFIRM_BUTTON.unbind("click");
        instance.PAGE_COMPONENTS.CONFIRM_BUTTON.click(function(){
            //Onetime Solution (Remove NaN Char)
            var storeCustNo = instance.PAGE_COMPONENTS.STORE_CUST_NO.val();
            if (CommonUtils.isNotNull(storeCustNo)) {
                var newStoreCustNo = "";
                storeCustNo = CommonUtils.fullToHalf(storeCustNo);
                for (var i=0; i<storeCustNo.length; i++) {
                    var chrStr = storeCustNo.substr(i, 1);
                    if ($.isNumeric(chrStr)) {
                        newStoreCustNo += chrStr;
                    }
                }
                instance.PAGE_COMPONENTS.STORE_CUST_NO.val(newStoreCustNo);
            }
            CommonUtils.doPostBack('confirm', pagePolicy.formDataPool, 'mainForm');
        });
    },
    //Common Process
    build : function() {
        var instance = this;
        
        //Initialize Disp Info
        instance.buildDispComponent();
        //Post Button Click Event
        instance.buildPostBtnEvent();
        //PostCode Detail Button Click Event
        instance.PAGE_COMPONENTS.POST_DETAIL_BUTTON.click(function() {
            window.open(COMMON_CONSTS.URLS.POST_CODE_DETAIL_URL);
        });
        //Privacy Click Event
        instance.PAGE_COMPONENTS.PRIVACY_BUTTON.click(function(){
            CommonUtils.showContents(COMMON_CONSTS.URLS.PRIVACY_CONTENT_URL);
        });
        //Member rule Event
        instance.PAGE_COMPONENTS.MEMBER_RULE_BUTTON.click(function(){
            CommonUtils.showContents(COMMON_CONSTS.URLS.MEMBER_RULE_URL);
        });
    },
    //Initialize Disp Info
    buildDispComponent : function() {
        var instance = this;
        //Select Disp Color
        $("select").change(function(){
            if ($(this).find("option:selected").hasClass("no-select")) {
                $(this).css({"color": "#dcdcdc"});
            } else {
                $(this).css({"color": "#000"});
            }
        });
        $("select").change();
        //Confirm Button disabled/enabled Change Event
        instance.PAGE_COMPONENTS.AGREE_CHECK.change(function(){
            if (jQuery(this).is(":checked")) {
                instance.PAGE_COMPONENTS.CONFIRM_BUTTON.removeAttr("disabled");
                instance.PAGE_COMPONENTS.CONFIRM_BUTTON.addClass("c-btn--black");
            } else {
                instance.PAGE_COMPONENTS.CONFIRM_BUTTON.attr("disabled", true);
                instance.PAGE_COMPONENTS.CONFIRM_BUTTON.removeClass("c-btn--black");
            }
        });
        instance.PAGE_COMPONENTS.AGREE_CHECK.change();
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
