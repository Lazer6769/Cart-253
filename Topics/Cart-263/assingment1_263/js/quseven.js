let xpos = 20;
let ypos = 20;
let circleSize = 45; // Change to any multiple of 5 (5, 10, 15, ..., 100)
let circleColor;

function setup() {
    createCanvas(400, 400);
    noLoop();
    generateRandomColor();

}

function draw() {
    background(0);
    fill(circleColor);
    noStroke();

    let step = circleSize + 5; // 5 pixels gap between circles

    for (let j = 0; j < 8; j++) {
        for (let i = 0; i < 8; i++) {
            ellipse(xpos + (step * i), ypos + (step * j), circleSize, circleSize);
        }
    }
}

function generateRandomColor() {
    circleColor = color(random(255), random(255), random(255));
}

function keyPressed() {
    if (key === ' ') {
        generateRandomColor();
        redraw();
    }
}



