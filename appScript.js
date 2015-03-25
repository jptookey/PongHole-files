
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
var teammateemail = 0;
// TODO 3) Build SimpleDialog2 Function on the play button

$(document).delegate('#opendialog', 'click', function() {
    //initialize the game object
    start();
    $('<div>').simpledialog2({
        // themeDialog: 'a',
        //TODO ASAP - Change this dialog to free mode, add a big holding div, and then two button divs with the gameChoicePong IDs
        mode: 'button',
        buttonPrompt: 'Please Choose a Game...',
        headerText: false,
        headerClose: false,
        fullScreen: true,
        forceFullScreen: true,
        buttons: {
            '': {
                id: 'gameChoicePongDiag',
                click: function () {
                    //update the gameType attribute
                    game1.gameType = 1001;
                    teamFlag = 1;
                    var self = this;
                    //goto choseplayers function and close this instance of a dialog pop
                    //      choosePlayers();
                    color = 'purple';
                    emailop2();
                     self.close();
                }
            },
            ' ': {
                id: 'gameChoiceHoleDiag',
                click: function () {
                    //update the gameType attribute
                    game1.gameType = 1002;
                    var self = this;
                    teamFlag = 1;
                    color = 'green';
                    emailop2();
                    // choosePlayers();
                      self.close();
                }

            }
        }
    });
});
/*
   $('<div>').simpledialog2({
       // themeDialog: 'a',
        mode: 'button',
        buttonPrompt: 'Please Choose a Game...',
        headerText: false,
        headerClose: false,
        fullScreen: true,
        forceFullScreen: true,
        buttons: {
            '': {
                id: 'gameChoicePong',
                click: function () {
             //update the gameType attribute
                    game1.gameType = 1001;
                    teamFlag = 1;
                    var self = this;
             //goto choseplayers function and close this instance of a dialog pop
              //      choosePlayers();
                    color = 'purple';
                   emailop2();
                   // self.close();
                }
            },
            ' ': {
                id: 'gameChoiceHole',
                click: function () {
                    //update the gameType attribute
                    game1.gameType = 1002;
                    var self = this;
                    teamFlag = 1;
                    color = 'green';
                    emailop2();
                   // choosePlayers();
                  //  self.close();
                }

            }
        }
    });
}); */
//JUST FYI, you can chain the dialog boxes together.  Just make different functions for each dialog box,
function choosePlayers() {
    if (teamFlag === 1){
      var  prompt = 'YOUR'
    } else if (teamFlag === 2) {
        prompt = 'OPPONENT\'S'
    }

    console.log(teamFlag);
   // console.log(game1.gameType);
    $('<div>').simpledialog2({
        mode: 'button',
        headerText: false,
        headerClose: false,
        fullScreen: true,
        forceFullScreen: true,
        buttonPrompt: 'Please Choose One or Two Players on '+prompt+' Team',
        buttons: {
            '': {
                id: 'onePlay',
                click: function () {
                    game1.homePlayers = 1;
                    var self = this;
                    teamFlag = 2;
                    choosePlayers();
                    self.close();
                }
            },
             ' ': {
                 id: 'twoPlay',
                 click: function () {
                     game1.homePlayers = 2;
                        teamFlag = 1;
                     var self = this;
                     emailentry();
                     self.close();
                    }

            }
        }
    });
}
/*
function opponents() {
    console.log(game1.homePlayers);
    console.log(game1.gameType);
    $('<div>').simpledialog2({
        mode: 'button',
        headerText: false,
        headerClose: false,
        fullScreen: true,
        forceFullScreen: true,
        buttonPrompt: 'Please Choose One or Two Players on OPPOSING Team',
        buttons: {
            'One': {
                id: 'onePlay',
                click: function () {
                    game1.awayPlayers = 1;
                    teamFlag = 2;
                    var self = this;
                    emailentry();
                    self.close();
                }
            },
            'Two': {
                id: 'twoPlay',
                click: function () {
                    game1.awayPlayers = 2;
                    teamFlag = 2;
                    var self = this;
                    emailentry2();
                    self.close();
                }

            }
        }
    });
}
*/
//TODO: Re-figure out how to close an free-form Simple Dialog.  And figure out how to close a Button dialog.





//TODO: Figure out how to make the email entry dialog box work...most likely a blank dialog box
function emailentry() {
    if (teamFlag === 1) {
       // teammateemail = 3;
        playerName = 'Jack';
        console.log(teammateemail);
        $('<div>').simpledialog2({
            mode: 'button',
            headerText: false,
            headerClose: false,
            fullScreen: true,
            forceFullScreen: true,
            buttonPrompt: 'What is ' + playerName + '\'s email address?',
            buttonInput: true,
            buttons: {
                'One': {
                    id: 'teamemail',
                    click: function () {
                        //Step one, assign variable self to this
                        var self = this;
                        opplayers = 1;
                        teamemail = self.thisInput;
                        console.log(teamemail);
                        teamFlag = 2;
                        pathtest();
                       // emailop1();
                        //Step two:Here is how to close one dialog box and open another.  Remember to assign things to self
                        self.close();
                    }
                }
            }
        });
    }
}
function pathtest() {
    if (teammateemail === 3) {
        choosePlayers();
    } else {
        teamFlag = 2;
        choosePlayers();
    }
}

//TODO: create an email entry for the 2 opponents
function emailentry2() {
    var teammateemail = 1;
        $('<div>').simpledialog2({
            mode: 'button',
            headerText: false,
            headerClose: false,
            fullScreen: true,
            forceFullScreen: true,
            buttonPrompt: 'What is '+ playerName +'\'s address?',
            buttonInput: true,
            buttons: {
                'Submit': {
                    id: 'teamemail',
                    click: function () {
                        //Step one, assign variable self to this
                        var self = this;
                        opplayers = 1;
                        teamemail = self.thisInput;
                        console.log(teamemail);
                        emailop1();
                        //Step two:Here is how to close one dialog box and open another.  Remember to assign things to self
                        self.close();
                    }
                }
            }
        });
    }

function emailop1() {

    //going to try to add in an if statement to pull the correct box...one vs. two email addresses
    if (game1.awayPlayers === 1){
        $('<div>').simpledialog2({
            mode: 'button',
            headerText: false,
            headerClose: false,
            fullScreen: true,
            forceFullScreen: true,
            buttonPrompt: 'What is '+ playerName +'\'s address?',
            buttonInput: true,
            buttons: {
                'One': {
                    id: 'opponentemail',
                    click: function () {
                        //Step one, assign variable self to this
                        var self = this;
                        oppemail = self.thisInput;
                        console.log(oppemail);
                        scores();
                        //Step two:Here is how to close one dialog box and open another.  Remember to assign things to self
                        self.close();
                    }
                }
            }
        });
      if(game1.awayPlayers === 2)  {
          $('<div>').simpledialog2({
              mode: 'button',
              headerText: false,
              headerClose: false,
              fullScreen: true,
              forceFullScreen: true,
              buttonPrompt: 'What is '+ playerName +'\'s address?',
              buttonInput: true,
              buttons: {
                  'One': {
                      id: 'Opponent1',
                      click: function () {
                          //Step one, assign variable self to this
                          var self = this;
                          opplayers = 1;
                          oppemail = self.thisInput;
                          console.log(oppemail);
                          scores();
                          //Step two:Here is how to close one dialog box and open another.  Remember to assign things to self
                          self.close();
                      }
                  },
                  'Two': {
                      id: 'Opponent2',
                      click: function () {
                          var self = this;
                          opplayers = 2;
                          oppemail2 = self.thisInput;
                          console.log(oppemail2);
                          scores();
                          self.close();
                      }
                  }
              }
          });
      }
    }
  //  console.log(teamemail);
}
function scores() {
    console.log(teamemail+'HELLO'+oppemail);
};

//TODO function emailteam, emailop1, emailop2 -- Need  either 3 different dialogs, or dynamic dialogs...see if you can do a dynamic dialog
//TODO figure out icons and themes

//TODO Figure out how to use the freeform mode that follows.  Make sure that you can close it, and make sure that you can get the element


//The following is an illustration on how to use an blank form simple dialog to capture input values.
//TODO Next step for this is to capture AND validate input values, which I imagine can be done through regex validation

//TODO capture blank content in a variable, then use the variables to cut down on code and use a single dialog box to run all of the inputs
function emailop2() {
    $.mobile.sdCurrentDialog.close();
 /*   if (color == 'purple') {
        var divtest = '<div id=testdiv1>Hello';
        var divtest2 = '</div>'
    } else if (color == 'green') {
        var divtest = '"<div id=testdiv2>World</div>"';
    }
    console.log(divtest)     */
    //  $(document).delegate('#opendialog', 'click', function () {

    // NOTE: The selector can be whatever you like, so long as it is an HTML element.
    //       If you prefer, it can be a member of the current page, or an anonymous div
    //       like shown.
    $('<div>').simpledialog2({
        mode: 'blank',
        headerText: false,
        headerClose: false,
       // dialogAllow: true,
       // dialogForce: true,
        blankContent:
                "<div class='border1 dialogCont'>"+
                "<div class='border1 text1 diagHeader'><span class='middle'>CHOOSE A GAME</span></div>" +
                "<a onclick='emailop1()' class='border1' id='gameChoicePongDiag' data-role='button' rel='close'></button>"+
                "<a onclick='emailentry2()' class='border1' data-role='button' id ='gameChoiceHoleDiag' rel='close'></a>" +
                "</div>"
       // divtest +
       // "<input id='emailop2id'/></div>" +

            // NOTE: the use of rel="close" causes this button to close the dialog.
      //  "<a onclick='function1()' data-role='button' rel='close' href='#'>Submit</a>" +
      //  divtest2
    });
}

function function1() {
    var testes = document.getElementById('emailop2id').value;
    //  console.log(document.getElementById('emailop2id').value);
    console.log(testes)
    $.mobile.sdCurrentDialog.close();
   // $(document).trigger('simpledialog', {'method':'close'});
}

//Here's the close...just need to add it to whatever function stores the email addresses
 //$.mobile.sdCurrentDialog.close();



// TODO 4) Build SimpleDialog HTML box for the game selection
// TODO 5) Jquery SimpleDialog2 Function to select number of players
