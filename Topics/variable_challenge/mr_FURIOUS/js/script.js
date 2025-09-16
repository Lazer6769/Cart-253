/**
 * Mr. Furious
 * Jordan Lobasso
 * 
 * Benjamin Merhi
 *
 * A guy who becomes visibly furious!
 */

"use strict";
let skyShade = {
    fill: {
        r: 0,
        g: 0,
        b: 255
    }
}
// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    speed: 0.5,

    // Colour
    fill: {
        r: 255,
        g: 255,
        b: 255,
    }
};
//Bird Variable
let sirBird = {
    x: 150,
    y: 150,
    size: 65,
    speed: 1,
    fill: {
        r: 255,
        g: 123,
        b: 0,
    }

};


/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {

    //Mr Furious Speed Range
    constrain(mrFurious.speed, 4, 2);

    //Sky changing colors
    skyShade.fill.b = skyShade.fill.b - 0.3;

    //Mr Furious speed
    mrFurious.speed = random(-3, 3)

    let x = constrain(mrFurious.x, 175, 225);
    let y = constrain(mrFurious.y, 200, 400);

    // constrain(mrFurious.size, 0, 150);
    //mrFurious.size += 1;

    //Making sky
    background(skyShade.fill.r, skyShade.fill.g, skyShade.fill.b);

    //Making Mr Furious change colours
    mrFurious.fill.r = mrFurious.fill.r;
    mrFurious.fill.g = mrFurious.fill.g - 1.5;
    mrFurious.fill.b = mrFurious.fill.b - 1.5;

    //Mr Furious movement
    mrFurious.x += mrFurious.speed;
    mrFurious.y += mrFurious.speed;

    //Bird loop
    if (sirBird.x > width + 50) {
        sirBird.x = -50

    }

    //Bird Speed
    sirBird.x += sirBird.speed;
    //sirBird.y += sirBird.speed;


    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(x, y, mrFurious.size);
    pop();


    //Bird orange circle
    push();
    noStroke();
    fill(sirBird.fill.r, sirBird.fill.g, sirBird.fill.b);
    ellipse(sirBird.x, sirBird.y, sirBird.size);
    pop();


}