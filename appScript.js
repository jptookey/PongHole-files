
// TODO 1) Build an object constructor to handle input

// TODO Build an onload event that creates a logon function that checks local storage and if a variable exists, skips the pop-up and goes directly to the landing page,
// TODO Add to the initialization routine a couple of AJAX calls to load the Stats lines
var userKey ='';
var userNick = '';
$( document ).ready(function() {
    //localStorage.removeItem("email");
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
        "<a onclick='loadstats()'  /*'newUser()'*/ data-role='button' class='border1 text1' id='newUser' rel='close'></a>" +
        "</div>"
    });
    $('#password').keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13') {
            checkPassword();
        }
    });
    $('#loginemail').focusout(function(){
        console.log('You focused out');
    });
}


function checkPassword() {
    var password1 = '';
    var password2 = document.getElementById('password').value;
    var emailCheck = document.getElementById('loginemail').value;
    if (password2 === '') {
        console.log('NOT HERE');
        $('#passwordcheck').show().text('Invalid Email or Password');
            } else
    function checkPW() {
        $.ajax({
            type: "POST",
            url: "http://192.168.0.250/scripts/PW-get.php",
            data: { 'email': emailCheck },
            cache: false,
            dataType: "json",
            success: function(data)
            {
                var results = data.split(',');
                password1 = results[0];
                userKey = results[1];
                console.log(userKey);
                console.log(password1);
                pwcheck();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log( jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        });
    }
    checkPW();
    function pwcheck() {
        console.log(password1);
        console.log(password1 === password2);
        if (password1 === password2) {
            console.log('HERE');
            $.mobile.sdCurrentDialog.close();
            loadstats();
        } else {
            console.log('NOT HERE');
            $('#passwordcheck').show().text('Invalid Email or Password');
        }

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
        "<a onclick='submitUser1()' data-role='button' class='border1 text1' id='nextButton'></a>" +
        "</div>"
    });
    $('#emailNew').focusout(function(){
        $.ajax({
            type: "POST",
            url: "http://192.168.0.250/scripts/emailVal.php",
            data: userDet,
            cache: false,
            //dataType: "json",
            success: function(data)
            {
                if (data > 0) {
                    $("#emailValidate").show().text('Email already in use');
                }
            }
        });
    });
}

function submitUser1(){
    var pwNew1 = document.getElementById('pwNew1').value;
    var pwNew2 = document.getElementById('pwNew2').value;
    if (pwNew2 === pwNew1) {
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
        url: "http://192.168.0.250/scripts/newUsers.php",
        data: userDet,
        cache: false,
        dataType: "json",
        success: function(data)
        {
            userKey= data;
            $.mobile.sdCurrentDialog.close();
            loadstats();
        }
    });
}




//TODO get a real result set from a php call
function loadstats() {
    $.get("./Resources/stattest2.txt", function (data) {
        //   pulltest = data;
        //  console.log(pulltest)
        $("#pstats2").text(data);
    });
    $.get("stattest.txt", function (data) {
        $("#pstats1").text(data);
    });
    $.ajax({
        type: "POST",
        url: "http://192.168.0.250/scripts/loginTrack.php",
        data: userKey,
        cache: false,
        dataType: "json",
        success: function (data) {
            userNick = data;
        }
    })
}


function Game(){

}



//build function in scope?  Nope...won't be recognized in other functions...need to build the new function here
function start() {
  game1 = new Game();
}
var color = 'black';
var teamFlag = 0;
var oppFlag = 0;
var playerName = '';



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
        "<a onclick='otherGame()' data-role='button' class='border1 text1' rel='close' id='nextButton'></a>" +
        "</div>"
         // NOTE: the use of rel="close" causes this button to close the dialog.
        //  "<a onclick='function1()' data-role='button' rel='close' href='#'>Submit</a>" +

    });
}

function otherGame() {
    game1.gameType = document.getElementById('gameSelect');
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
            "</div>"
    });
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
        var input1 = "<input class='border1' id='emailTeam' placeholder='Teammate Email'/input>";
        var input2 = "";
    } else if (teamFlag === 3 && game1.awayPlayers === 1) {
        prompt = "Please enter in the Opponent's email and hit next";
        input1 = "<input class='border1' id='emailOpp1' placeholder='Opponent Email'/input>";
        input2 = "";
    } else if (teamFlag === 3 && game1.awayPlayers === 2) {
        prompt = "Please enter in the Opponents' email and hit next";
        input1 = "<input class='border1' id='emailOpp1' placeholder='Opponent 1 Email'/input>";
        input2 = "<input class='border1' id='emailOpp2' placeholder='Opponent 2 Email'/input>";
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
                "<a onclick='emailChoice()' data-role='button' class='border1 text1' id='nextButton' rel='close'></a>"+
            "</div>"
        });
}


function emailChoice() {
    if (teamFlag === 2) {
        game1.homePlayerEmail = document.getElementById('emailTeam').value;
     //  $.mobile.sdCurrentDialog.close();
        choosePlayers()

    } else if (teamFlag === 3 && game1.awayPlayers === 1) {
        game1.awayPlayerEmail1 = document.getElementById('emailOpp1').value;
     //   $.mobile.sdCurrentDialog.close();
        scoreEntry()

    } else if (teamFlag === 3 && game1.awayPlayers === 2) {
        game1.awayPlayerEmail1 = document.getElementById('emailOpp1').value;
        game1.awayPlayerEmail2 = document.getElementById('emailOpp2').value;
     //   $.mobile.sdCurrentDialog.close();
        scoreEntry()
    }
}

function scoreEntry() {
    if (game1.gameType == '1001') {
        var scoreHint = "<p class='text1'>Scores in Pong are the number of cups each team sinks</p>";
    } else if (game1.gameType == '1002') {
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
        "<a onclick='submitScore()' data-role='button' class='border1 text1' id='nextButton' rel='close'></a>"
    });

}

function submitScore() {
    game1.homeScore = document.getElementById('homeScore').value;
    game1.awayScore = document.getElementById('awayScore').value;
    //TODO Add a way to JSON.Stringify the object and send it to a database
    var JACK1 = JSON.stringify(game1);
    console.log(JACK1);
    nextGame()
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





//TODO figure out icons and themes

//TODO Next step for this is to capture AND validate input values, which I imagine can be done through regex validation

 //   $.mobile.sdCurrentDialog.close();


// TODO 4) Build SimpleDialog HTML box for the game selection
// TODO 5) Jquery SimpleDialog2 Function to select number of players
