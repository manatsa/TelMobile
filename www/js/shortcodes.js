document.addEventListener("deviceready", function () {
    var permissions = cordova.plugins.permissions;
    permissions.hasPermission(permissions.SEND_SMS, function (status) {
        if (!(status.hasPermission)) {
            permissions.requestPermission(permissions.SEND_SMS, function () {

            }, function () {
                alert("Could not get permission to send SMS.");
            });
        }
    });
}, false);

//global variables
var uri = "../www/json/shortcodes.json";
var inputUniqueIndex = 0;

//get shortcodeQuestions from JSON
function getShortcodesList() {

    $.ajax({
        url: uri,
        type: "GET",
        dataType: "json",

        success: function (result) {
            var indexForUniqueShortcodeId = 0;
            $.each(result, function (shortcodeCategoryName, shortcodeCategories) {
                var shortcodeHtml = "";
                shortcodeCategories = JSON.parse(JSON.stringify(shortcodeCategories));
                switch (shortcodeCategoryName) {
                    case "USSD":
                        shortcodeHtml += "<form class='ui-filterable'> <input id='txtSearchUSSD' placeholder='Find USSD shortcode...' data-type='search'> </form>";
                        shortcodeHtml += "<ul data-input='#txtSearchUSSD' data-filter='true' data-inset='true' id='ulUSSD' data-role='listview' data-theme='b'>";
                        break;
                    case "Call":
                        shortcodeHtml += "<form class='ui-filterable'> <input id='txtSearchCall' placeholder='Find Call shortcode...' data-type='search'> </form>";
                        shortcodeHtml += "<ul data-input='#txtSearchCall' data-filter='true'  data-inset='true' id='ulCall' data-role='listview' data-theme='b'>";
                        break;
                    case "SMS":
                        shortcodeHtml += "<form class='ui-filterable'> <input id='txtSearchSMS' placeholder='Find SMS shortcode...' data-type='search'> </form>";
                        shortcodeHtml += "<ul data-input='#txtSearchSMS' data-filter='true' id='ulSMS' data-inset='true' data-role='listview' data-theme='b'>";
                        break;
                }
                $.each(shortcodeCategories, function (i, shortcodeItem) {
                    indexForUniqueShortcodeId++;
                    var uniqueShortcodeId = "ppShortcode" + indexForUniqueShortcodeId.toString();
                    shortcodeHtml += "<li data-icon='false'><a ";
                    if (shortcodeCategoryName === "USSD") {
                        if (shortcodeItem.params !== "" && shortcodeItem.params !== undefined) {
                            shortcodeHtml += "data-rel='popup' data-position-to='window' data-transition='pop' href='#" + uniqueShortcodeId + "'";
                            $("#divShortCodePopups").append(addShortCodePopupDiv(uniqueShortcodeId, shortcodeItem.title, shortcodeItem.dialCode, shortcodeItem.params));
                        } else {
                            shortcodeHtml += " onclick='callNumber(&quot;" + shortcodeItem.dialCode + "&quot;)'";
                        }
                    } else if (shortcodeCategoryName === "Call") {
                        shortcodeHtml += " onclick='callNumber(&quot;" + shortcodeItem.dialCode + "&quot;)'";
                    } else if (shortcodeCategoryName === "SMS") {
                        $("#divSMSPopups").append(addSMSDiv(uniqueShortcodeId, shortcodeItem.title, shortcodeItem.dialCode));
                        shortcodeHtml += "data-rel='popup' data-position-to='window' data-transition='pop' href='#" + uniqueShortcodeId + "'";
                    }
                    shortcodeHtml += ">" + shortcodeItem.title + "<span class='ui-li-count'>" + shortcodeItem.dialCode + "</span></a></li>";
                });
                shortcodeHtml += "</ul>";
                switch (shortcodeCategoryName) {
                    case "USSD":
                        $("#divUSSDShortcodes").append(shortcodeHtml);
                        break;
                    case "Call":
                        $("#divCallShortcodes").append(shortcodeHtml);
                        break;
                    case "SMS":
                        $("#divSMSShortcodes").append(shortcodeHtml);
                        break;
                }
            });
        },
        failure: function (fail) {
            console.log(fail.responseText);
            alert("FAILURE :" + fail)
        },
        error: function (error) {
            console.log(error.responseText)
            alert("ERROR :\n" + error.responseText)
        }
    });
}

function smsNumber(textAreaWithMsg, sendTo) {
    var txtMsg = $("#" + textAreaWithMsg).val().trim();
    if (sendTo.indexOf(";") >= 0) {
        sendTo = sendTo.split(";");
        for (var i in sendTo) {
            sendTo[i] = sendTo[i].trim();
        }
    }
    if (SMS) SMS.sendSMS(sendTo, txtMsg,
        function alertMessageSent() {
            alert("Your message has been sent! Please await your response.");
            $('.ui-popup').popup('close');
        }, function (str) {
            alert("Your message could not be sent. Please try again later.");
        }
    );
}

function addSMSDiv(popupDivId, title, dialCode) {
    var popupDivHtml = "";
    popupDivHtml += "<div data-role='popup' id='" + popupDivId + "' data-theme='a' class='ui-corner-all'> <div style='padding:10px 20px;'><h3>" + title + "</h3>";
    inputUniqueIndex++;
    var inputIDUnique = "txtDialWithParam" + inputUniqueIndex.toString();
    popupDivHtml += "<textarea rows='5' type='text' id='" + inputIDUnique + "' value='' placeholder='Text to send' data-theme='a'></textarea>";
    popupDivHtml += "<button type='button' onclick='smsNumber(&quot;" + inputIDUnique + " &quot;, &quot;" + dialCode + "&quot;)' class='ui-btn ui-corner-all ui-shadow'> <i class='fa fa-envelope' aria-hidden='true'></i>&nbsp;Send</button>";
    popupDivHtml += "</div>";
    return popupDivHtml;
}

function addShortCodePopupDiv(popupDivId, title, dialCode, params) {
    var popupDivHtml = "";
    var paramsArray = params.split(",");
    var strInputsEntered = "";
    popupDivHtml += "<div data-role='popup' id='" + popupDivId + "' data-theme='a' class='ui-corner-all'> <div style='padding:10px 20px;'><h3>" + title + "</h3>";
    $.each(paramsArray, function (index, paramsItem) {
        inputUniqueIndex++;
        var inputIDUnique = "txtDialWithParam" + inputUniqueIndex.toString();
        popupDivHtml += "<input type='text' id='" + inputIDUnique + "' value='' placeholder='" + paramsItem + "' data-theme='a'>";
        strInputsEntered += inputIDUnique + ",";
    });
    popupDivHtml += "<button type='button' onclick='getEnteredParamsAndDial(&quot;" + strInputsEntered + "&quot;, &quot;" + dialCode + "&quot;, &quot;" + params + "&quot;)' class='ui-btn ui-corner-all ui-shadow'> <i class='fa fa-phone' aria-hidden='true'></i>&nbsp;Dial</button>";
    popupDivHtml += "</div>";
    return popupDivHtml;
}

function getEnteredParamsAndDial(strInputsEntered, dialCode) {
    var dialParts = dialCode.split('...');
    var numberToCallWithParams = "";
    var strInputsEnteredArray = strInputsEntered.split(',');
    for (var i = 0; i < dialParts.length; i++) {
        numberToCallWithParams += dialParts[i];
        if (i !== (dialParts.length - 1)) {
            if ($("#" + strInputsEnteredArray[i].toString()).trim().val() === "") {
                alert("Please enter all values!");
                return;
            } else {
                numberToCallWithParams += $("#" + strInputsEnteredArray[i].toString()).trim().val();
            }
        }
    }
    //clear textboxs
    for (i = 0; i < strInputsEnteredArray.length; i++) {
        $("#" + strInputsEnteredArray[i].toString()).val("");
    }
    callNumber(numberToCallWithParams);
}

$("#pgServiceShortcodes").on("pageshow", getShortcodesList());