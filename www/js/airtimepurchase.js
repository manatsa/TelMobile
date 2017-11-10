$("#pgAirtimePurchase").on("pageinit", function () {
    $("#divAirtimeForNumber").hide();
});

$("#rdrAirtimeForOther").click(function () {
    $("#divAirtimeForNumber").show();
    $("#btnAirtimeFromCore").addClass("btn-airtime-purchase-left");
    $("#btnAirtimeFromCore").show();
    $("#btnAirtimeFromTelecash").addClass("btn-airtime-purchase-right");
});

$("#rdrAirtimeForSelf").click(function () {
    $("#divAirtimeForNumber").hide()
    $("#btnAirtimeFromCore").removeClass("btn-airtime-purchase-left");
    $("#btnAirtimeFromCore").hide();
    $("#btnAirtimeFromTelecash").removeClass("btn-airtime-purchase-right");
});

$("#btnAirtimeFromCore").click(function () {
    var amount = $("#txtAirtimeAmount").val();
    var destinationMSISDN = $("#txtAirtimeForNumber").val();
    var validDestinationMSISDN = validateMSISDN(destinationMSISDN);
    if (validDestinationMSISDN === "") {
    } else if (isValidAmount(amount)) {
        buyForOtherFromCore(validDestinationMSISDN, amount);
    }
});

$("#btnAirtimeFromTelecash").click(function () {
    if ($("#rdrAirtimeForSelf").prop("checked")) {
        buyForSelfFromTelecash();
    } else if ($("#rdrAirtimeForOther").prop("checked")) {
        buyForOtherFromTelecash();
    }
});

function isValidAmount(amount) {
    if (amount === "") {
        navigator.notification.alert("Please enter an amount.", function () {
        }, "Fill all fields", "OK");
        return false;
    } else if (isNaN(amount)) {
        navigator.notification.alert("Please enter a valid amount.", function () {
        }, "Fill all fields", "OK");
        return false;
    } else if (amount <= 0) {
        navigator.notification.alert("You can only transfer an amount greater than $0.", function () {
        }, "Fill all fields", "OK");
    } else {
        return true;
    }
}

function buyForOtherFromCore(destinationMSISDN, amount) {
    $("#custom-spinner").css("display","block");
    var buyForOtherFromCoreURI = "http://10.10.4.158:8080/TelecelBundleRestService/rest/transferAirtime/mobileapp/" + user.msisdn + "/" + destinationMSISDN + "/" + amount;
    console.log(buyForOtherFromCoreURI);

    $.ajax({
        url: buyForOtherFromCoreURI,
        type: "GET",
        dataType: "json",

        success: function (result) {
            var data = JSON.parse(JSON.stringify(result));
            var msg = data.commercialDescription;
            navigator.notification.alert(msg, function () {
            }, "Roaming status", "OK");
            $("#custom-spinner").css("display","none");
        },
        failure: function (fail) {
            navigator.notification.alert(fail, function () {
            }, "Failure", "OK");
            console.log(fail.responseText);
            $("#custom-spinner").css("display","none");
        },
        error: function (error) {
            var str = JSON.stringify(error);
            var msg = JSON.parse(str);
            console.log(msg.responseJSON);
            navigator.notification.alert(msg.responseJSON.description, null, "Error", "OK")
            $("#custom-spinner").css("display","none");
        }
    });

}

function buyForSelfFromTelecash() {
    alert("Buying for self from Telecash. Code to be implemented");
}

function buyForOtherFromTelecash() {
    alert("Buying for other from Telecash. Code to be implemented");
}