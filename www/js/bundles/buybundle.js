var buyBundleURI = "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/purchase/mobileapp";
var buyBundleFromTelecashURI = "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/telecash/cashOut/mobileapp";

$("#btnPurchaseBundleFromTelecash").on("click", function () {

        if (!internetConnectionYN()) {//first check if user has internet
            showInternetError();
        } else {
            var product = $("#divBundleOptions :selected").val();
            var selfOrOther = $("#divBuyForOtherControlGroup :checked").val();
            var othermobile = $("#txtBundleForNumber").val();
            var amount = getProductAmount(product);
            var amountWithoutCharge = getAmountWithoutCharge(amount);

            navigator.notification.prompt("Please enter your 4 digit TeleCash PIN", function (result) {
                if (result.buttonIndex === 1) {//0  is cancelled, 1 is proceed, 2 is second button if it was there e.t.c.
                    try {
                        if (isValidPINFromDialog(result.input1)) {
                            deductMoneyFromFromTelecash(amountWithoutCharge, Number(result.input1));
                            if (selfOrOther === 'other') {
                                var validDestinationMSISDN = validateMSISDN(othermobile);
                                if (validDestinationMSISDN !== "") {
                                    //buyBundleForOtherFromTelecash(validDestinationMSISDN, product, Number(result.input1));
                                }
                            } else {
                                //buyBundleForSelfFromTelecash(product, );
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
);

$("#btnPurchaseBundleFromCore").on("click", function () {
    if (!internetConnectionYN()) {//first check if user has internet
        showInternetError();
    } else {

        var regmobile = user.msisdn;
        var regpin = user.pin;
        var product = $("#divBundleOptions :selected").val();
        var selfOrOther = $("#divBuyForOtherControlGroup :checked").val();
        var othermobile = $("#txtBundleForNumber").val();

        //verify user info successfully retrieved
        if (regmobile && regpin) {
            //ensure product is selected
            if (product) {

                // prompt user for pin
                navigator.notification.prompt("Please enter your 4 digit PIN", function (result) {
                    if (result.buttonIndex === 1) {//0  is cancelled, 1 is proceed, 2 is second button if it was there e.t.c.
                        if (Number(result.input1) === Number(regpin)) //check first input prompted to the user is the valid registered PIN
                        {
                            try {
                                //execute ajax method
                                purchaseFromCoreAJAX(regmobile, product, selfOrOther, othermobile);
                            } catch (e) {
                                console.log(JSON.stringify(e));
                                navigator.notification.alert("Could not complete transaction. " + e.toString(), null, "Error", "OK");
                            }
                        } else {
                            navigator.notification.alert("You entered an incorrect pin.", null, "Authentication Error", "OK")
                        }
                    }
                }, "Authenticate Transaction", ["Proceed", "Cancel"]) //title, [array of buttons]

            } else {
                navigator.notification.alert("Please select a valid product", null, "Invalid Product", "OK")
            }

        } else {
            navigator.notification.alert("Only registered users can use this feature. Your number is not registered to use the mobile app!", null, "Fatal error", "OK")
        }
    }
});

function purchaseFromCoreAJAX(regmobile, product, selfOrOther, othernumber) {
    //check if buying for self or other
    if (selfOrOther === 'other') {
        var validDestinationMSISDN = validateMSISDN(othernumber); //return validated other number
        console.log(validDestinationMSISDN);
        if (validDestinationMSISDN === "") {
            console.log("Invalid MSISDN");
        } else {
            console.log("Valid MSISDN");
            //format uri with base url and arguments
            var buyForOtherURI = buyBundleURI + "/" + regmobile + "/" + validDestinationMSISDN + "/" + product;

            //access service
            showProgressBar();
            $.ajax({
                url: buyForOtherURI,
                type: "GET",
                timeout: 10000,
                dataType: "json",

                success: function (result) {
                    hideProgressBar();

                    var str = JSON.stringify(result);
                    var msg = JSON.parse(str);
                    console.log(msg.responseJSON);
                    console.log(buyForOtherURI);
                    if (msg.responseJSON !== undefined) {
                        navigator.notification.alert(msg.responseJSON.commercialDescription, null, "Success", "OK");
                    } else if (msg.commercialDescription !== undefined) {
                        navigator.notification.alert(msg.commercialDescription, null, "Success", "OK");
                    } else {
                        navigator.notification.alert("Could not tell if transaction was successful. Please contact Telecel call centre at 150 to verify if transaction was successful. Reason unknown." + errorHelpTextToAppend, null, "Result unknown", "OK");
                    }
                },
                failure: function (fail) {
                    hideProgressBar();

                    var str = JSON.stringify(fail);
                    var msg = JSON.parse(str);
                    console.log(msg.responseJSON);
                    if (msg.responseJSON !== undefined) {
                        navigator.notification.alert(msg.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Fail", "OK");
                    } else if (msg.commercialDescription !== undefined) {
                        navigator.notification.alert(msg.commercialDescription + errorHelpTextToAppend, null, "Fail", "OK");
                    } else if (fail.statusText !== undefined) {
                        navigator.notification.alert("Failed to execute operation. " + fail.statusText + " " + errorHelpTextToAppend, null, "Fail", "OK");
                    } else {
                        navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Fail", "OK");
                    }
                },
                error: function (error) {
                    hideProgressBar();

                    var str = JSON.stringify(error);
                    var msg = JSON.parse(str);
                    console.log(msg.responseJSON);
                    if (msg.responseJSON !== undefined) {
                        navigator.notification.alert(msg.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
                    } else if (msg.commercialDescription !== undefined) {
                        navigator.notification.alert(msg.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
                    } else if (error.statusText !== undefined) {
                        navigator.notification.alert("Failed to execute operation. " + error.statusText + " " + errorHelpTextToAppend, null, "Error", "OK");
                    } else {
                        navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Error", "OK");
                    }
                }
            });
        }
    }
    else {         //buy for self
        var buyForSelfURI = buyBundleURI + "/" + regmobile + "/" + product;

        $.ajax({
            url: buyForSelfURI,
            type: "GET",
            timeout: 10000,
            dataType: "json",

            success: function (result) {
                hideProgressBar();

                var str = JSON.stringify(result);
                var msg = JSON.parse(str);
                console.log(buyForOtherURI);
                console.log(msg.responseJSON);
                if (msg.responseJSON !== undefined) {
                    navigator.notification.alert(msg.responseJSON.commercialDescription, null, "Success", "OK");
                } else if (msg.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.commercialDescription, null, "Success", "OK");
                } else {
                    navigator.notification.alert("Could not tell if transaction was successful. Please contact Telecel call centre at 150 to verify if transaction was successful. Reason unknown." + errorHelpTextToAppend, null, "Result unknown", "OK");
                }
            },
            failure: function (fail) {
                hideProgressBar();

                var str = JSON.stringify(fail);
                var msg = JSON.parse(str);
                console.log(msg.responseJSON);
                if (msg.responseJSON !== undefined) {
                    navigator.notification.alert(msg.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Fail", "OK");
                } else if (msg.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.commercialDescription + errorHelpTextToAppend, null, "Fail", "OK");
                } else if (fail.statusText !== undefined) {
                    navigator.notification.alert("Failed to execute operation. " + fail.statusText + " " + errorHelpTextToAppend, null, "Fail", "OK");
                } else {
                    navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Fail", "OK");
                }
            },
            error: function (error) {
                hideProgressBar();

                var str = JSON.stringify(error);
                var msg = JSON.parse(str);
                console.log(msg.responseJSON);
                if (msg.responseJSON !== undefined) {
                    navigator.notification.alert(msg.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
                } else if (msg.commercialDescription !== undefined) {
                    navigator.notification.alert(msg.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
                } else if (error.statusText !== undefined) {
                    navigator.notification.alert("Failed to execute operation. " + error.statusText + " " + errorHelpTextToAppend, null, "Error", "OK");
                } else {
                    navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Error", "OK");
                }
            }
        });
    }
}


//function to buy for self from TeleCash
function deductMoneyFromFromTelecash(amount, TelecashPIN) {
    var URI = buyBundleFromTelecashURI + "/" + user.msisdn + "/" + amount + "/" + TelecashPIN + "/" + TelecelAgentCode;
    showProgressBar();
    $.ajax({
            url: URI,
            type: "GET",
            dataType: "json",
            success: function (result) {
                hideProgressBar();
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

function getProductAmount(productName, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === productName) {
            return array[i].amount;
        }
    }
}

function getAmountWithoutCharge(amount) {
    
}
