// 1.create canvas
let canvas = document.getElementById('canvasArea');
let ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight / 2;

// triangle
ctx.beginPath();
ctx.moveTo(200, 0);
ctx.lineTo(250, 0);
ctx.lineTo(225, 25);
ctx.closePath();
ctx.stroke();

// circle
ctx.beginPath();
ctx.arc(800, 715, 50, 0, Math.PI * 2);
ctx.stroke();

// rectangle
ctx.rect(100, 580, 125, 200);
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = 'black';
ctx.stroke();

// circle
ctx.beginPath();
ctx.fillStyle = 'red';
ctx.scale(1, 0.6);
ctx.arc(160, 200, 100, 0, Math.PI * 2);
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = 'black';
ctx.stroke();

// polygon
// https://www.coding.academy/blog/how-to-draw-regular-polygons-using-the-html-canvas
// let numberOfSides = 5;
// let radius = 100;
// let x = 125;
// let y = 125;
// let angle = (2 * Math.PI) / numberOfSides;
// ctx.beginPath();
// ctx.translate(x, y);
// ctx.moveTo(radius, 0);
// for (let i = 1; i <= numberOfSides; i++) {
//   ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
// }
// ctx.stroke();

/**
 * Geometric shapes such as regular polygons are useful building blocks for drawing more complex elements within JavaScript canvas tags. The following block shows 3, 4, 5, 6, 7, 8, 9 and 10 sided regular polygons.
Drawing regular polygons can be done by choosing the position for the center of the polygon, moving to the perimeter and then drawing a series of lines using the Math.cos(), Math.sin() and Math.PI functions. In JavaScript, angles are measured in radians. There are 2*PI radians in a circle. The number of points to plot around the circle is 2*PI divided by the number of sides on the desired polygon. The following code snippet will draw a hexagon:
By changing the value of numberOfSides, any regular polygon can be drawn. Altering the value of size allows larger and smaller shapes to be drawn. 
*/
var numberOfSides = 5,
  size = 20,
  Xcenter = 25,
  Ycenter = 25;

ctx.beginPath();
ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
for (var i = 1; i <= numberOfSides; i += 1) {
  ctx.lineTo(
    Xcenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
    Ycenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
  );
}

ctx.strokeStyle = '#000000';
ctx.lineWidth = 1;
ctx.stroke();

// // triangle
// ctx.beginPath();
// // final point
// ctx.moveTo(100, 10);
// // left
// ctx.lineTo(50, 10);
// // right
// ctx.lineTo(75, 30);
// ctx.closePath()
// ctx.fill();

// context.beginPath();
// // initial location point
// context.moveTo(300,50);
// // final location point
// context.lineTo(50,100);
// // just draw the actual line
// context.stroke()

// let canvas = document.getElementById('canvasArea');
// let ctx = canvas.getContext('2d');

// drawEqTriangle(ctx, 100, canvas.width/2, canvas.height/2);

// function drawEqTriangle(ctx, side, cx, cy){

//     let h = side * (Math.sqrt(3)/2);

//     ctx.strokeStyle = "#000";
//     ctx.fillStyle = '#FFF';

//     ctx.translate(cx, cy);

//     ctx.beginPath();

//         ctx.moveTo(0, -h / 2);
//         ctx.lineTo( -side / 2, h / 2);
//         ctx.lineTo(side / 2, h / 2);
//         ctx.lineTo(0, -h / 2);

//         ctx.stroke();
//         ctx.fill();

//     ctx.closePath();
//     ctx.save();

// }
