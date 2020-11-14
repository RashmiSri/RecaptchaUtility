({
	verifyCAPTCHA : function(component) {
		var action = component.get("c.verifyResponse");
        action.setParams({
            secretKey : component.get("v.reCaptchaSecretKey"),
            token : component.get("v.message")
        });
 		action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()) {
                    component.set("v.message","verified");
                    this.sendToVFP(component);
                }   
            }
            else if (state === "INCOMPLETE") {
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
		$A.enqueueAction(action);        
	},
    sendToVFP : function(component) {
        var message = component.get("v.message");
        var vfOrigin = "https://" + component.get("v.vfHost");
        var vfWindow = component.find("vfFrame").getElement().contentWindow;
        vfWindow.postMessage(message, vfOrigin);
	}
})
