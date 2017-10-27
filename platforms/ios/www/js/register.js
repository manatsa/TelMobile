
var prefs=plugins.preferences;
$("#btnRegister").on("click", function () {
    var phone = $("#txtRegisterMSISDN").val();
    var pin1 = $("#txtRegisterPIN").val();
    var pin2 = $("#txtRegisterPINRepeat").val();
    var email=$("#txtRegisterEmail").val();
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
                            if(email)
                            {
                                prefs.store("msisdn",phone);
                                prefs.store("email",email);
                                prefs.store("pin",pin);
                                navigator.notification.alert("Your registration was successful!", function () {
                                }, "Registration", "OK")
                                $.mobile.changePage("#login_page")
                            }else{
                                navigator.notification.alert("Your email is not valid", function () {
                                }, "Invalid Pin Characters", "OK")
                            }


                        }catch(e){
                            navigator.notification.alert("Error :"+e, function () {
                            }, "Error Saving Details", "OK")
                        }

//-----------------------------------------------------------------------------
                    alert(phone)
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