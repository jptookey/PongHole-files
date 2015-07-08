var notes1 = {};

$( document ).ready(function() {
    //localStorage.removeItem("userKey");

    console.log(localStorage.userKey);
    // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        window.location.assign("/Ponghole.html");
    } else {

        userKey = localStorage.userKey;
        console.log(userKey);
        data1 = {
            userKey: userKey
        };

        data2 = JSON.stringify(data1);
        console.log(data2);
        $.ajax({
            type: "POST",
            url: "/scripts/getNotes1.php",
            data: data2,
            cache: false,
            dataType: "json",
            success: function (data) {

               console.log('Here1');
                notes1 = data;
                console.log(notes1.length);
                console.log(notes1[0][3]);


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        });

    }
});

function goback() {
    window.location.assign("/Ponghole.html");
}






//TODO: Add an append function that uses HTML and a function with an 'i' for a for-loop.

/*

AJAX into ARRAY

var lengthi = ARRAY.length
for(i=0;i<lengthi;i++) {
$("BigBox").append("<div class='bubble' onclick='function("+i+")>Gamestatsblablabla</div>");

function(i) {
    SimpleDialog box with ARRAY[i] information
    }

 */