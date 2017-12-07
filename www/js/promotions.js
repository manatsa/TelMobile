var promotionsWebURI = "http://kasjdakjlsda";
var promotionsLocalURI = "../www/json/promotions.json";
var alreadyTriedPromotionsWebYN = false;
var promoProduct;

function initialise(item){
    promoProduct=item;
}

function getPromotionsList(uri) {
    $.ajax({
        url: uri,
        type: "GET",
        dataType: "json",

        success: function (result) {
            var promotionsCount = 0;
            $.each(result, function (i, promotionItem) {
                var html = "";

                html += "<li> <fieldset> <a href='" + promotionItem.readMoreWebsiteLink + "' class='no-underline'>";
                if (promotionItem.imageUrl !== "") {
                    html += "<img class='listview-big-thumbs-img' src='" + promotionItem.imageUrl + "'>";
                }
                html += "<h2>" + promotionItem.title + "</h2> <p class='initcap'>" + promotionItem.description + "<br/><i>Tap to read more</i> </p> </a>";
                if (promotionItem.goToPageInMobileOrURL !== "" && promotionItem.goToPageText !== "") {
                    html += "<a  onclick='initialise(&quot;"+promotionItem.title+"&quot;)' class='ui-btn ui-btn-corner-all ui-btn-b' data-transition='flip' href='" + promotionItem.goToPageInMobileOrURL + "'><i class=\"fa fa-external-link-square\"\n" +
                        "                                                                                    aria-hidden=\"true\"></i>&nbsp;" + promotionItem.goToPageText + "</a>";
                }
                html += "</fieldset> </li>";
                $("#ulPromotions").append(html);
                promotionsCount++;
            });
            $("#divPromotionsCount").append("<p style='margin: 0;'>We have <span style='font-size: 36px;'>" + promotionsCount.toString() + "</span> running promotions!</p>");
        },
        failure: function (fail) {
            console.log(fail.responseText);
            alert("Failure :" + fail)
        },
        error: function (error) {
            console.log(error.responseText);
            if (alreadyTriedPromotionsWebYN === false) {
                $("#divPromotions").prepend("<div class='alert-box warning'><span>Note: </span>The latest promotions could not be obtained.</div>");
                getPromotionsList(promotionsLocalURI);
                alreadyTriedPromotionsWebYN = true;
                return;
            }
            $("#divPromotionsCount").append("<p style='margin: 0;'>We have <span style='font-size: 36px;'>0</span> running promotions!</p>");
            alert("Error : Failed to load Promotions.\n" + error.responseText)
        }
    });
}

$("#pgPromotions").on("pageshow", getPromotionsList(promotionsWebURI));