var desc = "";

$("#pgBundlesPurchase").on("pageinit", function () {
    $("#divBundleForNumber").hide();
    hideBundlePurchaseDivs();
})

$("#pgBundlesPurchase").on("pageshow", function (event) {

    $('#first-tab').click();
});

//

$("#divProductBundlePurchaseTabs").tabs({
    activate: function(event, ui) {

        $("#lblBundleDescription").addClass("hidden");
        $("#divBundleOptions").hide();
        $("#divBundleForNumber").hide()
        $("#divPurchaseFromChoice").hide()
        $("#divBuyForOtherControlGroup").hide()
        $("#divListOfValidCountries").hide()
    }
});

function showBuyForOther() {
    $("#divBuyForOtherControlGroup").show();
    $("#divPurchaseFromChoice").show();
}

function populateBundles(cbo) {
    $("#lblBundleDescription").removeClass("hidden");
    $("#lblBundleDescription").html(getBundleDescription($("#" + cbo).val().trim()));

    var productOption = $("#" + cbo).val();
    switch (productOption) {
        case "W":
            selectWhatsAppBundle();
            break;
        case "F":
            selectFacebookBundle();
            break;
        case "M":
            selectMegaBoostBundle();
            break;
        case "N":
            selectNightBundles();
            break;
        case "A":
            selectNightBundles();
            break;
        case "O":
            selectOnNetVoiceBundles();
            break;
        case "CN":
            selectCrossNetBundles();
            break;
        case "I":
            selectInternationalBundles();
            showInternationalCountries();
            break;
        case "D":
            selectDataBundles();
            break;
        case "S":
            selectSMSBundles();
            break;
        case "T":
            selectTelecelWifiBundle();
            break;
        default:
            $("#lblBundleDescription").addClass("hidden");
            navigator.notification.alert(
                "Please make a valid selection",
                function () {
                },
                "Invalid Option",
                "OK"
            )
            break;
    }

    $("#divBundleOptions").show();
    $('#cboBundleOptions').selectmenu('refresh');
}


function selectInternationalBundles() {
    var Options = ["USD 1.00 for 4mins", "USD 2.00 for 8mins", "USD 5.00 for 20mins", "USD 10.00 for 40mins", "USD 20.00 for 80mins"];
    var Values = ["INTERNATIONAL VOICE 4 MINS", "INTERNATIONAL VOICE 8 MINS", "INTERNATIONAL VOICE 20 MINS", "INTERNATIONAL VOICE 40 MINS", "INTERNATIONAL VOICE 80 MINS"];
    var text = "<option disabled selected>Select a voice bundle</option>";
    for (var i = 0; i < Options.length; i++) {
        text += "<option value='" + Values[i] + "' >" + Options[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function showInternationalCountries() {
    $("#divListOfValidCountries").removeClass("hidden");
    $("#divListOfValidCountries").addClass("shown");
}

function selectOnNetVoiceBundles() {
    var Options = ["USD 1.00 for n mins", "USD 2.00 for n mins", "USD 5.00 for n mins"];
    var Values = ["1.00", "2.00", "5.00"];
    var text = "<option disabled selected>Select a voice bundle</option>";
    for (var i = 0; i < Options.length; i++) {
        text += "<option value='" + Values[i] + "' >" + Options[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectCrossNetBundles() {
    var Options = ["USD 1.00 for 10mins", "USD 2.00 for 20mins", "USD 5.00 for 50mins (3 Days)", "USD 10.00 for 100mins (5 Days)"];
    var Values = ["10MIN CROSSNET VOICE BUNDLE", "20MIN CROSSNET VOICE BUNDLE", "50MIN CROSSNET VOICE BUNDLE", "100MIN CROSSNET VOICE BUNDLE"];
    var text = "<option disabled selected>Select a voice bundle</option>";
    for (var i = 0; i < Options.length; i++) {
        text += "<option value='" + Values[i] + "' >" + Options[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectDataBundles() {
    var Options = ["USD 0.50 for 4.8MB", "USD 1.00 for 300MB (24hrs)", "USD 1.00 for 9.5MB", "USD 2.00 for 1000MB (24hrs)", "USD 3.00 for 76MB", "USD 5.00 for 142.5", "USD 10.00 for 304MB", "USD 20.00 for 800MB", "USD 45.00 for 2000MB", "USD 75.00 for 4000MB"];
    var Values = ["DATA BUNDLE 50c", "DAY DATA USD1", "DATA BUNDLE USD1", "DAY DATA USD2", "DATA BUNDLE USD3", "DATA BUNDLE USD5", "DATA BUNDLE USD10", "DATA BUNDLE USD20", "DATA BUNDLE USD45", "DATA BUNDLE USD75"];
    var text = "<option disabled selected>Select a data bundle</option>";
    for (var i = 0; i < Options.length; i++) {
        text += "<option value='" + Values[i] + "' >" + Options[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectNightBundles() {
    var Options = ["USD 1.00 for 2 nights", "USD 2.00 for 7 nights", "USD 3.00 for 14 nights"];
    var Values = ["NIGHT DATA USD1", "NIGHT DATA USD2", "NIGHT DATA USD3"];
    var text = "<option disabled selected>Select a night bundle</option>";
    for (var i = 0; i < Options.length; i++) {
        text += "<option value='" + Values[i] + "' >" + Options[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectWhatsAppBundle() {
    var WhatsappOptions = ["USD 0.35 daily for 20MB", "USD 1.00 weekly for 180MB", "USD 2.85 monthly for 300MB"];
    var WhatsappValues = ["Whatsapp_Daily", "Weekly Whatsapp", "Monthly Whatsapp"];
    var text = "<option disabled selected>Select whatsapp bundle</option>";
    for (var i = 0; i < WhatsappOptions.length; i++) {
        text += "<option value='" + WhatsappValues[i] + "' >" + WhatsappOptions[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectFacebookBundle() {
    var WhatsappOptions = ["USD 0.35 daily for 20MB", "USD 1.00 weekly for 100MB", "USD 2.85 monthly for 200MB"];
    var WhatsappValues = ["FACEBOOK 5", "FACEBOOK 10", "FACEBOOK 15"];
    var text = "<option disabled selected>Select a facebook bundle</option>";
    for (var i = 0; i < WhatsappOptions.length; i++) {
        text += "<option value='" + WhatsappValues[i] + "' >" + WhatsappOptions[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}


function selectMegaBoostBundle() {
    var megaOptions = ["USD 0.50 daily for 24 Hrs", "USD 1.00 for 24 Hrs", "USD 2.00 for 48 Hrs", "USD 5.00 for 30 Days", "USD 10.00 for 30 days"];
    var megaValues = ["MEGA 50c", "MEGA 1", "MEGA 2", "MEGA 5", "MEGA 10"];
    var text = "<option disabled selected>Select a Megaboost bundle</option>";
    for (var i = 0; i < megaOptions.length; i++) {
        text += "<option value='" + megaValues[i] + "' >" + megaOptions[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectTelecelWifiBundle() {
    var wifiOptions = ["USD 1.00 for 1024 MB for 24 Hrs", "USD 2.00 for 250MB", "USD 5.00 for 700 MB", "USD 10.00 for 1500 MB", "USD 25.00 for 4500 MB", "USD 50.00 for 10240 MB"];
    var wifiValues = ["1.00", "2.00", "5.00", "10.00", "25.00", "50.00"];
    var text = "<option disabled selected>Select a wifi bundle</option>";
    for (var i = 0; i < wifiOptions.length; i++) {
        text += "<option value='" + wifiValues[i] + "' >" + wifiOptions[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectSMSBundles() {
    var options = ["USD 0.25 for 25 SMS", "USD 0.50 for 125 SMS", "USD 1.50 for 450 SMS", "USD 3.00 for 1000 SMS"];
    var values = ["SMS 25", "SMS 50", "SMS 150", "SMS 300"];
    var text = "<option disabled selected>Select an SMS bundle</option>";
    for (var i = 0; i < options.length; i++) {
        text += "<option value='" + values[i] + "' >" + options[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

$("#rdrOptionOther").click(function () {
    $("#divBundleForNumber").show()

});

$("#rdrOptionSelf").click(function () {
    $("#divBundleForNumber").hide()

});


function getBundleDescription(selected) {
    switch (selected) {
        case "I":
            desc = "Telecel offers on international voice bundles that allow you call any international number affordably.  All you need to do is juice up and dial *---# to buy a bundle of you choice.<a href=\"http://telecel.co.zw/products-services/telecelgo/go\" data-rel=\"popup\" data-position-to=\"window\"\n" +
                "               data-transition=\"pop\"\n" +
                "               class=\"no-underline initcap\">See list of valid countries\n" +
                "            </a> ";
            break;
        case "A":
            desc = "Top up your main wallet from Telecash";
            break;
        case "W":
            desc = "Whatsapp bundles enable you to communicate via whatsapp for the stipulated time using given data amounts";
            break;
        case "F":
            desc = "Facebook bundle enables you to communicate via Facebook for stipulated time using given data amounts";
            break;
        case "M":
            desc = "The MegaBoost combo package offers on-net and off-net voice minutes, Whatsapp, data and SMS benefits depending on the value of the combo package you choose. MegaBoost comes in five different price points, 50 cents, $1, $2, $5 and $10. The combo packages have different validity periods ranging from 24 hours for the 50 cent bundle all the way up to 30 days";
            break;
        case "N":
            desc = "You can now enjoy unlimited browsing between 11pm and 5am at ridiculously low prices with telecel's All night long bundles that start from as low as $1 for 2 nights of access";
            break;
        case "D":
            desc = "Telecel Data Bundles can be used for accessing the internet and come in various options to suit your needs and wallet.";
            break;
        case "CN":
            desc = "Telecel offers cross net voice bundles that allow you call any local numbers affordably.  All you need to do is juice up and dial *146# to buy a bundle of you choice. Our bundles start from $1 for 10 minutes valid for 24 hours up to $10 for 100 minutes of talk-time valid for 5 days";
            break;
        case "O":
            desc = "Telecel offers on net voice bundles that allow you call any Telecel number affordably.  All you need to do is juice up and dial *---# to buy a bundle of you choice. ";
            break;
        case "S":
            desc = "Telecel go subscribers can now enjoy unbeatable value by using SMS bundles. These bundles let you message more for so much less."
            break;
    }

    return desc;
}

function hideBundlePurchaseDivs() {
    $("#divBundleOptions").hide();

    $("#divBuyForOtherControlGroup").hide();

    $("#divPurchaseFromChoice").hide()
}

//$("#divProductBundlePurchaseTabs").tabs({collapsible: false, active: false});
