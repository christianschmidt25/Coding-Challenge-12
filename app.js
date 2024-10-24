const canvas = document.getElementById("canvas"); //creates canvas as a variable
const ctx = canvas.getContext("2d"); //this canvas is a 2d image

ctx.fillStyle = '#cccccc'; //creates a light gray background for the canvas
ctx.fillRect(0, 0, canvas.width, canvas.height); //fills the entire background light gray

let drawing = false; //start off not drawing
let startX, startY, endX, endY; 

let selectedShape = document.querySelector('input[name="shape"]:checked').value; //selects a value from the document, finding the checked off shape in this input
let selectedColor = document.getElementById('colorPicker').value; //finds the selected color when using the color picker

document.querySelectorAll('input[name="shape"]').forEach(shape => {
    shape.addEventListener('change', function() {
        selectedShape = this.value;
    });
});

document.getElementById('colorPicker').addEventListener('input', function() {
    selectedColor = this.value;
});

canvas.addEventListener('mousedown', startDrawing); //when mouse is down, it starts drawing
// canvas.addEventListener('mousemove', draw); //drawing occurs as mouse moves
canvas.addEventListener('mouseup', stopDrawing); //drawing stops when mouse comes up

function startDrawing(event) {
    drawing = true;
    [startX, startY] = [event.offsetX, event.offsetY];
};

function stopDrawing(event) {
    if (!drawing) return;

    drawing = false;

    endX = event.offsetX;
    endY = event.offsetY;


    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    switch (selectedShape) {
        case 'line':
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            break;
        case 'rectangle':
            ctx.rect(startX, startY, endX - startX, endY - startY);
            break;
        case 'circle':
            let radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            break;
    }

    ctx.stroke();
    ctx.closePath();
}

const eraseButton = document.getElementById('erase-canvas')
eraseButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#cccccc'; // reset the background to light gray after erasing
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});