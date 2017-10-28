
$( document ).on( "pageshow", "#pgShopMap", function() {

    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);
    //var defaultLatLng = new google.maps.LatLng(parseFloat($("#spLattitude").val()), parseFloat($("#spLongitude").val()));  // Default to Hollywood, CA when no geolocation support
    // if ( navigator.geolocation ) {
    //     function success(pos) {
    //         // Location found, show map with these coordinates
    //         drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    //     }
    //     function fail(error) {
    //         drawMap(defaultLatLng);  // Failed to find location, show default map
    //     }
    //     // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
    //     navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    // } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    //}

    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($("#shopMap"), myOptions);
        google.maps.event.trigger(map,'resize');
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });


    }
});