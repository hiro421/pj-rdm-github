/** 
 *    @fileoverview For front page
 *    @version 2017-07-01
 *    @require jQuery Ver.1.11.2 and above
 *    @require CommonParams.js
 *    @require CommonUtils.js
 *    @require PostalInfo.js
 *    @description For Member Regist&Modify Confirm page
 */
function MemberConfirmPage() {
    this.initialize();
}
MemberConfirmPage.prototype = {
    PAGE_COMPONENTS : {
        //NONE
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
    }
};
