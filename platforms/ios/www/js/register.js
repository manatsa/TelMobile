
var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {


        // be certain to make an unique reference String for each variable!
        NativeStorage.setItem("reference", obj, this.setSuccess, this.setError);
    },
    setSuccess: function (obj) {
        console.log(obj.name);
        NativeStorage.getItem("reference", this.getSuccess, this.getError);
    },
    setError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },
    getSuccess: function (obj) {
        console.log(obj.name);
        NativeStorage.remove("reference", this.removeSuccess, this.removeError);
    },
    getError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },
    removeSuccess: function () {
        console.log("Removed");
    },
    removeError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    }
};

app.initialize();


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
                if(email)
                {
                    try {
                        var pin = parseInt(pin1);
    // do more here --------------------------------------------------------------- now persisting login details
                            try{
                                var user = {msisdn: phone, pin: pin, email:email};
                                NativeStorage.setItem("user",user,function () {
                                   navigator.notification.alert("Details saved successfully!",function () {},"Registration","OK");
                                    $.mobile.changePage("#login_page")
                                },function (error) {
                                    navigator.notification.alert("Error :"+error, function () {
                                    }, "Error Saving Details", "OK")
                                })



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
                }else{
                    navigator.notification.alert("Your email is not valid", function () {
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