var userKey = '';
var universityList = '';

$( document ).ready(function() {
    $( "select" ).selectmenu();
    $('select').selectmenu({ icon: "star" });
    /*for(i=0;i <1; i++) {
     location.reload(true);
     }*/
    //localStorage.removeItem("userKey");
    $("#saveChangeO").hide();
    $('#saveChangeOB').hide();

   // console.log(document.getElementById("userScale").disabled+"1");
    $('#userScale').selectmenu('disable');
    //document.getElementById("userScale").disabled = true;
    console.log(document.getElementById("userScale").disabled+"2");
    $('#notificationStyle').selectmenu('disable');
   // document.getElementById("notificationStyle").disabled = true;
 //   console.log(localStorage.userKey);
    // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        window.location.assign("/Ponghole.html");
    } else {
        userKey = localStorage.userKey;
        //console.log(userKey);

        loadUserO();
    }
});

function loadUserO() {
    console.log('One');
    var uk = {
        key: userKey
    };
    var varKey = JSON.stringify(uk);
    $.ajax({
        type: "POST",
        url: "/scripts/getOptions.php",
        data: varKey,
        cache: false,
        dataType: "json",
        success: function (data) {
            var results = data;
           // console.log('two');
           // console.log(results);
            $("#userOrg").val(results.userOrg);
            $('select#userScale').val(results.userScalePref).change();
            $('select#notificationStyle').val(results.userNotePref).change();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}

function gobackO() {
    window.location.assign("/Ponghole.html");
}

function enableChangeO() {
    console.log(document.getElementById("userScale").disabled+"3");
    if(document.getElementById("userScale").disabled) {
        console.log(document.getElementById("userScale").disabled+"4");
        $('#userScale').selectmenu('enable');
        console.log(document.getElementById("userScale").disabled+"5");
        $('#notificationStyle').selectmenu('enable');
        //document.getElementById("notificationStyle").disabled = false;
        document.getElementById("userOrg").disabled = false;
       // console.log(document.getElementById("userOrg").disabled+"1");
      //  console.log(document.getElementById("userScale").disabled+"2");
      //  console.log('Three');
        $.ajax({
            type: "GET",
            url: "/scripts/search4.php",
            //data: data2,
            cache: false,
            dataType: "json",
            success: function (data) {
              //  console.log(1);
             //   console.log(document.getElementById("userScale").disabled+"4");
                console.log(document.getElementById("userScale").disabled+"6");
                var results = data;
                universityList=results.suggestions;
               // console.log(universityList);
                disco();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        });
    }
}

function pushOptionsO() {
    console.log('Four');
    console.log(document.getElementById("userScale").disabled+"7");
    document.getElementById("userScale").disabled = true;
    console.log(document.getElementById("userScale").disabled+"8");
    document.getElementById("notificationStyle").disabled = true;
    document.getElementById("userOrg").disabled = true;
    $('#saveChangeO').hide();
    $('#saveChangeOB').hide();
    var dataPush2 = {
        key: userKey,
        userScalePref: document.getElementById("userScale").value,
        userNotePref: document.getElementById("notificationStyle").value,
        userOrg: document.getElementById("userOrg").value
    };
    console.log(dataPush2);
    var varKey2 = JSON.stringify(dataPush2);
    console.log(varKey2);
    $.ajax({
        type: "POST",
        url: "/scripts/pushOptions.php",
        data: varKey2,
        cache: false,
        dataType: "json",
        success: function (data) {
            var results = data;
            console.log('Five');
            console.log(results);
            loadUserO();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}


function goBackNoSaveO() {
    console.log(document.getElementById("userScale").disabled+"9");
    document.getElementById("userScale").disabled = true;
    console.log(document.getElementById("userScale").disabled+"10");
    document.getElementById("notificationStyle").disabled = true;
    document.getElementById("userOrg").disabled = true;
    $('#saveChangeO').hide();
    $('#saveChangeOB').hide();
    var uk = {
        key: userKey
    };
    var varKey = JSON.stringify(uk);
    $.ajax({
        type: "POST",
        url: "/scripts/getOptions.php",
        data: varKey,
        cache: false,
        dataType: "json",
        success: function (data) {
            var results = data;
            // console.log('two');
            // console.log(results);
            $("#userOrg").val(results.userOrg);
            $('select#userScale').val(results.userScalePref).change();
            $('select#notificationStyle').val(results.userNotePref).change();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}

function disco() {
  //  console.log(document.getElementById("userScale").disabled+"11");
    $('#saveChangeO').show();//.text('Save Changes');
    $('#saveChangeOB').show();
    $('#saveChang0').text('Save Changes');
    $('#userOrg').autocomplete({
        lookup: universityList,
        onSelect: function (suggestion) {
            this.value = suggestion.data;
            console.log(document.getElementById("userScale").disabled+"12");
        }
    });
}


/*
var countries = [
    { value: 'Andorra', data: 'AD' },
    // ...
    { value: 'Zimbabwe', data: 'ZZ' }
];

console.log(countries);
*/


/*This is to test out the jquery.autocomplete plugin*/
/*
//var lookup = '';
$('#userOrg').autocomplete({
        serviceUrl: "/scripts/search4.php",
        paramName: 'search',
        minChars: 2,
        onSelect: function (suggestion) {
            console.log(suggestion)
        }
});
*/
/*This is to test out how multiple lines are returned*/
/*
function testOptions2() {
    var data1 = {
        search: 'north c'
    };
    var data2 = JSON.stringify(data1);
    $.ajax({
        type: "POST",
        url: "/scripts/search.php",
        data: data2,
        cache: false,
        dataType: "json",
        success: function (data) {
            console.log(1);
            var results = data;
            console.log(results.suggestions);
            console.log(data);
            lookup = data;
            console.log(results.length);
            console.log(results);
        //    results.forEach(function(entry){
         //       $("#bigBorder").append("<div class='chgButton'>"+entry+"</div");

              // document.getElementById("Div1").className += " chgButton";
         //   });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}
*/

/* SOME CODE I FOUND HUNTING THAT MAY HELP THE AUTOCOMPLETE
$( document ).on( "pageinit", "#template", function() {
    $( "#userOrg" ).on( "listviewbeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
        $ul.html( "" );
        if ( value && value.length > 2 ) {
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview( "refresh" );
            $.ajax({
                url: "productautocomplete.php",
                type: "POST",
                dataType: "json",
                data: {
                    q: $input.val()
                }
            })
                .then( function (data) {
                    $.each( data, function ( i, val ) {
                       /*html += "<li><a href='#' data-role='none' value=" + val.productId + ">" + val.productName + "</a></li>"; *//*
                        html += '<li class="upperUlProductSearch" id=' + val.productId + '>' + val.productName + '</li>';
                    });
                    $ul.html( html );
                    $ul.listview( "refresh" );
                    $ul.trigger( "updatelayout");
                });
        }
    });
})

$(".upperUlProductSearch").click(function() {
    alert ("helleo");
});
*/