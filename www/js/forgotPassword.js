
function sendMail(user)
{
    var link = "mailto:manatsachinyeruse@gmail.com"+
        "?cc="+
        "&subject=" + escape("Password Recovery For MSISDN :" + user.msisdn)+
        "&body=" + escape("Good day.\n\nTelecel Mobile App Password is :" + user.pin);
    window.location.href = link;
    $.mobile.loading("hide")
}

function sendPasswordViaEmail() {

    NativeStorage.getItem("user", function (user) {
        alert("now sending email")
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