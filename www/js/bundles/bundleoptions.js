//responsible for populating bundle options
var desc = "";

//variables for product types
var dataProducts = [];
var voiceProducts = [];
var smsProducts = [];

//variables for each bundle type
var whatsappBundles = [];
var facebookBundles = [];
var megaBoostBundles = [];
var nightDataBundles = [];
var dataBundles = [];
var internationalVoiceBundles = [];
var twitterBundles = [];
var kenakoBundles = [];
var crossNetVoiceBundles = [];
var wifiBundles = [];
var onNetVoiceBundles = [];
var smsBundles = [];
var dayDataBundles = [];

var otherDataBundles = [];
var otherSMSBundles = [];
var otherVoiceBundles = [];

var objSelectedBundle = {};
var selectedProductTypeName = "";
var selectedBundleTypeName = "";
var selectedBundleName = "";

resetBundleOptionsForPageLoad();

$("#pgBundlesPurchase").on("pagebeforeshow",
    function loadBundleOptions() {
        showProgressBar();
        resetBundleOptionsForPageLoad();

        $.ajax({
            url: "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/products/",
            type: "GET",
            dataType: "json",

            success: function (products) {
                hideProgressBar();
                $.each(products, function (index, product) {
                    //first check if the product is retired
                    if (product.retired === false && product.status === "ACTIVE") {

                        //add a product to the product types <select> for either SMS, VOICE, or DATA
                        switch (product.type) {
                            case "VOICE":
                                if ($.inArray(product.productCode, voiceProducts) === -1) {
                                    voiceProducts.push(product.productCode);
                                }
                                break;
                            case "DATA":
                                if ($.inArray(product.productCode, dataProducts) === -1) {
                                    dataProducts.push(product.productCode);
                                }
                                break;
                            case "VOICE, DATA, SMS":
                            case "VOICE, SMS, DATA":
                            case "DATA, VOICE, SMS":
                            case "DATA, SMS, VOICE":
                            case "SMS, DATA, VOICE":
                            case "SMS, VOICE, DATA":
                                if ($.inArray(product.productCode, dataProducts) === -1) {
                                    dataProducts.push(product.productCode);
                                }
                                break;
                            case "SMS":
                                if ($.inArray(product.productCode, smsProducts) === -1) {
                                    smsProducts.push(product.productCode);
                                }
                                break;
                            //no default behaviour expected, but incase, just add to data since most products are data
                            default: {
                                if ($.inArray(product.productCode, dataProducts) === -1) {
                                    dataProducts.push(product.productCode);
                                }
                                break;
                            }
                        }
                        //end of switch

                        //add a bundle to its respective array so it can be used later
                        switch (product.productCode) {
                            case "DAY DATA BUNDLES":
                                dayDataBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "WHATSAPP BUNDLES":
                                whatsappBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "FACEBOOK BUNDLES":
                                facebookBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "MEGA BOOST BUNDLES":
                                megaBoostBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "NIGHT DATA BUNDLES":
                                nightDataBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "ONNET VOICE BUNDLES":
                                onNetVoiceBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "KENAKO BUNDLES":
                                kenakoBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "TWITTER BUNDLES":
                                twitterBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "CROSSNET VOICE BUNDLES":
                                crossNetVoiceBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "INTERNATIONAL VOICE BUNDLES":
                                internationalVoiceBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "DATA BUNDLES":
                                dataBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "SMS BUNDLES":
                                smsBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            case "WIFI BUNDLE":
                                wifiBundles.push({
                                    dateCreated: product.dateCreated,
                                    dateModified: product.dateModified,
                                    uuid: product.uuid,
                                    retired: product.retired,
                                    description: product.description,
                                    name: product.name,
                                    status: product.status,
                                    allowMultiple: product.allowMultiple,
                                    renewable: product.renewable,
                                    allowPrepaid: product.allowPrepaid,
                                    allowPostPaid: product.allowPostPaid,
                                    amount: product.amount,
                                    type: product.type,
                                    deplete: product.deplete,
                                    renew: product.renew,
                                    partyCode: product.partyCode,
                                    expiryValue: product.expiryValue,
                                    reminderExpiryValue: product.reminderExpiryValue,
                                    productCode: product.productCode,
                                    walletName: product.walletName,
                                    commercialDescription: product.commercialDescription
                                });
                                break;
                            default:
                                switch (product.type) {
                                    case "DATA":
                                        otherDataBundles.push({
                                            dateCreated: product.dateCreated,
                                            dateModified: product.dateModified,
                                            uuid: product.uuid,
                                            retired: product.retired,
                                            description: product.description,
                                            name: product.name,
                                            status: product.status,
                                            allowMultiple: product.allowMultiple,
                                            renewable: product.renewable,
                                            allowPrepaid: product.allowPrepaid,
                                            allowPostPaid: product.allowPostPaid,
                                            amount: product.amount,
                                            type: product.type,
                                            deplete: product.deplete,
                                            renew: product.renew,
                                            partyCode: product.partyCode,
                                            expiryValue: product.expiryValue,
                                            reminderExpiryValue: product.reminderExpiryValue,
                                            productCode: product.productCode,
                                            walletName: product.walletName,
                                            commercialDescription: product.commercialDescription
                                        });
                                        break;
                                    case "VOICE":
                                        otherVoiceBundles.push({
                                            dateCreated: product.dateCreated,
                                            dateModified: product.dateModified,
                                            uuid: product.uuid,
                                            retired: product.retired,
                                            description: product.description,
                                            name: product.name,
                                            status: product.status,
                                            allowMultiple: product.allowMultiple,
                                            renewable: product.renewable,
                                            allowPrepaid: product.allowPrepaid,
                                            allowPostPaid: product.allowPostPaid,
                                            amount: product.amount,
                                            type: product.type,
                                            deplete: product.deplete,
                                            renew: product.renew,
                                            partyCode: product.partyCode,
                                            expiryValue: product.expiryValue,
                                            reminderExpiryValue: product.reminderExpiryValue,
                                            productCode: product.productCode,
                                            walletName: product.walletName,
                                            commercialDescription: product.commercialDescription
                                        });
                                        break;
                                    case "SMS":
                                        otherSMSBundles.push({
                                            dateCreated: product.dateCreated,
                                            dateModified: product.dateModified,
                                            uuid: product.uuid,
                                            retired: product.retired,
                                            description: product.description,
                                            name: product.name,
                                            status: product.status,
                                            allowMultiple: product.allowMultiple,
                                            renewable: product.renewable,
                                            allowPrepaid: product.allowPrepaid,
                                            allowPostPaid: product.allowPostPaid,
                                            amount: product.amount,
                                            type: product.type,
                                            deplete: product.deplete,
                                            renew: product.renew,
                                            partyCode: product.partyCode,
                                            expiryValue: product.expiryValue,
                                            reminderExpiryValue: product.reminderExpiryValue,
                                            productCode: product.productCode,
                                            walletName: product.walletName,
                                            commercialDescription: product.commercialDescription
                                        });
                                        break;
                                }
                                break;
                        }
                        //end of switch

                    }
                });
                //dynamically populate each product item
                populateProductTypes("cboBuySMSProduct", "SMS bundle", smsProducts);
                populateProductTypes("cboBuyDataProduct", "data bundle", dataProducts);
                populateProductTypes("cboBuyVoiceProduct", "voice bundle", voiceProducts);
            },
            failure: function (fail) {
                hideProgressBar();
                console.log(fail.responseText);
                alert("Could not show all bundles. If this problem persists, please contact our call center at 150 for assistance.")
            },
            error: function (error) {
                hideProgressBar();
                console.log(error.responseText);
                $.mobile.changePage("#pgMain", {});
                alert("Could not get bundles. If this problem persists, please contact our call center at 150 for assistance.");
            }
        });

    }
);


$("#pgBundlesPurchase").on("pageinit", function () {
    $("#divBundleForNumber").hide();
    hideBundlePurchaseDivs();
});

$("#pgBundlesPurchase").on("pageshow", function (evt) {

    if(promoProduct && promoProduct!==''){

        if(promoProduct.toLocaleLowerCase().indexOf("bundle")>=0)
        {
            alert(promoProduct)
            $('#bundles-tab').trigger('click')
            $('#bundles-tab').click();
            $("#divProductBundlePurchaseTabs").tabs( "option", "active", 2 );
        }else if(promoProduct.indexOf("Voice")>=0){
            $('#first-tab').click();
        }else if(promoProduct.indexOf("SMS")>=0){
            $('#SMS-tab').click();
        }else{

        }
        promoProduct='';
    }
})


function resetBundleOptionVars() {
    //responsible for populating bundle options
    desc = "";

    //variables for product types
    dataProducts = [];
    voiceProducts = [];
    smsProducts = [];

    //variables for each bundle type
    whatsappBundles = [];
    facebookBundles = [];
    megaBoostBundles = [];
    nightDataBundles = [];
    dataBundles = [];
    internationalVoiceBundles = [];
    twitterBundles = [];
    kenakoBundles = [];
    crossNetVoiceBundles = [];
    wifiBundles = [];
    onNetVoiceBundles = [];
    smsBundles = [];
    dayDataBundles = [];

    otherDataBundles = [];
    otherVoiceBundles = [];
    otherSMSBundles = [];

    objSelectedBundle = [];
    selectedProductTypeName = "";
    selectedBundleName = "";
    selectedBundleTypeName = "";
}



function refreshResetedComponents() {
    $("#cboBuyVoiceProduct").selectmenu("refresh", true);
    $("#cboBuyDataProduct").selectmenu("refresh", true);
    $("#cboBuySMSProduct").selectmenu("refresh", true);

    $('#rdrOptionSelf').checkboxradio("refresh");
    $('#rdrOptionOther').checkboxradio("refresh");
}

function resetBundleOptionComponents() {
    $("#lblProductDescription").hide();
    $("#divBundleHelp").hide();

    $("#cboBuyVoiceProduct").val('').attr('selected', true).siblings('option').removeAttr('selected');
    $("#cboBuySMSProduct").val('').attr('selected', true).siblings('option').removeAttr('selected');
    $("#cboBuyDataProduct").val('').attr('selected', true).siblings('option').removeAttr('selected');

    $("#txtBundleForNumber").val('');

    $('#rdrOptionSelf').prop('checked', true);
    $('#rdrOptionOther').prop('checked', false);

    $("#divBundleOptions").hide();
    $("#divBundleForNumber").hide();
    $("#divPurchaseFromChoice").hide();
    $("#divBuyForOtherControlGroup").hide();
    $("#divListOfValidCountries").hide();

}

function resetBundleOptionTabs() {
    $("#divProductBundlePurchaseTabs").tabs({
        activate: function (event, ui) {
            selectedProductTypeName = $("#ulBundlePurchaseProductTypes").find(".ui-state-active a").html();
            $("#ulBundlePurchaseProductTypes").removeClass("glow");
            resetBundleOptionComponents();
            refreshResetedComponents();
        },
        collapsible: true,
        active: false
    });
}

function resetBundleOptionGlow() {
    $("#ulBundlePurchaseProductTypes").addClass("glow");
    $("#divDataBundles").addClass("glow");
    $("#divVoiceBundles").addClass("glow");
    $("#divSMSBundles").addClass("glow");
    $("#divBundleOptions").addClass("glow");
}

function resetBundleOptionsForPageLoad() {
    resetBundleOptionTabs();
    resetBundleOptionVars();
    resetBundleOptionGlow();
    resetBundleOptionComponents();
}

function findObjectInArray(textToFindInArray, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === textToFindInArray) {
            return array[i];
        }
    }
}

function showBuyForSectionAndBundleInfo() {
    $("#divBundleOptions").removeClass("glow");

    selectedBundleName = $("#divBundleOptions").find(":selected").val();

    $("#divBuyForOtherControlGroup").show();
    $("#divPurchaseFromChoice").show();
    $("#divBundleHelp").show();

    if (selectedBundleTypeName !== "") {
        switch (selectedBundleTypeName) {
            case "WHATSAPP BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, whatsappBundles);
                break;
            case "FACEBOOK BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, facebookBundles);
                break;
            case "DAY DATA BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, dayDataBundles);
                break;
            case "MEGA BOOST BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, megaBoostBundles);
                break;
            case "NIGHT DATA BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, nightDataBundles);
                break;
            case "ONNET VOICE BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, onNetVoiceBundles);
                break;
            case "KENAKO BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, kenakoBundles);
                break;
            case "TWITTER BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, twitterBundles);
                break;
            case "CROSSNET VOICE BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, crossNetVoiceBundles);
                break;
            case "INTERNATIONAL VOICE BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, internationalVoiceBundles);
                break;
            case "DATA BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, dataBundles);
                break;
            case "SMS BUNDLES":
                objSelectedBundle = findObjectInArray(selectedBundleName, smsBundles);
                break;
            case "WIFI BUNDLE":
                objSelectedBundle = findObjectInArray(selectedBundleName, wifiBundles);
                break;
            default:
                switch (selectedProductTypeName) {
                    case "Data":
                        objSelectedBundle = findObjectInArray(selectedBundleName, otherDataBundles);
                        break;
                    case "Voice":
                        objSelectedBundle = findObjectInArray(selectedBundleName, otherVoiceBundles);
                        break;
                    case "SMS":
                        objSelectedBundle = findObjectInArray(selectedBundleName, otherSMSBundles);
                        break;
                }
                break
        }
        setBundleDescription();
    } else {
        navigator.notification.alert("Please restart the app and try again. If this problem persists, please contact our call center at 150 for assistance.", function () {
        }, "Could not get selected bundle.", "OK")
    }
}

function setBundleDescription() {
    $("#lblBundleDescription").html(toTitleCase(objSelectedBundle.commercialDescription));

    //this section of code calculates and gives the user the expiration time of the bundle
    var validity = objSelectedBundle.expiryValue;
    var validityText = "";
    if (Number(validity) <= 24) {
        validityText = validity.toString() + " hours";
    } else {
        validityText = (Number(validity) / 24).toString() + " days";
    }
    $("#lblBundleValidity").html(validityText);

    $("#lblBundlePrice").html(objSelectedBundle.amount);
}

function populateBundles(cbo) {

    //reset components, cant use resetBundleOptionComponents() because it resets everything and we want to reset only some
    $("#divDataBundles").removeClass("glow");
    $("#divVoiceBundles").removeClass("glow");
    $("#divSMSBundles").removeClass("glow");
    //
    $("#divBundleOptions").addClass("glow");
    $("#divBuyForOtherControlGroup").hide();
    $("#divPurchaseFromChoice").hide();
    $("#divBundleForNumber").hide();
    //
    $('#rdrOptionSelf').prop('checked', true);
    $('#rdrOptionOther').prop('checked', false);
    $('#rdrOptionSelf').checkboxradio("refresh");
    $('#rdrOptionOther').checkboxradio("refresh");
    $("#txtBundleForNumber").val('');
    //end of reset

    //get current selected bunddle type by searching through divs
    selectedBundleTypeName = $("#divDataBundles").find(":selected").val();
    if (selectedBundleTypeName === undefined || selectedBundleTypeName === "") {
        selectedBundleTypeName = $("#divVoiceBundles").find(":selected").val();
    }
    if (selectedBundleTypeName === undefined || selectedBundleTypeName === "") {
        selectedBundleTypeName = $("#divSMSBundles").find(":selected").val();
    }

    //populate the bundle dropdown with appropriate bundle
    $("#divBundleHelp").hide();
    $("#lblProductDescription").show();
    $("#lblProductDescription").html(getBundleDescription($("#" + cbo).val().trim()));

    var productOption = $("#" + cbo).val();
    switch (productOption) {
        case "WHATSAPP BUNDLES":
            selectBundle(whatsappBundles, " Whatsapp");
            break;
        case "FACEBOOK BUNDLES":
            selectBundle(facebookBundles, " Facebook");
            break;
        case "DAY DATA BUNDLES":
            selectBundle(dayDataBundles, " Day data");
            break;
        case "MEGA BOOST BUNDLES":
            selectBundle(megaBoostBundles, " MegaBoost");
            break;
        case "NIGHT DATA BUNDLES":
            selectBundle(nightDataBundles, " Night Data");
            break;
        case "ONNET VOICE BUNDLES":
            selectBundle(onNetVoiceBundles, " On-net Voice");
            break;
        case "KENAKO BUNDLES":
            selectBundle(kenakoBundles, " Kenako");
            break;
        case "TWITTER BUNDLES":
            selectBundle(twitterBundles, " Twitter");
            break;
        case "CROSSNET VOICE BUNDLES":
            selectBundle(crossNetVoiceBundles, " Crossnet Voice");
            break;
        case "INTERNATIONAL VOICE BUNDLES":
            selectBundle(internationalVoiceBundles, " International Voice");
            break;
        case "DATA BUNDLES":
            selectBundle(dataBundles, " Data");
            break;
        case "SMS BUNDLES":
            selectBundle(smsBundles, " SMS");
            break;
        case "WIFI BUNDLE":
            selectBundle(wifiBundles, " Wifi");
            break;
        default:
            switch (cbo) {
                case "cboBuyDataProduct":
                    selectBundle(otherDataBundles, "");
                    break;
                case "cboBuyVoiceProduct":
                    selectBundle(otherVoiceBundles, "");
                    break;
                case "cboBuySMSProduct":
                    selectBundle(otherSMSBundles, "");
                    break;
            }
            break;
    }
    $("#divBundleOptions").show();
    $('#cboBundleOptions').selectmenu('refresh');
}

function populateProductTypes(cbo, productTypeDescription, productTypes) {
    //select html is loaded in this order to prioritise bundles
    var firstTextToAppend = "<option value='' disabled selected>Select a " + productTypeDescription + " product</option>";
    var text = "";
    var lastTextToAppend = "";

    var otherBundlesAddedYN = false;//this variable and if statement below ensure only one other section is added, that is, if an unpredicted bundle is added to the web service
    for (var i = 0; i < productTypes.length; i++) {
        switch (productTypes[i]) {
            case "WHATSAPP BUNDLES":
                firstTextToAppend += "<option value='" + productTypes[i] + "'>" + toTitleCase(productTypes[i]) + "</option>";
                break;
            case "FACEBOOK BUNDLES":
                firstTextToAppend += "<option value='" + productTypes[i] + "'>" + toTitleCase(productTypes[i]) + "</option>";
                break;
            case "MEGA BOOST BUNDLES":
                firstTextToAppend += "<option value='" + productTypes[i] + "'>" + toTitleCase(productTypes[i]) + "</option>";
                break;
            case "KENAKO BUNDLES":
            case "ONNET VOICE BUNDLES":
            case "WIFI BUNDLE":
            case "INTERNATIONAL VOICE BUNDLES":
            case "TWITTER BUNDLES":
            case "NIGHT DATA BUNDLES":
            case "DAY DATA BUNDLES":
            case "DATA BUNDLES":
            case "CROSSNET VOICE BUNDLES":
            case "SMS BUNDLES":
                text += "<option value='" + productTypes[i] + "'>" + toTitleCase(productTypes[i]) + "</option>";
                break;
            default:
                if (otherBundlesAddedYN === false) {
                    lastTextToAppend += "<option value='" + "Other bundles" + "'>" + "Other bundles" + "</option>";
                    otherBundlesAddedYN = true;
                }
                break;
        }
    }
    text = firstTextToAppend + text;
    text = text + lastTextToAppend;
    $("#" + cbo).html(text);
    $("#" + cbo).selectmenu('refresh');
}

function selectBundle(obj, strBundle) {
    //obj is an object with bundles of same type
    var text = "<option value='' disabled selected>Select a" + strBundle + " bundle</option>";
    for (var i = 0; i < obj.length; i++) {
        text += "<option value='" + obj[i].name + "' >" + toTitleCase(obj[i].description) + "</option>";
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
        case "ONNET VOICE BUNDLES":
            desc = "Telecel offers on On-net voice bundles that allow you call any Telecel number affordably.";
            break;
        case "WIFI BUNDLE":
            desc = "Telecel offers WIFI bundles that allow you connect and enjoy fast internet from our various hotspots nation-wide.";
            break;
        case "INTERNATIONAL VOICE BUNDLES":
            desc = "Telecel offers on international voice bundles that allow you call an international number affordably. <br/><a href='http://telecel.co.zw/products-services/telecelgo/go' data-rel='popup' data-position-to='window' data-transition='pop' class='no-underline initcap'>See list of countries I can call with this bundle.</a>";
            break;
        case "WHATSAPP BUNDLES":
            desc = "Our Whatsapp bundles enable you to communicate via the mobile application 'Whatsapp' for the stipulated time using given data amounts. Please note that Whatsapp bundles do not work on Opera Mini browser.";
            break;
        case "KENAKO BUNDLES":
            desc = "Our Kenako bundles enable you to stream Kenako services.";
            break;
        case "TWITTER BUNDLES":
            desc = "Our Twitter bundles enable you to communicate and use Twitter for the stipulated time using given data amounts.";
            break;
        case "FACEBOOK BUNDLES":
            desc = "Our Facebook bundles enable you to communicate and use Facebook for the stipulated time using given data amounts.";
            break;
        case "MEGA BOOST BUNDLES":
            desc = "The MegaBoost combo package offers on-net and off-net voice minutes, Whatsapp, data and SMS benefits depending on the value of the combo package you choose. The combo packages have different validity periods ranging from 24 hours all the way up to 30 days";
            break;
        case "DAY DATA BUNDLES":
            desc = "You can browse, stream and download for as little as 5MB for every 1 ccent with our affordable data bundles that last the whole day.";
            break;
        case "NIGHT DATA BUNDLES":
            desc = "You can now enjoy unlimited browsing between 11pm and 5am at ridiculously low prices with telecel's All night long bundles that start from as low as $1 for 2 nights of access";
            break;
        case "DATA BUNDLES":
            desc = "Telecel Data Bundles can be used for accessing the internet and come in various options to suit your needs and wallet.";
            break;
        case "CROSSNET VOICE BUNDLES":
            desc = "Telecel offers cross net voice bundles that allow you call any local number affordably. Our bundles start from $1 up to $10 with varying days of validity for talk-time.";
            break;
        case "SMS BUNDLES":
            desc = "You can enjoy unbeatable value by using SMS bundles. These bundles let you message more for so much less.";
            break;
        default:
            desc = "Telecel offers you unbeatable value by using one of these bundles. Contact 150 to learn more about these bundles";
            break;
    }

    return desc;
}

function hideBundlePurchaseDivs() {
    $("#divBundleOptions").hide();

    $("#divBuyForOtherControlGroup").hide();

    $("#divPurchaseFromChoice").hide()
}

$("#pgBundlesPurchase").on("pageshow", function (event) {

    $('#first-tab').click();
});