var r;
var g;
var b;

var rslider = 0;
var gslider = 0;
var bslider = 0;

var re;
var gr;
var bl;

var reslider = 0;
var grslider = 0;
var blslider = 0;


function setup() {
    createCanvas(400, 400);

    rectMode(CENTER);
    angleMode(DEGREES);

    rslider = createSlider(0, 255, 0, 5);
    gslider = createSlider(0, 255, 0, 5);
    bslider = createSlider(0, 255, 0, 5);

    reslider = createSlider(0, 255, 0, 5);
    reslider.position(0, 430);
    grslider = createSlider(0, 255, 0, 5);
    grslider.position(135, 430);
    blslider = createSlider(0, 255, 0, 5);
    blslider.position(265, 430);

}

function draw() {
    background(220);
    console.log(mouseX, mouseY);
    drawMe();
}

function drawMe() {
    noStroke();

    //body

    push();
    fill(234, 153, 0);
    ellipse(210, 380, 300, 200);
    pop();

    //head

    push();
    var r = rslider.value();
    var g = gslider.value();
    var b = bslider.value();
    fill(r, g, b);
    ellipse(210, 240, 200, 250)
    pop();

    //eyes
    push();
    fill(255);
    ellipse(155, 200, 70, 80);
    ellipse(265, 200, 70, 80);
    pop();
    // iris 
    push();
    var re = reslider.value();
    var gr = grslider.value();
    var bl = blslider.value()
    fill(re, gr, bl);
    ellipse(155, 200, 45, 60);
    ellipse(265, 200, 45, 60);
    pop();

    //pupils
    push();
    fill(0);
    ellipse(155, 200, 25, 30);
    ellipse(265, 200, 25, 30);
    pop();
    //nose 
    push();
    fill(243, 147, 84);
    stroke(162, 96, 53);
    triangle(210, 225, 245, 265, 170, 265);
    pop();
}
