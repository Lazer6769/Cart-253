/**
 * Pumpkin Smasher
 * Jordan Lobasso
 * 
 * A game where a michievous frog smashes pumpkins with its trust baseball bat
 * 
 * 
 * Controls: 
 * - click to launch the Baseball bat to smash the pumpkins
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */



let whatscreen = "start"

const TARGET_PUMPKINS = 20;
let score = 0;

let pumpkinimage = undefined;
let batimage = undefined;
let jackoLanternimage = undefined;
let pumpkinbackgroundimage = undefined;
let streetimage = undefined;
let smashedimage = undefined;

let bgisplaying = false;

const sounds = {
    pumpkinnoise: undefined,
    pumpkinsplat: undefined,
    musicpumpkin: undefined
}
function preload() {
    sounds.pumpkinnoise = loadSound("assets/sounds/pumpkin-meme.mp3");
    sounds.pumpkinsplat = loadSound("assets/sounds/lancer-splat.mp3");
    sounds.musicpumpkin = loadSound("assets/sounds/halloween-background-music-425891.mp3");

    pumpkinimage = loadImage("assets/images/Pumpkin.png");
    batimage = loadImage("assets/images/bat.png");

    jackoLanternimage = loadImage("assets/images/jackolantern.png");
    pumpkinbackgroundimage = loadImage("assets/images/PUMPKINbackground.png");
    streetimage = loadImage("assets/images/halloweenstreet.png");
    smashedimage = loadImage("assets/images/smashed.png");
}

const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 580,
        size: 200
    },
    // The frog's eyes and pupils have positions and sizes
    Eye1: {
        x: 280,
        y: 540,
        size: 75

    },
    Eye2: {
        x: 360,
        y: 540,
        size: 75
    },
    Pupil1: {
        x: 280,
        y: 540,
        size: 45
    },

    Pupil2: {
        x: 360,
        y: 540,
        size: 45
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 580,
        tipx: undefined,
        tipy: 480,
        size: 50,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

let pumpkins = [];

const minimumPumpkinDelay = 0.5 * 1000
const maximumPumpkinDelay = 2 * 1000
let pumpkinDelay = maximumPumpkinDelay

function setup() {
    createCanvas(600, 600);

    batimage.resize(50, 0);
    setTimeout(addPumpkin, pumpkinDelay);
}

function addPumpkin() {
    const pumpkin = createPumpkin();
    pumpkins.push(pumpkin);

    pumpkinDelay -= random(0, 100);

    pumpkinDelay = constrain(pumpkinDelay, minimumPumpkinDelay, maximumPumpkinDelay);

    setTimeout(addPumpkin, pumpkinDelay)


}

function createPumpkin() {
    const pumpkin = {
        x: random(0, width),
        y: -100,
        velocity: {
            x: 0,
            y: random(2, 10)
        },
        sizex: random(50, 100),
        sizey: random(50, 100)

    };
    return pumpkin;
}



function draw() {
    if (whatscreen === "game") {


        background("#ddeeff");
        image(streetimage, 0, 0, width, height);
        moveFrog();
        drawFrog();
        moveTongue();
        drawScore();


        const totalPumpkin = score;
        if (totalPumpkin >= TARGET_PUMPKINS) {
            // Player wins
            whatscreen = "win";
        }

        for (let pumpkin of pumpkins) {
            movePumpkin(pumpkin);
            drawPumpkin(pumpkin);
            checkTonguePumpkinOverlap(pumpkin);
        }


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
    background("#532222d3");
    image(jackoLanternimage, 0, 0, width, height);
    //startscreen allowing you to press the key before starting the game 
    fill(255)
    textSize(20);
    text("Press with a key to start", 205, 400)
    textSize(50);
    text(BOLD)
    text("Pumpkin Smasher", 100, 200)

}


function instructionsScreen() {
    background("#532222d3");
    image(pumpkinbackgroundimage, 0, 0, width, height);
    //instructionsScreen allowing you to press the key before starting the game 
    fill(255, 203, 80)
    textSize(20);
    text("Press with a key to start", 200, 440)
    text(10)
    text("Smash All the Pumpkins that you can", 45, 120)
    text("- use the Mouse to Move tongue", 45, 140)
    text("- Click Mouse 1 to Launch tongue", 45, 160)
    textSize(75);
    text(BOLD)
    text("Instructions", 125, 100)
}

function drawScore() {
    push();
    fill("#ff6a00ff");
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(score, 520, 30);
    pop();
}

function keyPressed() {
    if (!bgisplaying) {
        sounds.musicpumpkin.loop();
        bgisplaying = true;
    }

    // p5 calls keyPressed() when any key is pressed in global mode.
    if (whatscreen === "start") {
        whatscreen = "instructions";
    } else if (whatscreen === "instructions") {
        whatscreen = "game";
        // Start/restart the game timer
        //sounds.scarymusic.loop();
    } else if (whatscreen === "game") {
        // no-op for now
    }
}

function movePumpkin(pumpkin) {
    pumpkin.x += pumpkin.velocity.x;
    pumpkin.y += pumpkin.velocity.y;
}

function drawPumpkin(pumpkin) {
    push();
    //noStroke();
    //fill(pumpkin.fill)
    image(pumpkinimage, pumpkin.x, pumpkin.y, pumpkin.sizex, pumpkin.sizey);
    pop();
}

function mousePressed() {
    // We need to check EVERY bug to see if it was clicked
    for (let pumpkin of pumpkins) {

        // Get the distance between the mouse and the bug
        const d = dist(frog.tongue.tipx, frog.tongue.tipy, pumpkin.x, pumpkin.y);
        // Check if it's close enough
        if (d < pumpkin.size * 2) {
            // If so get the index of this bug in the bugs array
            const index = pumpkins.indexOf(pumpkin);
            // And remove it
            pumpkins.splice(index, 1);



        }
    }
}



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
    //strokeWeight(frog.tongue.size);

    imageMode(CENTER);
    // translate(width / 2 - 200, height / 2 - 200);
    let axis = createVector(0, 1, 0);
    //rotate(frameCount * 0.01);

    image(batimage, frog.tongue.tipx, frog.tongue.tipy);
    pop();

    // Draw the frog's body using the interpolated current color
    push();
    fill("#2bff00ff");
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

function checkTonguePumpkinOverlap(pumpkin) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.tipx, frog.tongue.tipy, pumpkin.x, pumpkin.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + pumpkin.sizex / 2);
    if (eaten && frog.tongue.state === "outbound") {

        sounds.pumpkinnoise.play();
        sounds.pumpkinsplat.play();
        score++;

        // Remove the pumpkin from the pumpkins array
        pumpkins.splice(pumpkins.indexOf(pumpkin), 1)



        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";

    }
}


function winScreen() {
    // Simple win screen showing final total and restart prompt.
    background(20, 120, 20, 200);
    image(smashedimage, 0, 0, width, height);
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(56);
    text("'You Win!'", width / 2, height / 5 - 60);
    textSize(32);
    text("Hope you're happy with yourself", width / 2, height / 3);
    text("You smashed all these pumpkins", width / 2, height / 3 + 40);
    text("for what fun????", width / 2, height / 3 + 60);
    text('Hopefully this is not the beginning of', width / 2, height / 3 + 80);
    text('more sinister acts of evil', width / 2, height / 3 + 100);

    textSize(28);
    const total = score
    text("Pumpkins smashed " + total + " / " + TARGET_PUMPKINS, width / 2, height / 1.5 + 60);
    textSize(18);
    text("Press any key to play again", width / 2, height / 1.5 + 90);
    pop();

    sounds.musicpumpkin.stop();
    bgisplaying = false;
}