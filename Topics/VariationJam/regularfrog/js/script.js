/**
 * Frog demise
 * Jordan Lobasso - 2025
 * 
 * A game about a regular frog in a regualr swamp trying to eat flies to surivive
 * 
 * Instructions:
 * - press the mouse to launch the tongue at those pesky flies
 * - eat as many flies as you can (300)
 * - and use your mouse to aim the tongue to catch them all
 * 
 * Made with p5
 * https://p5js.org/
 */


"use strict";
let whatscreen = "start"
// images for backgrounds and sprites
let beeimage = undefined;
let flyimage = undefined;
let mosquitoimage = undefined;
let lilypadimage = undefined;
let froggyimage = undefined;
let smallfroggyimage = undefined;
let simplefrogimage = undefined;
let bigfrogimage = undefined;
let swampimage = undefined;
let swampbackgroundimage = undefined;

let fullyfroggy;

let bgisplaying = false;


// Game timer (seconds)
const GAME_DURATION = 15; // default 15 seconds
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
        directionX: undefined,
        directionY: undefined,
        tipx: 250,
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

// Object to hold all sounds
const sounds = {
    buzzing: undefined,
    gulp: undefined,
    slurp: undefined,
    beebuzzing: undefined,
    daytimeswamp: undefined,
    countryswamp: undefined,
    swampwoods: undefined,
    burp: undefined

};

// preload all assets
function preload() {



    sounds.buzzing = loadSound("assets/sounds/mosquito.mp3");
    sounds.buzzing.setVolume(1);
    sounds.beebuzzing = loadSound("assets/sounds/beebuzzing.mp3");
    sounds.beebuzzing.setVolume(1);

    sounds.slurp = loadSound("assets/sounds/yoshi-tongue-sound-snes.mp3");
    sounds.slurp.setVolume(8);
    sounds.gulp = loadSound("assets/sounds/gulp-with-bubble.mp3");
    sounds.gulp.setVolume(6);

    sounds.daytimeswamp = loadSound("assets/sounds/daytime-swamp-ambience.mp3");
    sounds.countryswamp = loadSound("assets/sounds/countryside-swamp.mp3");
    sounds.countryswamp.setVolume(3);
    sounds.swampwoods = loadSound("assets/sounds/swamp-woods.mp3");
    sounds.burp = loadSound("assets/sounds/burp.mp3");
    sounds.burp.setVolume(0.7);

    beeimage = loadImage("assets/images/bee.png");
    flyimage = loadImage("assets/images/cartoonfly.png");
    mosquitoimage = loadImage("assets/images/mosquito.png");
    lilypadimage = loadImage("assets/images/Lilypad.png");
    froggyimage = loadImage("assets/images/froggy.png");
    smallfroggyimage = loadImage("assets/images/small_frog.png");
    simplefrogimage = loadImage("assets/images/simplefrog.png");
    bigfrogimage = loadImage("assets/images/bigfrog.png");
    swampbackgroundimage = loadImage("assets/images/louisiana-swamp.png");
    swampimage = loadImage("assets/images/swamp.png");

    fullyfroggy = loadImage("assets/images/fullfrog.gif");

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
        drawLilypad();
        moveFrog();
        moveTongue();
        drawFrog();
        drawScore();





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

        }

        // Check win condition (total flies eaten)
        const totalEaten = score //+ scoree + scoreee;
        if (totalEaten >= TARGET_FLIES) {
            // Player wins
            timerActive = false;
            whatscreen = "win";

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
    image(swampbackgroundimage, 0, 0, width, height);
    //startscreen allowing you to press the key before starting the game 
    fill(255)
    textSize(20);
    text("Press with a key to start", 205, 400)
    textSize(50);
    text(BOLD)
    text("Regular Frog", 150, 200)

}


function instructionsScreen() {
    background("#0a1f7cd3");
    image(swampimage, 0, 0, width, height);
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
function moveFly(thefly) {
    // Move the fly

    thefly.x += thefly.speedx;
    thefly.speedx = random(-15, 15);
    thefly.x = constrain(thefly.x, 0, width);
    thefly.speedy = random(-20, 20);
    thefly.y = constrain(thefly.y, 50, 400);
    thefly.y += thefly.speedy;

}


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

/**
 * Resets the fly to the left with a random y
 */
function resetFly(thefly) {
    thefly.x = 0;
    thefly.y = random(0, 300);
}




/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {


    const eyeOffsetX = 40;
    const pupilOffsetX = 40;
    frog.Eye1.x = frog.body.x - eyeOffsetX;
    frog.Eye2.x = frog.body.x + eyeOffsetX;
    frog.Pupil1.x = frog.body.x - pupilOffsetX;
    frog.Pupil2.x = frog.body.x + pupilOffsetX;


    // tongue direction radially around frog
    frog.tongue.directionX = mouseX;
    frog.tongue.directionY = mouseY;
}


/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // idle position of tongue is at frog's mouth
    frog.tongue.y = frog.body.y;
    frog.tongue.x = frog.body.x;
    console.log(frog.tongue.state);


    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        console.log(frog.tongue.directionX, frog.tongue.directionY);
        console.log(frog.tongue.tipx, frog.tongue.tipy);
        if (frog.tongue.tipx < frog.tongue.directionX) {
            frog.tongue.tipx += frog.tongue.speed;
        }
        if (frog.tongue.tipx > frog.tongue.directionX) {
            frog.tongue.tipx -= frog.tongue.speed;
        }
        if (frog.tongue.tipy < frog.tongue.directionY) {
            frog.tongue.tipy += frog.tongue.speed;
        }
        if (frog.tongue.tipy > frog.tongue.directionY) {
            frog.tongue.tipy -= frog.tongue.speed;
        }
        // The tongue bounces back if it hits the destination
        if (frog.tongue.tipy <= frog.tongue.directionY + 10 && frog.tongue.tipy >= frog.tongue.directionY - 10 &&
            frog.tongue.tipx <= frog.tongue.directionX + 10 && frog.tongue.tipx >= frog.tongue.directionX - 10) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves closer to the frog
    else if (frog.tongue.state === "inbound") {
        if (frog.tongue.tipx < frog.body.x) {
            frog.tongue.tipx += frog.tongue.speed;
        }
        if (frog.tongue.tipx > frog.body.x) {
            frog.tongue.tipx -= frog.tongue.speed;
        }
        if (frog.tongue.tipy < frog.body.y) {
            frog.tongue.tipy += frog.tongue.speed;
        }
        if (frog.tongue.tipy > frog.body.y) {
            frog.tongue.tipy -= frog.tongue.speed;
        }

        // The tongue stops if it hits the frog
        if (frog.tongue.tipy <= frog.body.y + 10 && frog.tongue.tipy >= frog.body.y - 10 &&
            frog.tongue.tipx <= frog.body.x + 10 && frog.tongue.tipx >= frog.body.x - 10) {
            frog.tongue.state = "idle";
            frog.tongue.tipx = frog.body.x;
            frog.tongue.tipy = frog.body.y;
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

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
        sounds.slurp.play();
    }
}




function keyPressed() {
    if (!bgisplaying) {
        sounds.countryswamp.loop();
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
    }

}

function endScreen() {
    // Simple end screen showing final scores and restart prompt.
    background("#0c60b4d3");
    image(flyimage, 0, 0, width, height);
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

    sounds.buzzing.stop();
    sounds.beebuzzing.stop();

}

function winScreen() {
    // Simple win screen showing final total and restart prompt.
    background("#0c60b4d3");
    image(fullyfroggy, 0, 0, width, height);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(56);
    text("You Win!", width / 2, height / 5 - 60);

    textSize(28);
    const total = score
    text("Flies eaten: " + total + " / " + TARGET_FLIES, width / 2, height / 1.5 + 60);
    textSize(18);
    text("Press any key to play again", width / 2, height / 1.5 + 90);
    pop();
    sounds.burp.play();
    sounds.countryswamp.stop();
    bgisplaying = false;
    sounds.buzzing.stop();
    sounds.beebuzzing.stop();

}
