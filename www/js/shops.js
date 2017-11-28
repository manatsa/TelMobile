var shopsWebURI = "http://kasjdakjlsda";
var shopsLocalURI = "../www/json/shops.json";
var alreadyTriedShopsWebYN = false;

//get shops from JSON
function getShopsList(uri) {

    $.ajax({
        url: uri,
        type: "GET",
        dataType: "json",

        success: function (result) {
            var ulSearchStoreHTML = "";
            $.each(result, function (index, shopArea) {
                var shopAreas = JSON.parse(JSON.stringify(shopArea));
                ulSearchStoreHTML += "<li data-role='list-divider'>" + index + "</li>";
                $.each(shopAreas, function (i, shop) {
                    if (shop.name.toString() !== "'") {
                        ulSearchStoreHTML += "<li> <a onclick='storeShop(&quot;" + JSON.stringify(shop).replace(/"/g, '`') + "&quot;)' data-transition='flip'>" + shop.name;
                        if (shop.tel.toString() !== "") {
                            ulSearchStoreHTML += "<p class='initcap'>" + shop.tel + "</p>";
                        }
                        if (shop.address.toString() !== "") {
                            ulSearchStoreHTML += "<p class='initcap'>" + shop.address + "</p>";
                        }
                        ulSearchStoreHTML += "</a> </li>";
                    }
                    ulSearchStoreHTML += "</a> </li>";

                });
            });
            $("#ulSearchStore").append(ulSearchStoreHTML);
        },
        failure: function (fail) {
            console.log(fail.responseText);
            alert("Failure :" + fail)
        },
        error: function (error) {
            console.log(error.responseText);
            if (alreadyTriedShopsWebYN === false) {
                $("#shopsList").prepend("<div class='alert-box warning alert-dismissible'><span>Note: </span>The latest list of Telecel shops could not be obtained.</div>");
                getShopsList(shopsLocalURI);
                alreadyTriedShopsWebYN = true;
                return;
            }
            alert("Error : Failed to load Telecel shops.\n" + error.responseText)
        }
    });
}

//store selected shop in preferences in order to open in maps.html
function storeShop(shop) {
    if (internetConnectionYN() === true) {
        NativeStorage.setItem("shop", shop, function () {
            //alert(JSON.stringify(shop))
            $.mobile.changePage("shopmap.html", {transition: "flip"});
        }, function (error) {
            navigator.notification.alert("Error :" + error, function () {
            }, "Can't Show Map right now!", "OK")
        })
    } else {
        showInternetError();
    }
}

$("#pgShopsList").on("pageshow", getShopsList(shopsWebURI));

function removeMapMarkerInfoWindow() {
    $(".marker-info").remove();
}

function showDirections() {
    var selectedMode = $("#cboShopDirectionsTravelMode").val();
    if (selectedMode !== null && selectedMode !== "") {
        showProgressBar();
        directionsDisplay.addListener('directions_changed', function () {
            //computeTotalDistance(directionsDisplay.getDirections());
        });
        directionsDisplay.setMap(null);
        directionsDisplay.setDirections({routes: []});

        navigator.geolocation.getCurrentPosition(function (position) {
            var currpos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            calculateAndDisplayRoute(currpos, latlon, directionsService, directionsDisplay, selectedMode);
        }, function (error) {
            hideProgressBar();
            navigator.notification.alert("Could not get your location." + error, function () {
            }, "Error", "OK")
        })
    } else {
        navigator.notification.alert("Please enter your preferred mode of travel.", function () {
        }, "No mode of travel selected", "OK")
    }
}


function calculateAndDisplayRoute(start, end, directionsService, directionsDisplay, selectedMode) {
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: selectedMode
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
            hideProgressBar();
        } else {
            hideProgressBar();
            navigator.notification.alert('Directions request failed due to ' + status, function () {
            }, "ERROR", "OK");
        }
    });


}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    $('#timetotravel').val(total + ' km');
}

function echoShopNumbers(number) {
    var result = "<td class='initcap align-text-left'>";
    if (number) {
        var numbers = number.split(",");
        if (numbers.length >= 1) {
            $.each(numbers, function (index, num) {
                result += "<span style='text-decoration: underline;' onclick='callNumber(&quot;" + num + "&quot;)'> " + num + "</span>";
                result += "&nbsp;";//new line
            });
        } else {
            result += "<span style='text-decoration: underline;' onclick='callTelecel()'>150</span>";
        }

    } else {
        result += "<span style='text-decoration: underline;' onclick='callTelecel()'>150</span>";
    }
    result += "</td>";

    return result;
}
