$("#btnRegister").on("click", function () {
    var phone = $("#msisdnRegText").val();
    var pin1 = $("#pinRegText").val();
    var pin2 = $("#pinRegText2").val();
    var phoneint;
    try {
        phoneint = parseInt(phone);
    } catch (e) {
    }

    if (phone.length === 10 || phone.startsWith("073") && !isNaN(phone) && phoneint > 0) {
        try {

            if (pin1 && pin2 && pin1.length == 4 && (pin1 === pin2)) {

                try {
                    var pin = parseInt(pin1);
// do more here ---------------------------------------------------------------


//-----------------------------------------------------------------------------
                    alert(phone)
                } catch (error) {
                    navigator.notification.alert("Your need to enter a 4-digit pin", function () {
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