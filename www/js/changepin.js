$("#pgChangePIN").on("pagebeforeshow", function () {
    clearChangePINInputs();
});

function clearChangePINInputs() {
    $("#txtOldPIN").val('');
    $("#txtNewPIN").val('');
    $("#txtConfirmNewPIN").val('');
}

function changePin() {
    showProgressBar();
    console.log(user.pin);
    var oldpin = $("#txtOldPIN").val();
    var newpin1 = $("#txtNewPIN").val();
    var newpin2 = $("#txtConfirmNewPIN").val();
    if (newpin1 === newpin2) {
        if (Number(user.pin) === Number(oldpin)) {
            user.pin = newpin1;
            NativeStorage.setItem("user", user, function () {
                clearChangePINInputs();
                sendEMail(user.email,"New Pin Notification","Mobile App Pin for MSISDN "+user.msisdn+" has been changed to : "+user.pin,false)
                navigator.notification.alert("New PIN has been successfully saved.", function () {
                }, "Success", "OK");
                hideProgressBar();
                $.mobile.back();
            }, function (error) {
                hideProgressBar();
                navigator.notification.alert("Error :" + error + errorHelpTextToAppend, function () {
                }, "Error: ", "OK");
            });
        } else {
            hideProgressBar();
            navigator.notification.alert("You entered an incorrect old pin!", function () {
            }, "Incorrect PIN entered", "OK");
        }
    } else {
        hideProgressBar();
        navigator.notification.alert("Your new pins do not match!", function () {
        }, "PINs don't match", "OK")
    }

}