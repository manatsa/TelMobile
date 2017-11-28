var airtimePurchaseFromTelecashURI = 'http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/telecash/topUp/mobileapp/';
var buyForOtherFromCoreURI = "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/transferAirtime/mobileapp/";
var packageType = "VOICE";//for purchasing from Telecash

//hide buy for number section
$("#pgAirtimePurchase").on("pageinit", function () {
    $("#divAirtimeForNumber").hide();
});

//show buy for other section
$("#rdrAirtimeForOther").click(function () {
    $("#divAirtimeForNumber").show();
    $("#btnAirtimeFromCore").addClass("btn-airtime-purchase-left");
    $("#btnAirtimeFromCore").show();
    $("#btnAirtimeFromTelecash").addClass("btn-airtime-purchase-right");
});

//hide buy for number section and change options
$("#rdrAirtimeForSelf").click(function () {
    $("#divAirtimeForNumber").hide()
    $("#btnAirtimeFromCore").removeClass("btn-airtime-purchase-left");
    $("#btnAirtimeFromCore").hide();
    $("#btnAirtimeFromTelecash").removeClass("btn-airtime-purchase-right");
});

//buy airtime for other from core click function
$("#btnAirtimeFromCore").click(function () {
    if (!internetConnectionYN()) {//first check if user has internet
        showInternetError();
    } else {

        var amount = $("#txtAirtimeAmount").val();
        var destinationMSISDN = $("#txtAirtimeForNumber").val();
        var validDestinationMSISDN = validateMSISDN(destinationMSISDN);
        if (validDestinationMSISDN === "") {
        } else if (isValidAmount(amount)) {
            buyForOtherFromCore(validDestinationMSISDN, amount);
        }
    }
});

//buy airtime from telecash: 2 scenarios
$("#btnAirtimeFromTelecash").click(function () {
    if (!internetConnectionYN()) {//first check if user has internet
        showInternetError();
    } else {
        var amount = $("#txtAirtimeAmount").val();
        if (isValidAmount(amount)) {

            navigator.notification.prompt("Please enter your 4 digit TeleCash PIN", function (result) {
                if (result.buttonIndex === 1) {//0  is cancelled, 1 is proceed, 2 is second button if it was there e.t.c.
                    try {
                        if (isValidPINFromDialog(result.input1)) {
                            if ($("#rdrAirtimeForSelf").prop("checked")) {
                                buyForSelfFromTelecash(amount, Number(result.input1));
                            } else if ($("#rdrAirtimeForOther").prop("checked")) {
                                var destinationMSISDN = $("#txtAirtimeForNumber").val();
                                var validDestinationMSISDN = validateMSISDN(destinationMSISDN);
                                if (validDestinationMSISDN === "") {
                                } else if (isValidAmount(amount)) {
                                    buyAirtimeForOtherFromTelecash(validDestinationMSISDN, amount, Number(result.input1));
                                }
                            }
                        }
                    } catch (e) {
                        console.log(JSON.stringify(e));
                        navigator.notification.alert("Could not get TeleCash PIN. Please re-enter." + e.toString(), null, "Error", "OK");
                    }
                }
            }, "Telecash PIN", ["Proceed", "Cancel"]) //title, [array of buttons]
        }
    }
});

//function to buy for other from core
function buyForOtherFromCore(destinationMSISDN, amount) {
    var URI = buyForOtherFromCoreURI + user.msisdn + "/" + destinationMSISDN + "/" + amount;
    console.log(buyForOtherFromCoreURI);
    buyAirtimeFromWalletAJAX(URI);
}

//function to buy for self from TeleCash
function buyForSelfFromTelecash(amount, TelecashPIN) {
    var URI = airtimePurchaseFromTelecashURI + user.msisdn + "/" + user.msisdn + "/" + amount + "/" + TelecashPIN + "/" + packageType;
    console.log(buyForOtherFromCoreURI);
    buyAirtimeFromTelecashAJAX(URI);
}


//function to buy for self from TeleCash
function buyAirtimeForOtherFromTelecash(destinationMSISDN, amount, TelecashPIN) {
    var URI = airtimePurchaseFromTelecashURI + user.msisdn + "/" + destinationMSISDN + "/" + amount + "/" + TelecashPIN + "/" + packageType;
    console.log(buyForOtherFromCoreURI);
    buyAirtimeFromTelecashAJAX(URI);
}

function buyAirtimeFromWalletAJAX(URI) {
    showProgressBar();
    $.ajax({
            url: URI,
            type: "GET",
            dataType: "json",
            success: function (result) {
                hideProgressBar();
                $("#txtAirtimeAmount").val('');
                $("#txtAirtimeForNumber").val('');
                var msg = JSON.parse(JSON.stringify(result));
                if (msg !== undefined && msg.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.commercialDescription, null, "Success", "OK");
                } else {
                    navigator.notification.alert("Could not tell if operation was successful. Reason unknown. Please contact Telecel call centre at 150 to verify if operation was successful. " + errorHelpTextToAppend, null, "Result unknown", "OK");
                }
            },
            failure: function (fail) {
                hideProgressBar();
                if (msg.responseJSON !== undefined && msg.responseJSON.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Fail", "OK");
                } else if (msg.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.commercialDescription + errorHelpTextToAppend, null, "Fail", "OK");
                } else if (fail.statusText !== undefined) {
                    navigator.notification.alert("Failed to execute operation. " + fail.statusText + " " + errorHelpTextToAppend, null, "Fail", "OK");
                } else {
                    navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Fail", "OK");
                }
                console.log(fail.responseText);
            },
            error: function (error) {
                hideProgressBar();
                var str = JSON.stringify(error);
                var msg = JSON.parse(str);
                console.log(msg.responseJSON);
                if (msg.responseJSON !== undefined && msg.responseJSON.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
                } else if (msg.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
                } else if (error.statusText !== undefined) {
                    navigator.notification.alert("Failed to execute operation. " + error.statusText + " " + errorHelpTextToAppend, null, "Error", "OK");
                } else {
                    navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Error", "OK");
                }
            }
        }
    );

}

function buyAirtimeFromTelecashAJAX(URI) {
    showProgressBar();
    $.ajax({
            url: URI,
            type: "GET",
            dataType: "json",
            success: function (result) {
                hideProgressBar();
                $("#txtAirtimeAmount").val('');
                $("#txtAirtimeForNumber").val('');
                var msg = JSON.parse(JSON.stringify(result));
                console.log(msg);
                if (msg !== undefined && msg.Remark !== undefined && msg.Remark !== null) {
                    navigator.notification.alert(msg.Remark, null, "Result", "OK");
                } else if (msg.OpsTransactionId !== undefined) {
                    navigator.notification.alert("Transaction being processed. Please await an SMS notification message that will arrive shortly. Contact call center at 150 if no message is received.", null, "Processing", "OK");
                } else {
                    navigator.notification.alert("Could not tell if operation was successful. Reason unknown. Please contact Telecel call centre at 150 to verify if operation was successful. " + errorHelpTextToAppend, null, "Result unknown", "OK");
                }
            },
            failure: function (fail) {
                hideProgressBar();
                if (fail !== undefined && fail.responseText !== undefined) {
                    navigator.notification.alert(fail.responseText + errorHelpTextToAppend, null, "Fail", "OK");
                } else {
                    navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Fail", "OK");
                }
                console.log(fail.responseText);
            },
            error: function (error) {
                console.log(error);
                hideProgressBar();
                if (error !== undefined && error.responseText !== undefined) {
                    navigator.notification.alert(fail.responseText + errorHelpTextToAppend, null, "Error", "OK");
                } else {
                    navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Error", "OK");
                }
            }
        }
    );

}