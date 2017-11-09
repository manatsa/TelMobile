$("#btnRegister").on("click", function () {

    var phone = $("#txtInitialLoginMSISDN").val();
    var pin1 = $("#txtInitialLoginPIN").val();
    var pin2 = $("#txtInitialLoginPINReEnter").val();
    var email = $("#txtInitialLoginEmail").val();

    if (phone === "") {
        navigator.notification.alert("Please enter your mobile number for validation.", function () {
        }, "Empty field", "OK")
    } else if (email === "") {
        navigator.notification.alert("Please your email.", function () {
        }, "Empty field", "OKs")
    } else if (pin1 === "") {
        navigator.notification.alert("Please a PIN for use with this app.", function () {
        }, "Empty field", "OK")
    } else if (pin2 === "") {
        navigator.notification.alert("Please confirm your PIN.", function () {
        }, "Empty field", "OK")
    } else if (!isPhoneValidNumber(phone)) {
        navigator.notification.alert("Please enter a valid Telecel mobile number.", function () {
        }, "Invalid mobile number", "OK")
    } else if (!isValidEmail(email)) {
        navigator.notification.alert("Your e-mail is not valid.", function () {
        }, "Invalid e-mail", "OK")
    } else if (pin2 !== pin1) {
        navigator.notification.alert("Your new PIN does not match your old PIN.", function () {
        }, "PINs don't match", "OK")
    } else if (pin1.length !== 4) {
        navigator.notification.alert("Please enter a 4 digit PIN.", function () {
        }, "Invalid Pin", "OK")
    } else {
        var pin = parseInt(pin1);//no need for try catch because validated
        // do more here --------------------------------------------------------------- now persisting login details
        try {
            var user = {msisdn: phone, pin: pin, email: email};
            NativeStorage.setItem("user", user, function () {
                navigator.notification.alert("Details saved successfully!", function () {
                }, "Registration success", "OK");
                $.mobile.changePage("#pgMain")
            }, function (error) {
                navigator.notification.alert("Error :" + error, function () {
                }, "Error Saving Details", "OK")
            })
        } catch (e) {
            navigator.notification.alert(e, function () {
            }, "Error Saving Details", "OK")
        }
    }
});

function isPhoneValidNumber(phone) {
    if (phone.length === 10 && phone.startsWith("073") && !isNaN(phone)) {
        return true;
    }
    return false;
}

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
