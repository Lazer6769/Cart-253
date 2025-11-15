# Pseudocode for Frogfrogfrog

```
frog
    body
        x: 320 // Halfway across a 640x480 canvas
        y: 480 // Bottom of a 640x480 canvas
        size: 100 // Diameter of the frog circle
    tongue
        x: undefined // Will always match the body
        y: 480 // At the bottom (important to draw it BEHIND the frog)
        size: 20 // The tip of the tongue
        speed: 20 // Speed the tongue movies in pixels/second
        state: idle // At the start the tongue hasn't been launched

fly
    x: 0 // The left
    y: 200? // This will be a random position...
    size: 10 // Small?
    speed: 3 // How fast it moves across the screen

setup()
    Create a 640x480 canvas

draw()
    Draw the background // Probably just blue or something
        moveFly();
        drawFly();
        moveirregularfly();
        drawirregularfly();
        moveslowfly();
        drawslowfly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();
        checkTongueirregularflyOverlap();
        checkTongueslowflyOverlap();
        drawScore();
        drawScoree();
        drawScoreee();

moveFly()
    add fly speed to fly x
    if (fly x is past the right side of the canvas)
        move the fly back to the left
        give the fly a random y position

drawFly()
    Draw a black circle at the fly's position with its size


moveirregularfly()
add irregularfly speed to fly x 
add irregularfly speed to fly y 
move the fly back to the left once it reachs its limit 

drawirregularfly()
    Draw a yellow circle at the irregular fly's position and its size

moveslowfly()
add slowfly speed to slowfly x 
add slowfly speed to slowfly y 


moveFrog()
    Set the frog's x to the mouse x

moveTongue()
    Set tongue x to frog x
    if (tongue state is idle)
        Do nothing
    else if (tongue state is outbound)
        move the tongue up by its speed
        if (tongue hit the top)
            set the tongue state to inbound
    else if (tongue state is inbound)
        move the tongue down by its speed
        if (tongue hit the bottom)
            set the tongue state to idle

since the frog is going to be stationary the tongue is the only thing that moves 
set the frog's tongue x to the mouseX

drawFrog()
    Draw a red circle at the tongue position with its size
    Draw a red line from the tongue position to the frog position
    Draw a green circle at the frog position with its size

checkTongueFlyOverlap()
    if (tongue circle overlaps the fly)
        Move the fly back to the left at a random y
        set the tongue state to inbound

checktongueirregularflyoverlap() 
    if the tongue is overlapping with the irregularfly
    move the irregularfly back to the left and a random y position

checktongueslowflyoverlap() 
    if the tongue is overlapping with the slowfly
    move the slowfly back to the left and a random y position

mousePressed()
    if (tongue state is idle)
        set tongue state to outbound
```