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

var reb;
var gre;
var blu;

var rebslider = 0;
var greslider = 0;
var bluslider = 0;

var ree;
var grn;
var bue;

var reeslider = 0;
var grneslider = 0;
var bueslider = 0;




function setup() {
    createCanvas(400, 400);
    /* resetSketch();
     
     var button = createButton("reset");
     button.mousePressed(resetSketch)
     button.position(10,10);
     */

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

    rebslider = createSlider(0, 255, 0, 5);
    rebslider.position(0, 460);
    greslider = createSlider(0, 255, 0, 5);
    greslider.position(135, 460);
    bluslider = createSlider(0, 255, 0, 5);
    bluslider.position(265, 460);

    reeslider = createSlider(0, 255, 0, 5);
    reeslider.position(0, 490);
    grnslider = createSlider(0, 255, 0, 5);
    grnslider.position(135, 490);
    bueslider = createSlider(0, 255, 0, 5);
    bueslider.position(265, 490);

    //background(255);



}


function draw() {
    //background(220);
    // console.log(mouseX,mouseY);

    drawMe();



}

function drawMe() {
    noStroke();

    //body
    push();
    var ree = reeslider.value();
    var grn = grnslider.value();
    var bue = bueslider.value();
    fill(ree, grn, bue);
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
    var bl = blslider.value();
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
    var reb = rebslider.value();
    var gre = greslider.value();
    var blu = bluslider.value();
    fill(reb, gre, blu);
    noStroke();
    triangle(210, 225, 245, 265, 170, 265);
    pop();
}

