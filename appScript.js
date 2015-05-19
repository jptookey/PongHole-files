
// TODO 1) Build an object constructor to handle input

function Game(gameType, homePlayers, homePlayerEmail, awayPlayers, awayPlayerEmail1, awayPlayerEmail2, homeScore, awayScore){
    this.gameType = gameType;
    this.homePlayers = homePlayers;
    this.homePlayerEmail = homePlayerEmail;
    this.awayPlayers = awayPlayers;
    this.awayPlayerEmail1 = awayPlayerEmail1;
    this.awayPlayerEmail2 = awayPlayerEmail2;
    this.homeScore = homeScore;
    this.awayScore = awayScore;
}


// TODO 2) Build functions to input data into object

//build function in scope?  Nope...won't be recognized in other functions...need to build the new function here
function start() {
  game1 = new Game();
}
var color = 'black';
var teamFlag = 0;
var oppFlag = 0;
var playerName = '';
//var teammateemail = 0;


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
        "</div>"
        // divtest +
        // "<input id='emailop2id'/></div>" +

        // NOTE: the use of rel="close" causes this button to close the dialog.
        //  "<a onclick='function1()' data-role='button' rel='close' href='#'>Submit</a>" +
        //  divtest2
    });
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
        var input1 = "<input class='border1' id='emailTeam' value='Teammate Email'/input>";
        var input2 = "";
    } else if (teamFlag === 3 && game1.awayPlayers === 1) {
        prompt = "Please enter in the Opponent's email and hit next";
        input1 = "<input class='border1' id='emailOpp1' value='Opponent Email'/input>";
        input2 = "";
    } else if (teamFlag === 3 && game1.awayPlayers === 2) {
        prompt = "Please enter in the Opponents' email and hit next";
        input1 = "<input class='border1' id='emailOpp1' value='Opponent 1 Email'/input>";
        input2 = "<input class='border1' id='emailOpp2' value='Opponent 2 Email'/input>";
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
        "<input class='border1 text1' id='homeScore' value='Your Score'/input>" +
        "<input class='border1 text1' id='awayScore' value='Opponent Score'/input>" +
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
        "<a onclick='rematch()' data-role='button' class='border1 text1' id='nextButton' rel='close'></a>" +
        "<a onclick='newGame()' data-role='button' class='border1 text1' id='nextButton' rel='close'></a>" +
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
