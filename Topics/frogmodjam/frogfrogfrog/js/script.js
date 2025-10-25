/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";
let whatscreen = "start"

let score = 0;
let scoree = 0;
let scoreee = 0;


// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 200
    },
    Eye1: {
        x: 280,
        y: 440,
        size: 75

    },
    Eye2: {
        x: 360,
        y: 440,
        size: 75
    },
    Pupil1: {
        x: 280,
        y: 440,
        size: 45
    },

    Pupil2: {
        x: 360,
        y: 440,
        size: 45
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        tipx: undefined,
        tipy: 480,
        size: 30,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speedx: 3,
    speedy: 0
};

const irregularfly = {
    x: 0,
    y: 150,
    size: 10,
    irspeedx: 2,
    irspeedy: 0
};

const slowfly = {
    x: 0,
    y: 100,
    size: 10,
    slspeedx: 1,
    slspeedy: 0
}

const sounds = {
    buzzing: undefined,
    gulp: undefined,
    slurp: undefined,
    beebuzzing: undefined,
    scream: undefined,
    otherscream: undefined,
    scarymusic: undefined,
    anotherscream: undefined,
};


function preload() {


    sounds.scarymusic = loadSound("assets/sounds/17. Haunted Fortress.mp3")
    sounds.scarymusic.setVolume(0.5);
    sounds.buzzing = loadSound("assets/sounds/mosquito.mp3");
    sounds.buzzing.setVolume(1.5)
    sounds.beebuzzing = loadSound("assets/sounds/beebuzzing.mp3");
    sounds.beebuzzing.setVolume(1.5)

    sounds.scream = loadSound("assets/sounds/scream.mp3");
    sounds.scream.setVolume(2.5)
    sounds.otherscream = loadSound("assets/sounds/luigi-burning.mp3");
    sounds.anotherscream = loadSound("assets/sounds/hl1scream.mp3");


    sounds.slurp = loadSound("assets/sounds/yoshi-tongue-sound-snes.mp3");
    sounds.slurp.setVolume(8)
    sounds.gulp = loadSound("assets/sounds/gulp-with-bubble.mp3");
    sounds.gulp.setVolume(6)


}

//let gameTime = 10 * 6000

//let gameover = false;



/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();

    sounds.buzzing.loop();
    sounds.beebuzzing.loop();
    sounds.scarymusic.loop();
}

function draw() {

    // Only run the main game update/draw when we're in the game state.
    if (whatscreen === "game") {
        background("#662222ff");
        moveFly();
        drawFly();
        moveirregularfly();
        drawirregularfly();
        moveslowfly();
        drawslowfly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();
        checkTongueirregularflyOverlap();
        checkTongueslowflyOverlap();
        drawScore();
        drawScoree();
        drawScoreee();

    } else {
        // If not in game, show the appropriate screen overlay.
        if (whatscreen === "start") {
            startScreen();
        } else if (whatscreen === "instructions") {
            instructionsScreen();
        } else {
            endScreen();
        }
    }
}



function startScreen() {
    background("#f47becff");
    //startscreen allowing you to press the key before starting the game 
    textSize(20);
    text("Press with a key to start", 205, 400)
    textSize(50);
    text(BOLD)
    text("Fly Demise", 200, 200)
}


function instructionsScreen() {
    background("#f47becff");
    //startscreen allowing you to press the key before starting the game 
    textSize(20);
    text("Press with a key to start", 205, 400)
    text(10)
    text("use mouse to eat the flies and something", 100, 250)
    textSize(50);
    text(BOLD)
    text("instructions", 200, 200)


}

function drawScore() {
    push();
    fill("#000000ff");
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(score, width / 8, height / 8);
    pop();
}

function drawScoree() {
    push();
    fill("#eeff00ff");
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(scoree, width / 2, height / 8);
    pop();
}
function drawScoreee() {
    push();
    fill("#ff00ffff");
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(scoreee, (width / 8) * 7, height / 8);
    pop();
}


/*function mainGame() {
    background("#662222ff");
    moveFly();
    drawFly();
    moveirregularfly();
    drawirregularfly();
    moveslowfly();
    drawslowfly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkTongueirregularflyOverlap();
    checkTongueslowflyOverlap();
}*/

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly

    fly.x += fly.speedx;
    fly.speedx = random(-3, 15);
    fly.x = constrain(fly.x, 0, width);
    fly.speedy = random(-20, 10);
    fly.y = constrain(fly.y, 50, 150);
    fly.y += fly.speedy;

    console.log(fly.y);
    // Handle the fly going off the canvas
    if (fly.x >= width) {
        resetFly();
    }
}

function moveirregularfly() {
    // Move the fly
    irregularfly.x += irregularfly.irspeedx;
    irregularfly.irspeedx = random(-15, 25);
    irregularfly.x = constrain(irregularfly.x, 0, width);
    irregularfly.irspeedy = random(-15, 25);
    irregularfly.y = constrain(irregularfly.y, 100, 200);
    irregularfly.y += irregularfly.irspeedy;

    console.log(irregularfly.y);
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

    console.log(slowfly.y);

    // Handle the fly going off the canvas
    if (slowfly.x >= width) {
        resetslowfly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
    //console.log(fly.x, fly.y, fly.speedx, fly.speedy);
}

function drawirregularfly() {
    push();
    noStroke();
    fill("#f0ff00");
    ellipse(irregularfly.x, irregularfly.y, irregularfly.size);
    pop();
}

function drawslowfly() {
    push();
    noStroke();
    fill("#ff00ff");
    ellipse(slowfly.x, slowfly.y, slowfly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

function resetirregularfly() {
    irregularfly.x = 0;
    irregularfly.y = random(0, 300);
}

function resetslowfly() {
    slowfly.x = 0;
    slowfly.y = random(0, 300);
}

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
        if (frog.tongue.tipy <= 0) {
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


    // Draw the frog's body
    push();
    fill("#09ff00ff");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //frog eye 
    push();
    fill("#000000")
    noStroke();
    ellipse(frog.Eye1.x, frog.Eye1.y, frog.Eye1.size);
    pop();
    //frog eye
    push();
    fill("#000000")
    noStroke();
    ellipse(frog.Eye2.x, frog.Eye2.y, frog.Eye2.size);
    pop();
    //frog pupil
    push();
    fill("#ff0000ff")
    noStroke();
    ellipse(frog.Pupil1.x, frog.Pupil1.y, frog.Pupil1.size);
    pop();
    //frog pupil
    push();
    fill("#ff0000ff")
    noStroke();
    ellipse(frog.Pupil2.x, frog.Pupil2.y, frog.Pupil2.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.tipx, frog.tongue.tipy, fly.x, fly.y);
    const close = (d < 50);
    if (close) {
        fly.y += 50
    }
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        sounds.gulp.play();
        sounds.scream.play();
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

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
        sounds.anotherscream.play();
        // Reset the fly
        resetirregularfly();
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
        sounds.otherscream.play();
        // Reset the fly
        resetslowfly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
        sounds.slurp.play();
    }
}
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
        sounds.slurp.play();
    }
}

function keyPressed() {
    // p5 calls keyPressed() when any key is pressed in global mode.
    if (whatscreen === "start") {
        whatscreen = "instructions";
    } else if (whatscreen === "instructions") {
        whatscreen = "game";
    } else if (whatscreen === "game") {
        // no-op for now
    }

}

function endScreen() {
    // Minimal placeholder so draw() can call endScreen() without error.
    // When you want a real end screen, draw overlay text here.
}
