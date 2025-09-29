//let position = 0;

var headr, headg, headb;
//var headg;
//var headb;

var headrslider, headgslider, headbslider = 0;
//var headgslider = 0;
//var headbslider = 0;

var irisr, irisg, irisb
//var irisg;
//var irisb;

var irisrslider, irisgslider, irisbslider = 0;
//var irisgslider = 0;
//var irisbslider = 0;

var noser, noseg, noseb;
//var noseg;
//var noseb;

var noserslider, nosegslider, nosebslider = 0;
//var nosegslider = 0;
//var nosebslider = 0;

var bodyr, bodyg, bodyb;
//var bodyg;
//var bodyb;

var bodyrslider, bodygslider, bodybslider = 0;
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

    let button = createButton('Clear Drawing')
    button.mousePressed(clear);
    button.position(10, 10);


    myPicker = createColorPicker('black');
    myPicker.position(10, 30);



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

    /*
    rlineslider = createSlider(0, 255, 0, 5);
    rlineslider.position(0,530);
    glineslider = createSlider(0, 255, 0, 5);
    glineslider.position(135,530);
    blineslider = createSlider(0, 255, 0, 5);
    blineslider.position(265,530);
    */
    background(255);

    strokeWeight(10);
}

function draw() {

    // console.log(mouseX,mouseY);

    drawMe();

}

function mouseDragged() {

    let c = myPicker.color();
    fill(c);
    stroke(c);
    line(pmouseX, pmouseY, mouseX, mouseY);
}


function drawMe() {
    noStroke();

    //body
    push();
    var bodyr = bodyrslider.value();
    var bodyg = bodygslider.value();
    var bodyb = bodybslider.value();
    fill(bodyr, bodyg, bodyb);
    ellipse(210, 380, 300, 200);
    pop();

    //head
    push();
    var headr = headrslider.value();
    var headg = headgslider.value();
    var headb = headbslider.value();
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
    var irisr = irisrslider.value();
    var irisg = irisgslider.value();
    var irisb = irisbslider.value();
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
    var noser = noserslider.value();
    var noseg = nosegslider.value();
    var noseb = nosebslider.value();
    fill(noser, noseg, noseb);
    noStroke();
    triangle(210, 225, 245, 265, 170, 265);
    pop();


}

