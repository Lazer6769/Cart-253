
const Something1 = {
    x: 100,
    y: 150,
    height: 100,
    width: 100,
    size: 100,
    pspeedx: 3,
    pspeedy: 0
}

const Something2 = {
    x: 100,
    y: 100,
    height: 150,
    width: 150,
    size: 100,
    ppspeedx: 3,
    ppspeedy: 0

}

const Something3 = {
    x: 150,
    y: 100,
    height: 100,
    width: 100,
    size: 50,
    pppspeedx: 3,
    pppspeedy: 0
}

function setup() {
    createCanvas(400, 400);
    console.log("go")

}

function draw() {
    background(200, 50, 5);


    drawSomething1();
    // moveSomething1();
    drawSomething2();
    // moveSomething2();
    drawSomething3();
    // moveSomething3();

    // drawSomething1(100, 100, 100, 100);
    // drawSomething2(200, 200, 65, 65);
    // drawSomething3(300, 300, 45, 45);
    Something3.y += 6;

    if (Something3.y >= 400) {
        Something3.y = -50
    }
}

function drawSomething1() {
    push();
    noStroke();
    fill("#f0f")
    rect(Something1.x, Something1.y, Something1.size, Something1.size)
    push();
}

function drawSomething2() {
    push();
    noStroke();
    fill("rgb(113, 91, 18)")
    rect(Something2.x, Something2.y, Something2.size, Something2.size)
    push();
}

function drawSomething3() {
    push();
    noStroke();
    fill("rgb(46, 65, 161)")
    rect(Something3.x, Something3.y, Something3.size, Something3.size)
    push();
}

Something2.y += 7;

function keyPressed() {
    if (keyCode === 32) {
        Something2.y += 7;
    }

}

function mousePressed() {
    Something1.y += 5;
}
