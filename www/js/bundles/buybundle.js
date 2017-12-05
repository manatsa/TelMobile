var buyBundleURI = "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/purchase/mobileapp";
var buyBundleFromTelecashURI = "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/telecash/buyBundlesTelecash/mobileapp";

$("#btnPurchaseBundleFromTelecash").on("click", function () {

        if (!internetConnectionYN()) {//first check if user has internet
            showInternetError();
        } else {
            var productName = $("#divBundleOptions :selected").val();
            var selfOrOther = $("#divBuyForOtherControlGroup :checked").val();
            var othermobile = $("#txtBundleForNumber").val();

            navigator.notification.prompt("Please enter your 4 digit TeleCash PIN", function (result) {
                if (result.buttonIndex === 1) {//0  is cancelled, 1 is proceed, 2 is second button if it was there e.t.c.
                    try {
                        if (isValidPINFromDialog(result.input1)) {
                            var PIN = result.input1;
                            if (selfOrOther === 'other') {
                                var validDestinationMSISDN = validateMSISDN(othermobile);
                                if (validDestinationMSISDN !== "") {
                                    purchaseFromTelecashAJAX(user.msisdn, validDestinationMSISDN, productName, PIN);
                                }
                            } else {
                                purchaseFromTelecashAJAX(user.msisdn, user.msisdn, productName, PIN);
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




function purchaseFromTelecashAJAX(sourceMSISDN, destinationMSISDN, productName, PIN) {

    var url = buyBundleFromTelecashURI + "/" + sourceMSISDN + "/" + destinationMSISDN + "/1/" + productName + "/" + PIN;//has amount which will be removed from parameters

    //access service
    showProgressBar();
    $.ajax({
        url: url,
        type: "GET",
        timeout: 10000,
        dataType: "json",

        success: function (result) {
            hideProgressBar();

            var str = JSON.stringify(result);
            var msg = JSON.parse(str);
            console.log(msg.responseJSON);
            console.log(url);
            if (msg.responseJSON !== undefined) {
                navigator.notification.alert(msg.responseJSON.description, null, "Buy bundle", "OK");
            } else if (msg.commercialDescription !== undefined) {
                navigator.notification.alert(msg.description, null, "Buy bundle", "OK");
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



$("#btnPurchaseBundleFromCore").on("click", function () {
    if (!internetConnectionYN()) {//first check if user has internet
        showInternetError();
    } else {

        var regmobile = user.msisdn;
        var product = $("#divBundleOptions :selected").val();
        var selfOrOther = $("#divBuyForOtherControlGroup :checked").val();
        var othermobile = $("#txtBundleForNumber").val();

        //verify user info successfully retrieved
        if (regmobile) {
            //ensure product is selected
            if (product) {

                // prompt user for pin
                navigator.notification.confirm("Are you sure you want to proceed to buy "+product+" for "+((selfOrOther=='self')?regmobile:othermobile)+" using your airtime.",function (result) {

                    if (result === 1) {//0  is cancelled, 1 is proceed, 2 is second button if it was there e.t.c.
                        try {
                            //execute ajax method
                            purchaseFromCoreAJAX(regmobile, product, selfOrOther, othermobile);
                        } catch (e) {
                            console.log(JSON.stringify(e));
                            navigator.notification.alert("Could not complete transaction. " + e.toString(), null, "Error", "OK");
                        }

                    }
                },"Confirm Purchase",["Yes","Cancel"]);



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
    showProgressBar();
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


