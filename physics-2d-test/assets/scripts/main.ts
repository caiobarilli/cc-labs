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
export class BasicPhysics extends Component {
  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the main screen button",
    type: Button,
  })
  floatingBall: Button = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the test screen button",
    type: Button,
  })
  testRotation: Button = null;

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

  onLoad(): void {
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    if (this.floatingBall) {
      let floatingBallScreenButton = this.floatingBall.node;
      floatingBallScreenButton.on(Button.EventType.CLICK, () => {
        loadOpacity.opacity = 255;
        Utils.preloadSceneWithProgressBar("floating-ball", this.progressBar);
      });
    }

    if (this.testRotation) {
      let testRotationScreenButton = this.testRotation.node;
      testRotationScreenButton.on(Button.EventType.CLICK, () => {
        loadOpacity.opacity = 255;
        Utils.preloadSceneWithProgressBar("test-scene", this.progressBar);
      });
    }
  }
}
