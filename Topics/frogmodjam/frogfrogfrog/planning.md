# Planning

## Starting point

The initial idea:

> Frog eating flies
> the frog can eat multiple flies
> the frog is in hell for the sins that it has committed

## Experience design

The experience:

> while the frog can not move it can move its tongue. the player must control where the tongue goes in order to capture
the souls of the flies in order to escape his torment 

## Breaking it down

Basic things to do:

- Draw the frog (image? a circle?)
- Draw the tongue...
- Move the frog (how? mouse? keyboard? breathing?)
- Move the fly (in line? buzzing around? random?)
- Figure out if the tongue hits the fly?
- see if music plays 
- firgure out a way to get images in the game 
- see if i can add gif's to my game start, intro, win, and end screens for the frog 
- see if i can only have the tongue move while the frog is sitting there 

Questions:

- What does the frog look like?
    - Circles!
- How does the user control the frog?
    - User controls the frog tongue with the mouse position, just to the left and right
    - User launches the tongue with a mouse click
- How does the fly move?
    - The fly starts on the left at a random y position, and moves to the right in a line
- What does the tongue look like?
    - A red line coming out of the frog...
- What happens if the user doesn't catch the fly?
    - If the fly goes off the right side, it just resets to a new random y on the left
- What does it all look like on the screen? Layout?
    - Frog at the bottom, fly moving across, tongue shooting out of frog

## The program starts to form....

What is there?

- The frog
    - Position and size
    - Position and size of tongue
    - What is the tongue doing?
- The fly
    - Position and the size
    - Velocity

```
- images 
        bee.png
        cartoonfly.png
        hell.png
        hellgate.png
        mosquito.png
        superhellmyedition.png
        The_Hell.png
        thedevil.png
- Gifs
        pepeagony.gif
        pepeblue-pepeblusky.gif
        pepescreaming.gif
        why-cry-why-pepe-why.gif
-sounds 
        17.Haunted Fortress.mp3
        beebuzzing.mp3
        cod-zombies-evil-laugh.mp3
        evil-laugh_2.mp3
        flapjack.mp3
        gulp-with-bubbles.mp3
        hl1scream.mp3
        luigi-burning.mp3
        mosquito.mp3
        scream.mp3
        yoshi-tongue-sound-snes.mp3

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 200
    },
    // The frog's eyes and pupils have positions and sizes
    Eye1: {
        x: 280,
        y: 440,
        size: 75

    },
    Eye2: {
        x: 360,
        y: 440,
        size: 75
    },
    Pupil1: {
        x: 280,
        y: 440,
        size: 45
    },

    Pupil2: {
        x: 360,
        y: 440,
        size: 45
    },
      tongue: {
        x: undefined,
        y: 480,
        tipx: undefined,
        tipy: 480,
        size: 30,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

const fly = {
    x: 0,
    y: 200, // Will be random
    size: 20,
    speedx: 3,
    speedy: 0
};
// irregular fly
// has a position size and speed of horizontal movement
const irregularfly = {
    x: 0,
    y: 150,
    size: 15,
    irspeedx: 2,
    irspeedy: 0
};
// slow fly 
// has a position size and speed of horizontal movement
const slowfly = {
    x: 0,
    y: 100,
    size: 20,
    slspeedx: 1,
    slspeedy: 0
}
```

What happens in this project?

- Start (setup)
    - Create a canvas
    - frogColorstart =(green)
    - frogColorGrey = (grey)

    - resetFly
    
- Every frame (draw)
    - Draw the background
    - Move and draw the fly
    - draw the rest of these:
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
        - Add the fly's speed to it x
        - Add the fly's speed to it y (so it jitters)
        - Draw a circle at the fly's position with its size (black) another one(pink) and another one(yellow) but replace the colors with images of a regular fly, a bee, and a mosquito
    - Move and draw the frog
        - have the frog stay stationary
        - Draw a green circle at the frog's position with its size
    - Move and draw the tongue
        - Move the tongue
            - If the tongue isn't launched, just do nothing... don't draw it
            - If the tongue is launched, move it up (by its speed)
            - If the tongue is coming back, move it down (by its speed)
            - If the tongue hits the top, send it back down
            - If the tongue gets back to the frog, then stop it
        - Draw the tongue
            - Draw a line from the frog to the tongue position
            -  Move the frog's tongue to the mouse's x position
            - Draw a circle at the end of the tongue
    - Check if the tongue hit the fly
        - Check if tongue circle and fly circle overlap
        - If they do, then reset the fly
        - If they don't.... nothing... just keep being a tongue

Events

- If the user clicks the mouse

    - If the tongue is still inside the frog's mouth

        - Launch the tongue

            - whatscreens (whatscreens tells the program to go to the various screens in order for the game to run) for example
            - whatscreens=game, startscreen, instructionsscreen, winscreen, and endscreen

            have sounds play when the game starts 

            have sounds play when the frog uses it's tongue

            have sounds play when the frog eats a fly 
            and have sounds when the fly is eaten by the fly

            - have a timer so the player has a set time until the game is over (frog dies)

            - have a fly soul limit where you have to eat a certain amount of flies to win 

            - have a scoring system so you know how many flies are eaten 
            
            - have a function where the flies overlap with the frogs tongue

