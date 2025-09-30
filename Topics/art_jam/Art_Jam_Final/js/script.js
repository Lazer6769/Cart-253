
let headr, headg, headb;
//var headg;
//var headb;

let headrslider, headgslider, headbslider = 0;
//var headgslider = 0;
//var headbslider = 0;

let irisr, irisg, irisb
//var irisg;
//var irisb;

let irisrslider, irisgslider, irisbslider = 0;
//var irisgslider = 0;
//var irisbslider = 0;

let noser, noseg, noseb;
//var noseg;
//var noseb;

let noserslider, nosegslider, nosebslider = 0;
//var nosegslider = 0;
//var nosebslider = 0;

let bodyr, bodyg, bodyb;
//var bodyg;
//var bodyb;

let bodyrslider, bodygslider, bodybslider = 0;
//var bodygslider = 0;
//var bodybslider = 0;

/*
var rline;
var gline; 
var bline;

var rlineslider = 0;
var glineslider = 0;
var blineslider = 0;
*/


function setup() {
    createCanvas(400, 400);
    //creates a "Clear Drawing" button that Clears all drawings that you drew 
    let button = createButton('Clear Drawing')
    button.mousePressed(clear);
    button.position(10, 10);
    //instead of a slider this allows you to choose a color for your pen 
    myPicker = createColorPicker('black');
    myPicker.position(10, 30);

    // multiple sliders that can change the color
    // for the different body parts 

    headrslider = createSlider(0, 255, 0, 5);
    headrslider.position(0, 400);
    headgslider = createSlider(0, 255, 0, 5);
    headgslider.position(135, 400);
    headbslider = createSlider(0, 255, 0, 5);
    headbslider.position(265, 400);

    irisrslider = createSlider(0, 255, 0, 5);
    irisrslider.position(0, 430);
    irisgslider = createSlider(0, 255, 0, 5);
    irisgslider.position(135, 430);
    irisbslider = createSlider(0, 255, 0, 5);
    irisbslider.position(265, 430);

    noserslider = createSlider(0, 255, 0, 5);
    noserslider.position(0, 460);
    nosegslider = createSlider(0, 255, 0, 5);
    nosegslider.position(135, 460);
    nosebslider = createSlider(0, 255, 0, 5);
    nosebslider.position(265, 460);

    bodyrslider = createSlider(0, 255, 0, 5);
    bodyrslider.position(0, 490);
    bodygslider = createSlider(0, 255, 0, 5);
    bodygslider.position(135, 490);
    bodybslider = createSlider(0, 255, 0, 5);
    bodybslider.position(265, 490);

    background(255);

    strokeWeight(10);
}

function draw() {

    // console.log(mouseX,mouseY);
    // drawMe isolates the body parts to function drawME
    drawMe();

}

function mouseDragged() {
    // the ability to draw
    let c = myPicker.color();
    fill(c);
    stroke(c);
    line(pmouseX, pmouseY, mouseX, mouseY);
}


function drawMe() {
    noStroke();
    // slider.value is the color values so the slider 
    // can change color


    //body
    push();
    let bodyr = bodyrslider.value();
    let bodyg = bodygslider.value();
    let bodyb = bodybslider.value();
    fill(bodyr, bodyg, bodyb);
    ellipse(210, 380, 300, 200);
    pop();

    //head
    push();
    let headr = headrslider.value();
    let headg = headgslider.value();
    let headb = headbslider.value();
    fill(headr, headg, headb);
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
    let irisr = irisrslider.value();
    let irisg = irisgslider.value();
    let irisb = irisbslider.value();
    fill(irisr, irisg, irisb);
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
    let noser = noserslider.value();
    let noseg = nosegslider.value();
    let noseb = nosebslider.value();
    fill(noser, noseg, noseb);
    noStroke();
    triangle(210, 225, 245, 265, 170, 265);
    pop();


}

