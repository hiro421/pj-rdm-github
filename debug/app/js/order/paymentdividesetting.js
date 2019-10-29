/** 
 *    @fileoverview For front page
 *    @version 2017-08-23
 *    @require jQuery Ver.1.11.2 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @require PostalInfo.js
 *    @description For Member Regist Input page
 */
var pageInstance = null;
function PaymentDivideSettingPage() {
    this.initialize();
}
PaymentDivideSettingPage.prototype = {
    PAGE_COMPONENTS : {
        SHOP_ID                  : "#shopId",
        NEW_CREDIT_CARD_NO       : "#newCreditCardNo",
        CHOICE_NEW_EXPIRE_YEAR   : "#choiceNewExpireYear",
        CHOICE_NEW_EXPIRE_MONTH  : "#choiceNewExpireMonth",
        NEW_SECURITY_CODE        : "#newSecurityCode",
        NEW_HOLDER_NAME          : "#newHolderName",
        RESULT_CODE              : "#resultCode",
        MULTIPAYMENT_TOKEN       : "#multipaymentToken",
        TO_BE_EXPIRED_AT         : "#toBeExpiredAt",
        MASKED_CARD_NO           : "#maskedCardNo",
        IS_SECURITY_CODE_SET     : "#isSecurityCodeSet",
        RESULT_CODE_SECOND       : "#resultCodeSecond",
        MULTIPAYMENT_TOKEN_SECOND: "#multipaymentTokenSecond"
    },
    CONTROL_FUNCTION : {
        TOKEN_COUNT                : 0,
        ACTION_NAME                : "action_name",
        ACTION_NAME_FOR_CONFIRM    : "button_click_goto_order_confirm"
    },
    initialize : function() {
        var instance = this;
        PaymentDivideSettingInstance = this;
        
        //Read GMO Multioayment js file
        jQuery("body").append(jQuery("<script><\/script>").attr({
            "src" : jQuery(':hidden[name="gmoMultipaymentURL"]').val(),
            "charset" : "utf-8"}));
        
        // If you check the "newcard", you can enter a credit card info.
        if (jQuery("input[name='choiceMethodPayment']:checked").val() == "newCard") {
            enabledNewCreditCardInfo();
        } else {
            disabledNewCreditCardInfo();
        }
        
        //Initialize Page Component 
        jQuery.each(this.PAGE_COMPONENTS, function(name, value){
            if (value != null) {
                instance.PAGE_COMPONENTS[name] = jQuery(value);
            }
        });
    },
    //Common Process
    build : function() {
        var instance = this;
    },
    doPurchase : function() {
        var instance = this;
        var expire = instance.PAGE_COMPONENTS.CHOICE_NEW_EXPIRE_YEAR.val() + instance.PAGE_COMPONENTS.CHOICE_NEW_EXPIRE_MONTH.val();
        var entryCardno = null;
        if (instance.PAGE_COMPONENTS.NEW_CREDIT_CARD_NO.val().length > 0) {
            entryCardno = instance.PAGE_COMPONENTS.NEW_CREDIT_CARD_NO.val();
        }
       //Get token from GMO.
       Multipayment.init(instance.PAGE_COMPONENTS.SHOP_ID.val());
       Multipayment.getToken(
          {cardno: entryCardno,
           expire: expire,
           securitycode: instance.PAGE_COMPONENTS.NEW_SECURITY_CODE.val(),
           holdername: instance.PAGE_COMPONENTS.NEW_HOLDER_NAME.val()
           },execPurchase
       );
    }
};

jQuery(document).ready(function(){
    pageInstance = new PaymentDivideSettingPage();
    pageInstance.build();
});

//Check need token or not.
function checkNeedToken () {
    var instance = pageInstance;
    
    if (jQuery("input[name='choiceMethodPayment']:checked").val() == "newCard") {
        // need token.
        if (instance.PAGE_COMPONENTS.RESULT_CODE.val() != "000" 
            || instance.PAGE_COMPONENTS.NEW_CREDIT_CARD_NO.val() != instance.PAGE_COMPONENTS.MASKED_CARD_NO.val()) {
            // Remove the gmo card info.
            clearTokenInfo ();
            return true;
        } else {
        // already have a correct token.
            return false;
        }
    } else {
        // Remove the gmo card info.
        clearTokenInfo ();
        return false;
    }
}

// Remove the gmo card info.
function clearTokenInfo () {
    var instance = pageInstance;
    instance.PAGE_COMPONENTS.RESULT_CODE.val("");
    instance.PAGE_COMPONENTS.MULTIPAYMENT_TOKEN.val("");
    instance.PAGE_COMPONENTS.TO_BE_EXPIRED_AT.val("");
    instance.PAGE_COMPONENTS.MASKED_CARD_NO.val("");
    instance.PAGE_COMPONENTS.IS_SECURITY_CODE_SET.val("");
    instance.PAGE_COMPONENTS.RESULT_CODE_SECOND.val("");
    instance.PAGE_COMPONENTS.MULTIPAYMENT_TOKEN_SECOND.val("");
}

//Set the gmo card info and submit.
function execPurchase (response) {
    var instance = pageInstance;
    instance.CONTROL_FUNCTION.TOKEN_COUNT++;

    if (instance.CONTROL_FUNCTION.TOKEN_COUNT == 2) {

        //Set resultCode(second).
        instance.PAGE_COMPONENTS.RESULT_CODE_SECOND.val(response.resultCode);
        if (response.resultCode == "000") {
            instance.PAGE_COMPONENTS.MULTIPAYMENT_TOKEN_SECOND.val(response.tokenObject.token);
        }
        
        //Click confirm
        if (instance.CONTROL_FUNCTION.ACTION_NAME_FOR_CONFIRM == instance.CONTROL_FUNCTION.ACTION_NAME) {
            //Remove the card no info.
            instance.PAGE_COMPONENTS.NEW_CREDIT_CARD_NO.val("");
            //Submit.
            CommonUtils.doPostBack(instance.CONTROL_FUNCTION.ACTION_NAME, pagePolicy.formDataPool, "mainForm");
        } else {
            sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME, "mainForm");
        }
    } else {
        //Set resultCode(first).
        instance.PAGE_COMPONENTS.RESULT_CODE.val(response.resultCode);
        if (response.resultCode == "000") {
            instance.PAGE_COMPONENTS.MULTIPAYMENT_TOKEN.val(response.tokenObject.token);
            instance.PAGE_COMPONENTS.TO_BE_EXPIRED_AT.val(response.tokenObject.toBeExpiredAt);
            instance.PAGE_COMPONENTS.MASKED_CARD_NO.val(response.tokenObject.maskedCardNo);
            instance.PAGE_COMPONENTS.IS_SECURITY_CODE_SET.val(response.tokenObject.isSecurityCodeSet);
        }
        pageInstance.doPurchase();
    }
}

function sendActionForThisPage(act, formName){
    var instance = pageInstance;
    //Remove the card no info.
    instance.PAGE_COMPONENTS.NEW_CREDIT_CARD_NO.val("");
    
    //sendAction
    if (!formName) {
        formName = 'mainForm';
    }
    with (document[formName]){
        actionNameTxt.value=act;
    } 
    //sendSubmit
    jQuery("form[name='" + formName + "']").submit();
    return true;
}

function changeDeliTypeRadio() {
    var instance = pageInstance;
    //Save form name.
    instance.CONTROL_FUNCTION.ACTION_NAME = "radio_change_method_delivery";
    //Clear counter.
    instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;
    
    if (checkNeedToken()) {
        //Get Token.
        instance.doPurchase();
        return false;
    } else {
    	sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
        return true;
    }
}

function changeAddressSelect() {
    var instance = pageInstance;
    //Save form name.
    instance.CONTROL_FUNCTION.ACTION_NAME = "ddl_change_delivery_address";
    //Clear counter.
    instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;

    if (checkNeedToken()) {
        //Get Token.
        instance.doPurchase();
        return false;
    } else {
        sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
        return true;
    }
}

function changeMethodPaymentRadio(type) {
    var val = document.mainForm.hidLastChoiceMethodPayment.value;

    // If you check the "newcard", you can enter a credit card info.
    if (jQuery("input[name='choiceMethodPayment']:checked").val() == "newCard") {
        enabledNewCreditCardInfo();
    } else {
        disabledNewCreditCardInfo();
    }
    
    if (type != val) {
        var instance = pageInstance;
        //Save form name.
        instance.CONTROL_FUNCTION.ACTION_NAME = "radio_change_method_payment";
        //Clear counter.
        instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;
        
        if (checkNeedToken()) {
            //Get Token.
            instance.doPurchase();
            return false;
        } else {
            sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
            return true;
        }
    }
}

function pushDelButton(delCardKey) {
    document.mainForm.hidCardKey.value = delCardKey;
    
    var instance = pageInstance;
    //Save form name.
    instance.CONTROL_FUNCTION.ACTION_NAME = "button_click_credit_card_delete";
    //Clear counter.
    instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;

    if (checkNeedToken()) {
        //Get Token.
        instance.doPurchase();
        return false;
    } else {
        sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
        return true;
    }
}

function buttonClickGotoOrderConfirm(msg) {
    var instance = pageInstance;
    //Save form name.
    instance.CONTROL_FUNCTION.ACTION_NAME = "button_click_goto_order_confirm";
    //Clear counter.
    instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;
    
    if (msg != "") {
        while (true) {
            dummy = msg;
            msg = msg.replace("%BR%", '\n');
            if (msg == dummy) {
                 break;
            }
        }
        if (!confirm(msg)) {
            return false;
        }
    }
    if (jQuery("input[name=choiceMethodPayment]:checked").val() == "newCard") {
        //Need token info
        if (checkNeedToken()) {
            //Get Token.
            instance.doPurchase();
            return false;
        } else {
            sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
            return true;
        }
    } else {
        sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
        return true;
    }
}

function changeCoupon() {
    var instance = pageInstance;
    //Save form name.
    instance.CONTROL_FUNCTION.ACTION_NAME = "radio_change_coupon";
    //Clear counter.
    instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;

    if (checkNeedToken()) {
        //Get Token.
        instance.doPurchase();
        return false;
    } else {
        sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
        return true;
    }
}

function registCouponCode() {
    var instance = pageInstance;
    //Save form name.
    instance.CONTROL_FUNCTION.ACTION_NAME = "button_click_regist_coupon_code";
    //Clear counter.
    instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;

    if (checkNeedToken()) {
        //Get Token.
        instance.doPurchase();
        return false;
    } else {
        sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
        return true;
    }
}

function changeCollectiveDelivery() {
    var instance = pageInstance;
    //Save form name.
    instance.CONTROL_FUNCTION.ACTION_NAME = "button_click_change_collective_delivery";
    //Clear counter.
    instance.CONTROL_FUNCTION.TOKEN_COUNT = 0;

    if (checkNeedToken()) {
        //Get Token.
        instance.doPurchase();
        return false;
    } else {
        sendActionForThisPage(instance.CONTROL_FUNCTION.ACTION_NAME);
        return true;
    }
}

function disabledNewCreditCardInfo() {
    jQuery("#viewCountBottom").prop("disabled", true);
    jQuery("#newCreditCardNo").prop("disabled", true);
    jQuery("#newHolderName").prop("disabled", true);
    jQuery("#newSecurityCode").prop("disabled", true);
    jQuery("#choiceNewExpireMonth").prop("disabled", true);
    jQuery("#choiceNewExpireYear").prop("disabled", true);
    jQuery("#choiceNewPaymentNum").prop("disabled", true);
}

function enabledNewCreditCardInfo() {
    jQuery("#viewCountBottom").prop("disabled", false);
    jQuery("#newCreditCardNo").prop("disabled", false);
    jQuery("#newHolderName").prop("disabled", false);
    jQuery("#newSecurityCode").prop("disabled", false);
    jQuery("#choiceNewExpireMonth").prop("disabled", false);
    jQuery("#choiceNewExpireYear").prop("disabled", false);
    jQuery("#choiceNewPaymentNum").prop("disabled", false);
}