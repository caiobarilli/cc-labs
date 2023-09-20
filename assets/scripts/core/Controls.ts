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
    group: { name: "Controls components" },
    tooltip: "Add Player node",
  })
  public player: Player;

  /**
   * @en
   * Set the player isMoving to false.
   * Creates an input listener for the keyboard during loading.
   */
  onLoad() {
    this.player.isMoving = false;
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  /**
   * @en
   * This function is called when keyboard is pressed.
   */
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.SPACE:
        this.player.isPressingJump = true;
        this.player.onJump();
        break;
      case KeyCode.ARROW_LEFT:
        this.player.isPressingLeftMove = true;
        this.player.onFlip(true);
        this.player.onMove();
        break;
      case KeyCode.ARROW_RIGHT:
        this.player.isPressingRightMove = true;
        this.player.onMove();
        this.player.onFlip(false);
        break;
    }
  }

  /**
   * @en
   * This function is called when keyboard is released.
   */
  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.SPACE:
        this.player.isPressingJump = false;
        break;
      case KeyCode.ARROW_LEFT:
        this.player.isPressingLeftMove = false;
        this.player.onIddle();
        break;
      case KeyCode.ARROW_RIGHT:
        this.player.isPressingRightMove = false;
        this.player.onIddle();
        break;
    }
  }
}
