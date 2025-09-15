/**
 * variables
 * Jordan
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
/** 
let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

let holeShade = 0;
let holeSize = 120;
let holeX = 140;
let holeY = 175;

function setup() {
    createCanvas(640, 480);
}



function draw() {
    background(cheeseRed, cheeseGreen, cheeseBlue);

    //draw a circle 

    push();
    //mouseX, MouseY
    //width/2, height/2
    fill(holeShade);
    noStroke();
    ellipse(holeX, holeY, holeSize);
    pop();

}
*/

// sky
let sky = {
    red: 150,
    green: 180,
    blue: 250
};
//sun
let sun = {
    fill: {
        red: 255,
        green: 255,
        blue: 0,
    },
    x: 500,
    y: 70,
    size: 100
};
// self-esteem 
let selfEsteem = {
    shade: 0,
    x: 320,
    y: 320,
    size: 20
};


function setup() {

    createCanvas(640, 320);
}


function draw() {

    background(sky.red, sky.green, sky.blue);
    //sun
    push();
    fill(sun.fill.red, sun.fill.green, sun.fill.blue);
    noStroke();
    ellipse(sun.x, sun.y, sun.size);
    pop();

    push();
    fill(selfEsteem.shade)
    noStroke();
    ellipse(selfEsteem.x, selfEsteem.y, selfEsteem.size)
    pop();




}