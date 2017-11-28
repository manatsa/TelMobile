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
            alert("Failure :"+fail)
            console.log(fail.responseText)
        },
        error:function (error) {
            alert("Error :\n"+error.responseText)
            console.log(error.responseText)
        }
    });
}

$("#testRest").on("click",testRest);