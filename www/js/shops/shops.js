var uri = "../www/json/shops.json";

//get shops from JSON
function getShopsList() {

    $.ajax({
        url: uri,
        type: "GET",
        dataType: "json",

        success: function (result) {
            $.each(result, function (index, shopArea) {
                var shopAreas = JSON.parse(JSON.stringify(shopArea));
                $("#ulSearchStore").append('<li data-role=\"list-divider\">' + index + '</li>');
                $.each(shopAreas, function (i, shop) {
                    $("#ulSearchStore").append("<li> <a onclick='storeShop(&quot;" + JSON.stringify(shop).replace(/"/g, '`') + "&quot;)' data-transition=\"flip\">" + shop.name + "<p class=\"initcap\">" + shop.tel + "</p> <p class=\"initcap\">" + shop.address + "</p> </a> </li>");
                    //alert(JSON.stringify(Object.keys(result));
                });
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

//store selected shop in preferences in order to open in maps.html
function storeShop(shop) {
    NativeStorage.setItem("shop", shop, function () {
        //alert(JSON.stringify(shop))
        $.mobile.changePage("shopmap.html", {transition: "flip"});
    }, function (error) {
        navigator.notification.alert("Error :" + error, function () {
        }, "Can't Show Map right now!", "OK")
    })
}

$("#pgShopsList").on("pageshow", getShopsList());
