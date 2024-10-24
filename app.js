const canvas = document.getElementById("canvas"); //creates canvas as a variable
const ctx = canvas.getContext("2d"); //this canvas is a 2d image

ctx.fillStyle = '#cccccc'; //creates a light gray background for the canvas
ctx.fillRect(0, 0, canvas.width, canvas.height); //fills the entire background light gray
