var desc="";

$("#pgBundlesPurchase").on("pageinit",function () {
    $("#divBundleForNumber").hide()
})

$("#cboBuyBundleProduct").change(function () {

    $("#lblBundleDescription").removeClass("hidden");
    $("#lblBundleDescription").html(getBundleDescription($("#cboBuyBundleProduct").val().trim()));

    var productOption = $("#cboBuyBundleProduct").val();
    switch (productOption) {
        case "W":
            selectWhatsAppBundle();
            break;
        case "F":
            selectFacebookBundle();
            break;
        case "M":
            selectMegaBoostBundle()
            break;
        case "N":

            break;
        case "A":

            break;
        case "C":

            break;
        case "D":

            break;
        case "S":

            break;
        case "T":
            selectTelecelWifiBundle()
            break;
        default:
            navigator.notification.alert(
                "Please make a valid selection",
                function () {  },
                "Invalid Option",
                "OK"
            )
            break;
            $("#cboBundleOptions").selectmenu("refresh")
    }


});


function selectWhatsAppBundle() {
    var WhatsappOptions = ["USD 0.35 daily for 20MB", "USD 1.00 weekly for 180MB", "USD 2.85 monthly for 300MB"];
    var WhatsappValues = ["0.35", "1.00", "2.85"];
    var text = "<option disabled selected>Select</option>"
    for (var i = 0; i < WhatsappOptions.length; i++) {
        text += "<option value='" + WhatsappValues[i] + "' >" + WhatsappOptions[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectFacebookBundle() {
    var WhatsappOptions = ["USD 0.35 daily for 20MB", "USD 1.00 weekly for 100MB", "USD 2.85 monthly for 200MB"];
    var WhatsappValues = ["0.35", "1.00", "2.85"];
    var text = "<option disabled selected>Select</option>"
    for (var i = 0; i < WhatsappOptions.length; i++) {
        text += "<option value='" + WhatsappValues[i] + "' >" + WhatsappOptions[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}


function selectMegaBoostBundle() {
    var megaOptions = ["USD 0.50 daily for 24 Hrs", "USD 1.00 for 24 Hrs", "USD 2.00 for 48 Hrs","USD 5.00 for 30 Days","USD 10.00 for 30 days"];
    var megaValues = ["0.50", "1.00", "2.00","5.00","10.00"];
    var text = "<option disabled selected>Select</option>"
    for (var i = 0; i < megaOptions.length; i++) {
        text += "<option value='" + megaValues[i] + "' >" + megaOptions[i] + "</option>"
    }
    $("#cboBundleOptions").html(text);
}

function selectTelecelWifiBundle() {
    var wifiOptions = ["USD 1.00 for 1024 MB for 24 Hrs", "USD 2.00 for 250MB", "USD 5.00 for 700 MB","USD 10.00 for 1500 MB","USD 25.00 for 4500 MB","USD 50.00 for 10240 MB"];
    var wifiValues = ["1.00", "2.00","5.00","10.00","25.00","50.00"];
    var text = "<option disabled selected>Select</option>"
    for (var i = 0; i < wifiOptions.length; i++) {
        text += "<option value='" + wifiValues[i] + "' >" + wifiOptions[i] + "</option>"
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
   switch (selected){
       case "A":
            desc="Top up your main wallet from Telecash";
           break;
       case "W":
            desc="Whatsapp bundles enable you to communicate via whatsapp for the stipulated time using given data amounts";
           break;
       case "F":
            desc="Facebook bundle enables you to communicate via Facebook for stipulated time using given data amounts";
           break;
       case "M":
            desc="The MegaBoost combo package offers on-net and off-net voice minutes, Whatsapp, data and SMS benefits depending on the value of the combo package you choose. MegaBoost comes in five different price points, 50 cents, $1, $2, $5 and $10. The combo packages have different validity periods ranging from 24 hours for the 50 cent bundle all the way up to 30 days";
           break;
       case "N":
            desc="You can now enjoy unlimited browsing between 11pm and 5am at ridiculuosly low prices with telecel's All night long bundles that start from as low as $1 for 2 nights of access";
           break;
       case "D":
            desc="";
           break;
       case "C":
           desc="Telecel offers voice bundles that allow you call any local numbers affordably.  All you need to do is juice up and dial *146# to buy a bundle of you choice. Our bundles start from $1 for 10 minutes valid for 24 hours up to $10 for 100 minutes of talk-time valid for 5 days";
           break;
       case "S":
           desc="SMS Bundles: Telecel go subscribers can now enjoy unbeatable value by using SMS bundles. These bundles let you message more for so much less."
           break;
   }

    return desc;
}


/*

<li><a href="#">Airtime
    <p class="initcap">Click to buy airtime, transfer airtime etc.</p>
</a>
</li>
<li><a href="#">Voice Bundles
<p class="initcap">Click to purchase voice bundles</p>
</a>
</li>
<li>Social Data Bundles
<ul>
<li>WhatsApp Bundles
<ul>
<li>What is a WhatsApp bundle?</li>
<li><a href="#">USD 0.35 daily for 20MB</a> </li>
<li><a href="#">USD 1.00 weekly for 180MB</a> </li>
<li><a href="#">USD 2.85 monthly for 300MB</a> </li>
<li><a href="#">Unsubscribe</a> </li>
</ul>
</li>
<li>Facebook Bundles
<ul>

</li>
<li>Mega Boost Bundles
<ul>

</ul>
</li>
<li>Telecel Wifi Bundles
<ul>
<li>What is Telecel Wifi?</li>
<li><a href="#">Register</a> </li>
<li><a href="#">USD 1.00 for 1024 MB Daily</a> </li>
<li><a href="#">USD 2.00 for 250MB</a> </li>
<li><a href="#">USD 5.00 for 700 MB</a> </li>
<li><a href="#">USD 10.00 for 1500 MB</a> </li>
<li><a href="#">USD 25.00 for 4500 MB</a> </li>
<li><a href="#">USD 50.00 for 10240 MB</a> </li>
<li><a href="#">Change Pin</a> </li>
<li><a href="#">Balance Enquiry</a> </li>
<li><a href="#">Unsubscribe</a> </li>
</ul>
</li>
</ul>
<p class="initcap">Click to purchase whatsApp, Facebook, Mega boost, Telecel Wifi bundles.</p>
</li>
<li><a href="#">SMS Bundles
<p class="initcap">Click to purchase SMS bundles</p>
</a>
</li>*/
