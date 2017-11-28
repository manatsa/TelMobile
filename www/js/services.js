var roamingActivateURI = "http://10.10.4.158:8080/TelecelBundleRestService/rest/activateRoaming/mobileapp/";
var roamingDeactivateURI = "http://10.10.4.158:8080/TelecelBundleRestService/rest/deActivateRoaming/mobileapp/";

$("#btnRoamingOn").on("click", function () {
    if (!internetConnectionYN()) {//first check if user has internet
        showInternetError();
    } else {
        var URI = roamingActivateURI + user.msisdn;
        changeRoamingStatus(URI);
    }
});

$("#btnRoamingOff").on("click", function () {
    if (!internetConnectionYN()) {//first check if user has internet
        showInternetError();
    } else {
        var URI = roamingDeactivateURI + user.msisdn;
        changeRoamingStatus(URI);
    }
});

function changeRoamingStatus(URI) {
    showProgressBar();
    $.ajax({
        url: URI,
        type: "GET",
        dataType: "json",
        success: function (result) {
            hideProgressBar();
            var msg = JSON.parse(JSON.stringify(result));
            if (msg !== undefined && msg.commercialDescription !== undefined) {
                navigator.notification.alert(msg.commercialDescription, function () {
                }, "Roaming status", "OK");
            } else if (msg.commercialDescription !== undefined) {
                navigator.notification.alert(msg.commercialDescription, null, "Success", "OK");
            } else {
                navigator.notification.alert("Could not tell if operation was successful. Please contact Telecel call centre at 150 to verify if transaction was successful. Reason unknown." + errorHelpTextToAppend, null, "Result unknown", "OK");
            }
        },
        failure: function (fail) {
            hideProgressBar();
            console.log(fail);
            if (fail.responseJSON !== undefined) {
                navigator.notification.alert(fail.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
            } else if (fail.commercialDescription !== undefined) {
                navigator.notification.alert(fail.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
            } else if (error.statusText !== undefined) {
                navigator.notification.alert("Failed to execute operation. " + error.statusText + " " + errorHelpTextToAppend, null, "Error", "OK");
            } else {
                navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Error", "OK");
            }
        },
        error: function (error) {
            hideProgressBar();
            var err = JSON.parse(JSON.stringify(error));
            console.log(err);
            if (err.responseJSON !== undefined) {
                navigator.notification.alert(err.responseJSON.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
            } else if (err.commercialDescription !== undefined) {
                navigator.notification.alert(err.commercialDescription + errorHelpTextToAppend, null, "Error", "OK");
            } else if (error.statusText !== undefined) {
                navigator.notification.alert("Failed to execute operation. " + error.statusText + " " + errorHelpTextToAppend, null, "Error", "OK");
            } else {
                navigator.notification.alert("Failed to execute operation. Reason unknown." + errorHelpTextToAppend, null, "Error", "OK");
            }
        }
    });

}