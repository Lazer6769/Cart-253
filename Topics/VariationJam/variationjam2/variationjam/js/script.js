let whatscreen = "start"

let pumpkinimage = undefined

const sounds = {
    pumpkinnoise: undefined
}
function preload() {
    sounds.pumpkinnoise = loadSound("assets/sounds/pumpkin-meme.mp3");

    pumpkinimage = loadImage("assets/images/Pumpkin.png");
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
        size: 30,
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
    if (whatscreen === "game") { }


    background("#ddeeff");
    moveFrog();
    drawFrog();
    moveTongue();


    for (let pumpkin of pumpkins) {
        movePumpkin(pumpkin);
        drawPumpkin(pumpkin);
        checkTonguePumpkinOverlap(pumpkin);
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
    strokeWeight(frog.tongue.size);
    line(frog.tongue.tipx, frog.tongue.tipy, frog.tongue.x, frog.tongue.y);
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
    if (eaten) {
        sounds.pumpkinnoise.play();
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


