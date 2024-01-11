import { useRef, useEffect, useState } from 'react'



const Board = props => {
// function Board (props) {
  const canvasRef = useRef(null)
  const initialized = useRef(false);  // board initialized status

  const width = useRef(500);
  const height = useRef(300);
  const paddlex = useRef(0);
  const brickWidth = useRef(0);

  const paddleh = useRef(10); // paddle height (pixels)
  const paddlew = useRef(75); // paddle width (pixels)
  const canvasMinX = useRef(0); // minimum canvas x bounds
  const canvasMaxX = useRef(0); // maximum canvas x bounds
  const intervalId = useRef(0); // track refresh rate for calling draw()
  const nrows = useRef(6); // number of rows of bricks
  const ncols = useRef(6); // number of columns of bricks
  const brickHeight = useRef(15); // height of each brick
  const padding = useRef(1); // how far apart bricks are spaced
  
  const ballRadius = useRef(10); // size of ball (pixels)

  const bricks = useRef(null);

  // change colors of bricks -- add as many colors as you like
  const brick_colors = ["purple", "green", "gold", "blue"];
  const paddlecolor = "black";
  const ballcolor = "black";
  const backcolor = "grey";  

  const [score, setScore] = useState(0);                    // store the number of bricks eliminated
  const [paused, setPaused] = useState(false);               // keeps track of whether the game is paused (true) or not (false)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const canvasCTX = canvas.getContext('2d')

    //Our first draw
    canvasCTX.fillStyle =  '#D3D3D3'
    canvasCTX.fillRect(0, 0, canvasCTX.canvas.width, canvasCTX.canvas.height)
    
    if (!initialized) {
      init(canvasCTX);
      initialized.current = true;
    }

    function init(ctx) {
      height.current = ctx.height();
      paddlex.current = width.current / 2;
      brickWidth.current = width.current / ncols.current - 1;
      canvasMinX.current = ctx.offset().left;
      canvasMaxX.current = canvasMinX.current + width.current;
      // run draw function every 10 milliseconds to give
      // the illusion of movement
      //init_bricks();
      //start_animation();
    }

    // initialize array of bricks to be visible (true)
    function init_bricks() {
      let i = 0;
      let j = 0;
      bricks.current = new Array(nrows.current);
      for (i = 0; i < nrows.current; i++) {
        // for each row of bricks
        bricks[i].current = new Array(ncols.current);
        for (j = 0; j < ncols.current; j++) {
          // for each column of bricks
          bricks[i][j].current = true;
        }
      }
    }
    
    // used to draw the ball
    function circle(ctx, x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    // used to draw each brick & the paddle
    function rect(ctx, x, y, w, h) {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      ctx.fill();
    }

    // clear the screen in between drawing each animation
    function clear(ctx) {
      ctx.clearRect(0, 0, width, height);
      rect(ctx, 0, 0, width, height);
    }

    function pause() {
      if (paused.current) {
        // if paused, begin animation again
        start_animation();
      } else {
        // if unpaused, clear the animation
        stop_animation();
      }
      paused.current = !paused.current;
    }
    
    
    // Draw bricks
    
  }, [])

  
  return (
    <>
      <canvas ref={canvasRef} {...props}></canvas>
    </>
  )
}


export default Board



// import "./App.css";
// //import { useState } from 'react';
// //import "../helpers/globals.js"
// //import $ from 'jquery';

// function Board() {
// //class Board extends Component {

//   return (
//     <>
//       <canvas id="canvas" width="500" height="300">
        
//       </canvas>

//     </>
//   )
// }

// export default Board;

  // const [score, setScore] = useState(0);      // current game score
  // paused: false,          // pause state of the game

  // state = {
  //   width:  500,            // Canvas width
  //   height: 300,            // Canvas height
  //   canvasMinX: 0,          // Minimum canvas X bounds
  //   canvasMaxX: 0,          // Maximum canvas X bounds
  //   numBrickRows: 6,        // # rows of bricks
  //   numBrickCols: 6,        // # columns of bricks

  // }

  // constructor(props) {
  //   super(props);

  //   this.setState(this.boardCTX, $("#canvas")[0].getContext("2d"));
  //   this.setState(this.state.width, this.boardCTX.width());
  //   this.setState(this.state.height, this.boardCTX.height());

  // }

  // init() {
  //   //get a reference to the canvas
  //   this.state.boardCTX = $("#canvas")[0].getContext("2d");
  //   this.state.width = $("#canvas").width();
  //   height = $("#canvas").height();
  //   paddlex = width / 2;
  //   brickWidth = width / ncols - 1;
  //   canvasMinX = $("#canvas").offset().left;
  //   canvasMaxX = canvasMinX + width;
  //   // run draw function every 10 milliseconds to give
  //   // the illusion of movement
  //   //init_bricks();
  //   //start_animation();
  // }

  // render () {
  //   return (
  //     this.boardCTX
  //   )
  // }