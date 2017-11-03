var buybundleuri="http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/purchase/mobileapp";

$("#btnPurchaseBundleFromCore").on("click",function () {
    try{
        //get user registration info if exists
        NativeStorage.getItem("user",
            //success function
            function (user) {
            var regmobile=user.msisdn;
            var regpin=user.pin;
            var product=$("#divBundleOptions :selected").val();
            var selfother=$("#divBuyForOtherControlGroup :checked").val();
            var othermobile=$("#txtBundleForNumber").val()

            //verify user info successfully retrieved
            if(regmobile && regpin)
            {
                //ensure product is selected
                if(product){

                    // prompt user for pin
                    navigator.notification.prompt("Please Enter Your Pin",function (result) {
                        if(result.buttonIndex==1){//0  is cancelled, 1 is 1st button, 2 is second button e.t.c.
                            if(result.input1==regpin) //check first input prompted to the user is the valid registered PIN
                            {
                                try{
                                    //execute ajax method
                                    doAjax(regmobile,product,selfother,othermobile)
                                }catch(e){
                                    console.log(JSON.stringify(e))
                                    navigator.notification.alert("Error :"+e.toString(),null,"ERROR DOING TRANSACTION","OK");
                                }
                            }else{
                                navigator.notification.alert("You entered an invalid pin",null,"Authentication Error","OK")
                            }
                        }
                    },"Authenticate Transaction",["Proceed","Cancel"]) //title, [array of buttons]


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

    //check if buying for self or other
    if(selfother=='other')
    {
        var validMSISDN=validMobile(othernumber).toString().trim(); //return validated other number
        if(validMSISDN.length>8){ //check if valid lenght

            //format uri with base url and arguments
          var bun=  buybundleuri+"/"+regmobile+"/"+othernumber+"/"+product

            //access service
            $.ajax({
                url:bun,
                type:"GET",
                dataType:"json",

                success:function (result) {
                    var data=JSON.parse(JSON.stringify(result));
                    var msg=data.commercialDescription
                    navigator.notification.alert(msg,null,"Bundle Purchase","OK")
                    console.log(data)
                },
                failure: function (fail) {
                    navigator.notification.alert(JSON.parse(JSON.stringify(fail)).commercialDiscription,null,"Bundle Purchase","OK")
                    console.log(JSON.stringify(fail))
                },
                error:function (error) {
                    var err=JSON.parse(JSON.stringify(error))
                    navigator.notification.alert(JSON.stringify(error),null,"Bundle Purchase","OK")
                    console.log(JSON.stringify(error))
                }
            });
        }
    }else{         //buy for self
        var bun=buybundleuri+"/"+regmobile+"/"+product

        $.ajax({
            url:bun,
            type:"GET",
            dataType:"json",

            success:function (result) {
                var data=JSON.parse(JSON.stringify(result));
                alert(result)
                console.log(result)
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
