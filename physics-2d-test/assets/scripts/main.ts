import {
  _decorator,
  Button,
  Component,
  Node,
  ProgressBar,
  UIOpacity,
} from "cc";
import { Utils } from "./core/utils";

const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
  @property({
    group: { name: "UI" },
    tooltip: "Set the floating ball button",
    type: Button,
  })
  floatingBall: Button = null;

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

  /**
   * @en
   * This function is called when the scene is loading.
   * create a click listener for the play button.
   */
  protected onLoad(): void {
    let floatingBallButton = this.floatingBall.node;
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    floatingBallButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("floating-ball", this.progressBar);
    });
  }
}
