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
   // console.log('Notes1');
    var lengthi = notes1.length;
    //console.log(lengthi);
    for (i = 0; i < lengthi; i++) {
        console.log(notes1[i][2]);
        console.log(notes1[i][2] == 'L');
        if(notes1[i][2] == 'Win') {
            $('#BigBox').append("<div class='bubble' onclick='tryThis(" + i + ")'>" +
                "<div class='n_form_1'>Game Date: " + notes1[i][8] + "</div>" +
                "<div class='n_form_1'>Game Type: " + notes1[i][3] + "</div>" +
                "<div class='n_form_1'>Opponent 1: " + notes1[i][5] + "</div>" +
                "<div class='n_form_1'>Teammate: " + notes1[i][6] + " </div>" +
                "<div class='n_form_1'>Opponent 2: " + notes1[i][7] + "</div>" +
                "<div class='n_form_1 border1 n_form_win' id='n_win'>Score: " + notes1[i][9] + "-" + notes1[i][10] + " " + notes1[i][2] + "</div>" +
                "</div>"
            );
        } else if (notes1[i][2] == 'Loss'){
            $('#BigBox').append(
                "<div class='bubble' onclick='tryThis(" + i + ")'>" +
                "<div class='n_form_1'>Game Date: " + notes1[i][8] + "</div>" +
                "<div class='n_form_1'>Game Type: " + notes1[i][3] + "</div>" +
                "<div class='n_form_1'>Opponent 1: " + notes1[i][5] + "</div>" +
                "<div class='n_form_1'>Teammate: " + notes1[i][6] + " </div>" +
                "<div class='n_form_1'>Opponent 2: " + notes1[i][7] + "</div>" +
                "<div class='n_form_1 border1 n_form_lose' id='n_win'>Score: " + notes1[i][9] + "-" + notes1[i][10] + " " + notes1[i][2] + "</div>" +
                "</div>"
            );
        } else {
            $('#BigBox').append(
                "<div class='bubble' onclick='tryThis(" + i + ")'>" +
                "<div class='n_form_1'>Game Date: " + notes1[i][8] + "</div>" +
                "<div class='n_form_1'>Game Type: " + notes1[i][3] + "</div>" +
                "<div class='n_form_1'>Opponent 1: " + notes1[i][5] + "</div>" +
                "<div class='n_form_1'>Teammate: " + notes1[i][6] + " </div>" +
                "<div class='n_form_1'>Opponent 2: " + notes1[i][7] + "</div>" +
                "<div class='n_form_1 border1' id='n_win'>Score: " + notes1[i][9] + "-" + notes1[i][10] + " " + notes1[i][2] + "</div>" +
                "</div>"
            );
        }


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
        "<div class='text1 diagHeader color1' id='diagHeadLarge'>" +
        "<span class='middle'>Please Confirm the Game</span></div>"+
        "<div class='text1 border1' id='gndate'>Game Played: "+notes1[i][8]+"</div>"+
        "<div class='text1 border1' id='gngametype'>Game Type: "+notes1[i][3]+"</div>"+
        "<div class='text1 border1'>Teammate: " + notes1[i][6] + " </div>" +
        "<div class='text1 border1'>Opponent 1: " + notes1[i][5] + "</div>" +
        "<div class='text1 border1'>Opponent 2: " + notes1[i][7] + "</div>" +
        "<div class='text1 border1' id='ui_not_homescore'>Your score: " + notes1[i][9] + "</div>" +
        "<div class='text1 border1' id='ui_not_awayscore'>Opponent score: " + notes1[i][10] + "</div>" +
        "<input class='border1 text1' type='hidden' id='ui_not_homescore_i' placeholder='Your Score'/input>" +
        "<input class='border1 text1' type='hidden' id='ui_not_awayscore_i' placeholder='Opponent Score'/input>" +
        "<div onclick='fn_not_dispute()' class='border1 text1 button3' id='ui_not_dispute'>Dispute</div>"+
        "<div onclick='fn_not_cancel()' hidden class='border1 text1 button3' id='ui_not_cancel'>Cancel</div>"+
        "<div onclick='fn_not_confirm()'  class='border1 text1 button3' id='ui_not_confirm'>Confirm</div>"+
        "<div onclick='fn_not_accept()'  hidden class='border1 text1 button3' id='ut_not_accept'>Accept</div>"
    });
    function fn_not_disput(){
        $('#ui_not_homescore_i').show();
        $('#ui_not_awayscore_i').show();
        $('#ui_not_cancel').show();
        $('#ui_not_accept').show();
        $('#ui_not_dispute').hide();
        $('#ui_not_confirm').hide();
    }
}

function fn_not_confirm() {
    $(document).trigger('simpledialog', {'method':'close'});
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