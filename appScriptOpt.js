var userKey = '';

$( document ).ready(function() {
    /*for(i=0;i <1; i++) {
     location.reload(true);
     }*/
    //localStorage.removeItem("userKey");
    $("#saveChangeO").hide();
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
            $('select#userNotePref').val(results.userNotePref).change();

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
        console.log('Three');
    }
}

function pushOptions() {
    console.log('Four');
    document.getElementById("userScale").disabled = true;
    document.getElementById("notificationStyle").disabled = true;
    document.getElementById("userOrg").disabled = true;
    $('#saveChangeO').hide();
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

/* SOME CODE I FOUND HUNTING THAT MAY HELP THE AUTOCOMPLETE
$( document ).on( "pageinit", "#template", function() {
    $( "#upperApplianceSearch" ).on( "listviewbeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
        $ul.html( "" );
        if ( value && value.length > 1 ) {
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