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