import "./App.css";
import { Component } from 'react';
import $ from "jquery";
// import Paddle from './Paddle';

class Board extends Component {
  // Define the canvas board area
  ctx = undefined;

  constructor(props) {
    super(props);

    this.state = {
      width:  500,      // Canvas width
      height: 300,      // Canvas height
      canvasMinX: 0,    // Minimum canvas X bounds
      canvasMaxX: 0,    // Maximum canvas X bounds
      numBrickRows: 6,  // # rows of bricks
      numBrickCols: 6,  // # columns of bricks
      score: 0,         // current game score
      paused: false,    // pause state of the game
    }

    this.init();
  }

  pauseGame() {
    this.setState(this.state.paused, true);
  }

  unpauseGame() {
    this.setState(this.state.paused, false);
  }

  // initialize game
  init() {
    //get a reference to the canvas
    this.setState(this.ctx, $("#canvas")[0].getContext("2d"));
    this.setState(this.state.width, $("#canvas").width());
    this.setState(this.state.height, $("#canvas").height());
    this.setState(this.state.canvasMinX, $("#canvas").offset().left);
    this.setState(this.state.canvasMaxX, this.state.canvasMinX + this.state.width);
    // paddlex = width / 2;
    // brickWidth = width / ncols - 1;
    // // run draw function every 10 milliseconds to give
    // // the illusion of movement
    // init_bricks();
    // start_animation();
  }


  render() {
    return (
      <div>
        <p>Mouse moves platform &bull; Press any key to pause</p>
        <p>
          <button onClick="reload()">Play again</button>
        </p>
        <div id="score"></div>
      </div>
    )
  }
}

// function App() {
//   return (
//   );
// }

export default Board;
