//import $ from 'jquery'

//-------------------------
// GLOBAL VARIABLES
//-------------------------
// var x = 200; // starting horizontal position of ball
// var y = 150; // starting vertical position of ball
// var dx = 1; // amount ball should move horizontally
// var dy = -3; // amount ball should move vertically
// // variables set in init()
// var paddlex, bricks, brickWidth;
// var paddleh = 10; // paddle height (pixels)
// var paddlew = 75; // paddle width (pixels)
// var intervalId = 0; // track refresh rate for calling draw()
// var brickHeight = 15; // height of each brick
// var padding = 1; // how far apart bricks are spaced

// var ballRadius = 10; // size of ball (pixels)
// // change colors of bricks -- add as many colors as you like
// var brick_colors = ["purple", "green", "gold", "blue"];
// var paddlecolor = "black";
// var ballcolor = "black";
// var backcolor = "grey";

// used to draw the ball
export function circle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}
  
// used to draw each brick & the paddle
export function rect(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
}

// clear the screen in between drawing each animation
export function clear(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    rect(0, 0, width, height);
}
