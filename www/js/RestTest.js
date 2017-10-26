var uri="http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/shops";

function testRest() {

    $.ajax({
            url:uri,
            type:"GET",
        dataType:"json",

        success:function (result) {
            var data=JSON.stringify(result);
            alert(data)
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

$("#testRest").on("click",testRest);
