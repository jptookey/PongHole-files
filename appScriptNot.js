var notes1 = {};

$( document ).ready(function() {
    //localStorage.removeItem("userKey");

    console.log(localStorage.userKey);
    // var email = localStorage.email;
    if (localStorage.getItem("userKey") === null) {
        window.location.assign("/Ponghole.html");
    } else {

        userKey = localStorage.userKey;
        console.log(userKey);
        data1 = {
            userKey: userKey
        };

        data2 = JSON.stringify(data1);
        console.log(data2);
        $.ajax({
            type: "POST",
            url: "/scripts/getNotes1.php",
            data: data2,
            cache: false,
            dataType: "json",
            success: function (data) {
                notes1 = data;
                buildBubs();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
            }
        });

    }
});

function goback() {
    window.location.assign("/Ponghole.html");
}


function buildBubs() {
    console.log('Notes1');
    var lengthi = notes1.length;
    console.log(lengthi);
    for (i = 0; i < lengthi; i++) {
        $('#BigBox').append("<div class='bubble' onclick='tryThis(" + i + ")'>" +
            "<div class='n_form_1'>Game Date: "+notes1[i][8]+"</div>" +
            "<div class='n_form_1'>Game Type: "+notes1[i][3]+"</div>" +
            "<div class='n_form_1'>Opponent 1: "+notes1[i][5]+"</div>" +
            "<div class='n_form_1'>Teammate: "+notes1[i][6]+" </div>" +
            "<div class='n_form_1'>Opponent 2: "+notes1[i][7]+"</div>" +
            "<div class='n_form_1 border1' id='n_win'>Score: "+notes1[i][9]+"-"+notes1[i][10]+" "+notes1[i][2]+"</div>" +
            "</div>"
        );
        console.log(notes1[i][2] == 'L');
        if(notes1[i][2] == 'W') {
            $('#n_win').css("background-color='green'");
        }
        else if (notes1[i][2] == 'L'){
            $('#n_win').css("background-color='red'");
        }
        console.log('This is '+i+' loop');

    }

}

function tryThis(i) {
   // alert('You played a game at '+notes1[i][8]+' time.');
    $('<div>').simpledialog2({
        mode: 'blank',
        top: 1,
        headerText: false,
        headerClose: false,
        // dialogAllow: true,
        // dialogForce: true,
        blankContent: "<div class='dialogCont'>" +
        "<div class='text1 diagHeader color1' id='diagHeadLarge'><span class='middle'>Please Confirm the Game</span></div>"
        +"<div class='text1 border1' id='gndate>Game Played: "+notes1[i][8]+"</div>"+
            "<div class = 'text1 border1' id='gngametype'>Game Type:"+notes1[i][3]+ "</div>"+
        "<input class='border1 text1' id='homeScore' placeholder='Your Score'/input>" +
        "<input class='border1 text1' id='awayScore' placeholder='Opponent Score'/input>" +
        notes1[i][6]+"</br>"+
        "<div></div><a onclick='cpBack()' data-role='button' class='border1 text1' id='backButton1' rel='close'></a>"+
        "<a onclick='submitScore()' data-role='button' class='border1 text1' id='nextButton1'></a></div>"
    });
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