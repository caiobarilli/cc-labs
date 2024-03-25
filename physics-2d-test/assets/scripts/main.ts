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
    tooltip: "Set the test ball button",
    type: Button,
  })
  testBall: Button = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the test rotate button",
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

    if (this.testBall) {
      let testBallScreenButton = this.testBall.node;
      testBallScreenButton.on(Button.EventType.CLICK, () => {
        loadOpacity.opacity = 255;
        Utils.preloadSceneWithProgressBar("test-ball", this.progressBar);
      });
    }
    if (this.testRotation) {
      let testRotationScreenButton = this.testRotation.node;
      testRotationScreenButton.on(Button.EventType.CLICK, () => {
        loadOpacity.opacity = 255;
        Utils.preloadSceneWithProgressBar("test-rotation", this.progressBar);
      });
    }
  }
}
