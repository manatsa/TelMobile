$("#btnLogin").on("click", function () {
    var phone = $("#txtMSISDN").val();
    var pin = $("#txtLoginPIN").val();

    if (phone.length == 10 || phone.startsWith("073")) {
        if(pin && pin.length==4){
            try{
                NativeStorage.getItem("user",function (data) {

                    if(phone==data.msisdn){
                        if(data.pin==data.pin){
                            $.mobile.changePage("#pgMain");
                        }else{
                            navigator.notification.alert("Your mobile app pin is incorrect!", function () {}, "Invalid pin", "OK")
                        }
                    }else{
                        navigator.notification.alert("Your mobile number is not recognised!", function () {}, "Unknown Mobile Number", "OK")
                    }

                }, function (error) {
                    throw new TypeError("Please make sure that you have registered and put correct details")
                });

            }catch(e){
                navigator.notification.alert("Error :"+e, function () {}, "Error Login In", "OK")
            }

        }else {
            console.log("Invalid");
            navigator.notification.alert("Your pin is invalid!", function () {}, "Invalid Pin", "OK")
        }


    } else {
        console.log("Invalid");
        navigator.notification.alert("Your mobile number is not valid", function () {}, "Invalid Mobile Number", "OK")
    }



})

$("#btnOpenRegister").on("click", function () {
    $.mobile.changePage("#pgRegister");
});