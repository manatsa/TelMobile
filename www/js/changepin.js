$("#pgChangePIN").on("pagebeforeshow", function () {
    clearChangePINInputs();
});

function clearChangePINInputs() {
    $("#txtOldPIN").val('');
    $("#txtNewPIN").val('');
    $("#txtConfirmNewPIN").val('');
}

function changePin() {
    console.log(user.pin);
    var oldpin = $("#txtOldPIN").val();
    var newpin1 = $("#txtNewPIN").val();
    var newpin2 = $("#txtConfirmNewPIN").val();
    if (newpin1 === newpin2) {
        if (Number(user.pin) === Number(oldpin)) {
            user.pin = newpin1;
            NativeStorage.setItem("user", user, function () {
                clearChangePINInputs();
                navigator.notification.alert("New PIN has been successfully saved.", function () {
                }, "Success", "OK");
                //send email notification<>
            }, function (error) {
                navigator.notification.alert("Error :" + error + errorHelpTextToAppend, function () {
                }, "Error: ", "OK");
            });
        } else {
            navigator.notification.alert("You entered an incorrect old pin!", function () {
            }, "Incorrect PIN entered", "OK");
        }
    } else {
        navigator.notification.alert("Your new pins do not match!", function () {
        }, "PINs don't match", "OK")
    }

}