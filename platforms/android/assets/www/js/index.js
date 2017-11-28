var shareMessage = "Share Message";
var map;
var markers = [];
var source;
var shop;
var latlon;
var directionsDisplay;
var directionsService;
var user;

var TelecelAgentCode = '12345';

//error text appended to error messages
var errorHelpTextToAppend = ".\n\nIf this response is not as expected, and the problem persists, please contact our call center at 150 for assistance.";

$(document).on("deviceready", function () {
    try {
        NativeStorage.getItem("user", function (data) {
                user = data;
                console.log("user set to data");
            },
            function (error) {
                $.mobile.changePage("#pgWelcome1", {transition: "none"});
                appendWelcomeDivsToBody();
            });

    } catch (e) {
        console.log(e);
        $.mobile.changePage("#pgWelcome1", {transition: "none"});
        appendWelcomeDivsToBody();
    }
});

function loading(showOrHide) {
    setTimeout(function () {
        $.mobile.loading(showOrHide);
    }, 1);
}

function onError(error) {
    navigator.notification.alert(
        error,
        function () {
        },
        "ERROR CALLING",
        "OK"
    )
}

function appendWelcomeDivsToBody() {
    $("body").append("" +
        "<div id='divCircles'> <span class='circle active'></span> <span class='circle'></span> <span class='circle'></span> <span class='circle'></span> <span class='circle'></span>" +
        "</div> "
        +
        "<div id='divBtnBeginContainer'> <a data-transition='flip' href='#pgInitialLogin' onclick='removeWelcomeStuff()' class='ui-btn ui-btn-c ui-corner-all' style='height: 1.5em; margin: 0 1em 1.5em 1em;'>Begin</a> " +
        "</div>");

}

$(document).on("backbutton", function (e, ui) {


    if ($.mobile.activePage.attr('id') === 'pgMain') {
        //e.preventDefault();
        navigator.notification.confirm("Are sure you want to exit the app?", confirmCallback, "Exit", ["Yes", "No"]);
    } else if ($.mobile.activePage.attr('id') === 'pgInitialLogin') {

    } else {
        $.mobile.back();
        hideProgressBar();
    }
});

function confirmCallback(choice) {
    if (choice == 1) {
        navigator.app.exitApp();
    }
}

function selectContact(id) {
    navigator.contacts.pickContact(function (contact) {
        var contact = JSON.parse(JSON.stringify(contact));
        var msisdn = contact.phoneNumbers[0].value;
        msisdn = msisdn.replace(/ /g, "");
        $("#" + id).val(msisdn)
    }, function (err) {
        console.log('Error: ' + err);
        navigator.notification.alert("Could not get contact number.", function () {
        }, "Contact pick failure", "OK")
    });
}

function validateMSISDN(msisdn) {
    var validMsisdn;
    validMsisdn = msisdn.trim();
    validMsisdn = validMsisdn.replace(/ /g, "");

    if (msisdn) {
        switch (true) {
            case msisdn.startsWith("26373"):
                validMsisdn = msisdn.substring(3);
                break;
            case msisdn.startsWith("+26373"):
                validMsisdn = msisdn.substring(4);
                break;
            case msisdn.startsWith("0026373"):
                validMsisdn = msisdn.substring(5);
                break;
            case msisdn.startsWith("073"):
                validMsisdn = msisdn.substring(1);
                break;
            case msisdn.startsWith("73"):
                validMsisdn = msisdn;
                break;
            default:
                navigator.notification.alert("Please enter a valid Telecel number.", function () {
                }, "Invalid mobile number", "OK");
                return "";
        }
    } else {
        navigator.notification.alert("Please enter a mobile number.", function () {
        }, "No mobile entered", "OK")
    }

    if (validMsisdn.length === 9) {
        return validMsisdn;
    } else {
        navigator.notification.alert("Please enter a valid Telecel number.", function () {
        }, "Invalid mobile number", "OK");
        return "";
    }

}

function callNumber(number) {
    window.plugins.CallNumber.callNumber(function () {
    }, onError, number, true);
}

function callTelecel() {
    window.plugins.CallNumber.callNumber(function () {
    }, onError, "150", true);
}

//Add footer to each page
$(".with-footer").append(
    '<footer data-role="footer" data-position="fixed" class="ui-bar footer-margins initcap"> <div class="ui-grid-c"> <div class="ui-block-a" style="text-align: left;"> <a href="http://www.telecel.co.zw" class="no-underline" data-transition="turn"><i class="fa fa-globe icon-font-size-med" aria-hidden="true"></i> Website</a> </div> <div class="ui-block-b" style="text-align: center;"> <a class="btnShare" data-icon="share" class="no-underline"><i class="fa fa-share-alt icon-font-size-med" aria-hidden="true"></i> Share</a> </div> <div class="ui-block-c" style="text-align: right;"> <a href="#tcsDialog" data-rel="dialog" data-transition="flip" class="no-underline"><i class="fa fa-file icon-font-size-med" aria-hidden="true"></i> T&Cs</a> </div> <div class="ui-block-d" style="text-align: right;"> <a data-transition="flip" class="no-underline btnCallTelecel"><i class="fa fa-phone icon-font-size-med" aria-hidden="true"></i> Call Us</a> </div> </div> </footer>').trigger("pagecreate");
$(".btnCallTelecel").on("click", callTelecel);

$('.btnTerms').click(function () {
    $("#dlgTermsAndConditions").dialog("open");
});

//social sharing
$(".btnShare").click(function () {
    window.plugins.socialsharing.share(shareMessage);
});

function sendEMail(senderName, senderEmail, subject, message) {
    alert("Email not sent. To implement code for sending email!");//TODO: Send email code
    //this function to send an email
}

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function toTitleCase(str) {
    var strReturn = str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    strReturn = strReturn.replace(/Sms/, Function.prototype.call.bind(String.prototype.toUpperCase));
    strReturn = strReturn.replace(/Usd/, Function.prototype.call.bind(String.prototype.toUpperCase));
    return strReturn;
}

function showProgressBar() {
    $.blockUI({
        message: '<div class="spinner"></div>',
        css:{border : 'none', background : 'none'}
    });
}

function hideProgressBar() {
    $.unblockUI();
}

function internetConnectionYN() {
    var networkState = (navigator.connection.type).toString();
    return networkState !== "none";
}

function showInternetError() {
    navigator.notification.alert("This action requires an internet connection.\n\nPlease ensure your data is turned on or you are connected to WIFI. The Telecel Mobile App is zero rated!", null, "No internet connection detected", "OK");
}

function checkInternetAndGoToPage(pageLink) {
    if (!internetConnectionYN()) {
        showInternetError();
    } else {
        $.mobile.changePage(pageLink, {transition: 'flip'});
    }
}

function isValidAmount(amount) {
    if (amount === "") {
        navigator.notification.alert("Please enter an amount.", function () {
        }, "Fill all fields", "OK");
        return false;
    } else if (isNaN(amount)) {
        navigator.notification.alert("Please enter a valid amount.", function () {
        }, "Invalid amount", "OK");
        return false;
    } else if (amount <= 0) {
        navigator.notification.alert("You can only transfer an amount greater than $0.", function () {
        }, "Invalid amount", "OK");
    } else {
        return true;
    }
}

function isValidPINFromDialog(PIN) {
    if (PIN === "") {
        navigator.notification.alert("Please enter a PIN.", function () {
        }, "No PIN entered", "OK");
        return false;
    } else if (isNaN(PIN)) {
        navigator.notification.alert("Please enter a valid number only 4 digit PIN.", function () {
        }, "Invalid PIN", "OK");
        return false;
    } else if (PIN.length !== 4) {
        navigator.notification.alert("Please enter a valid length 4 digit PIN.", function () {
        }, "Invalid PIN", "OK");
        return false;
    } else {
        return true;
    }
}