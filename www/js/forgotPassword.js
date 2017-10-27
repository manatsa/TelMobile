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
        navigator.notification.alert("Error:"+error.responseText,function () {},"ERROR GETTING DETAILS","OK")
    })

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