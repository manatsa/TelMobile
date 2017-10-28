var uri="http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/shops";

function getShopsList() {

    $.ajax({
        url:uri,
        type:"GET",
        dataType:"json",

        success:function (result) {
            var data=JSON.parse(result);
            alert(data.name)
            console.log(data)
        },
        failure: function (fail) {
            alert("FAILURE :"+fail)
            console.log(fail.responseText)
        },
        error:function (error) {
            alert("ERROR :\n"+error.responseText)
            console.log(error.responseText)
        }
    });
}

$("#pgShopsList").on("pageshow",getShopsList)

