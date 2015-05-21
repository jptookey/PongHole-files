var userKey = '';
var email2 = '';
/*
var zipCode = '';
var DOB = '';
var gender = '';
var userName= '';
var firstName = '';
var lastName = '';
*/

$( document ).ready(function() {
    /*for(i=0;i <1; i++) {
        location.reload(true);
    }*/
    //localStorage.removeItem("userKey");

    console.log(localStorage.userKey);
    // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        window.location.assign("/Ponghole.html");
    } else {
        userKey = localStorage.userKey;
        console.log(userKey);
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
            success: function(data)
            {
                var results = data;
                console.log(results);
                email2 = results.userEmail;
                $("#userName").val(results.PUBNAME);
                $("#firstName").val(results.FNAME);
                $("#lastName").val(results.LNAME);
                $("#zipCode").val(results.ZIP);
                $("#DOB").val(results.DOB);
                if(results.GENDER == 'M')
                {
                    $("#labelM").addClass('genderB');
                } else if (results.GENDER =='F') {
                    $("#labelF").addClass('genderB');
                }
                $("input[name=gender]:checked").val(results.GENDER);
                $("#emailNew").text(email2);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log( jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        })
    }
});

function goback() {
    window.location.assign("/Ponghole.html");
}


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
      //  $('#emailNew').removeClass("border1").addClass("readyChange required");
        $('#userName').removeClass("border1").addClass("readyChange required");
        $('#firstName').addClass("readyChange");
        $('#lastName').addClass("readyChange");
        $('#DOB').addClass("readyChange");
        $('#zipCode').addClass("readyChange");
    }
}

function enableC2() {
    alert('IT WORKED2');
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent: "<div class='dialogCont'>" +
        "<div class='text1 diagHeader color1' id='diagHeadLarge'><span class='middle'>" +
        "Please enter the following to create a new password. </span></div>" +
        "<input class='border1' id='pwOld' type='password' placeholder='Old Password'/input>" + "</br>"+
            "<p id=pwVal></p>"+
        "<input class='border1' id='pwNew1' type='password' placeholder='New Password'/input>" +
        "<input class='border1' id='pwNew2' type='password' placeholder='Repeat New Password'/input>" +
        "<p id='pwCompare'></p>"+
        "<div><a data-role='button' class='border1 text1 background1' id='backButton1' rel='close'></a>" +
        "<a onclick='submitPW()' data-role='button' class='border1 text1 background1' id='nextButton1'></a></div>" +
        "</div>"
    });
    $('#pwOld').focusout(function(){
        var pwvar = document.getElementById('pwOld').value;
        var emailVal2 = JSON.stringify(pwvar);
        //console.log(emailVal2);
            $.ajax({
                type: "POST",
                url: "/scripts/checkPW.php",
                data: emailVal2,
                cache: false,
                dataType: "json",
                success: function(data)
                {
                    console.log(data);
                    if (data > 0) {
                        $("#pwVal").show().text('Invalid Password');
                        $("#pwOld").val('');
                    } else {
                        $("#pwVal").hide();
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log( jqXHR.responseText);
                    console.log(JSON.stringify(jqXHR));
                    console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                }
            });

    });
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function submitPW() {
    var pw1 = document.getElementById('pwNew1').value;
    var pw2 = document.getElementById('pwNew2').value;
    if (pw1===pw2) {
        var pw3 = json.stringify(pw1);
        $.ajax({
            type: "POST",
            url: "/scripts/pushPW.php",
            data: emailVal2,
            cache: false,
            dataType: "json",
            success: function(data)
            {
               return('done');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log( jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        });
    } else {
        $("#pwVal2").show().text('Passwords do not match');
    }
}


//TODO: Add a dialog for changing password - Need to finish it
//TODO: Make a submit button to save edits
//TODO: Fix the change email button
//TODO: Add a dialog for the change email
//TODO: Add a button to send mail if they forgot their password (if they get the Old Password wrong)
//TODO: Scripts Needed:  Push new values; Check Passwords; Check Email;

function checkPassword(password, email1) {
    var emailPW = {
        email: email1,
        pw: password
    };
    var emailPWjson = JSON.stringify(emailPW);
    $.ajax({
        type: "POST",
        url: "/scripts/PW-get.php",
        data: emailPWjson,
        cache: false,
        dataType: "json",
        success: function (data) {
            var results = data;
            console.log(results);
            console.log(results.truth);
            console.log(results.UID);
            if (results.truth) {
                return true;
            } else {
                return false;
            }
        }
    });
}
