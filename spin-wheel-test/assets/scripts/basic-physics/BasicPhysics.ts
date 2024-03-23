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

@ccclass("BasicPhysics")
export class BasicPhysics extends Component {
  @property({ type: Node })
  loading: Node = null;

  @property({ type: ProgressBar })
  progressBar: ProgressBar = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the main screen button",
    type: Button,
  })
  mainBtn: Button = null;

  // @property({
  //   group: { name: "UI Buttons" },
  //   tooltip: "Set the play button",
  //   type: Button,
  // })
  // playtBtn: Button = null;

  @property({
    tooltip: "Set the center wheel node",
    type: Node,
  })
  public centerWhell: Node;

  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    // let playButton = this.mainBtn.node;

    mainScreenButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("main", this.progressBar);
    });
  }
}
