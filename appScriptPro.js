$( document ).ready(function() {
    //localStorage.removeItem("userKey");

    console.log(localStorage.userKey);
    // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        window.location.assign("http://ibtee.com");
    } else {

        userKey = localStorage.userKey;
        console.log(userKey);
       // loadstats();
    }
});

function goback() {
    window.location.assign("http://ibtee.com");
}