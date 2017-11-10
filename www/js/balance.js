$(document).on("deviceready", function () {


    $(document).delegate("#pgBalances", "pageshow", function () {
        var balancesURI = "http://10.10.4.158:8080/TelecelBundleRestService/rest/universalBalanceEnquiry/mobileapp/" + user.msisdn;

        $("#spnBalanceReactivationSMS").html("<img class='halve-image-size' src='img/loading_gifs/horizontal.gif'>");
        $("#spnBalanceReactivationVoice").html("<img class='halve-image-size' src='img/loading_gifs/horizontal.gif'>");
        $("#spnBalanceReactivationData").html("<img class='halve-image-size' src='img/loading_gifs/horizontal.gif'>");

        $("#spnBalanceMain").html("<img src='img/loading_gifs/horizontal.gif'>");
        $("#spnBalanceNumberOfProducts").html("<img src='img/loading_gifs/horizontal.gif'>");
        $("#divBalancesCollapsibleSet").html("");

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
                    $.each(result, function (balanceTypeName, balanceType) {
                        var balanceTypes = JSON.parse(JSON.stringify(balanceType));
                        $.each(balanceTypes, function (i, balance) {
                            var balanceDivToAdd = "";
                            switch (balanceTypeName) {
                                case "oscBalances":
                                    balanceDivToAdd = "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u'> <h4>" + balance.walletName + "</h4> <table data-role='table' class='ui-responsive'> <thead> <tr class='ui-bar-d'> <th class='align-text-left'>Balance</th> <th class='align-text-left'>Expiry Date</th><th class='align-text-left'>Expiry Time</th> </tr> </head> <tbody> <tr> <td>" + balance.walletBalance + "</td> <td>" + epochToHumanDate(balance.walletBalanceExpiryDate) + "</td> <td>" + epochToHumanTime(balance.walletBalanceExpiryDate) + "</td></tr> </tbody> </tbody> </table> </div>";
                                    break;
                                case "pcrfBalances":
                                    balanceDivToAdd = "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u'> <h4>" + balance.svrName + "</h4> <table data-role='table' class='ui-responsive'> <thead> <tr class='ui-bar-d'> <th class='align-text-left'>Balance</th> <th class='align-text-left'>Expiry Date</th> <th class='align-text-left'>Expiry Time</th></tr> </head> <tbody> <tr> <td>" + balance.quotaBalance + "</td> <td>" + epochToHumanDate(balance.expiryDate) + "</td> <td>" + epochToHumanTime(balance.expiryDate) + "</td> </tr> </tbody> </tbody> </table> </div>";
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
                    alert("FAILURE :" + fail)
                },
                error: function (error) {
                    console.log(error.responseText)
                    alert("ERROR :\n" + error.responseText)
                }
            });
        }
    });
});
