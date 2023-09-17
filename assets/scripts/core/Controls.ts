import {
  _decorator,
  Component,
  EventKeyboard,
  Input,
  input,
  KeyCode,
} from "cc";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("Controls")
export class Controls extends Component {
  @property({
    type: Player,
    group: { name: "Controls nodes" },
    tooltip: "Add Player node",
  })
  public player: Player;

  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.SPACE:
        break;
      case KeyCode.ARROW_LEFT:
        this.player.lookAtLeft = true;
        this.player.isMoving = true;
        this.player.onMove();
        break;
      case KeyCode.ARROW_RIGHT:
        this.player.lookAtLeft = false;
        this.player.isMoving = true;
        this.player.onMove();
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.SPACE:
        break;
      case KeyCode.ARROW_LEFT:
        this.player.isMoving = false;
        this.player.onIddle();
        break;
      case KeyCode.ARROW_RIGHT:
        this.player.isMoving = false;
        this.player.onIddle();
        break;
    }
  }
}
