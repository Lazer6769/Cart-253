/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */


function setup() {
    createCanvas(800, 600);
}
const menuText = `
(R) Red variation
(G) Green variation
(B) Blue variation`

/**
 * Display the main menu
 */
function draw() {
    background(0);

    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(menuText, width / 2, height / 2);
    pop();
}

/**
 * Listen to the keyboard
 */
function keyPressed(event) {
    switch (event.keyCode) {
        case 82:
            window.open("https://lazer6769.github.io/Cart-253/Topics/VariationJam/pumpkinsmasher/");
            break;

        case 71:
            greenSetup();
            break;

        case 66:
            blueSetup();
            break;
    }
}
