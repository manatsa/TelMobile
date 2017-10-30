var shareMessage = "Share Message";

$(document).on({
    ajaxSend: function () {
        loading('show');
    },
    ajaxStart: function () {
        loading('show');
    },
    ajaxStop: function () {
        loading('hide');
    },
    ajaxError: function () {
        loading('hide');
    }
});


$(document).on("deviceready",function () {
    //$.mobile.changePage("#tbPage")
})




function loading(showOrHide) {
    setTimeout(function () {
        $.mobile.loading(showOrHide);
    }, 1);
}

function onError(error) {
    navigator.notification.alert(
        error,
        function () {
        },
        "ERROR CALLING",
        "OK"
    )
}

function callTelecel() {
    window.plugins.CallNumber.callNumber(function () {
    }, onError, "150", true);
}

//Add footer to each page
$("section").append(
    '<footer data-role="footer" data-position="fixed" class="ui-bar footer-margins initcap"> <div class="ui-grid-c"> <div class="ui-block-a" style="text-align: left;"> <a href="http://www.telecel.co.zw" class="no-underline" data-transition="turn"><i class="fa fa-globe icon-font-size-med" aria-hidden="true"></i> Website</a> </div> <div class="ui-block-b" style="text-align: center;"> <a class="btnShare" data-icon="share" class="no-underline"><i class="fa fa-share-alt icon-font-size-med" aria-hidden="true"></i> Share</a> </div> <div class="ui-block-c" style="text-align: right;"> <a href="#tcsDialog" data-rel="dialog" data-transition="flip" class="no-underline"><i class="fa fa-file icon-font-size-med" aria-hidden="true"></i> T&Cs</a> </div> <div class="ui-block-d" style="text-align: right;"> <a data-transition="flip" class="no-underline btnCallTelecel"><i class="fa fa-phone icon-font-size-med" aria-hidden="true"></i> Call Us</a> </div> </div> </footer>').trigger("pagecreate");

$("section[data-rel='dialog'] footer").remove();

$(".btnCallTelecel").on("click", callTelecel);

$('.btnTerms').click(function () {
    $("#dlgTermsAndConditions").dialog("open");
});

//social sharing
$(".btnShare").click(function () {
    window.plugins.socialsharing.share(shareMessage);
});



function selectContact(id) {
    navigator.contacts.pickContact(function(contact){
        var contact=JSON.parse(JSON.stringify(contact));
        console.log(JSON.stringify(contact.phoneNumbers[0].value));
        $("#"+id).val(contact.phoneNumbers[0].value)
    },function(err){
        console.log('Error: ' + err);
        navigator.notification.alert("Error picking contact",function () {},"Contact Picking Failure","OK")
    });
}