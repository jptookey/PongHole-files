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
    $("#saveChange").hide();
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
            email2 = results.userEmail;
            $("#userName").val(results.PUBNAME);
            $("#firstName").val(results.FNAME);
            $("#lastName").val(results.LNAME);
            $("#zipCode").val(results.ZIP);
            $("#DOB").val(results.DOB);
            if (results.GENDER == 'M') {
                $("#labelM").addClass('genderB');
            } else if (results.GENDER == 'F') {
                $("#labelF").addClass('genderB');
            }
            $("input[name=gender]:checked").val(results.GENDER);
            $("#emailNew").text(email2);
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


function enableC() {
    alert('Hi jack!');
    if(document.getElementById("userName").disabled=true) {
        document.getElementById("userName").disabled = false;
        document.getElementById("firstName").disabled = false;
        document.getElementById("lastName").disabled = false;
        document.getElementById("zipCode").disabled = false;
        document.getElementById("DOB").disabled = false;
        document.getElementById("genderF").disabled = false;
        document.getElementById("genderM").disabled = false;
       // document.getElementById("emailNew").disabled = false;
      //  $('#emailNew').removeClass("border1").addClass("readyChange required");
        $('#userName').removeClass("border1").addClass("readyChange required");
        $('#firstName').addClass("readyChange");
        $('#lastName').addClass("readyChange");
        $('#DOB').addClass("readyChange");
        $('#zipCode').addClass("readyChange");
        $('#pwChange').hide();
        $('#emailChange').hide();
        $('#saveChange').show().text("Save Changes");
    }
}

function pushChange() {
    if(document.getElementById("userName").disabled=false) {
        document.getElementById("userName").disabled = true;
        document.getElementById("firstName").disabled = true;
        document.getElementById("lastName").disabled = true ;
        document.getElementById("zipCode").disabled = true;
        document.getElementById("DOB").disabled = true;
        document.getElementById("genderF").disabled = true;
        document.getElementById("genderM").disabled = true;
      //  document.getElementById("emailNew").disabled = false;
        //  $('#emailNew').removeClass("border1").addClass("readyChange required");
        $('#userName').removeClass("readyChange required").addClass("border1");
        $('#firstName').removeClass("readyChange");
        $('#lastName').removeClass("readyChange");
        $('#DOB').removeClass("readyChange");
        $('#zipCode').removeClass("readyChange");
        $('#pwChange').show();
        $('#emailChange').show();
        $('#saveChange').hide().text("Save Changes");
        varUserP = {
            key:userKey,
            userName: document.getElementById("userName").value,
            firstName:  document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            zipCode: document.getElementById("zipCode").value,
            DOB: document.getElementById("DOB").value,
            gender: $("input[name=gender]:checked").val()
        };
        varUserP2 = JSON.stringify(varUserP)

//TODO: Get the PHP Script working here
        $.ajax({
            type: "POST",
            url: "/scripts/updateUser.php",
            data: varUserP2,
            cache: false,
            dataType: "json",
            success: function () {
                loadUser();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        });

    }
}



function updatePW() {
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
            "<p>Old Password:</p>"+
        "<input class='border1' id='pwOld' type='password' placeholder='Old Password'/input>" + "</br>"+
            "<p id=pwVal></p>"+
            "<p>New Password:</p>"+
        "<input class='border1' id='pwNew1' type='password' placeholder='New Password'/input>" +
            "<p>Repeat New Password:</p>"+
        "<input class='border1' id='pwNew2' type='password' placeholder='Repeat New Password'/input>" +
        "<p id='pwCompare'></p>"+
        "<div><a data-role='button' class='border1 text1 background1' id='backButton1' rel='close'></a>" +
        "<a onclick='submitPW()' data-role='button' class='border1 text1 background1' id='nextButton1'></a></div>" +
        "</div>"
    });
}

function updateEmail() {
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent: "<div class='dialogCont'>" +
        "<div class='text1 diagHeader color1' id='diagHeadLarge'><span class='middle'>" +
        "Please enter the following to create a enter a new email address for your account. </span></div>" +
        "<p>Password:</p>"+
        "<input class='border1' id='pwOld' type='password' placeholder='Current Password'/input>" +
        "<p id='pwVal'></p></br>"+
            "<div class='border1 color1 text1' id='forgotPW onclick=sendNewPW()>Forgot Password</div>"+
            "<p id='sentmail'></p>"+
        "<p>New Email:</p>"+
        "<input class='border1' id='emailNew2' placeholder='"+email2+"'/input>" +
        "<p id='emailVal'></p>"+
        "<div><a data-role='button' class='border1 text1 background1' id='backButton1' rel='close'></a>" +
        "<a onclick='submitEmailP()' data-role='button' class='border1 text1 background1' id='nextButton1'></a></div>" +
        "</div>"
    });
}

function submitEmailP() {
    var pwOld = document.getElementById('pwOld').value;
    var emailNew1 = document.getElementById('emailNew2').value;
    var emailPW = {
        email: email2,
        pw: pwOld
    };
    var emailPWjson = JSON.stringify(emailPW);
    $.ajax({
        type: "POST",
        url: "/scripts/PW-get.php",
        data: emailPWjson,
        cache: false,
        dataType: "json",
        success: function (data) {
            var results1 = data;
            console.log(results1);
            if (results1.truth) {
                if (validateEmailP(emailNew1)) {

                    var emailVal3 = {
                        emailVal: emailNew1
                    };

                    var emailVal2 = JSON.stringify(emailVal3);
                    $.ajax({
                        type: "POST",
                        url: "/scripts/emailVal.php",
                        data: emailVal2,
                        cache: false,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            if (data > 0) {
                                $("#emailVal").show().text('Email already in use');
                            } else {

                                var pushdata = {
                                    key: userKey,
                                    email: emailNew1
                                };
                                var pushdata2 = JSON.stringify(pushdata);
                                $.ajax({
                                    type: "POST",
                                    url: "/scripts/updateEmail.php",
                                    data: pushdata2,
                                    cache: false,
                                    dataType: "json",
                                    success: function () {

                                        email2=emailNew1;
                                        console.log(email2);
                                        $("#emailNew").text(email2);
                                        $(document).trigger('simpledialog', {'method': 'close'});
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        console.log(jqXHR.responseText);
                                        console.log(JSON.stringify(jqXHR));
                                        console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                                    }
                                });
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.responseText);
                            console.log(JSON.stringify(jqXHR));
                            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                        }
                    });
                } else {
                    $("#emailVal").show().text('Please Enter a Valid Email Address');
                    $("#pwVal").hide()
                }
            } else {
                $("#pwVal").show().text('Invalid Password');
                //TODO Add a forgot email button here as well
            }
        }
    });
}

function validateEmailP(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function submitPW() {
    var pwOld = document.getElementById('pwOld').value;
    var pw1 = document.getElementById('pwNew1').value;
    var pw2 = document.getElementById('pwNew2').value;
    if (pw1===pw2) {
        console.log('CP1');
//TODO: Need to put in an AJAX call for the password check here
        if (checkPassword(pwOld, email2)) {
            console.log('CP2');
            var pw = {
                key: userKey,
                pass: pw1
            };
            var pw3 = json.stringify(pw);
            console.log('CP3');
            $.ajax({
                type: "POST",
                url: "/scripts/updatePW.php",
                data: pw3,
                cache: false,
                dataType: "json",
                success: function () {
                    $(document).trigger('simpledialog', {'method': 'close'});
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    console.log(JSON.stringify(jqXHR));
                    console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                }
            });
        } else {
            $("#pwVal").show().text('Invalid Password');
            //TODO: Add button to email password
        }
    } else {
        $("#pwVal2").show().text('Passwords do not match');
    }
}


//TODO: Add a dialog for changing password - Need to finish it
//TODO: Make a submit button to save edits
//TODO: Fix the change email button - DONE
//TODO: Add a dialog for the change email - DONE
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
                console.log('CP5');
                return (1===1);
            } else {
                return (1===2);
            }
        }
    });
}

