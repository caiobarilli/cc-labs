import {
  _decorator,
  Button,
  Component,
  EventKeyboard,
  input,
  Input,
  KeyCode,
  Node,
  ProgressBar,
  UIOpacity,
} from "cc";
import { Utils } from "../core/utils";

const { ccclass, property } = _decorator;

@ccclass("TestRotate")
export class TestRotate extends Component {
  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the main screen button",
    type: Button,
  })
  mainBtn: Button = null;

  @property({
    group: { name: "LoadScreen" },
    tooltip: "Set the node loadscreen",
    type: Node,
  })
  loading: Node = null;

  @property({
    group: { name: "LoadScreen" },
    tooltip: "Set the progress bar of loadscreen",
    type: ProgressBar,
  })
  progressBar: ProgressBar = null;

  @property({
    group: { name: "Block components" },
    tooltip: "Add Player node",
    type: Node,
  })
  public player: Node;

  /**
   * @en
   * Creates an input listener for the keyboard during loading.
   */
  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    mainScreenButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("main-scene", this.progressBar);
    });

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
        console.log("ok");
        break;
      case KeyCode.ARROW_LEFT:
        break;
      case KeyCode.ARROW_RIGHT:
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
        break;
      case KeyCode.ARROW_RIGHT:
        break;
    }
  }
}
