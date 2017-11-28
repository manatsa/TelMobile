var allProducts = [];

$("#pgBalances").on("pagebeforeshow",
    function () {
        $.ajax({
            url: "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/products/",
            type: "GET",
            dataType: "json",

            success: function (products) {
                $.each(products, function (index, product) {
                    //first check if the product is retired
                    if (product.retired === false && product.status === "ACTIVE") {
                        allProducts.push({
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
                    }
                });
            },
            failure: function (fail) {
                console.log(fail.responseText);
                alert("Could not get all bundles. If this problem persists, please contact our call center at 150 for assistance.")
            },
            error: function (error) {
                console.log(error.responseText);
                $.mobile.changePage("#pgMain", {});
                alert("Could not get all bundles. If this problem persists, please contact our call center at 150 for assistance.");
            }
        });

    }
);

$(document).on("deviceready", function () {

    $(document).delegate("#pgBalances", "pageshow", function () {
        var balancesURI = "http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/universalBalanceEnquiry/mobileapp/" + user.msisdn;

        $("#spnBalanceReactivationSMS").html("<img class='halve-image-size' src='img/loading_gifs/horizontal.gif'>");
        $("#spnBalanceReactivationVoice").html("<img class='halve-image-size' src='img/loading_gifs/horizontal.gif'>");
        $("#spnBalanceReactivationData").html("<img class='halve-image-size' src='img/loading_gifs/horizontal.gif'>");

        $("#spnBalanceMain").html("<img src='img/loading_gifs/horizontal.gif'>");
        $("#spnBalanceNumberOfProducts").html("<img src='img/loading_gifs/horizontal.gif'>");
        $("#divBalancesCollapsibleSet").html("<div class='with-spinner'></div>");

        getBalances(balancesURI);

        function epochToHumanDate(epoch) {
            var timestamp = new Date(epoch);
            var humanDate = moment(timestamp).format("d MMMM YYYY");
            if (epoch === null || epoch === undefined) {
                return "Unknown";
            } else {
                return humanDate;
            }
        }

        function epochToHumanTime(epoch) {
            var timestamp = new Date(epoch);
            var humanDate = moment(timestamp).format("hh:MM:ss");
            if (epoch === null || epoch === undefined) {
                return "Unknown";
            } else {
                return humanDate;
            }
        }

        function getBalances(balancesURI) {
            var productsCount = 0;
            $.ajax({
                url: balancesURI,
                type: "GET",
                dataType: "json",

                success: function (result) {
                    $("#divBalancesCollapsibleSet").html("");
                    $.each(result, function (balanceTypeName, balanceType) {
                        var balanceTypes = JSON.parse(JSON.stringify(balanceType));
                        $.each(balanceTypes, function (i, balance) {
                            var balanceDivToAdd = "";
                            switch (balanceTypeName) {
                                case "oscBalances":
                                    var ocsProduct = getProductObjectFromWalletCode(balance.walletName);
                                    console.log(ocsProduct);
                                    console.log(balance.walletName);
                                    if (ocsProduct !== null) {
                                        balanceDivToAdd = "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u'> <h4>" + ocsProduct.commercialDescription + "</h4> <table data-role='table' class='ui-responsive'> <thead> <tr class='ui-bar-d'> <th class='align-text-left'>Balance</th> <th class='align-text-left'>Expiry Date</th><th class='align-text-left'>Expiry Time</th> </tr> </head> <tbody> <tr> <td>" + getBalanceInUnits(ocsProduct, balance.walletBalance) + "</td> <td>" + epochToHumanDate(balance.walletBalanceExpiryDate) + "</td> <td>" + epochToHumanTime(balance.walletBalanceExpiryDate) + "</td></tr> </tbody> </tbody> </table> </div>";
                                    }
                                    break;
                                case "pcrfBalances":
                                    var pcrfProduct = getProductObjectFromWalletCode(balance.svrName);
                                    if (pcrfProduct !== null) {
                                    }
                                    break;
                            }
                            $("#divBalancesCollapsibleSet").append(balanceDivToAdd).collapsibleset("refresh");
                            productsCount++;
                        });
                    });
                    $(".ui-responsive").table();
                    $("#spnBalanceNumberOfProducts").html(productsCount);
                },
                failure: function (fail) {
                    console.log(fail.responseText);
                    alert("Failure :" + fail)
                },
                error: function (error) {
                    console.log(error.responseText)
                    alert("Error :\n" + error.responseText)
                }
            });
        }
    });
});


function getProductObjectFromWalletCode(walletCode) {
    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].walletName === walletCode) {
            return allProducts[i];
        } else if (i === (allProducts.length - 1)) {
            console.log("number: " + i);
            return null;
        }
    }
}

function getBalanceInUnits(product, balance) {
    switch (product.type) {
        case "SMS":
            return balance.toString() + " SMSs";
            break;
        case "DATA":
            if (product.productCode === "WHATSAPP BUNDLES") {
                return (balance.toFixed(2)).toString() + " MBs";
            }
            return (balance.toFixed(2)).toString() + " MBs";
            break;
        case "VOICE":
            return (Math.floor(balance)).toString() + " minutes";
            break;
        default:
            return "unknown";
    }
}