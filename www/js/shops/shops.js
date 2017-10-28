var uri="http://telecelmobileapp.telecel.co.zw/TelecelBundleRestService/rest/shops";
var lats=null;
var lons=null;
var index=0;

function getShopsList() {

    $.ajax({
        url:uri,
        type:"GET",
        dataType:"json",

        success:function (result) {
            var data=JSON.parse(JSON.stringify(result));
            var tab="<table width='100%' id='tblShops' data-role='table' data-mode=\"columntoggle\" class='ui-body-d ui-shadow table-stripe ui-responsive' " +
                "data-column-btn-text=''> "+
                "<thead>" +
                "<tr>" +
                "<th>NAME</th>" +
                "<th>TYPE</th>" +
                "<th>IS ACTIVE</th>" +
                "<th>LATITUDE</th>" +
                "<th>LONGITUDE</th>" +
                "<th>ON MAP</th>" +
                "</tr>" +
                "</thead>"+
                "<tbody> " ;

            $.each(data,function (index,shop) {
                tab=tab+"<tr>" +
                "<td><span class='spName'>"+shop.name+"</span></td>" +
                "<td><span class='spType'>"+shop.type+"</span></td>" +
                "<td><span class='spActive'>"+shop.isActive+"</span></td>" +
                "<td><span class='spLattitude'>"+shop.latitude+"</span></td>" +
                "<td><span class='spLongitude'>"+shop.longitude+"</span></td>" +
                "<td><a  href='index2.html' data-transition='flip'><i class='fa fa-map-marker' aria-hidden='false'></i>Map</a> </td>" +
                "</tr>";
            })
            tab=tab+"</tbody>" +
                "</table>"
            $("#shopsList").html(tab)
        },
        failure: function (fail) {
            console.log(fail.responseText)
            alert("FAILURE :"+fail)

        },
        error:function (error) {
            console.log(error.responseText)
            alert("ERROR :\n"+error.responseText)

        }
    });
}






$("#pgShopsList").on("pageshow",getShopsList)
