window.onload = setup;

/** function setup */
function setup() {
    console.log("we are a go!")
    /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
    /*** START PART ONE ACCESS */
    /* 1: all paragraph elements */
    /***CODE */
    /***OUTPUT: 
     * 
     */

    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        console.log(p.textContent);
        p.style.color = 'blue';
    });



    /*************************************** */
    /* 2: only the first paragraph element */
    /***CODE */
    /***OUTPUT:
     * 
     */
    // let first_element = document.getElementById("1");
    // let first_again = document.querySelector("1");
    // console.log(first_element);
    // console.log(first_again);

    let second_element = document.getElementById("one");
    let second_again = document.querySelector("one");
    console.log(second_element)
    console.log(second_again)

    /*************************************** */
    /* 3: all elements with the class inner-container */
    /***CODE */
    /***OUTPUT: 
     * 
     */
    let firstEl = document.querySelector(".img-descript");
    let htmlOfEl = firstEl.innerHTML;
    let textOfEl = firstEl.textContent;
    console.log(firstEl);
    console.log(textOfEl);


    /*************************************** */
    /* 4: the last image element inside the element that has the class img-container */
    /***CODE */
    /***OUTPUT: 
     * 
     */
    let imgContainer = document.querySelector(".img-container");
    let lastImg = imgContainer.querySelectorAll("img");
    console.log(lastImg[lastImg.length - 1]);

    /*************************************** */
    /* 5A: all h2 elements */
    /* 5B: length of the list in 5A */
    /* 5C: the text content of the first element in the list from 5A */
    /***CODE */
    /***OUTPUT: 
     * 
     */
    let h2Elements = document.querySelectorAll("h2");
    console.log(h2Elements);
    console.log(h2Elements.length);
    if (h2Elements.length > 0) {
        console.log(h2Elements[0].textContent);
    }


    /*************************************** */
    /* 6: the element with id name parent */
    /***CODE */
    /***OUTPUT: 
     * 
     */
    let parentElement = document.getElementById("parent");
    console.log(parentElement);
    /*************************************** */
    /*** END PART ONE ACCESS */


    /*************************************** */
    /*** START PART TWO MODIFY */
    /*************************************** */
    /* 1: Select the first paragraph and replace the text within the paragraph... */
    /***CODE */
    let firstParagraph = document.querySelector("p");
    firstParagraph.textContent = "Name: Jordan Lobasso, Date: january 25, 2026";
    console.log(firstParagraph);

    let secondParagraph = document.querySelectorAll("p");
    if (secondParagraph.length > 1) {
        secondParagraph[1].textContent = "I am enjoying this class very much!";
    }
    console.log(secondParagraph);
    /*************************************** */
    /* 2: Select all elements in the HTML that have the class name content-container
     and change the background color ... of first and second ...*/
    /***CODE */
    let contentContainers = document.querySelectorAll(".content-container");
    if (contentContainers.length > 0) {
        contentContainers[0].style.backgroundColor = "purple"; // First element
    }
    if (contentContainers.length > 1) {
        contentContainers[1].style.backgroundColor = "purple"; // Second element
    }
    if (contentContainers.length > 2) {
        contentContainers[2].style.backgroundColor = "purple"; // Third element
    }
    if (contentContainers.length > 3) {
        contentContainers[3].style.backgroundColor = "purple"; // Fourth element
    }
    if (contentContainers.length > 4) {
        contentContainers[4].style.backgroundColor = "purple"; // Fifth element
    }
    if (contentContainers.length > 5) {
        contentContainers[5].style.backgroundColor = "purple"; // Sixth element
    }
    if (contentContainers.length > 6) {
        contentContainers[6].style.backgroundColor = "purple"; // Seventh element
    }
    if (contentContainers.length > 7) {
        contentContainers[7].style.backgroundColor = "purple"; // Eigth element
    }
    console.log(contentContainers);

    /*************************************** */
    /* 3: Change the src element of the first image element on the page to be ...
    /***CODE */
    let firstImage = document.querySelector("img");
    firstImage.src = "task-2-images/fourteen.png";



    /*************************************** */
    /* 4: Select the third paragraph element on the page and 
    replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
    /***CODE */
    let thirdParagraph = document.querySelectorAll("p");
    if (thirdParagraph.length > 2) {
        thirdParagraph[2].innerHTML = "<h2>TEST 123</h2>";
    }
    console.log(thirdParagraph);

    /*************************************** */
    /* 5: Select the fourth paragraph element on the page and 
    add to the existing content an h2 element containing the text `TEST 123`
    /***CODE */

    let fourthParagraph = document.querySelectorAll("p");
    if (fourthParagraph.length > 3) {
        fourthParagraph[3].innerHTML += "<h2>TEST 123</h2>";
    }
    console.log(fourthParagraph);
    /*************************************** */
    /* 6: Select the fifth paragraph element on the page and add to the existing content 
    an img element that holds `one.png`, and add the class newStyle to said paragraph element.
    /***CODE */
    let fifthParagraph = document.querySelectorAll("p");
    if (fifthParagraph.length > 4) {
        fifthParagraph[4].innerHTML += '<img src="task-2-images/one.png" alt="Image">';
        fifthParagraph[4].classList.add("newStyle");
    }
    console.log(fifthParagraph);

    /*************************************** */
    /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
    then access all elements with class name inner-container and save to a variable called `innerContainers`. 
    Next, iterate over the colors array, and for each color: 
    assign the element from innerContainers variable with the same index 
    (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
    a background using that color.
    /***CODE */

    let colors = ['red', 'blue', 'green', 'orange'];
    let innerContainers = document.querySelectorAll('.inner-container');
    let minLength = Math.min(colors.length, innerContainers.length);

    for (let i = 0; i < minLength; i++) {
        innerContainers[i].style.backgroundColor = colors[i];
    }

    /*************************************** */
    /*** END PART TWO MODIFY */


    /*************************************** */
    /*** START PART THREE CREATE */
    /*************************************** */
    /* 1: NEW PARAGRAPHS */
    /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
    /* 1B: Create a function:function customCreateElement(parent){ //body } */
    /* 1C:  In the body of customCreateElement create a new parargraph element*/
    /* 1D:  Set the text of this element to be : `using create Element`*/
    /* 1E:  Set the background of this paragraph element to be green */
    /* 1F:  Set the color of the text in this paragraph element to be white */
    /* 1G: Append this new element to the parent variable within the function. */
    /* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
    passing the current allPTagsThree element as the parent with each iteration.*/
    /***CODE */

    let allPTagsThree = document.querySelectorAll("p");

    function customCreateElement(parent) {
        let newParagraph = document.createElement("p");
        newParagraph.textContent = "using create Element";
        newParagraph.style.backgroundColor = "green";
        newParagraph.style.color = "white";
        parent.appendChild(newParagraph);
    }

    allPTagsThree.forEach(pTag => {
        customCreateElement(pTag);
    });
    /***EXPLANATION::
     * 
     * 
     */

    /*************************************** */
    /* 2: GRID OF BOXES */
    /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
    /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
    /* 2C:Then append this new element to the parent variable within the function. 
    /* 2D:Finally, return</code> this new element */
    /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
        Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
        Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
    /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
        Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
        in a variable i.e. returnedDiv. 
        Set the style (left and top) to the of this element to 
        the necessary x and y position (use the counter variables in the for nested for loop to 
        calculate the new positions.
    /* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
        and otherwise let it have a background of purple.</li>
    /* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
        otherwise lat it have the content `ODD`.*/

    /***CODE */
    function customNewBoxCreate(parent) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("testDiv");
        parent.appendChild(newDiv);
        return newDiv;
    }

    let newGrid = document.getElementById("new-grid");

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            let returnedDiv = customNewBoxCreate(newGrid);
            returnedDiv.style.position = "absolute";
            returnedDiv.style.left = (col * 50) + "px";
            returnedDiv.style.top = (row * 50) + "px";


            if (row % 2 === 0) {
                returnedDiv.style.backgroundColor = "white";
                returnedDiv.textContent = "EVEN";
            } else {
                returnedDiv.style.backgroundColor = "purple";
                returnedDiv.textContent = "ODD";
            }
        }
    }

    /***EXPLANATION::
     * 
     * 
     */

    /*************************************** */
    /* 3: GRID OF BOXES II */

    /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
        USE the same customNewBoxCreate function..., the only difference is that the parent element 
        for each of these new divs is the element whose id is `new-grid-three`. */
    /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
        when it is a column where the remainder is 1 or when the remainder is 2 ... 
        HINT:: look up the % operator.. */
    /* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
            then the second a background of orange and the third yellow. */
    /*  3D: Finally, let each div contain the text content representing the associated remainder 
        when dividing by three. */

    /***CODE */


    /***EXPLANATION::
     * 
     * 
     */

    /*************************************** */
    /*** END PART THREE CREATE */
    /*************************************** */





}