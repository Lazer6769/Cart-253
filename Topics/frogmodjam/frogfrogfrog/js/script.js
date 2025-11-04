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

"use strict";
let whatscreen = "start"
// images for backgrounds and sprites
let hellimage = undefined;
let hellgateimage = undefined;
let thehellimage = undefined;
let superhellimage = undefined;
let beeimage = undefined;
let flyimage = undefined;
let mosquitoimage = undefined;
let thedevilimage = undefined;
// gifs that represent the frog 
let cry;
let screaming;
let trapped;
let freedom;

let bgisplaying = false;
// Game timer (seconds)
const GAME_DURATION = 10; // default 60 seconds
let timerRemaining = GAME_DURATION;
let timerActive = false;

// Win condition: total flies to eat
const TARGET_FLIES = 30;

let score = 0;
let scoree = 0;
let scoreee = 0;

// Frog color interpolation: start (green) -> end (grey)
let frogColorStart;
let frogColorGrey;
let frogCurrentColor;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 200
    },
    // The frog's eyes and pupils have positions and sizes
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
    size: 20,
    speedx: 3,
    speedy: 0
};
// irregular fly
// has a position size and speed of horizontal movement
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
// Object to hold all sounds
const sounds = {
    buzzing: undefined,
    gulp: undefined,
    slurp: undefined,
    beebuzzing: undefined,
    scream: undefined,
    otherscream: undefined,
    scarymusic: undefined,
    anotherscream: undefined,
    flap: undefined,
    laughing: undefined,

};

// preload all assets
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
    sounds.flap = loadSound("assets/sounds/flapjack.mp3");
    sounds.flap.setVolume(6)
    sounds.laughing = loadSound("assets/sounds/cod-zombies-evil-laugh.mp3")
    sounds.laughing.setVolume(4.5)




    sounds.slurp = loadSound("assets/sounds/yoshi-tongue-sound-snes.mp3");
    sounds.slurp.setVolume(8)
    sounds.gulp = loadSound("assets/sounds/gulp-with-bubble.mp3");
    sounds.gulp.setVolume(6)


    hellimage = loadImage("assets/images/hell.png")
    hellgateimage = loadImage("assets/images/hellgate.png")
    thehellimage = loadImage("assets/images/The_Hell.png")
    superhellimage = loadImage("assets/images/superhellmyedition.png")
    beeimage = loadImage("assets/images/bee.png")
    flyimage = loadImage("assets/images/cartoonfly.png")
    mosquitoimage = loadImage("assets/images/mosquito.png")
    thedevilimage = loadImage("assets/images/Thedevil.png")

    cry = loadImage("assets/images/why-cry-why-pepe-why.gif")
    screaming = loadImage("assets/images/pepescreaming.gif")
    trapped = loadImage("assets/images/pepeblue-pepebluesky.gif")
    freedom = loadImage("assets/images/pepeagony.gif")


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
    resetFly();
    //resetgameTime();

    // sounds.buzzing.loop();
    // sounds.beebuzzing.loop();
    // sounds.scarymusic.loop();
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
        const totalEaten = score + scoree + scoreee;
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
    background("#532222d3");
    image(hellgateimage, 0, 0, width, height);
    image(screaming, 250, 250, 150, 150);
    //startscreen allowing you to press the key before starting the game 
    fill(255)
    textSize(20);
    text("Press with a key to start", 205, 400)
    textSize(50);
    text(BOLD)
    text("Fly Demise", 200, 200)

}


function instructionsScreen() {
    background("#532222d3");
    image(hellimage, 0, 0, width, height);
    image(trapped, 250, 250, 150, 150);
    //instructionsScreen allowing you to press the key before starting the game 
    fill(255, 203, 80)
    textSize(20);
    text("Press with a key to start", 200, 440)
    text(10)
    text("- All your life you have been a malicious frog", 45, 160)
    text(" breaking the 10 frogments has cursed your soul", 45, 180)
    text("- to eternal damnnation in hell", 45, 200)
    text("- however you are aproached by the devil himself", 45, 220)
    text("- he offers you a deal to resurrect into a new life", 45, 240)
    text("- catch 30 fly souls to earn your freedom", 45, 260)
    text("- and escape from this nightmare ", 45, 280)
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

    //console.log(fly.y);
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

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    image(flyimage, fly.x, fly.y, fly.size, fly.size);
    pop();
    //console.log(fly.x, fly.y, fly.speedx, fly.speedy);
}

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


    // Draw the frog's body using the interpolated current color
    push();
    fill(frogCurrentColor);
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
        score++;
        // Reset the fly
        resetFly();
        // Reset the game timer when a fly is eaten
        timerRemaining = GAME_DURATION;
        timerActive = true;
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
        sounds.otherscream.play();
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
        sounds.scarymusic.loop();
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
        sounds.beebuzzing.loop();
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
        resetFly();
        resetirregularfly();
        resetslowfly();
        score = 0;
        scoree = 0;
        scoreee = 0;
    }

    else if (whatscreen === "win") {
        // Restart from win screen same as from end
        whatscreen = "start";
        timerRemaining = GAME_DURATION;
        timerActive = false;
        resetFly();
        resetirregularfly();
        resetslowfly();
        score = 0;
        scoree = 0;
        scoreee = 0;
    }

}

function endScreen() {
    // Simple end screen showing final scores and restart prompt.
    background(0, 0, 0, 180);
    image(thehellimage, 0, 0, width, height);
    image(cry, 350, 400, 75, 75);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(48);
    text("Game Over", width / 2, height / 2 - 50);
    textSize(24);
    let combined = "Scores: " + score + " / " + scoree + " / " + scoreee;
    text(combined, width / 2, height / 2);
    textSize(18);
    text("Press any key to restart", width / 2, height / 2 + 50);
    pop();
    //sounds.flap.loop() = false;
    //sounds.flap.play();


    sounds.scarymusic.stop();
    bgisplaying = false;
    sounds.buzzing.stop();
    sounds.beebuzzing.stop();

}

function winScreen() {
    // Simple win screen showing final total and restart prompt.
    background(20, 120, 20, 200);
    image(superhellimage, 0, 0, width, height);
    image(thedevilimage, 3, 250, 250, 250);
    image(freedom, 150, 405, 75, 75);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(56);
    text("'You Win!'", width / 2, height / 5 - 60);
    textSize(32);
    text("you reall thought you could escape hell?", width / 2, height / 3);
    text("how foolish can you be?", width / 2, height / 3 + 40);
    text('you are going to super hell for eternity', width / 2, height / 3 + 80);

    textSize(28);
    const total = score + scoree + scoreee;
    text("Flies eaten: " + total + " / " + TARGET_FLIES, width / 2, height / 1.5 + 60);
    textSize(18);
    text("Press any key to play again", width / 2, height / 1.5 + 90);
    pop();
    //sounds.laughing.play();

    sounds.scarymusic.stop();
    bgisplaying = false;
    sounds.buzzing.stop();
    sounds.beebuzzing.stop();

}
