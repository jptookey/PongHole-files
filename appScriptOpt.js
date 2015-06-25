var userKey = '';
var universityList = '';

$( document ).ready(function() {
    /*for(i=0;i <1; i++) {
     location.reload(true);
     }*/
    //localStorage.removeItem("userKey");
    $("#saveChangeO").hide();
    $('#saveChangeOB').hide();
    document.getElementById("userScale").disabled = true;
    document.getElementById("notificationStyle").disabled = true;
    console.log(localStorage.userKey);
    // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        window.location.assign("/Ponghole.html");
    } else {
        userKey = localStorage.userKey;
        //console.log(userKey);

        loadUser();
    }
});

function loadUser() {
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

function goback() {
    window.location.assign("/Ponghole.html");
}

function enableChange() {
    if(document.getElementById("userScale").disabled) {
        document.getElementById("userScale").disabled = false;
        document.getElementById("notificationStyle").disabled = false;
        document.getElementById("userOrg").disabled = false;
        $('#saveChangeO').show().text('Save Changes');
        $('#saveChangeO').show();
        console.log('Three');
        $.ajax({
            type: "GET",
            url: "/scripts/search4.php",
            //data: data2,
            cache: false,
            dataType: "json",
            success: function (data) {
                console.log(1);
                var results = data;
                universityList=results.suggestions;
                console.log(universityList);
                $('#userOrg').autocomplete({
                    lookup: universityList,
                    onSelect: function (suggestion) {
                        this.value = suggestion.data;
                    }
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        });
    }
}

function pushOptions() {
    console.log('Four');
    document.getElementById("userScale").disabled = true;
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
            loadUser();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}


function goBackNoSave() {
    document.getElementById("userScale").disabled = true;
    document.getElementById("notificationStyle").disabled = true;
    document.getElementById("userOrg").disabled = true;
    $('#saveChangeO').hide();
    $('#saveChangeOB').hide();
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