function recoverAppPin() {
    navigator.notification.confirm("Are you sure you want to send Mobile App PIN to your registered email?",
        function (choice) {
        if(choice==1){
            if(user.email && isValidEmail(user.email))
            {
                showProgressBar()
                sendEMail( user.email, "Mobile App Pin Recovery", "Mobile App Pin for MSISDN "+user.msisdn+" is : "+user.pin,true);
                hideProgressBar()
            }else{
                navigator.notification.alert("Your registration email is invalid!\n You can correct it by re-registration",null,"ERROR sending email","OK")
            }
        }

        },"Confirm PIN Recovery",["Yes","No"]);
}