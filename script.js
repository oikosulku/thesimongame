/*
SIMON GAME EXERCISE from 
https://www.udemy.com/course/the-complete-web-development-bootcamp
CCS/sounds etc. are from course materials
all the code by Mikko Oikarinen
*/
let game = false;
let level = 0;
const buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
const gamePattern = [];
const userClickedPattern = [];

/* BUTTONS */
const red = document.getElementById('red');
const glue = document.getElementById('blue');
const green = document.getElementById('green');
const yellow = document.getElementById('yellow');
const title = document.getElementById('level-title');



// START THE GAME
function nextSequence() {

    // first sequece
    if( level === 0 ) {

        console.log('Let the game begins');
        game = true;
        
    // next sequence
    } else {
        
        console.log('next sequence');

    }

    // set the correct level to title
    title.innerText = `Level ${level}`;
    // get the random color
    randomChosenColour = buttonColours[getRandomNumber()];
    // push color to the game pattern
    gamePattern.push(randomChosenColour);
    // flicker the button
    flickerTheButton(randomChosenColour);
    
    //console.log(gamePattern)
   
}

// get random number
function getRandomNumber() {
    return Math.trunc( Math.random() * 3) + 1;
}

// flash the button & play the sound 
function flickerTheButton(btn) {
    let audio = new Audio(`sounds/${btn}.mp3`);
    document.getElementById(btn).classList.toggle('pressed');
    //audio.play();
    setTimeout(() => {
        document.getElementById(btn).classList.toggle('pressed');
      }, "200")
}



// USER CLICK FUNCTION
function userClick( color ) {
    
    userClickedPattern.push(color);
    document.getElementById(color).classList.toggle('pressed');
    //audio.play();
    setTimeout(() => {
        document.getElementById(color).classList.toggle('pressed');
      }, "200")
    
    console.log( userClickedPattern );

    
    checkAnswer();
}

// Compare game pattern & user clicked pattern
function checkAnswer() {

    for(let i = 0; i <= level; i++) {
        if(userClickedPattern[i] !== gamePattern[i] ) {
            console.log('wrong');
        } else {
            console.log('correct');
        }
    }

    // wrong answer
}
    
// BUTTON LISTENERS
green.addEventListener('click' , function() {
    userClick('green');
});

red.addEventListener('click' , function() {
    userClick('red');
});

yellow.addEventListener('click' , function() {
    userClick('yellow');
});

blue.addEventListener('click' , function() {
    userClick('blue');
});


// press A to start game
// if game running allready, then ignore
addEventListener('keypress', (event) => {
    //console.log(event.key)
    if( event.key === 'a' || event.key === 'A' ) {
        if( game === false)  nextSequence();
    }
});