var buybundleuri="http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/purchase/mobileapp";

$("#btnPurchaseBundleFromCore").on("click",function () {
    try{
        NativeStorage.getItem("user",function (user) {
            var regmobile=user.msisdn;
            var regpin=user.pin;
            var product=$("#divBundleOptions :selected").val();
            var selfother=$("#divBuyForOtherControlGroup :checked").val();
            var othermobile=$("#txtBundleForNumber").val()

            if(regmobile && regpin)
            {
                if(product){

                    navigator.notification.prompt("Please Enter Your Pin",function (result) {
                        if(result.buttonIndex==1){
                            if(result.input1==regpin)
                            {
                                try{
                                    doAjax(regmobile,product,selfother,othermobile)
                                }catch(e){
                                    console.log(JSON.stringify(e))
                                    navigator.notification.alert("Error :"+e.toString(),null,"ERROR DOING TRANSACTION","OK");
                                }
                            }else{
                                navigator.notification.alert("You entered an invalid pin",null,"Authentication Error","OK")
                            }
                        }
                    },"Authenticate Transaction",["Proceed","Cancel"])


                }else{
                    navigator.notification.alert("Please select a valid product",null,"Invalid Product","OK")
                }

            }else{
                navigator.notification.alert("You need to would have registered!",null,"Invalid phone number and pin","OK")
            }

        },function (error) {
            console.log(error)
            alert(error+error.responseText)
        });
    }catch(e){
        console.log(e)
        alert(e.responseText)
    }

});





function validMobile(msisdn) {
    var validMsisdn="";
    if(msisdn)
        {
            if(msisdn.substring(0,5)=="26373"){
                validMsisdn=msisdn.substring(3);
            }else if(msisdn.substring(0,6)=="+26373"){
                validMsisdn=msisdn.substring(4);
            }else if(msisdn.substring(0,7)=="0026373"){
                validMsisdn=msisdn.substring(5);
            }else if(msisdn.substring(0,3)==="073"){
                validMsisdn=msisdn.substring(1);
            }else if(msisdn.substring(0,5)=="73"){
                validMsisdn=msisdn
            }else{
                navigator.notification.alert("You need to input a valid mobile number!",function () {},"Invalid Mobile Number","OK")
            }
    }else{
        navigator.notification.alert("You need to check the mobile number!",function () {},"Invalid Mobile Number","OK")
    }
    return validMsisdn
}


function doAjax(regmobile,product,selfother,othernumber) {


    if(selfother=='other')
    {
        var validMSISDN=validMobile(othermobile).toString().trim();
        if(validMSISDN.length>8){


            buybundleuri+="/"+regmobile+"/"+product

            $.ajax({
                url:buybundleuri,
                type:"GET",
                dataType:"json",

                success:function (result) {
                    var data=JSON.parse(JSON.stringify(result));
                    var msg=data.commercialDescription
                    alert(msg)
                    console.log(data)
                },
                failure: function (fail) {
                    alert("FAILURE :"+fail)
                    //console.log(fail.responseText)
                },
                error:function (error) {
                    var err=Json.parse(JSON.stringify(error))
                    alert(err.statusText)
                    console.log(err.statusText)
                }
            });
        }
    }else{
        buybundleuri+="/"+regmobile+"/"+othernumber+"/"+product

        $.ajax({
            url:buybundleuri,
            type:"GET",
            dataType:"json",

            success:function (result) {
                var data=JSON.parse(JSON.stringify(result));
                var msg=data.commercialDescription
                alert(msg)
                console.log(data)
            },
            failure: function (fail) {
                alert("FAILURE :"+fail)
                //console.log(fail.responseText)
            },
            error:function (error) {
                var err=Json.parse(JSON.stringify(error))
                alert(err.statusText)
                console.log(err.statusText)
            }
        });
    }
}
