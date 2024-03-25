import {
  _decorator,
  Button,
  Component,
  Node,
  ProgressBar,
  UIOpacity,
} from "cc";
import { Utils } from "../core/utils";

const { ccclass, property } = _decorator;

@ccclass("TestBall")
export class BasicPhysics extends Component {
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

  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    mainScreenButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("main-scene", this.progressBar);
    });
  }
}
