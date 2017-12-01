$("#btnContactUsSend").on("click",
    function sendContactUsEmail() {
        var name = $("#txtContactUsName").val();
        var email = $("#txtContactUsEmail").val();
        var subject = $("#txtContactUsSubject").val();
        var message = $("#txtContactUsMessage").val();
        if (name === "") {
            navigator.notification.alert("Please enter your name.", function () {
            }, "Fill all fields", "OK")
        } else if (email === "") {
            navigator.notification.alert("Please your email.", function () {
            }, "Fill all fields", "OKs")
        } else if (subject === "") {
            navigator.notification.alert("Please enter a subject", function () {
            }, "Fill all fields", "OK")
        } else if (message === "") {
            navigator.notification.alert("Please enter your message.", function () {
            }, "Fill all fields", "OK")
        } else if (!isValidEmail(email)) {
            navigator.notification.alert("Your e-mail is not valid.", function () {
            }, "Invalid e-mail", "OK")
        } else {
            sendEMail(email, subject, message);
            $("#txtContactUsName").val("");
            $("#txtContactUsEmail").val("");
            $("#txtContactUsSubject").val("");
            $("#txtContactUsMessage").val("");

        }
    });
