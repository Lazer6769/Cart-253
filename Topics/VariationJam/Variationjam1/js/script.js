let whatscreen = "start"

let spyimage = undefined;
let knifeimage = undefined;
let earnerimage = undefined;
let rewardimage = undefined;
let goldimage = undefined;
let kunaiimage = undefined;
let parisimage = undefined;
let bestparisimage = undefined;
let kitchen1image = undefined;
let kitchen2image = undefined;
let redberet = undefined;
let blackberet = undefined

let chitarra_romana;
let happyday;
let lavie;

function preload() {

    sounds.chitarra_romana = loadSound("assets/sounds/Chitarra_Romana.mp3");
    sounds.happyday = loadSound("assets/sounds/HappyDay_InParis.mp3");
    sounds.lavie = loadSound("assets/sounds/LaVie_EnRose.mp3");



    spyimage = loadImage("assets/images/spy.png");
    knifeimage = loadImage("assets/images/knife.png");
    kunaiimage = loadImage("assets/images/knife.png");
    earnerimage = loadImage("assets/images/bigearner.png");
    rewardimage = loadImage("assets/images/eternalreward.png");
    goldimage = loadImage("assets/images/australiumknife.png");
    parisimage = loadImage("assets/images/Paris.png");
    bestparisimage = loadImage("assets/images/bestparis.png");
    kitchen1image = loadImage("assets/images/commercial-kitchen.png");
    kitchen2image = loadImage("assets/images/kitchen-slider.png");
}

function setup() {
    createCanvas(640, 480);
}


function draw() {

    // Only run the main game update/draw when we're in the game state.
    if (whatscreen === "game") {
        moveFrog();
        drawFrog();
        moveTongue();
        drawTongue();
        moveSpy();
        drawSpy();



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


