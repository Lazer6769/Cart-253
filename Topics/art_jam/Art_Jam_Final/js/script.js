
let headR, headG, headB;
let headRslide, headGslider, headBslider = 0;
let irisR, irisG, irisB
let irisRslider, irisGslider, irisBslider = 0;
let noseR, noseG, noseB;
let noseRslider, noseGslider, noseBslider = 0;
let bodyR, bodyG, bodyB;
let bodyRslider, bodyGslider, bodyBslider = 0;



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

    headRslider = createSlider(0, 255, 0, 5);
    headRslider.position(0, 400);
    headGslider = createSlider(0, 255, 0, 5);
    headGslider.position(135, 400);
    headBslider = createSlider(0, 255, 0, 5);
    headBslider.position(265, 400);

    irisRslider = createSlider(0, 255, 0, 5);
    irisRslider.position(0, 430);
    irisGslider = createSlider(0, 255, 0, 5);
    irisGslider.position(135, 430);
    irisBslider = createSlider(0, 255, 0, 5);
    irisBslider.position(265, 430);

    noseRslider = createSlider(0, 255, 0, 5);
    noseRslider.position(0, 460);
    noseGslider = createSlider(0, 255, 0, 5);
    noseGslider.position(135, 460);
    noseBslider = createSlider(0, 255, 0, 5);
    noseBslider.position(265, 460);

    bodyRslider = createSlider(0, 255, 0, 5);
    bodyRslider.position(0, 490);
    bodyGslider = createSlider(0, 255, 0, 5);
    bodyGslider.position(135, 490);
    bodyBslider = createSlider(0, 255, 0, 5);
    bodyBslider.position(265, 490);

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
    let bodyR = bodyRslider.value();
    let bodyG = bodyGslider.value();
    let bodyB = bodyBslider.value();
    fill(bodyR, bodyG, bodyB);
    ellipse(210, 380, 300, 200);
    pop();

    //head
    push();
    let headR = headRslider.value();
    let headG = headGslider.value();
    let headB = headBslider.value();
    fill(headR, headG, headB);
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
    let irisR = irisRslider.value();
    let irisG = irisGslider.value();
    let irisB = irisBslider.value();
    fill(irisR, irisG, irisB);
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
    let noseR = noseRslider.value();
    let noseG = noseGslider.value();
    let noseB = noseBslider.value();
    fill(noseR, noseG, noseB);
    noStroke();
    triangle(210, 225, 245, 265, 170, 265);
    pop();


}

