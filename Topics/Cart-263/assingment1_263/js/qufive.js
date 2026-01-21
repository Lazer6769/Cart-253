// let shit = 0 - 10
let Square1Color;
let Square2Color;
let Square1Orange;
let Square2Red;
let Square1Colour;
let Square2Colour;
let counter = 0;
let radius = 50;
let ellipseAlpha = 0;



const Square1 = {
    x: 10,
    y: 20,
    size: 1,
    width: 25,
    height: 25


}

const Square2 = {
    x: 50,
    y: 20,
    size: 1,
    width: 25,
    height: 25

}
function setup() {
    createCanvas(400, 400);
    Square1Color = color("rgb(161, 58, 10)");
    Square1Orange = color("rgb(255, 81, 0)");
    Square2Color = color("rgb(109, 0, 0)");
    Square2Red = color("rgb(255, 0, 0)");


}

function draw() {
    background("rgb(0, 0, 0)");
    displaySquare1();
    displaySquare2();
    checkCollisionWithSquare1();
    checkCollisionWithSquare2();
    circle();

}


function displaySquare1() {
    fill(Square1Color);
    rect(Square1.x, Square1.y, Square1.width, Square1.height, Square1.size);
}

function displaySquare2() {
    fill(Square2Color);
    rect(Square2.x, Square2.y, Square2.width, Square2.height, Square2.size);
}

function checkCollisionWithSquare1() {
    let d1 = dist(mouseX, mouseY, Square1.x, Square1.y);
    if (d1 < 20) {
        Square1Colour = color("rgb(255, 255, 255)");
    } else {
        Square1Color = color("rgb(161, 58, 10)");
    }
}
function checkCollisionWithSquare2() {
    let d2 = dist(mouseX, mouseY, Square2.x, Square2.y);
    if (d2 < 20) {
        Square2Colour = color("rgb(255, 255, 255)");
    } else {
        Square2Color = color("rgb(109, 0, 0)");
    }
}

function mousePressed() {
    let d1 = dist(mouseX, mouseY, Square1.x, Square1.y);
    if (d1 < 20) {
        Square1Color = Square1Orange;
        counter++;

    }

    let d2 = dist(mouseX, mouseY, Square2.x, Square2.y);
    if (d2 < 20) {
        Square2Color = Square2Red;
        counter--;
    }

}

function drawCircle() {
    fill(255, 0, 0, ellipseAlpha);
    ellipse(200, 200, radius, radius);
    ellipseAlpha += 5;

}
