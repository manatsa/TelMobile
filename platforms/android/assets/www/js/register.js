



$("#btnRegister").on("click", function () {
    var phone = $("#txtInitialLoginMSISDN").val();
    var pin1 = $("#txtInitialLoginPIN").val();
    var pin2 = $("#txtInitialLoginPINReEnter").val();
    var email=$("#txtInitialLoginEmail").val();
    var phoneint;
    try {
        phoneint = parseInt(phone);
    } catch (e) {
    }

    if (phone.length === 10 || phone.startsWith("073") && !isNaN(phone) && phoneint > 0) {
        try {

            if (pin1 && pin2 && pin1.length == 4 && (pin1 == pin2)) {

                    try {
                        var pin = parseInt(pin1);
    // do more here --------------------------------------------------------------- now persisting login details
                            try{
                                var user = {msisdn: phone, pin: pin, email:email};
                                NativeStorage.setItem("user",user,function () {
                                   navigator.notification.alert("Details saved successfully!",function () {},"Registration","OK");
                                    $.mobile.changePage("#pgMain")
                                },function (error) {
                                    navigator.notification.alert("Error :"+error, function () {
                                    }, "Error Saving Details", "OK")
                                })



                            }catch(e){
                                navigator.notification.alert("Error :"+e, function () {
                                }, "Error Saving Details", "OK")
                            }

    //-----------------------------------------------------------------------------
                        //alert(phone)
                    } catch (error) {
                        navigator.notification.alert("You need to enter a 4-digit pin", function () {
                        }, "Invalid Pin Characters", "OK")
                    }
            }
            else {
                navigator.notification.alert("Your pin does not match the required standard!\n Please retry again.", function () {
                }, "Invalid Pin", "OK")
            }
        } catch (error) {
            navigator.notification.alert("Your need to enter a 10-digit mobile number", function () {
            }, "Invalid Mobile Number Characters", "OK")
        }
    } else {
        navigator.notification.alert("Your mobile number is not valid", function () {
        }, "Invalid Mobile Number", "OK")
    }

});