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
        console.log(userKey);

        loadUser();
    }
});

function loadUser() {
    var uk = {
        key: userKey
    };
    var varKey = JSON.stringify(uk);
    $.ajax({
        type: "POST",
        url: "/scripts/getUser.php",
        data: varKey,
        cache: false,
        dataType: "json",
        success: function (data) {
            var results = data;
            console.log(results);
            $("#userOrg").val(results.userOrg);
            $("#userScale").val(results.userScalePref);
            $("#userNotePref").val(results.userNotePref);

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
    }
}

function pushOptions() {
    document.getElementById("userScale").disabled = true;
    document.getElementById("notificationStyle").disabled = true;
    document.getElementById("userOrg").disabled = true;
    $('#saveChangeO').hide();
}