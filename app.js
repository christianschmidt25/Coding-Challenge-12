const canvas = document.getElementById("canvas"); //creates canvas as a variable
const ctx = canvas.getContext("2d"); //this canvas is a 2d image

ctx.fillStyle = '#cccccc'; //creates a light gray background for the canvas
ctx.fillRect(0, 0, canvas.width, canvas.height); //fills the entire background light gray

let drawing = false; //start off not drawing
let startX, startY, endX, endY; 

let selectedShape = document.querySelector('input[name="shape"]:checked').value; //selects a value from the document, finding the checked off shape in this input
let selectedColor = document.getElementById('colorPicker').value; //finds the selected color when using the color picker

document.querySelectorAll('input[name="shape"]').forEach(shape => { //changes the shape depending on which selectedShape is checked
    shape.addEventListener('change', function() {
        selectedShape = this.value;
    });
});

document.getElementById('colorPicker').addEventListener('input', function() { //changes the color based on what color is picked
    selectedColor = this.value;
});

canvas.addEventListener('mousedown', startDrawing); //when mouse is down, it starts drawing
// canvas.addEventListener('mousemove', draw); //drawing occurs as mouse moves
canvas.addEventListener('mouseup', stopDrawing); //drawing stops when mouse comes up

function startDrawing(event) {
    drawing = true; //makes drawing feature happen
    [startX, startY] = [event.offsetX, event.offsetY]; //starts wherever mouse currently is clicking
};

function stopDrawing(event) {
    if (!drawing) return; //when drawing does not occur (and mouse is up), it will stop drawing and showcase the shape

    drawing = false; //stops drawing

    endX = event.offsetX; //ends the shape wherever the mouse ends
    endY = event.offsetY;


    ctx.strokeStyle = selectedColor; //the shape color will be whatever color was picked
    ctx.lineWidth = 2; //thicker line than default
    ctx.beginPath(); //begins to build the shape

    switch (selectedShape) { //formula for line
        case 'line':
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            break;
        case 'rectangle': //formula for rectangle
            ctx.rect(startX, startY, endX - startX, endY - startY);
            break;
        case 'circle': //formula for circle
            let radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            break;
    }

    ctx.stroke(); 
    ctx.closePath();
}

const eraseButton = document.getElementById('erase-canvas') //finds button and defines variable as eraseButton
eraseButton.addEventListener('click', function() { //when clicking the erase button, the following happens
    ctx.clearRect(0, 0, canvas.width, canvas.height); //the canvas is now cleared
    ctx.fillStyle = '#cccccc'; // reset the background to light gray after erasing
    ctx.fillRect(0, 0, canvas.width, canvas.height); //fills the canvas with the background color
});