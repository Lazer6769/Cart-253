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
        size: 20,
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
    speed: 3
};

const irregularfly = {
    x: 0,
    y: 150,
    size: 10,
    speed: 10
};

const slowfly = {
    x: 0,
    y: 100,
    size: 10,
    speed: 0.5
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

    sounds.scream = loadSound("assets/sounds/scream.mp3");
    sounds.otherscream = loadSound("assets/sounds/luigi-burning.mp3");
    sounds.anotherscream = loadSound("assets/sounds/hl1scream.mp3");
    sounds.buzzing = loadSound("assets/sounds/mosquito.mp3");
    sounds.beebuzzing = loadSound("assets/sounds/beebuzzing.mp3");
    sounds.slurp = loadSound("assets/sounds/yoshi-tongue-sound-snes.mp3");
    sounds.gulp = loadSound("assets/sounds/gulp-with-bubble.mp3");
    sounds.scarymusic = loadSound("assets/sounds/17. Haunted Fortress.mp3")
}




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
    /*
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
    */

    if (whatscreen === "start") {
        startScreen()
    } else if (whatscreen === "maingame") {
        mainGame()
    } else {
        endScreen()
    }
}

/*
if (whatscreen === "start") {
    startScreen()
} else if (whatscreen === "maingame") {
    mainGame()
} else {
    endScreen()
}
*/
function startScreen() {
    background("#f47becff");

    textSize(20);
    text("Press with a key to start", 50, 200)

    if (keyIsPressed) {
        whatscreen = "maingame"
    }
}

function mainGame() {
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
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

function moveirregularfly() {
    // Move the fly
    irregularfly.x += irregularfly.speed
    // Handle the fly going off the canvas
    if (irregularfly.x > width) {
        resetirregularfly();
    }
}

function moveslowfly() {
    // Move the fly
    slowfly.x += noise(0.5, 10, 100);

    // Handle the fly going off the canvas
    if (slowfly.x > width) {
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
    frog.body.x
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
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
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
    fill("#b869a0ff");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#b869a0ff");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#09ff00ff");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //frog eyes 
    push();
    fill("#000000")
    noStroke();
    ellipse(frog.Eye1.x, frog.Eye1.y, frog.Eye1.size);
    pop();

    push();
    fill("#000000")
    noStroke();
    ellipse(frog.Eye2.x, frog.Eye2.y, frog.Eye2.size);
    pop();

    push();
    fill("#ff0000ff")
    noStroke();
    ellipse(frog.Pupil1.x, frog.Pupil1.y, frog.Pupil1.size);
    pop();

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
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
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
    const d = dist(frog.tongue.x, frog.tongue.y, irregularfly.x, irregularfly.y);
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
    const d = dist(frog.tongue.x, frog.tongue.y, slowfly.x, slowfly.y);
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