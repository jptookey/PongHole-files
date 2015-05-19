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

function newUser() {
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent: "<div class='dialogCont'>" +
        "<div class='text1 diagHeader color1' id='diagHeadLarge'><span class='middle'>" +
        "Please enter the following information to create an account. </span></div>" +
        "<input class='border1' id='userName' placeholder='User Name'/input>" +
        "<input class='border1' id='firstName' placeholder='First Name'/input>" +
        "<input class='border1' id='lastName' placeholder='Last Name'/input>" +
        "<table id='genderT'><tr><td><label class='gender' id='labelM'>Male</label></td><td><label class='gender' id='labelF'>Female</label></td></tr>" +
        "<tr><td><input class='gender' type='radio' name='gender' id='genderM' value='M'/input></td><td>"+
        "<input class='gender' type='radio' name='gender' id='genderF' value='F'/input></td></tr></table>"+
        "<input class='border1' id='zipCode' placeholder='Zip Code'/input>" +
        "<p id='zipValidate'></p>"+
        "<input class='border1' id='DOB' type='date' placeholder='Date of Birth'/input>" +
        "<input class='border1' id='emailNew' placeholder='Email Address'/input>" +
        "<p id='emailValidate'></p>"+
        "<input class='border1' id='pwNew1' type='password' placeholder='Password'/input>" +
        "<input class='border1' id='pwNew2' type='password' placeholder='Repeat Password'/input>" +
        "<p id='pwCompare'></p>"+
        "<div><a onclick='login()' data-role='button' class='border1 text1 background1' id='backButton1' rel='close'></a>" +
        "<a onclick='submitUser1()' data-role='button' class='border1 text1 background1' id='nextButton1'></a></div>" +
        "</div>"
    });
    $('#emailNew').focusout(function(){
        email = document.getElementById('emailNew').value;
        if(validateEmail(email)) {
            var emailVal3 = {
                emailVal: email
            };
            var emailVal2 = JSON.stringify(emailVal3);
            console.log(emailVal2);
            $.ajax({
                type: "POST",
                url: URLout +"scripts/emailVal.php",
                data: emailVal2,
                cache: false,
                dataType: "json",
                success: function(data)
                {
                    console.log(data);
                    if (data > 0) {
                        $("#emailValidate").show().text('Email already in use');
                        $("#emailNew").val('');
                    } else {
                        $("#emailValidate").hide().text('Email already in use');
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log( jqXHR.responseText);
                    console.log(JSON.stringify(jqXHR));
                    console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                }
            });
        } else {
            $('#emailValidate').show().text('Please enter a valid email');
        }
    });
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

//TODO: Add a dialog for changing password
//TODO: Make EDIT button enable everything for changes
//TODO: Make a SAVE button
//TODO: Add the pushes and pulls
