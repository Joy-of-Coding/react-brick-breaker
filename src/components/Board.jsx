import { useRef, useEffect } from 'react'

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
  const initialized = useRef(false);

  // Ball properties
  const ballX = useRef(200); // starting horizontal position of ball
  const ballY = useRef(150); // starting vertical position of ball
  const ballDX = useRef(1); // amount ball should move horizontally
  const ballDY = useRef(-3); // amount ball should move vertically
  const ballRadius = useRef(10); // size of ball (pixels)
  const ballColor = useRef("black");

  // Paddle properties
  const paddleX = useRef(0);
  const paddleHeight = useRef(10); // paddle height (pixels)
  const paddleWidth = useRef(75); // paddle width (pixels)
  const paddleColor = useRef("black");

  // Brick properties
  const brickWidth = useRef(0);
  const brickHeight = useRef(15); // height of each brick
  const brickPadding = useRef(1); // how far apart bricks are spaced
  const brickColors = useRef(["purple", "green", "gold", "blue"]);

  const intervalId = useRef(0); // track refresh rate for calling draw()

  const paused = useRef(false);
  const score = useRef(0);

  const canvas = useRef(null);
  const ctx = useRef(null);

  // Grab the canvas once it has been mounted in the DOM
  useEffect(() => {
    canvas.current = canvasRef.current;
    ctx.current = canvas.current.getContext('2d');

    console.log(getTimeStr() + " useEffect: initialized=", initialized.current);
    if (!initialized.current) {
      init();

      // Set initialized to true
      initialized.current = true;
    }
  })

  function init() {
    // Set the height and width of the board
    ctx.current.canvas.width = boardWidth.current;
    ctx.current.canvas.height = boardHeight.current;

    // Initialize the board
    ctx.current.fillStyle = "grey";
    ctx.current.fillRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height);
    canvasMinX.current = document.getElementById("canvas").getBoundingClientRect().left;
    canvasMaxX.current = canvasMinX.current + boardWidth.current;

    // Initialize the brick states
    initBricks();

    // Initialize the paddle position and register the mouse move event handler
    paddleX.current = (boardWidth.current / 2) - (paddleWidth.current / 2);
    document.addEventListener("mousemove", onMouseMove);

    // Register the keypress event handler
    document.addEventListener("keypress", onKeyPress);

    // run draw function every 10 milliseconds to give
    // the illusion of movement
    console.log(getTimeStr() + " init: starting animation");
    startAnimation();
  }

  // initialize array of bricks to be visible (true)
  function initBricks() {
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
    console.log(getTimeStr() + " calling reload");
    stopAnimation();      // stop animation in case it's currently running
    ballX.current = 200;  // starting horizontal position of ball
    ballY.current = 150;  // starting vertical position of ball
    ballDX.current = 1;   // amount ball should move horizontally
    ballDY.current = -3;  // amount ball should move vertically
    score.current = 0;    // reset the score on reload
    initBricks();         // re-initialize the brick states
    startAnimation();     // restart the animation
  }
  
  // used to draw the ball
  function circle(x, y, r) {
    ctx.current.beginPath();
    ctx.current.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.current.closePath();
    ctx.current.fill();
  }

  // used to draw each brick & the paddle
  function rect(x, y, w, h) {
    ctx.current.beginPath();
    ctx.current.rect(x, y, w, h);
    ctx.current.closePath();
    ctx.current.fill();
  }

  // clear the screen in between drawing each animation
  function clearBoard() {
    ctx.current.clearRect(0, 0, boardWidth.current, boardHeight.current);
    rect(0, 0, boardWidth.current, boardHeight.current);
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
        ctx.current.fillStyle = brickColors.current[(i + j) % brickColors.current.length];
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

  function getTimeStr() {
    const zeroPad = (num, places) => String(num).padStart(places, '0');

    var currentdate = new Date(); 
    var dtStr = zeroPad(currentdate.getHours(), 2) + ":"  
              + zeroPad(currentdate.getMinutes(), 2) + ":" 
              + zeroPad(currentdate.getSeconds(), 2) + "."
              + zeroPad(currentdate.getMilliseconds(), 3);

    return dtStr;
  }

  function drawPaddle() {
    ctx.current.fillStyle = paddleColor.current;
    rect(paddleX.current, boardHeight.current - paddleHeight.current, paddleWidth.current, paddleHeight.current);
  }

  function drawBall() {
    ctx.current.fillStyle = ballColor.current;
    circle(ballX.current, ballY.current, ballRadius.current);
  }

  function ballAnimation() {
    //check if we have hit a brick
    let rowheight = brickHeight.current + brickPadding.current;
    let colwidth = brickWidth.current + brickPadding.current;
    let row = Math.floor(ballY.current / rowheight);
    let col = Math.floor(ballX.current / colwidth);
    //if so reverse the ball and mark the brick as broken
    if (ballY.current < nrows.current * rowheight && row >= 0 && col >= 0 && bricks.current[row][col]) {
      ballDY.current = -ballDY.current;
      bricks.current[row][col] = false;
      score.current += 1;
      updateScoreText();
    }

    //contain the ball by rebouding it off the walls of the canvas
    if (ballX.current + ballDX.current > boardWidth.current || ballX.current + ballDX.current < 0)
      ballDX.current = -ballDX.current;

    if (ballY.current + ballDY.current < 0) {
      ballDY.current = -ballDY.current;
    } else if (ballY.current + ballDY.current > boardHeight.current - paddleHeight.current) {
      // check if the ball is hitting the
      // paddle and if it is rebound it
      if (ballX.current > paddleX.current && ballX.current < paddleX.current + paddleWidth.current) {
        ballDY.current = -ballDY.current;
      }
    }

    // Did the paddle miss the ball? Game over, so stop the animation
    if (ballY.current + ballDY.current > boardHeight.current) {
      console.log(getTimeStr() + " stopping animation");
      stopAnimation();
    }

    // Move the ball
    ballX.current += ballDX.current;
    ballY.current += ballDY.current;
  }

  function updateScoreText() {
    // You can send data to your HTML
    // just like setting styles in CSS
    // Put <div id="score"></div> in
    // your HTML for this text to display
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = "Score: " + score.current;
  }
  
  function draw() {
    // Reset the board
    ctx.current.fillStyle = backcolor.current;
    clearBoard();

    // Draw board components
    drawBricks();
    drawPaddle();
    drawBall();

    // Run the ball animation
    ballAnimation();
  }
  
  function startAnimation() {
    // Only start animation if the intervalId is zero
    if (intervalId.current == 0) {
      intervalId.current = setInterval(draw, 1000/60);
      console.log(getTimeStr() + " animation started with intervalId=", intervalId.current);
    } else {
      console.log(getTimeStr() + " Animation currently running; intervalId=", intervalId.current);
    }
  }
  
  function stopAnimation() {
    if (intervalId.current != 0) {
      console.log(getTimeStr() + " stopping animation intervalId=", intervalId.current);
      clearInterval(intervalId.current);
      intervalId.current = 0;
    } else {
      console.log(getTimeStr() + " Attempting animation stop intervalId=0");
    }
  }

  function pause() {
    if (paused.current) {
      // if paused, begin animation again
      console.log(getTimeStr() + " pause: starting animation");
      startAnimation();
    } else {
      // if unpaused, clear the animation
      console.log(getTimeStr() + " pause: stopping animation");
      stopAnimation();
    }
    paused.current = !paused.current;
  }

  function onKeyPress(evt) {
    console.log(getTimeStr() + " onKeyPress: key pressed");
    evt.preventDefault();
    pause();
  }
  
  // What do to when the mouse moves within the canvas
  function onMouseMove(evt) {
    // set the paddle position if the mouse position
    // is within the borders of the canvas
    if (evt.pageX > canvasMinX.current && evt.pageX < canvasMaxX.current) {
      let XPos = Math.max(evt.pageX - canvasMinX.current - paddleWidth.current / 2, 0);
      XPos = Math.min(boardWidth.current - paddleWidth.current, XPos);
      paddleX.current = XPos;
    }
  }

  return (
    <>
      <center>
        <canvas id="canvas" ref={canvasRef} {...props}></canvas>
        <p>Mouse moves platform &bull; Press any key to pause</p>
        <p></p>
        <button onClick={reload}>Play again!</button>
        <div id="score">Score: 0</div>
      </center>
    </>
  )
}

export default Board
