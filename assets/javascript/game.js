$(document).ready(function(){
var allPlayers = ["Obi Wan Kenobi", "Luke Skywalker", "Darth Sidious", "Darth Maul"];
var allPlayersHP = [120, 100, 150, 100];
var allplayersPower = [8, 5, 20, 25];
var CurrPlayer = [];
var Defender = [];
var CurrPlayerHP = [];
var DefenderHP = [];
var Defendername;
var defenderHP = 0;
var playerHP = 0;
var CurrPlayerPower = 0;
var CurrDefenderPower = 0;
var playerSelected = false;
var defenderSelected = false;
var gameover = false;
var initialPower = 0;

function displayCurrPlayers(divSection, arr, arrHP) {
    for (i = 0; i < arr.length; i++) {
        $('.' + divSection).append('<div class="player" power=' + allplayersPower[i] + ' playerName="' + arr[i] + '" id ="player' + i + '"> <p class="name" >' + arr[i] + '</p> <img class ="playerImage" src="./assets/images/' + arr[i] + '.jpg"> <p class="" >' + arrHP[i] + '</p> </div>');
    }


    $('.player').on("click", playerClicked);
}

function playerClicked() {
    console.log('Selected ' + $(this).attr('playerName'));

    if (!playerSelected && !gameover) {

        currPlayerId = this.id
        CurrPlayer.push(allPlayers[this.id.substr(6, 1)]); // add your player to the array
        CurrPlayerHP.push(allPlayersHP[this.id.substr(6, 1)]); // add your player to the array
        CurrPlayerPower = allplayersPower[this.id.substr(6, 1)];
        allPlayers.splice(this.id.substr(6, 1), 1); //remove your player from the array
        allPlayersHP.splice(this.id.substr(6, 1), 1);
        allplayersPower.splice(this.id.substr(6, 1), 1);
        playerSelected = true
        $('.allplayers').empty();
        displayCurrPlayers('allEnemies', allPlayers, allPlayersHP);
        displayCurrPlayers('yourPlayer', CurrPlayer, CurrPlayerHP);
    } else {
        //check if the defender is selected again and HP <=0

        if (!defenderSelected && !gameover) {
            defenderSelected = true;
            Defender.push(allPlayers[this.id.substr(6, 1)]);
            DefenderHP.push(allPlayersHP[this.id.substr(6, 1)]);
            CurrDefenderPower = allplayersPower[this.id.substr(6, 1)];
            allPlayers.splice(this.id.substr(6, 1), 1);
            allPlayersHP.splice(this.id.substr(6, 1), 1);
            allplayersPower.splice(this.id.substr(6, 1), 1);
            $('.allplayers').empty();
            $('.allEnemies').empty();
            $('#resultSection').empty();
            displayCurrPlayers('allEnemies', allPlayers, allPlayersHP);
            displayCurrPlayers('defenderSec', Defender, DefenderHP);
            initialPower = CurrPlayerPower;
        }
    }
}

//Atack 
$('#attackButton').on('click', function() 
{
    if (defenderSelected && playerSelected && (!gameover)) 
    {

        DefenderHP[0] = DefenderHP[0] - CurrPlayerPower;
        CurrPlayerHP[0] = CurrPlayerHP[0] - CurrDefenderPower;

        $('#resultSection').empty();
        $('#resultSection').append('<p style="color:white;"> You attacked ' + Defender[0] + ' with ' + CurrPlayerPower + ' damage </p>');
        $('#resultSection').append('<p style="color:white;">' + Defender[0] + 'attacked you with ' + CurrDefenderPower + ' damage </p>');

        CurrPlayerPower = CurrPlayerPower + initialPower;

        $('.defenderSec').empty();
        $('.yourPlayer').empty();
        displayCurrPlayers('defenderSec', Defender, DefenderHP);
        displayCurrPlayers('yourPlayer', CurrPlayer, CurrPlayerHP);

        if(DefenderHP[0] <= 0 && CurrPlayerHP[0] >0)
        {
            defenderSelected = false
            $('.defenderSec').empty();
            $('#resultSection').empty();

            if (allPlayers.length == 0) {
                $('#resultSection').append('<p style="color:white;"> You have Won !! , Game over ! </p>');
                Defender = [];
                DefenderHP=[];
                gameover = true;
                fngameover();
            } else {

                $('#resultSection').append('<p style="color:white;"> You have defeated :  ' + Defender[0] + ', you can choose to fight another enemy. </p>');
                Defender = [];
                DefenderHP=[];
            }
        } 
        else {
                if (CurrPlayerHP[0] <= 0 && DefenderHP[0] > 0)
                {
                    $('#resultSection').empty();
                    $('#resultSection').append('<p style="color:white;"> You have been defeated, game is over </p>');
                    Defender = [];
                    DefenderHP=[];
                    gameover = true;
                    fngameover();
                    /* add a reset button $('#resultSection').append(*/
                }
                else if(CurrPlayerHP[0] <= 0 && DefenderHP[0] <= 0)
                {
                    $('#resultSection').empty();
                    $('#resultSection').append('<p style="color:white;"> You have defeated'+ Defender[0] +' but have no more HP left , Game over !! </p>');
                    Defender = [];
                    DefenderHP=[];
                    gameover = true;
                    fngameover();
                }
        }
    } 
    else if (!defenderSelected && !gameover) 
    {
        $('#resultSection').empty();
        $('#resultSection').append('<p style="color:white;"> No Enemy here </p>');
        Defender = [];
        DefenderHP=[];
    } 
    

})

function fngameover()
{

        $('#resultSection').append('<span id ="resetButton" style ="color:red;border-width:2px;border-color: green;border-style: solid;"> Reset </span>');
        $('#resetButton').on('click', function() {
            allPlayers = ["Obi Wan Kenobi", "Luke Skywalker", "Darth Sidious", "Darth Maul"];
            allPlayersHP = [120, 100, 150, 100];
            allplayersPower = [8, 5, 20, 25];
            CurrPlayer = [];
            Defender = [];
            DefenderHP=[];
            CurrPlayerHP = [];
            DefenderHP = [];
            Defendername;
            defenderHP = 0;
            playerHP = 0;
            CurrPlayerPower = 0;
            CurrDefenderPower = 0;
            playerSelected = false;
            defenderSelected = false;
            gameover = false;
            initialPower = 0;
            $('#resultSection').empty();
            $('.allplayers').empty();
            $('.allEnemies').empty();
            $('.defenderSec').empty();
            $('.yourPlayer').empty();
            displayCurrPlayers('allplayers', allPlayers, allPlayersHP);    
        })
}


displayCurrPlayers('allplayers', allPlayers, allPlayersHP);

}) 