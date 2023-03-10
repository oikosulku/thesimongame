/*
SIMON GAME EXERCISE from 
https://www.udemy.com/course/the-complete-web-development-bootcamp
CCS/sounds etc. are from course materials
all the code by Mikko Oikarinen
*/

// define the vars
let game, level,userIndex, randomChosenColour, gamePattern;
const buttonColours = ["red", "blue", "green", "yellow"];


/* BUTTONS */
const red = document.getElementById('red');
const glue = document.getElementById('blue');
const green = document.getElementById('green');
const yellow = document.getElementById('yellow');
const title = document.getElementById('level-title');

// Init & reset the vars
function init() {
    level = 0;
    userIndex = 0;
    game = false;
    gamePattern = [];
}

init();

// START THE GAME
function nextSequence() {

    // first sequece
    if( level === 0 ) {
        console.log('Let the game begins');
        game = true;
    } 
    
    // set the correct level to title
    title.innerText = `Level ${level}`;

    // get the random color
    randomChosenColour = buttonColours[Math.trunc( Math.random() * 3) + 1];
    // push color to the game pattern
    gamePattern.push(randomChosenColour);

    // reset the user index
    userIndex = 0;

    //console.log(`Level ${level}`);
    //console.log(gamePattern);

    flickerTheButton(randomChosenColour);
}


// flash the button & play the sound 
function flickerTheButton(btn) {
    let audio = new Audio(`sounds/${btn}.mp3`);
    document.getElementById(btn).classList.toggle('pressed');
    audio.play();
    setTimeout(() => {
        document.getElementById(btn).classList.toggle('pressed');
      }, "300")
}


// Compare game pattern & user clicked pattern
function checkAnswer( color ) {

    console.log('userindex', userIndex);
    // check if clicked color match in correct game pattern index
    if( color === gamePattern[userIndex] ) {

        flickerTheButton(color);

        if( userIndex + 1 === gamePattern.length ) {
            console.log('Starting next sequence');
            level++;
            setTimeout(() => {
                nextSequence();
              }, "1000")
            
        } else {
            userIndex++;
        }

    // no match - end the game
    } else {
        console.log('end the game');
        init();

        let audio = new Audio(`sounds/wrong.mp3`);
        audio.play();

        document.body.classList.toggle('game-over');
        //audio.play();
        setTimeout(() => {
            document.body.classList.toggle('game-over');
          }, "200")
        
        title.innerText = 'Game Over, Press Any key to Restart';
    }
}
    
// BUTTON LISTENERS
green.addEventListener('click' , function() {
    if(game) checkAnswer('green');
});

red.addEventListener('click' , function() {
    if(game) checkAnswer('red');
});

yellow.addEventListener('click' , function() {
    if(game) checkAnswer('yellow');
});

blue.addEventListener('click' , function() {
    if(game) checkAnswer('blue');
});

// press Any to start game
// if game running allready, then ignore
addEventListener('keypress', (event) => {
    if( game === false) {
        setTimeout(() => {
            nextSequence();
          }, "1000")
    } 
});