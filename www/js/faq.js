var uri = "../www/json/faq.json";

//get faqQuestions from JSON
function getfaqQuestionsList() {

    $.ajax({
        url: uri,
        type: "GET",
        dataType: "json",

        success: function (result) {
            var indexForUniqueFaqId = 0;
            var faqHtml = "";
            $.each(result, function (faqCategoryName, faqCategories) {
                faqCategories = JSON.parse(JSON.stringify(faqCategories));
                faqHtml += "<li data-role='collapsible' data-iconpos='right' data-inset='false'><h2>" + faqCategoryName + "</h2>";
                faqHtml += "<ul data-role='listview' data-theme='b'>";
                $.each(faqCategories, function (i, faqItem) {
                    indexForUniqueFaqId++;
                    var uniqueFaqId = "ppFaq" + indexForUniqueFaqId.toString();
                    $("#faqPopupDivs").append(addPopupDiv(uniqueFaqId, faqItem.question, faqItem.htmlAnswer));
                    faqHtml += "<li data-icon='false'><a data-rel='popup' data-position-to='window' data-transition='pop' href='#" + uniqueFaqId + "'>" + faqItem.question + "</a></li>";
                });
                faqHtml += "</ul>";
                faqHtml += "</li>";
            });
            $("#ulFAQ").append(faqHtml);
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

function addPopupDiv(popupId, popupQuestion, popupInnterHTML) {
    return popupDivHtml = "<div data-role='popup' id='" + popupId + "' data-overlay-theme='b' data-theme='b' style='margin-top: 50px; max-width:95%;width: 95%; left: 2.5%; right: 2.5%'> <a data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left'>Close</a> <div role='main' class='ui-content'> <p><b>" + popupQuestion + "</b></p>" + popupInnterHTML + "</div> </div>";
}

$("#pgfaqQuestionsList").on("pageshow", getfaqQuestionsList());