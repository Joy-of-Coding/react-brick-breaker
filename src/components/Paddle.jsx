import { Component } from 'react';
import rect from '../globals.js'

class Paddle extends Component {
    canvasWidth = 500;

    state = {
        paddlex: 6,
        paddley: 6,
        paddleh: 10, // paddle height (pixels)
        paddlew: 75, // paddle width (pixels)
        canvasMinX: 0,
        canvasMaxX: 0,
    }

    setPaddleX(value) {
        this.setState({
            paddlex: value,
        })
    }

    setCanvasMinX(value) {
        this.setState({
            canvasMinX: value,
        });
    }

    setCanvasMaxX(value) {
        this.setState({
            canvasMaxX: value,
        });
    }

    setCanvasWidth(value) {
        this.setState({
            canvasWidth: value,
        });
    }

    constructor(props) {
        super(props);
    }
    
    render(ctx) {
        //draw the paddle
        rect(this.state.paddlex, ctx.height - this.state.paddleh, this.state.paddlew, this.state.paddleh);
        return ;
    }

    // What do to when the mouse moves within the canvas
    onMouseMove(evt) {
    // set the paddle position if the mouse position
    // is within the borders of the canvas
    if (evt.pageX > this.state.canvasMinX && evt.pageX < this.state.canvasMaxX) {
        let tempPaddleX = Math.max(evt.pageX - this.state.canvasMinX - this.state.paddlew / 2, 0);
        this.setState(Math.min(this.state.canvasWidth - this.state.paddlew, tempPaddleX));
    }
  }
}

export default Paddle