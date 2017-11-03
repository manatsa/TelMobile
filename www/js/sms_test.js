
$("#btnSendSMS").on("click",function () {
    var msg = {
        phoneNumber:"0733680483",
        textMessage:"SMS from Cordova"
    };

sendSMS()

})


function sendSMS() {
    var sendto ="0733680483";
    var textmsg = "SMS from cordova from me";
    if(sendto.indexOf(";") >=0) {
        sendto = sendto.split(";");
        for(i in sendto) {
            sendto[i] = sendto[i].trim();
        }
    }
    if(SMS) SMS.sendSMS(sendto, textmsg, function () {
        alert("SMS Sent")
    },function (error) {
        alert("ERROR sending SMS"+error.responseText)
    });
}

