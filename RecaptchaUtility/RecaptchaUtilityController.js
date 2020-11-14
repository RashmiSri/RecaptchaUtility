({
    doInit : function(component,event,helper) {
        var vfOrigin = "https://" + component.get("v.vfHost");
        window.addEventListener("message", $A.getCallback(function(event) {
            if (event.origin !== vfOrigin) {
                // Not the expected origin: Reject the message!
                return;
            }
            // Handle the message 
            var message = JSON.parse(event.data);
            if(message.response!=null) {
            	component.set("v.message",message.response); 
                helper.verifyCAPTCHA(component);  
            } else if(message.submit==true) {
                component.find("leadForm").submit();
            } else if(message.size!=null) {
                var size = parseInt(message.size);
                var vfFrame = component.find("vfFrame").getElement();
                vfFrame.height = size+'px';
                component.set("v.vfFrame",vfFrame);
            } else {
                alert('no message');
            }         
                                  
        }), false);
    }
})
