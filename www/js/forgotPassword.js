function sendPasswordViaEmail() {
    NativeStorage.getItem("user",function (user) {
        cordova.plugins.email.open({
            to:      user.email,
            cc:      '',
            bcc:     [],
            subject: 'Password Recovery For MSISDN :'+user.msisdn,
            body:    'Good day.\n\nTelecel Mobile App Password is :'+user.pin
        });
    },function (error) {

    })

}


$("#email_confirm_dialog").on("click",function () {
    navigator.notification.confirm(
        "Are you sure you want to send pin to email?",
        function (choice) {
            alert(choice)

        },
        "Confirm Sending Email",
        ["No","Yes"]
    )
})