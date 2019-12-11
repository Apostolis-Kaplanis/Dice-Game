
var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
        //Random number (1-6)
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //Update the round score
        if (dice1 === 6 && dice2 === 6){
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;

            nextPlayer();
        }else if(dice1 !== 1 && dice2 !== 1){
            //Add score
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;    
        } else {
            nextPlayer();
        }

    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game.
        if(!winningScore) winningScore=100;

        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else{
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    hideDice()
}

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-game-rules').addEventListener('click', function(){
    //If button clicked the second time.
    if(document.getElementById('show-rules')){
        var element = document.getElementById('show-rules');
        element.parentNode.removeChild(element);    
    } else {
        //Show game rules
        var para = document.createElement("p");
        para.id = 'show-rules'
        para.innerHTML = "\
            The game has 2 players, playing in rounds.\
            In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score \
            BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.\
            The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn.\
            The first player to reach 100 points on GLOBAL score wins the game.\
            A player looses his ENTIRE score when he rolles two 6 in a row. After that it's the next player's turn.\
            \
            ";
        document.getElementById('game-rules').appendChild(para);
    }
});

document.querySelector('.btn-set-score').addEventListener('click', function(){
    console.log('set...');

    //Creating a form
    var x = document.getElementById('submit-form');

    //If button clicked the second time
    if(document.getElementById('form-set')){
        x.removeChild(document.getElementById('form-set'));
    } else{
        var createForm = document.createElement('FORM');
        //createForm.setAttribute('action', '');
        createForm.setAttribute('id', 'form-set');
        createForm.style = 'clear: both; margin-left: 73%';
        x.appendChild(createForm);

        var inputElement = document.createElement('INPUT');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('name', 'winningScore');
        if(!winningScore) winningScore = 100;
        //inputElement.setAttribute('value', winningScore);
        inputElement.setAttribute('placeholder', winningScore);
        inputElement.style = 'margin: 10px; width: 94px; \
        color: #555; font-size: 18px; font-family: "Lato"; text-align: center; padding: 10px;';
        createForm.appendChild(inputElement);

        var submitElement = document.createElement('INPUT');
        submitElement.setAttribute('type', 'submit');
        submitElement.setAttribute('name', 'dsubmit');
        submitElement.setAttribute('value', 'Set score');
        submitElement.style = 'margin: 10px; \
        color: #555; font-size: 18px; font-family: "Lato"; text-align: center; padding: 10px;';
        createForm.appendChild(submitElement);

        //If sumbitted:
        createForm.onsubmit = function(event){
            event.preventDefault();

            //Set winningScore to desired value
            winningScore = createForm.winningScore.value;

            //Update UI
            x.removeChild(createForm);
        }
    }
});

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //CSS
    hideDice();
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function hideDice(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}