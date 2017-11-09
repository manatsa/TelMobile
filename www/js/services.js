document.addEventListener("deviceready", function onDeviceReady() {
    $(document).delegate("#pgServices", "pageshow", function () {
        function getRoamingStatusAndUpdate() {
            navigator.notification.alert("Roaming status unknown. To implement checking for status.", function () {
            }, "Roaming status", "OK");
        }

        getRoamingStatusAndUpdate();
    });
}, false);

$("#chkToggleRoaming").on("change", function () {
    var msisdn = "";
    try {
        NativeStorage.getItem("user", function (user) {
            msisdn = user.msisdn;
            toggleRoaming(msisdn);
        }, function () {
            navigator.notification.alert("Failed to get your mobile number. Please register again for the app.", function () {
            }, "Something wrong", "OK");
        });
    } catch (e) {
        navigator.notification.alert("Failed to get your mobile number. Please restart the app.", function () {
        }, "Something wrong", "OK");
    }
});

function toggleRoaming(msisdn) {
    var roamingActivateURI = "http://10.10.4.158:8080/TelecelBundleRestService/rest/activateRoaming/mobileapp/";
    var roamingDeactivateURI = "http://10.10.4.158:8080/TelecelBundleRestService/rest/deActivateRoaming/mobileapp/";

    if ($("#chkToggleRoaming").prop("checked")) {
        //when roaming is on
        roamingActivateURI += msisdn;

        $.ajax({
            url: roamingActivateURI,
            type: "GET",
            dataType: "json",

            success: function (result) {
                var data = JSON.parse(JSON.stringify(result));
                var msg = data.commercialDescription;
                navigator.notification.alert(msg, function () {
                }, "Roaming status", "OK");
            },
            failure: function (fail) {
                navigator.notification.alert(fail, function () {
                }, "Failure", "OK");
                console.log(fail.responseText);
            },
            error: function (error) {
                var err = JSON.parse(JSON.stringify(error))
                navigator.notification.alert(err.statusText, function () {
                }, "Error", "OK");
                console.log(err.statusText);
            }
        });
    } else {
        //when roaming is off
        roamingDeactivateURI += msisdn;

        $.ajax({
            url: roamingDeactivateURI,
            type: "GET",
            dataType: "json",

            success: function (result) {
                var data = JSON.parse(JSON.stringify(result));
                var msg = data.commercialDescription;
                navigator.notification.alert(msg, function () {
                }, "Roaming status", "OK");
            },
            failure: function (fail) {
                navigator.notification.alert(fail, function () {
                }, "Failure", "OK");
                console.log(fail.responseText);
            },
            error: function (error) {
                var err = JSON.parse(JSON.stringify(error))
                navigator.notification.alert(err.statusText, function () {
                }, "Error", "OK");
                console.log(err.statusText);
            }
        });
    }

}