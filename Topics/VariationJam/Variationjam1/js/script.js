let whatscreen = "start"

let spyimage = undefined;
let knifeimage = undefined;
let earnerimage = undefined;
let rewardimage = undefined;
let goldimage = undefined
let kunaiimage = undefined

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
}

function setup() {
    createCanvas(640, 480);
}