function sendPasswordViaEmail() {
$.mobile.loading("show")

    NativeStorage.getItem("user", function (user) {

        Email.send("manatsachinyeruse@gmail.com",
            "manatsachinyeruse@gmail.com",
            "Password Recovery For MSISDN :" + user.msisdn,
            "Good day.\n\nTelecel Mobile App Password is :" + user.pin,
            "smtp.google.com",
            "manatsachinyeruse@gmail.com",
            "Manat5achin5");
        $.mobile.loading("hide")
        navigator.notification.alert("Email Sent Successfully!", function () {}, "Pin Recovery", "OK")
    });

}


$("#email_confirm_btn").on("click",function () {

    navigator.notification.confirm(
        "Are you sure you want to send pin to email?",
        function (choice) {
            if(choice==1)
            {
                sendPasswordViaEmail();
            }

        },
        "Confirm Sending Email",
        ["Yes","No"]
    )
})