/**
 * Frog demise
 * Jordan Lobasso - 2025
 * 
 * A game about 'escaping hell' by catching fly souls with a frog's tongue.
 * 
 * Instructions:
 * - Move the frog's tongue with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * - escape hell!
 * 
 * Made with p5
 * https://p5js.org/
 */

//frog on top of lily pad 
// fly moving up down and left right
// also drawing the background sceneray
// array's 
//the tongue isnt on the floor 

//we got the array for multiple flies, we got pumpkin to work, lily pad image working, after today put all you did today into the heave one 
//also we figure out the issue with the image being the game background image(hellgateimage, 0, 0, width, height); just put it 
"use strict";
let whatscreen = "start"
// images for backgrounds and sprites
let beeimage = undefined;
let flyimage = undefined;
let mosquitoimage = undefined;
let lilypadimage = undefined;

/*
// gifs that represent the frog 
let cry;
let screaming;
let trapped;
let freedom;
*/

let bgisplaying = false;
// Game timer (seconds)
const GAME_DURATION = 60; // default 60 seconds
let timerRemaining = GAME_DURATION;
let timerActive = false;

// Win condition: total flies to eat
const TARGET_FLIES = 300;

let score = 0;
//let scoree = 0;
//let scoreee = 0;

// Frog color interpolation: start (green) -> end (grey)
let frogColorStart;
let frogColorGrey;
let frogCurrentColor;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 250,
        size: 100
    },
    // The frog's eyes and pupils have positions and sizes
    Eye1: {
        x: 280,
        y: 250,
        size: 30

    },
    Eye2: {
        x: 360,
        y: 250,
        size: 30
    },
    Pupil1: {
        x: 280,
        y: 250,
        size: 15
    },

    Pupil2: {
        x: 360,
        y: 250,
        size: 15
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 250,
        tipx: undefined,
        tipy: 250,
        size: 30,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};
let flys = [];
// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 20,
    speedx: 3,
    speedy: 0
};

const flythesecond = {
    x: 1,
    y: 250,
    size: 30,
    speedx: 4,
    speedy: 0
};

flys.push(fly);
flys.push(flythesecond);
// irregular fly
// has a position size and speed of horizontal movement
/*
const irregularfly = {
    x: 0,
    y: 150,
    size: 15,
    irspeedx: 2,
    irspeedy: 0
};
// slow fly 
// has a position size and speed of horizontal movement
const slowfly = {
    x: 0,
    y: 100,
    size: 20,
    slspeedx: 1,
    slspeedy: 0
}
    */
// Object to hold all sounds
const sounds = {
    buzzing: undefined,
    gulp: undefined,
    slurp: undefined,
    beebuzzing: undefined,

};

// preload all assets
function preload() {



    sounds.buzzing = loadSound("assets/sounds/mosquito.mp3");
    sounds.buzzing.setVolume(1.5)
    sounds.beebuzzing = loadSound("assets/sounds/beebuzzing.mp3");
    sounds.beebuzzing.setVolume(1.5)

    sounds.slurp = loadSound("assets/sounds/yoshi-tongue-sound-snes.mp3");
    sounds.slurp.setVolume(8)
    sounds.gulp = loadSound("assets/sounds/gulp-with-bubble.mp3");
    sounds.gulp.setVolume(6)



    beeimage = loadImage("assets/images/bee.png")
    flyimage = loadImage("assets/images/cartoonfly.png")
    mosquitoimage = loadImage("assets/images/mosquito.png")
    lilypadimage = loadImage("assets/images/Lilypad.png")



}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Start (green) and end (grey) colors for the frog
    frogColorStart = color("#09ff00ff");
    frogColorGrey = color("#909090ff");
    frogCurrentColor = frogColorStart;

    // Give the fly its first random position

    for (let fly of flys) {
        resetFly(fly);
    }

    //resetgameTime();

    // sounds.buzzing.loop();
    // sounds.beebuzzing.loop();
    // sounds.scarymusic.loop();

}



function createFly() {
    const newFlys = {
        x: random(1, 640),
        y: random(1, 400), // Will be random
        size: 20,
        speedx: 3,
        speedy: 0

    }
    return newFlys;
}

function draw() {

    // Only run the main game update/draw when we're in the game state.
    if (whatscreen === "game") {
        background("#033487ff");

        flys.push(createFly());


        for (let fly of flys) {
            drawFly(fly);
            moveFly(fly);
            checkTongueFlyOverlap(fly);
        }
        //moveirregularfly();
        //drawirregularfly();
        //moveslowfly();
        //drawslowfly();
        drawLilypad();
        moveFrog();
        moveTongue();
        drawFrog();

        //checkTongueirregularflyOverlap();
        //checkTongueslowflyOverlap();
        drawScore();
        //drawScoree();
        //drawScoreee();




        // Update timer (deltaTime is milliseconds since last frame)
        if (timerActive) {
            timerRemaining -= deltaTime / 1000.0;
            if (timerRemaining < 0) {
                timerRemaining = 0;
            }
        }

        // Calculate progress from 0.0 (start) -> 1.0 (end)
        const progress = constrain((GAME_DURATION - timerRemaining) / GAME_DURATION, 0, 1);

        // Interpolate frog color from green -> grey based on progress
        if (frogColorStart && frogColorGrey) {
            frogCurrentColor = lerpColor(frogColorStart, frogColorGrey, progress);
        }

        // If frog is fully grey (progress reached 1) end the game
        if (progress >= 1) {
            timerActive = false;
            whatscreen = "end";
            sounds.flap.play();
        }

        // Check win condition (total flies eaten)
        const totalEaten = score //+ scoree + scoreee;
        if (totalEaten >= TARGET_FLIES) {
            // Player wins
            timerActive = false;
            whatscreen = "win";
            sounds.laughing.play();
        }

        // Display timer at top-left
        push();
        textSize(20);
        fill(255);
        textAlign(LEFT, TOP);
        text("Time: " + Math.ceil(timerRemaining), 10, 10);
        pop();

    } else {
        // If not in game, show the appropriate screen overlay.
        if (whatscreen === "start") {
            startScreen();
        } else if (whatscreen === "instructions") {
            instructionsScreen();
        } else if (whatscreen === "win") {
            winScreen();
        } else if (whatscreen === "end") {
            endScreen();
        }
    }
}



function startScreen() {
    background("#0c60b4d3");
    //startscreen allowing you to press the key before starting the game 
    fill(255)
    textSize(20);
    text("Press with a key to start", 205, 400)
    textSize(50);
    text(BOLD)
    text("Fly Demise", 200, 200)

}


function instructionsScreen() {
    background("#0a1f7cd3");
    //instructionsScreen allowing you to press the key before starting the game 
    fill(255, 203, 80)
    textSize(20);
    text("Press with a key to start", 200, 440)
    text(10)
    text("- use the Mouse to Move tongue", 45, 320)
    text("- Click Mouse 1 to Launch tongue", 45, 340)
    textSize(75);
    text(BOLD)
    text("Instructions", 125, 100)


}
// draw the score at the top right for each fly type
function drawScore() {
    push();
    fill("#000000ff");
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(score, 520, 30);
    pop();
}
/*
function drawScoree() {
   push();
   fill("#eeff00ff");
   textSize(32);
   textStyle(BOLD);
   textAlign(CENTER, CENTER);
   text(scoree, 560, 30);
   pop();
}
function drawScoreee() {
   push();
   fill("#ff00ffff");
   textSize(32);
   textStyle(BOLD);
   textAlign(CENTER, CENTER);
   text(scoreee, 600, 30);
   pop();
}
*/
/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */


function moveFly(thefly) {
    // Move the fly

    thefly.x += thefly.speedx;
    thefly.speedx = random(-15, 15);
    thefly.x = constrain(thefly.x, 0, width);
    thefly.speedy = random(-20, 20);
    thefly.y = constrain(thefly.y, 50, 400);
    thefly.y += thefly.speedy;

    //console.log(fly.y);
    // Handle the fly going off the canvas
    /*
     if (thefly.x >= width) {
         resetFly(thefly);
     }
         */
}

/*
function moveirregularfly() {
    // Move the fly
    irregularfly.x += irregularfly.irspeedx;
    irregularfly.irspeedx = random(-15, 25);
    irregularfly.x = constrain(irregularfly.x, 0, width);
    irregularfly.irspeedy = random(-15, 25);
    irregularfly.y = constrain(irregularfly.y, 100, 200);
    irregularfly.y += irregularfly.irspeedy;

    //console.log(irregularfly.y);
    // Handle the fly going off the canvas
    if (irregularfly.x >= width) {
        resetirregularfly();
    }
}

function moveslowfly() {
    // Move the fly
    //slowfly.x += noise(0.5, 10, 100);
    slowfly.x += slowfly.slspeedx;
    slowfly.slspeedx = random(-10, 15);
    slowfly.x = constrain(slowfly.x, 0, width);
    slowfly.slspeedy = random(-5, 10);
    slowfly.y = constrain(slowfly.y, 150, 250);
    slowfly.y += slowfly.slspeedy;

    //console.log(slowfly.y);

    // Handle the fly going off the canvas
    if (slowfly.x >= width) {
        resetslowfly();
    }
}
*/
/**
 * Draws the fly as a black circle
 */
function drawFly(thefly) {
    push();
    noStroke();
    fill("#000000");
    image(flyimage, thefly.x, thefly.y, thefly.size, thefly.size);
    pop();
    //console.log(fly.x, fly.y, fly.speedx, fly.speedy);
}
/*
function drawirregularfly() {
    push();
    noStroke();
    fill("#f0ff00");
    image(beeimage, irregularfly.x, irregularfly.y, irregularfly.size, irregularfly.size);
    pop();
}

function drawslowfly() {
    push();
    noStroke();
    fill("#ff00ff");
    image(mosquitoimage, slowfly.x, slowfly.y, slowfly.size, slowfly.size);
    pop();
}
*/


/**
 * Resets the fly to the left with a random y
 */
function resetFly(thefly) {
    thefly.x = 0;
    thefly.y = random(0, 300);
}



/*
function resetirregularfly() {
    irregularfly.x = 0;
    irregularfly.y = random(0, 300);
}

function resetslowfly() {
    slowfly.x = 0;
    slowfly.y = random(0, 300);
}
*/
/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    /*
      frog.body.x = mouseX
      const eyeOffsetX = 40;
      const pupilOffsetX = 40;
      frog.Eye1.x = frog.body.x - eyeOffsetX;
      frog.Eye2.x = frog.body.x + eyeOffsetX;
      frog.Pupil1.x = frog.body.x - pupilOffsetX;
      frog.Pupil2.x = frog.body.x + pupilOffsetX;
      */
    frog.tongue.tipx = mouseX
}


/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.tipy += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.tipy <= mouseY) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.tipy += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.tipy >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */


function drawLilypad() {
    image(lilypadimage, 200, 150, 250, 200);
}


function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#000000ff");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#b869a0ff");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.tipx, frog.tongue.tipy, frog.tongue.x, frog.tongue.y);
    pop();


    // Draw the frog's body using the interpolated current color
    push();
    fill(frogCurrentColor);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //frog eye 
    push();
    fill("#ffffffff")
    noStroke();
    ellipse(frog.Eye1.x, frog.Eye1.y, frog.Eye1.size);
    pop();
    //frog eye
    push();
    fill("#ffffffff")
    noStroke();
    ellipse(frog.Eye2.x, frog.Eye2.y, frog.Eye2.size);
    pop();
    //frog pupil
    push();
    fill("#000000ff")
    noStroke();
    ellipse(frog.Pupil1.x, frog.Pupil1.y, frog.Pupil1.size);
    pop();
    //frog pupil
    push();
    fill("#000000ff")
    noStroke();
    ellipse(frog.Pupil2.x, frog.Pupil2.y, frog.Pupil2.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(thefly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.tipx, frog.tongue.tipy, thefly.x, thefly.y);
    const close = (d < 50);
    if (close) {
        thefly.y += 50
    }
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + thefly.size / 2);
    if (eaten) {
        sounds.gulp.play();

        score++;
        // Reset the fly
        resetFly(thefly);
        // Reset the game timer when a fly is eaten
        timerRemaining = GAME_DURATION;
        timerActive = true;
        // Bring back the tongue
        //frog.tongue.state = "inbound";
    }
}

/*
function checkTongueirregularflyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.tipx, frog.tongue.tipy, irregularfly.x, irregularfly.y);
    const close = (d < 150);
    if (close) {
        fly.y += 150
    }
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + irregularfly.size / 2);
    if (eaten) {
        sounds.gulp.play();
        
        scoree++;
        // Reset the fly
        resetirregularfly();
        // Reset the game timer when a fly is eaten
        timerRemaining = GAME_DURATION;
        timerActive = true;
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function checkTongueslowflyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.tipx, frog.tongue.tipy, slowfly.x, slowfly.y);
    const close = (d < 300);
    if (close) {
        fly.y += 300
    }
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + slowfly.size / 2);
    if (eaten) {
        sounds.gulp.play();
        
        scoreee++;
        // Reset the fly
        resetslowfly();
        // Reset the game timer when a fly is eaten
        timerRemaining = GAME_DURATION;
        timerActive = true;
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}
*/
/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
        sounds.slurp.play();
    }
}
//
/*
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
        sounds.slurp.play();
    }
}
*/




function keyPressed() {
    if (!bgisplaying) {

        bgisplaying = true;
    }
    // p5 calls keyPressed() when any key is pressed in global mode.
    if (whatscreen === "start") {
        whatscreen = "instructions";
    } else if (whatscreen === "instructions") {
        whatscreen = "game";
        // Start/restart the game timer
        timerRemaining = GAME_DURATION;
        timerActive = true;
        sounds.buzzing.loop();
        //sounds.beebuzzing.loop();
        //sounds.scarymusic.loop();
    } else if (whatscreen === "game") {
        // no-op for now
    }
    else if (whatscreen === "end") {
        // Restart: go back to start screen and reset game state
        whatscreen = "start";
        timerRemaining = GAME_DURATION;
        timerActive = false;
        // reset flies/scores if you want a fresh start

        for (let fly of flys) {
            resetFly(fly);
        }
        score = 0;
        /*
        resetirregularfly();
        resetslowfly();
        score = 0;
        scoree = 0;
        scoreee = 0;
        */
    }

    else if (whatscreen === "win") {
        // Restart from win screen same as from end
        whatscreen = "start";
        timerRemaining = GAME_DURATION;
        timerActive = false;
        for (let fly of flys) {
            resetFly(fly);
        }

        score = 0;
        /*
        resetirregularfly();
        resetslowfly();
        score = 0;
        scoree = 0;
        scoreee = 0;
        */
    }

}

function endScreen() {
    // Simple end screen showing final scores and restart prompt.
    background("255,0,255");
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(48);
    text("Game Over", width / 2, height / 2 - 50);
    textSize(24);
    let combined = "Scores: " + score //+ " / " + scoree + " / " + scoreee;
    text(combined, width / 2, height / 2);
    textSize(18);
    text("Press any key to restart", width / 2, height / 2 + 50);
    pop();
    //sounds.flap.loop() = false;
    //sounds.flap.play();



    bgisplaying = false;
    sounds.buzzing.stop();
    sounds.beebuzzing.stop();

}

function winScreen() {
    // Simple win screen showing final total and restart prompt.
    background(255, 0, 255);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(56);
    text("'You Win!'", width / 2, height / 5 - 60);

    textSize(28);
    const total = score //+ scoree + scoreee;
    text("Flies eaten: " + total + " / " + TARGET_FLIES, width / 2, height / 1.5 + 60);
    textSize(18);
    text("Press any key to play again", width / 2, height / 1.5 + 90);
    pop();
    //sounds.laughing.play();


    bgisplaying = false;
    sounds.buzzing.stop();
    sounds.beebuzzing.stop();

}
