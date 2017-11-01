var uri = "../www/json/promotions.json";

function getPromotionsList() {

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
                html += "<h2>" + promotionItem.title + "</h2> <p class='initcap'>" + promotionItem.description + "<br/><i>Tap to read more</i> </p> </a> </fieldset> </li>";
                $("#ulPromotions").append(html);
                promotionsCount++;
            });
            $("#divPromotionsCount").append("<p style='margin: 0;'>We have <span style='font-size: 36px;'>" + promotionsCount.toString() + "</span> running promotions!</p>");
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



$("#pgPromotions").on("pageshow", getPromotionsList());