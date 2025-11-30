/*
Frog Heaven
Jordan Lobasso 

the classic frog game you know well but in heaven

click to launch tongue and eat flies and experience paradise for what it is 

 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";
let whatscreen = "start"
// images for backgrounds and sprites
let beeimage = undefined;
let flyimage = undefined;
let mosquitoimage = undefined;
let heavenstairsimage = undefined
let heavenlyskyimage = undefined
let heavengateimage = undefined
let seraphimimage = undefined
// gifs that represent the frog 

let bgisplaying = false;
// Game timer (seconds)
const GAME_DURATION = 60; // default 60 seconds
let timerRemaining = GAME_DURATION;
let timerActive = false;

// Win condition: total flies to eat
const TARGET_FLIES = 2000;

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
    heaven: undefined,


};

// preload all assets
function preload() {



    sounds.buzzing = loadSound("assets/sounds/mosquito.mp3");
    sounds.buzzing.setVolume(1)
    sounds.beebuzzing = loadSound("assets/sounds/beebuzzing.mp3");
    sounds.beebuzzing.setVolume(1)
    sounds.slurp = loadSound("assets/sounds/yoshi-tongue-sound-snes.mp3");
    sounds.slurp.setVolume(8)
    sounds.gulp = loadSound("assets/sounds/gulp-with-bubble.mp3");
    sounds.gulp.setVolume(6)
    sounds.heaven = loadSound("assets/sounds/heavenly_music.mp3")
    sounds.heaven.setVolume(3)




    beeimage = loadImage("assets/images/bee.png")
    flyimage = loadImage("assets/images/cartoonfly.png")
    mosquitoimage = loadImage("assets/images/mosquito.png")
    heavenstairsimage = loadImage("assets/images/heavenstairs.png")
    heavenlyskyimage = loadImage("assets/images/heaven.png")
    heavengateimage = loadImage("assets/images/heavengate.png")
    seraphimimage = loadImage("assets/images/seraphim.png")



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

    for (let fly of flys) {
        resetFly(fly);
    }
    sounds.heaven.loop();

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
        background("#aca8a8ff");
        image(heavenlyskyimage, 0, 0, width, height);

        flys.push(createFly());


        for (let fly of flys) {
            drawFly(fly);
            moveFly(fly);
            checkTongueFlyOverlap(fly);
        }


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
        }
    }
}



function startScreen() {
    background("#000000d3");
    image(heavenstairsimage, 0, 0, width, height);
    //startscreen allowing you to press the key before starting the game 
    fill(0)
    textSize(20);
    text("Press with a key to start", 205, 400)
    textSize(50);
    text(BOLD)
    text("Fly Heaven", 180, 200)

}


function instructionsScreen() {
    background("#000000d3");
    image(heavengateimage, 0, 0, width, height);
    //instructionsScreen allowing you to press the key before starting the game 
    fill(0)
    textSize(20);
    text("Press with a key to start", 200, 440)
    text(10)
    text("- Welcome to heaven my child", 45, 200)
    text("- You've lived quite the frog live", 45, 220)
    text("- Now you may relax and wonder", 45, 240)
    text("- Your own froggy paradise", 45, 260)
    text("- use the Mouse to Move tongue", 45, 280)
    text("- Click Mouse 1 to Launch tongue", 45, 300)
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

}


/**
 * Resets the fly to the left with a random y
 */
function resetFly(thefly) {
    thefly.x = 0;
    thefly.y = random(0, 300);
}

function moveFrog() {

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

        bgisplaying = true;
    }
    // p5 calls keyPressed() when any key is pressed in global mode.
    if (whatscreen === "start") {
        whatscreen = "instructions";
    } else if (whatscreen === "instructions") {
        whatscreen = "game";
        // Start/restart the game timer
        // and plays the buzzing sounds
        timerRemaining = GAME_DURATION;
        timerActive = true;
        sounds.buzzing.loop();
        sounds.beebuzzing.loop();

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


function winScreen() {
    // Simple win screen showing final total and restart prompt.
    background(20, 120, 20, 200);
    image(seraphimimage, 0, 0, width, height);
    push();
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(56);
    text("YOU WIN!", width / 2, height / 5 - 60);
    textSize(32);
    text("you've had quite the journey in your life", width / 2, height / 3);
    text("as you've spent your life surviving and thriving", width / 2, height / 3 + 40);
    text('And now have experiecned heavens wonders and joy', width / 2, height / 3 + 80);
    text('It is time for you to go back', width / 2, height / 3 + 120);

    textSize(28);
    const total = score
    text("Flies eaten: " + total + " / " + TARGET_FLIES, width / 2, height / 1.5 + 60);
    textSize(18);
    text("Press any key to play again", width / 2, height / 1.5 + 90);
    pop();


    bgisplaying = false;
    sounds.buzzing.stop();
    sounds.beebuzzing.stop();

}
