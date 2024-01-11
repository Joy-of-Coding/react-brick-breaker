//import { rect } from '../helpers/globals'
// import { useState } from 'react'
// import { rect } from '../helpers/globals'

// function Paddle ({canvas}) {
//     let canvasWidth = canvas.width;
//     const [paddleX, setPaddleX] = useState(canvasWidth / 2);
    
//     let canvasMinX = canvas.offset().left;  
//     let canvasMaxX = canvasMinX - canvas.width;


    // rect(canvas, )
    // What do to when the mouse moves within the canvas
    // function onMouseMove(evt) {
    //     // set the paddle position if the mouse position
    //     // is within the borders of the canvas
    //     if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    //         let XPos = Math.max(evt.pageX - canvasMinX - paddlew / 2, 0);
    //         XPos = Math.min(width - paddlew, XPos);
    //         setPaddleX(XPos)
    //         paddlex = Math.max(evt.pageX - canvasMinX - paddlew / 2, 0);
    //         paddlex = Math.min(width - paddlew, paddlex);
    //     }
    // }
  

//     return (
//         <>
//         </>
//     )
// }

// export default Paddle




    // state = {
    //     paddlex: 6,
    //     paddley: 6,
    //     paddleh: 10,            // paddle height (pixels)
    //     paddlew: 75,            // paddle width (pixels)
    //     canvasWidth: 500,       // canvas board width (pixels)
    //     canvasMinX: 0,
    //     canvasMaxX: 0,

    //     boardCTX: undefined,    // canvas board object
    // }


//     setPaddleX (value) {
//         this.setState(this.state.paddlex, value);
//     }

//     setCanvasCTX (value) {
//         this.setState(this.state.boardCTX, value);
//     }
    
//     render() {
//         //draw the paddle
//         rect(this.state.boardCTX, this.state.paddlex, this.state.height - this.state.paddleh, this.state.paddlew, this.state.paddleh);
//         return ;
//     }

//     // What do to when the mouse moves within the canvas
//     onMouseMove(evt) {
//     // set the paddle position if the mouse position
//     // is within the borders of the canvas
//     if (evt.pageX > this.state.canvasMinX && evt.pageX < this.state.canvasMaxX) {
//         let tempPaddleX = Math.max(evt.pageX - this.state.canvasMinX - this.state.paddlew / 2, 0);
//         this.setState(Math.min(this.state.canvasWidth - this.state.paddlew, tempPaddleX));
//     }
//   }
