let thing1 = 0;
let thing2 = 40;
let thing3 = 80;

function setup() {
    createCanvas(400, 400);

}

function draw() {
    background(220);

    noStroke();

    fill(thing1);
    rect(0, 0, width / 2, height);

    fill(thing2);
    rect(100, 0, width / 2, height);

    fill(thing3);
    rect(250, 0, width / 2, height);

    thing1 = thing1 - 1;
    thing2 = thing2 - 1;
    thing3 = thing3 - 1;

    if (mouseX < width / 2 && mouseY < height / 2) {
        thing1 = 255;
    }
    if (mouseX > width / 4 && mouseY < height / 2) {
        thing2 = 255;
    }
    if (mouseX < width / 6 && mouseY > height / 2) {
        thing3 = 255;
    }
}
