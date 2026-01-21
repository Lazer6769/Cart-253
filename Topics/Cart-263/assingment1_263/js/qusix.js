
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0)
    textSize(28)
    fill(255)
    text('test', 167, 200)

    // Loop 10 times with x offset
    for (let i = 0; i < 10; i++) {
        textSize(14);
        text(i, i * 30, 10);
    }

    // Loop 15 times (15 down to 1) with y offset
    for (let i = 15; i >= 1; i--) {
        text(i, 0, i * 26);
    }

}