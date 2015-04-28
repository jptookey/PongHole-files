// TODO 1) Build an object constructor to handle input

// TODO Build an onload event that creates a logon function that checks local storage and if a variable exists, skips the pop-up and goes directly to the landing page,
// TODO Add to the initialization routine a couple of AJAX calls to load the Stats lines

var URLout = 'http://ibtee.com/';
var userKey ='';
var userNick = '';
//var funFlag = 'No';
var guest = {};
var email = '';
guest.guest1 = false;
guest.guest2 = false;
guest.guest3 = false;
guest.guest4 = false;
//var guestF = 'No';
$( document ).ready(function() {
    //localStorage.removeItem("userKey");
    console.log(localStorage.userKey);
   // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        login();
    } else {

        loadstats();
    }
});

//TODO: Create a login or new user Dialog Box
function login() {
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent: "<div class='border1 dialogCont'>" +
        "<div class='text1 diagHeader' id='diagHeadLarge'><span class='middle'>" +
        "Welcome to PongHole! Please login or click the new user button </span></div>" +
        "<input class='border1' id='loginemail' placeholder='Your email'/input>" +
        "<input class='border1' id='password' type='password' placeholder='Password'/input>" +
            "<p id='passwordcheck'></p>"+
        "<a onclick='checkPassword()' data-role='button' class='border1 text1' id='nextButton'></a>" +

       //TODO: CHANGE BACK TO newUser() once the demo is done
        "<a onclick='newUser()'   data-role='button' class='border1 text1' id='newUser' rel='close'></a>" +
        "</div>"
    });
    $('#password').keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13') {
            checkPassword();
        }
    });

}


function checkPassword() {
    var password2 = document.getElementById('password').value;
    var emailCheck = document.getElementById('loginemail').value;
    var emailPW = {
        email: emailCheck,
        pw: password2
    };
    var emailPWjson = JSON.stringify(emailPW);
    if (password2 === '') {
        console.log('NOT HERE');
        $('#passwordcheck').show().text('Invalid Email or Password');
    } else {
        console.log(emailPWjson);
            $.ajax({
                type: "POST",
                url: URLout +"scripts/PW-get.php",
                data: emailPWjson,
                cache: false,
                dataType: "json",
                success: function (data) {
                    var results = data;
                    console.log(results);
                    console.log(results.truth);
                    console.log(results.UID);
                    if (results.truth) {
                        userKey = results.UID;
                        loadstats();
                    } else {
                        $('#passwordcheck').show().text('Invalid Email or Password');
                    }
                    console.log(results);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    console.log(JSON.stringify(jqXHR));
                    console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                }
            });
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
        blankContent: "<div class='border1 dialogCont'>" +
        "<div class='text1 diagHeader' id='diagHeadLarge'><span class='middle'>" +
        "Please enter the following information to create an account. </span></div>" +
        "<input class='border2' id='userName' placeholder='User Name'/input>" +
        "<input class='border1' id='firstName' placeholder='First Name'/input>" +
        "<input class='border1' id='lastName' placeholder='Last Name'/input>" +
        "<table id='genderT'><tr><td><label class='gender' id='labelM'>Male</label></td><td><label class='gender' id='labelF'>Female</label></td></tr>" +
        "<tr><td><input class='gender' type='radio' name='gender' id='genderM' value='M'/input></td><td>"+
        "<input class='gender' type='radio' name='gender' id='genderF' value='F'/input></td></tr></table>"+
        "<input class='border1' id='zipCode' placeholder='Zip Code'/input>" +
        "<input class='border1' id='DOB' type='date' placeholder='Date of Birth'/input>" +
        "<input class='border2' id='emailNew' placeholder='Email Address'/input>" +
        "<p id='emailValidate'></p>"+
        "<input class='border2' id='pwNew1' type='password' placeholder='Password'/input>" +
        "<input class='border2' id='pwNew2' type='password' placeholder='Repeat Password'/input>" +
        "<p id='pwCompare'></p>"+
        "<div><a onclick='login()' data-role='button' class='border1 text1' id='backButton1' rel='close'></a>" +
        "<a onclick='submitUser1()' data-role='button' class='border1 text1' id='nextButton1'></a></div>" +
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




function submitUser1(){
    var userName = document.getElementById('userName').value;
    var pwNew1 = document.getElementById('pwNew1').value;
    var pwNew2 = document.getElementById('pwNew2').value;
    var email = document.getElementById('emailNew').value;
    if (userName.length < 1 && pwNew1.length < 1 && email.length < 1) {
        $('#pwCompare').show().text('Please fill in all required fields');
    } else if (pwNew2 === pwNew1) {
        submitUser2()
    } else {
        $('#pwCompare').show().text('Please enter the same Password');
    }
}
function submitUser2() {
    var userName = document.getElementById('userName').value;
    var userPW = document.getElementById('pwNew1').value;
    var fname = document.getElementById('firstName').value;
    var lname = document.getElementById('lastName').value;
    var gender = $("input[name=gender]:checked").val();
    console.log(gender);
    var zip = document.getElementById('zipCode').value;
    var dob = document.getElementById('DOB').value;
    var email = document.getElementById('emailNew').value;
    var userDetails = {
        userName: userName,
        userpw: userPW,
        firstName: fname,
        lastName: lname,
        gender: gender,
        zip: zip,
        dob: dob,
        email: email
    };
    var userDet = JSON.stringify(userDetails);
    console.log(userDet);
    $.ajax({
        type: "POST",
        url: URLout +"scripts/newUsers.php",
        data: userDet,
        cache: false,
        dataType: "json",
        success: function(data)
        {
            console.log(data);
            userKey= data;

            loadstats();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log( jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}




//TODO get a real result set from a php call
function loadstats() {

    console.log("YOU DID IT");
    $(document).trigger('simpledialog', {'method':'close'});

    $.get("./Resources/stattest2.txt", function (data) {
        //   pulltest = data;
        //  console.log(pulltest)
        $("#pstats2").text(data);
    });
    $.get("stattest.txt", function (data) {
        $("#pstats1").text(data);
    });
    var logLog = {
        login:userKey
    };
    var log = JSON.stringify(logLog);
    $.ajax({
        type: "POST",
        url: URLout +"scripts/loginTrack.php",
        data: log,
        cache: false,
     //  dataType: "json",
        success: function (data) {
            userNick = data;
            localStorage.userKey = userKey;
            console.log(userNick);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    })
}


function Game(){

}



//build function in scope?  Nope...won't be recognized in other functions...need to build the new function here
function start() {
  game1 = new Game();
}




$(document).delegate('#opendialog', 'click', function() {
    //initialize the game object
    start();
    gameChoice();
});

function gameChoice() {
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent:
        "<div class='border1 dialogCont'>"+
        "<div class='text1 diagHeader'><span class='middle'>CHOOSE A GAME</span></div>" +
        "<a onclick='pongGame()' class='diagButton border1' id='gameChoicePongDiag' data-role='button' rel='close'></a>"+
        "<a onclick='holeGame()' class='diagButton border1' id ='gameChoiceHoleDiag' data-role='button' rel='close'></a>" +
        "<select id=gameSelect><option disabled selected> -- Choose another game -- </option><option value='1003'>Bowling</option><option value='1004'>Darts</option><option value='1005'>Kanjam</option></select>"+
        "<div><a onclick='gcBack()' data-role='button' class='border1 text1' id='backButton1' rel='close'></a>" +
        "<a onclick='otherGame()' data-role='button' class='border1 text1' rel='close' id='nextButton1'></a></div>" +
        "</div>"
         // NOTE: the use of rel="close" causes this button to close the dialog.
        //  "<a onclick='function1()' data-role='button' rel='close' href='#'>Submit</a>" +

    });

}

function gcBack() {
    teamFlag = '';
    game1.gameType = '';
    loadstats();
}

function otherGame() {
    var selected = document.getElementById('gameSelect');
    game1.gameType = selected.options[selected.selectedIndex].value;
    teamFlag = 1;
    choosePlayers()
}

function pongGame() {
    game1.gameType = '1001';
    teamFlag = 1;
    choosePlayers()
}

function holeGame() {
    game1.gameType = '1002';
    teamFlag = 1;
    choosePlayers()
}

//JUST FYI, you can chain the dialog boxes together.  Just make different functions for each dialog box,
function choosePlayers() {
    if (teamFlag === 1){
      var  prompt = 'YOUR';
        var playerButton1 = "<a onclick='oneTeam()' class='border1 diagButton' id='onePlay' data-role='button' rel='close'></a>";
        var playerButton2 = "<a onclick='twoTeam()' class='border1 diagButton' id='twoPlay' data-role='button' rel='close'></a>";
        teamFlag = 2;
    } else if (teamFlag === 2) {
        prompt = 'OPPONENT\'S';
        playerButton1 = "<a onclick='oneOpp()' class='border1 diagButton' id='onePlay' data-role='button' rel='close'></a>";
        playerButton2 = "<a onclick='twoOpp()' class='border1 diagButton' id='twoPlay' data-role='button' rel='close'></a>";
        teamFlag = 3;
    }

   // console.log(teamFlag);
   // console.log(game1.gameType);
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent:
        "<div class='border1 dialogCont'>"+
        "<div class='text1 diagHeader'><span class='middle'>"+
        "PLAYERS  ON "+ prompt + " TEAM" + "</span></div>" +
        playerButton1 +
        playerButton2 +
        "<a onclick='cpBack()' data-role='button' class='border1 text1' id='backButton' rel='close'></a>" +
            "</div>"
    });
}

function cpBack() {
    game1.homePlayers = '';
    game1.awayPlayers = '';
    game1.awayPlayerEmail1 = null;
    game1.awayPlayerEmail2 = null;
    game1.homePlayerEmail = null;
    game1.gameType = '';
    gameChoice();
}

function oneTeam() {
    game1.homePlayers = 1;
    choosePlayers();
}

function twoTeam() {
    game1.homePlayers = 2;
    emailentry();
}

function oneOpp() {
    game1.awayPlayers = 1;
    emailentry();
}

function twoOpp() {
    game1.awayPlayers = 2;
    emailentry()
}

function emailentry() {
    if (teamFlag === 2) {
        var prompt = "Please enter in your Teammate\'s email and hit next";
        var input1 = "<div class='emailEnt'><input class='border1' id='emailTeam' placeholder='Teammate Email'/input></div>"+
                    "<div class='guest guestUC' id='guest1' onclick='guestT1(1)'></div><p id='guestP'>Guest</p>";
        var input2 = "";
    } else if (teamFlag === 3 && game1.awayPlayers === 1) {
        prompt = "Please enter in the Opponent's email and hit next";
        input1 = "<div class='emailEnt'><input class='border1' id='emailOpp1' placeholder='Opponent Email'/input></div>"+
                "<div class='guest guestUC' id='guest2' onclick='guestT1(2)'></div><p id='guestP'>Guest</p>";
        input2 = "";
    } else if (teamFlag === 3 && game1.awayPlayers === 2) {
        prompt = "Please enter in the Opponents' email and hit next";
        input1 = "<div class='emailEnt'><input class='border1' id='emailOpp1' placeholder='Opponent 1 Email'/input></div>"+
                    "<div class='guest guestUC' id='guest3' onclick='guestT1(3)'></div><p id='guestP'>Guest</p>";
        input2 = "<div class='emailEnt'><input class='border1' id='emailOpp2' placeholder='Opponent 2 Email'/input></div>"+
                     "<div class='guest guestUC' id='guest4' onclick='guestT1(4)'></div><p id='guestP2'>Guest</p>";
    }

        $('<div>').simpledialog2({
            mode: 'blank',
            top: 1,
            headerText: false,
            headerClose: false,
            // dialogAllow: true,
            // dialogForce: true,
            blankContent:
            "<div class='border1 dialogCont'>"+
            "<div class='text1 diagHeader' id='diagHeadLarge'><span class='middle'>"+
            prompt + "</span></div>" +
            input1 +
            input2 +
                "<p id='emailWarn'></p>"+
            "<div></div><a onclick='cpBack()' data-role='button' class='border1 text1' id='backButton1' rel='close'></a>"+
                "<a onclick='emailChoice()' data-role='button' class='border1 text1' id='nextButton1'></a></div>"+
            "</div>"
        });

}

//TODO CHANGE the T in guestT to a variable number if possible


//TODO see if this function will work for all scenarios:
function guestT1(guestVar) {
    guestEle = '#guest'+guestVar;
    switch (guestVar) {
        case 1:
            gVar = guest.guest1;
            eVar = '#emailTeam';
            tVar = 'Teammate Email';
            pVar = '#guestP';
            break;
        case 2:
            gVar = guest.guest2;
            eVar = '#emailOpp1';
            tVar = 'Opponent Email';
            pVar = '#guestP';
            break;
        case 3:
            gVar = guest.guest3;
            eVar = '#emailOpp1';
            tVar = 'Opponent 1 Email';
            pVar = '#guestP';
            break;
        case 4:
            gVar = guest.guest4;
            eVar = '#emailOpp2';
            tVar = 'Opponent 2 Email';
            pVar = '#guestP2';
            break;
    }
    if (!gVar) {
        $(guestEle).removeClass("guestUC").addClass("guestC");
        $(eVar).prop('disabled', true).val('GUEST');
        $(pVar).css('font-weight','bold');
        switch (guestVar) {
            case 1:
                guest.guest1 = true;
                break;
            case 2:
                guest.guest2 = true;
                break;
            case 3:
                guest.guest3 = true;
                break;
            case 4:
                guest.guest4 = true;
                break;
        }
    } else {
        $(guestEle).removeClass("guestC").addClass("guestUC");
        $(eVar).val('').prop('placeholder', tVar).prop('disabled', false);
        $(pVar).css('font-weight','normal');
        switch (guestVar) {
            case 1:
                guest.guest1 = false;
                break;
            case 2:
                guest.guest2 = false;
                break;
            case 3:
                guest.guest3 = false;
                break;
            case 4:
                guest.guest4 = false;
                break;
        }
    }
}

function emailChoice() {
    if (teamFlag === 2) {
        var emailVar4  = document.getElementById('emailTeam').value;
        if (emailVar4 === null || emailVar4 === '') {
        $('#emailWarn').show().text("Please enter a valid email address or use GUEST")
        } else {
            $(document).trigger('simpledialog', {'method':'close'});
            var emailVar5 = {
                email: emailVar4
            };
            var emailVa1 = JSON.stringify(emailVar5);
            $.ajax({
                type: "POST",
                url: URLout +"scripts/oPlayerEmail.php",
                data: emailVa1,
                cache: false,
                dataType: "json",
                success: function (data) {

                    var resource1= data;
                    console.log(resource1);

                    game1.homePlayerEmail = resource1.key_out;
                    console.log(game1.homePlayerEmail);
                    choosePlayers();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    console.log(JSON.stringify(jqXHR));
                    console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                }
            });
        }
    } else if (teamFlag === 3 && game1.awayPlayers === 1) {
        var emailVar1 = document.getElementById('emailOpp1').value;
        if (emailVar1 === null || emailVar1 === '') {
            $('#emailWarn').show().text("Please enter a valid email address or use GUEST")
        } else {
            $(document).trigger('simpledialog', {'method':'close'});
            var emailVar2 = {
                email: emailVar1
            };
            var emailVa2 = JSON.stringify(emailVar2);
            $.ajax({
                type: "POST",
                url: URLout +"scripts/oPlayerEmail.php",
                data: emailVa2,
                cache: false,
                dataType: "json",
                success: function (data) {

                    var resource2 = data;
                    console.log(resource2);
                    game1.awayPlayerEmail1 = resource2.key_out;
                    console.log(game1.awayPlayerEmail1);
                    scoreEntry();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    console.log(JSON.stringify(jqXHR));
                    console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                }
            });
        }
    } else if (teamFlag === 3 && game1.awayPlayers === 2) {
        var emailVar6 = document.getElementById('emailOpp1').value;
        var emailVar8 = document.getElementById('emailOpp2').value;
        if ((emailVar6 === null || emailVar6 === '') && (emailVar8 === null || emailVar8 === '')) {
            $('#emailWarn').show().text("Please enter a valid email address or use GUEST");

        } else {
            //HERE'sTHE PROBLEM
            $(document).trigger('simpledialog', {'method':'close'});
            var emailVar7 = {
                email: emailVar6,
                email2: emailVar8
            };
            var emailVa3 = JSON.stringify(emailVar7);
            $.ajax({
                type: "POST",
                url: URLout +"scripts/oPlayersEmail.php",
                data: emailVa3,
                cache: false,
                dataType: "json",
                success: function (data) {

                    var resource3 = data;
                    console.log(resource3);
                    game1.awayPlayerEmail1 = resource3.key_out1;
                    game1.awayPlayerEmail2 = resource3.key_out2;
                    console.log(game1.awayPlayerEmail1);
                    console.log(game1.awayPlayerEmail2);
                    scoreEntry();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    console.log(JSON.stringify(jqXHR));
                    console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
                }
            });
         }
    }
}

function scoreEntry() {
  //
    if (game1.gameType == '1001') {
        var scoreHint = "<p class='text1'>Scores in Pong are the number of cups each team sinks</p>";
    } else  {
        scoreHint = "";
    }
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent: "<div class='border1 dialogCont'>" +
        "<div class='text1 diagHeader' id='diagHeadLarge'><span class='middle'>Please enter the scores of both teams and hit next</span></div>" +
            scoreHint+
        "<input class='border1 text1' id='homeScore' placeholder='Your Score'/input>" +
        "<input class='border1 text1' id='awayScore' placeholder='Opponent Score'/input>" +
        "<div></div><a onclick='cpBack()' data-role='button' class='border1 text1' id='backButton1' rel='close'></a>"+
        "<a onclick='submitScore()' data-role='button' class='border1 text1' id='nextButton1' rel='close'></a></div>"
    });

}

function submitScore() {
    game1.homeScore = document.getElementById('homeScore').value;
    game1.awayScore = document.getElementById('awayScore').value;
    //TODO Add a way to JSON.Stringify the object and send it to a database
    var game2 = {
        player1: userKey,
        player2: game1.homePlayerEmail,
        player3: game1.awayPlayerEmail1,
        player4: game1.awayPlayerEmail2,
        gametype: game1.gameType,
        scoreH: game1.homeScore,
        scoreA: game1.awayScore
    };
    console.log(game2);
    var JACK1 = JSON.stringify(game2);
    console.log(JACK1);
    $.ajax({
        type: "POST",
        url: URLout +"scripts/pushGame.php",
        data: JACK1,
        cache: false,
        dataType: "json",
        success: function () {
              nextGame();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });

}

function nextGame() {
    if (game1.homeScore > game1.awayScore) {
        var gameMessage = "<p class='text1'>Congratulation!! Want to continue dominating?</p>";
    } else if (game1.homeScore < game1.awayScore) {
        gameMessage = "<p class='text1'>Too bad! Another game to prove your worth?</p>";
    } else if (game1.homeScore == game1.awayScore) {
        gameMessage = "<p class='text1'>A Tie! Sounds like you need a rematch!</p>";
    }
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent: "<div class='border1 dialogCont'>" +
        gameMessage +
        "<a onclick='rematch()' data-role='button' class='border1 text1' id='rematchButton' rel='close'></a>" +
        "<a onclick='newGame()' data-role='button' class='border1 text1' id='newGameButton' rel='close'></a>" +
        "<a onclick='done()' data-role='button' class='border1 text1' id='nextButton' rel='close'></a>"
    });
}

function rematch() {
    //TODO come up with a way to generate a unique game number
    game1.homeScore = '';
    game1.awayScore = '';
    scoreEntry()
}

function newGame() {
    game1.awayPlayerEmail1 = '';
    game1.awayPlayerEmail2 = '';
    game1.homeScore = '';
    game1.awayScore = '';
    game1.gameType = '';
    teamFlag = 0;
    game1.awayPlayers = '';
    game1.homePlayers = '';
    game1.homePlayerEmail = '';
    gameChoice();
}

function done () {
    console.log('We are done')
}

function logout() {
    localStorage.removeItem("userKey");
    userKey = '';
    userNick = '';
    game1 = '';
    login();
}



//TODO figure out icons and themes

//TODO Next step for this is to capture AND validate input values, which I imagine can be done through regex validation

 //   $.mobile.sdCurrentDialog.close();  $(document).trigger('simpledialog', {'method':'close'});


// TODO 4) Build SimpleDialog HTML box for the game selection
// TODO 5) Jquery SimpleDialog2 Function to select number of players
