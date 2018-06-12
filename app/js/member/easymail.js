/** 
 *    @fileoverview For front page
 *    @version 2017-07-01
 *    @require jQuery Ver.1.11.2 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @require PostalInfo.js
 *    @description For Member Regist Input page
 */
function EasyMailPage() {
    this.initialize();
}
EasyMailPage.prototype = {
    PAGE_COMPONENTS : {
        PRIVACY_BUTTON    : "#privacyPolicyBtn"
    },
    initialize : function() {
        var instance = this;
        //Initialize Page Component 
        $.each(this.PAGE_COMPONENTS, function(name, value){
            if (value != null) {
                instance.PAGE_COMPONENTS[name] = $(value);
            }
        });
    },
    //Common Process
    build : function() {
        var instance = this;
        
        //Privacy Click Event
        instance.PAGE_COMPONENTS.PRIVACY_BUTTON.click(function(){
            CommonUtils.showContents(COMMON_CONSTS.URLS.PRIVACY_CONTENT_URL);
        });
    }
};
