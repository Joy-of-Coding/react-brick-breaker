import { useRef, useEffect, useState } from 'react'

const Board = props => {
  // Board properties
  const canvasRef = useRef(null)
  const boardWidth = useRef(500);
  const boardHeight = useRef(300);
  const canvasMinX = useRef(0); // minimum canvas x bounds
  const canvasMaxX = useRef(0); // maximum canvas x bounds
  const backcolor = useRef("grey");
  const nrows = useRef(6); // number of rows of bricks
  const ncols = useRef(6); // number of columns of bricks
  const bricks = useRef(null);

  // Ball properties
  const ballX = useRef(200); // starting horizontal position of ball
  const ballY = useRef(150); // starting vertical position of ball
  const ballDX = useRef(1); // amount ball should move horizontally
  const ballDY = useRef(-3); // amount ball should move vertically
  const ballRadius = useRef(10); // size of ball (pixels)
  const ballColor = useRef("black");

  // Paddle properties
  const paddleHeight = useRef(10); // paddle height (pixels)
  const paddleWidth = useRef(75); // paddle width (pixels)
  const paddleColor = useRef("black");

  // Brick properties
  const brickWidth = useRef(0);
  const brickHeight = useRef(15); // height of each brick
  const brickPadding = useRef(1); // how far apart bricks are spaced
  const brickColors = useRef(["purple", "green", "gold", "blue"]);

  const intervalId = useRef(0); // track refresh rate for calling draw()
  
  // useState variables
  const [score, setScore] = useState(0); // store the number of bricks eliminated
  const [paused, setPaused] = useState(false); // keeps track of whether the game is paused (true) or not (false)
  const [paddleX, setPaddleX] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    init();

    function init() {
      // Set the height and width of the board
      ctx.canvas.width = boardWidth.current;
      ctx.canvas.height = boardHeight.current;

      // Initialize the board
      ctx.fillStyle =  '#D3D3D3'
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      canvasMinX.current = document.getElementById('canvas').getBoundingClientRect().left;
      canvasMaxX.current = canvasMinX.current + boardWidth.current;

      // Initialize and draw the bricks
      initBricks();

      // Initialize and draw the paddle
      // console.log("boardWidth=", boardWidth.current, "/2=", boardWidth.current / 2);
      // console.log("paddleWidth=", paddleWidth.current, "/2=", paddleWidth.current / 2);
      document.addEventListener("mousemove", onMouseMove);

      // run draw function every 10 milliseconds to give
      // the illusion of movement
      startAnimation();
    }

    // initialize array of bricks to be visible (true)
    function initBricks() {
      //console.log("boardWidth=", boardWidth.current, "ncols=", ncols.current);
      brickWidth.current = boardWidth.current / ncols.current - 1;
      let i = 0;
      let j = 0;
      let brick2DArray = new Array(nrows.current);
      for (i = 0; i < nrows.current; i++) {
        // for each row of bricks
        brick2DArray[i] = new Array(ncols.current);
        for (j = 0; j < ncols.current; j++) {
          // for each column of bricks
          brick2DArray[i][j] = true;
        }
      }

      bricks.current = brick2DArray;
    }

    function reload() {
      ballX.current = 200; // starting horizontal position of ball
      ballY.current = 150; // starting vertical position of ball
      ballDX.current = 1; // amount ball should move horizontally
      ballDY.current = -3; // amount ball should move vertically
      score.current = 0; // reset the score on reload
      init(); // start the game again!
    }
    

    
    // used to draw the ball
    function circle(x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    // used to draw each brick & the paddle
    function rect(x, y, w, h) {
      //console.log("rect: x=",x,"y=",y,"w=",w,"h=",h);
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      ctx.fill();
    }

    // clear the screen in between drawing each animation
    function clear() {
      ctx.clearRect(0, 0, boardWidth.current, boardHeight.current);
      rect(0, 0, boardWidth.current, boardHeight.current);
    }

    function pause() {
      if (paused) {
        // if paused, begin animation again
        startAnimation();
      } else {
        // if unpaused, clear the animation
        stopAnimation();
      }
      setPaused(!paused);
    }
    
    // What do to when the mouse moves within the canvas
    function onMouseMove(evt) {
      // set the paddle position if the mouse position
      // is within the borders of the canvas
      if (evt.pageX > canvasMinX.current && evt.pageX < canvasMaxX.current) {
        let XPos = Math.max(evt.pageX - canvasMinX.current - paddleWidth.current / 2, 0);
        XPos = Math.min(boardWidth.current - paddleWidth.current, XPos);
        setPaddleX(XPos);
      }
    }

    // render the bricks
    function drawBricks() {
      let i = 0;
      let j = 0;
      for (i = 0; i < nrows.current; i++) {
        // for each row of bricks
        for (j = 0; j < ncols.current; j++) {
          // for each column of bricks
          // set the colors to alternate through
          // all colors in brick_colors array
          // modulus (%, aka remainder) ensures the colors
          // rotate through the whole range of brick_colors
          ctx.fillStyle = brickColors.current[(i + j) % brickColors.current.length];
          if (bricks.current[i][j]) {
            rect(
              j * (brickWidth.current + brickPadding.current) + brickPadding.current,
              i * (brickHeight.current + brickPadding.current) + brickPadding.current,
              brickWidth.current,
              brickHeight.current
            );
          } // else if bricks[i][j] is false it's already been hit
        }
      }
    }

    function drawPaddle() {
      setPaddleX((boardWidth.current / 2) - (paddleWidth.current / 2));
      ctx.fillStyle = paddleColor.current;
      rect(paddleX, boardHeight.current - paddleHeight.current, paddleWidth.current, paddleHeight.current);
    }

    function drawBall() {
      ctx.fillStyle = ballColor.current;
      circle(ballX.current, ballY.current, ballRadius.current);
    }

    function draw() {
      // Reset the 
      ctx.fillStyle = backcolor.current;
      clear();

      // Draw board components
      drawBricks();
      drawPaddle();
      drawBall();

      //check if we have hit a brick
      let rowheight = brickHeight.current + brickPadding.current;
      let colwidth = brickWidth.current + brickPadding.current;
      let row = Math.floor(ballY.current / rowheight.current);
      let col = Math.floor(ballX.current / colwidth.current);
      //if so reverse the ball and mark the brick as broken
      if (ballY.current < nrows.current * rowheight && row >= 0 && col >= 0 && bricks.current[row][col]) {
        ballDY.current = -ballDY.current;
        bricks.current[row][col] = false;
        setScore(score + 1);
        //update_score_text();
      }
    
      //contain the ball by rebouding it off the walls of the canvas
      if (ballX.current + ballDX.current > boardWidth.current || ballX.current + ballDX.current < 0)
        ballDX.current = -ballDX.current;
    
      if (ballY.current + ballDY.current < 0) {
        ballDY.current = -ballDY.current;
      } else if (ballY.current + ballDY.current > boardHeight.current - paddleHeight.current) {
        // check if the ball is hitting the
        // paddle and if it is rebound it
        if (ballX.current > paddleX && ballX.current < paddleX + paddleWidth) {
          ballDY.current = -ballDY.current;
        }
      }

      if (ballY.current + ballDY.current > boardHeight) {
        //game over, so stop the animation
        stopAnimation();
      }
      ballX.current += ballDX.current;
      ballY.current += ballDY.current;
    }
    
    function startAnimation() {
      intervalId.current = setInterval(draw(), 10);
    }
    
    function stopAnimation() {
      clearInterval(intervalId.current);
    }

  }, [paused, score, paddleX])

  
  return (
    <>
      <canvas id="canvas" ref={canvasRef} {...props}></canvas>
    </>
  )
}

export default Board
