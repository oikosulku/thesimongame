/*
SIMON GAME EXERCISE from 
https://www.udemy.com/course/the-complete-web-development-bootcamp
CCS/sounds etc. are from course materials
all the code by Mikko Oikarinen
*/
let game, level,userIndex, randomChosenColour, gamePattern;
const buttonColours = ["red", "blue", "green", "yellow"];

//const userClickedPattern = [];

/* BUTTONS */
const red = document.getElementById('red');
const glue = document.getElementById('blue');
const green = document.getElementById('green');
const yellow = document.getElementById('yellow');
const title = document.getElementById('level-title');

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
    randomChosenColour = buttonColours[getRandomNumber()];
    // push color to the game pattern
    gamePattern.push(randomChosenColour);

    // reset the user index
    userIndex = 0;

    console.log(`Level ${level}`);
    console.log(gamePattern);

    for(let i = 0; i <= level; i++) {
       
        setTimeout(() => {
            flickerTheButton(gamePattern[i]);
          }, "1000")
          
    }

}

// get random number
function getRandomNumber() {
    return Math.trunc( Math.random() * 3) + 1;
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



// USER CLICK FUNCTION
function userClick( color ) {
    
    //flickerTheButton( color )
    //auserClickedPattern.push(color);
    document.getElementById(color).classList.toggle('pressed');
    //audio.play();
    setTimeout(() => {
        document.getElementById(color).classList.toggle('pressed');
      }, "200")
    
    //console.log( userClickedPattern );
    checkAnswer(color);
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
            nextSequence();
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
    if(game) userClick('green');
});

red.addEventListener('click' , function() {
    if(game) userClick('red');
});

yellow.addEventListener('click' , function() {
    if(game) userClick('yellow');
});

blue.addEventListener('click' , function() {
    if(game) userClick('blue');
});


// press A to start game
// if game running allready, then ignore
addEventListener('keypress', (event) => {
    //console.log(event.key)
    if( event.key === 'a' || event.key === 'A' ) {
        if( game === false)  nextSequence();
    }
});