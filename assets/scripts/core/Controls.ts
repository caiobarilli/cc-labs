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

  public isPressingLeftMove: boolean | undefined;
  public isPressingRightMove: boolean | undefined;

  /**
   * @en
   * Creates an input listener for the keyboard during loading.
   */
  onLoad() {
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
        break;
      case KeyCode.ARROW_LEFT:
        this.isPressingLeftMove = true;
        this.player.onMove(true);
        break;
      case KeyCode.ARROW_RIGHT:
        this.isPressingRightMove = true;
        this.player.onMove(false);
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
        break;
      case KeyCode.ARROW_LEFT:
        this.isPressingLeftMove = false;
        if (!this.isPressingRightMove) this.player.onIddle();
        break;
      case KeyCode.ARROW_RIGHT:
        this.isPressingRightMove = false;
        if (!this.isPressingLeftMove) this.player.onIddle();
        break;
    }
  }
}
