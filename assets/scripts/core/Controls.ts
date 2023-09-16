import { _decorator, Component, EventKeyboard, KeyCode } from "cc";
const { ccclass } = _decorator;

@ccclass("Controls")
export class Controls extends Component {
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        console.log("left down press");
        break;
      case KeyCode.ARROW_RIGHT:
        console.log("right down press");
        break;
      default:
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        console.log("left up press");
        break;
      case KeyCode.ARROW_RIGHT:
        console.log("right up press");
        break;
      default:
        break;
    }
  }
}
