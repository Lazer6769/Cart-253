/**
 * New year New "code"
 * Jordan Lobasso 
 * 
 * this is something simple i made where you can just move a colourful circle between a black background and a square. 
 * if you enter the square the trail from the circle fades out and if you leave the square the trail stays. 
 */

function setup() {
  createCanvas(600, 400);
  background(0,255)
  noCursor();
}
  
function draw() { 
 stroke(random(255), random(255), random(255));
strokeWeight(5);  
fill(random(255), random(255), random(255));
ellipse(mouseX, mouseY, 100, 100);
  
fill(0,0,0,10);
  rect(150,50,300);
  fill(random(255),random(255), random(255), random(255));
       circle(random(700), random(400), random(50));

}