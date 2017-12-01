$("#btnRegister").on("click", function () {

    var phone = $("#txtInitialLoginMSISDN").val();
    var email = $("#txtInitialLoginEmail").val();

    if (phone === "") {
        navigator.notification.alert("Please enter your mobile number for validation.", function () {
        }, "Fill all fields", "OK")
    } else if (email === "") {
        navigator.notification.alert("Please your email.", function () {
        }, "Fill all fields", "OK")
    } else if (!isPhoneValidNumber(phone)) {
        navigator.notification.alert("Please enter a valid Telecel mobile number.", function () {
        }, "Invalid mobile number", "OK")
    } else if (!isValidEmail(email)) {
        navigator.notification.alert("Your e-mail is not valid.", function () {
        }, "Invalid e-mail", "OK")
    } else {
        //no need for try catch because validated
        // do more here --------------------------------------------------------------- now persisting login details
        try {
            var newUser = {msisdn: phone, email: email};

                navigator.notification.prompt("Enter Current Pin", function (result) {
                    if (Number(result.input1) == Number(user.pin)) {
                        NativeStorage.setItem("user", newUser, function () {
                            navigator.notification.alert("Details saved successfully!", function () {
                            }, "Registration success", "OK");
                            user = newUser;
                            $.mobile.back();

                        }, function (error) {
                            navigator.notification.alert("Error :" + error, function () {
                            }, "Error Saving Details", "OK")
                        });
                    } else {
                        navigator.notification.alert("Sorry, your pin was not correct!", null, "Authorization Failure", "OK");
                    }
                }, "Authorize Action", ["OK", "Cancel"])


        } catch (e) {
            console.log(e)
            navigator.notification.alert("Error saving details!", null, "Profille Creation Failure", "OK");
        }
    }
});

function isPhoneValidNumber(phone) {
    if (phone.length === 10 && phone.startsWith("073") && !isNaN(phone)) {
        return true;
    }
    return false;
}
