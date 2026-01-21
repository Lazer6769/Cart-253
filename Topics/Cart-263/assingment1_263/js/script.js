const Thing = {
    x: 175,
    y: 175,
    size: 100
}

function setup() {
    createCanvas(400, 400);
    console.log("go")

}

function draw() {
    background(220, 123, 45);


    drawThing(175, 175, 100, 100);
    drawThing(100, 100, 65, 65);
    drawThing(50, 50, 45, 45);

}

function drawThing(f, x, y, size) {
    push();
    noStroke();
    fill(f);
    ellipse(x, y, size);
    pop();
}

