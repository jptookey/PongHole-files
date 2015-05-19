/*
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
    */

function enableC() {
    if(document.getElementById("emailNew").disabled=true) {
        document.getElementById("userName").disabled = false;
        document.getElementById("firstName").disabled = false;
        document.getElementById("lastName").disabled = false;
        document.getElementById("zipCode").disabled = false;
        document.getElementById("DOB").disabled = false;
        document.getElementById("genderF").disabled = false;
        document.getElementById("genderM").disabled = false;
        document.getElementById("emailNew").disabled = false;
        $('#emailNew').removeClass("border1").addClass("readyChange required");
        $('#userName').removeClass("border1").addClass("readyChange required");
        $('#firstName').addClass("readyChange");
        $('#lastName').addClass("readyChange");
        $('#DOB').addClass("readyChange");
        $('#zipCode').addClass("readyChange");
    }
}

//TODO: Add a dialog for changing password
//TODO: Make EDIT button enable everything for changes
//TODO: Make a SAVE button
//TODO: Add the pushes and pulls
