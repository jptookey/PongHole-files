$( document ).ready(function() {
    //localStorage.removeItem("userKey");

    console.log(localStorage.userKey);
    // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        window.location.assign("/Ponghole.html");
    } else {

        userKey = localStorage.userKey;
        console.log(userKey);
       // loadstats();
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