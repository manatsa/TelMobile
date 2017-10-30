$("#pgAirtimePurchase").on("pageinit", function () {
    $("#divAirtimeForNumber").hide();
});

$("#rdrAirtimeForOther").click(function () {
    $("#divAirtimeForNumber").show()
});

$("#rdrAirtimeForSelf").click(function () {
    $("#divAirtimeForNumber").hide()
});
