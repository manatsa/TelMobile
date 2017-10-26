$("#btnLogin").on("click", function () {
    var phone = $("#txtMSISDN").val();
    var pin = $("#txtLoginPIN").val();
    var phoneint = parseInt(phone);

/*
    if (phone.length == 10 || phone.startsWith("073") && !isNaN(phone)) {
        console.log("Valid");

        // do more here ---------------------------------------------------------


        //------------------------------------------------------
*/
        $.mobile.changePage("#pgMain");

/*
    } else {
        console.log("Invalid");
        navigator.notification.alert("Your mobile number is not valid", function () {
        }, "Invalid Mobile Number", "OK")
    }
*/


})

$("#btnOpenRegister").on("click", function () {
    $.mobile.changePage("#pgRegister");
});