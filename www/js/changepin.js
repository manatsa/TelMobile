
$("#btnCangePin").on("click",changePin)

function changePin() {
    var oldpin=$("#txtOldPIN").val()
    var newpin1=$("#txtNewPIN").val()
    var newpin2=$("#txtConfirmNewPIN").val()
    try{
        if(newpin1==newpin2)
        {
            NativeStorage.getItem("user", function (user) {
                if(user.pin==oldpin){
                    user.pin=newpin1;
                    NativeStorage.setItem("user",user,function () {
                        navigator.notification.alert("New PIN saved successfully!",function () {},"PIN CHANGE","OK")
 //send email notification<>
                    },function (error) {
                        navigator.notification.alert("Error :"+error, function () {
                        }, "Error Saving New PIN", "OK")
                    })

                }else{
                    navigator.notification.alert("You entered an invalid old pin!", function () {},"Invalid Pin","OK")
                }
            });
        }else{
            navigator.notification.alert("Your new pins do not match!", function () {},"Invalid Pin","OK")
        }


    }catch(e){
        console.log("Error-"+e.responseText)
        navigator.notification.alert("Error changing Pin :"+e.responseText)
    }
}