import {
  _decorator,
  Button,
  Component,
  Node,
  ProgressBar,
  Quat,
  tween,
  UIOpacity,
  Vec3,
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

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the play button",
    type: Node,
  })
  playtBtn: Node = null;

  @property({
    tooltip: "Set the center wheel node",
    type: Node,
  })
  public centerWheel: Node;

  private isTouching: boolean = false;
  private touchStartTime: number = 0;

  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    let playButton = this.playtBtn;

    mainScreenButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("main", this.progressBar);
    });

    playButton.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    playButton.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    playButton.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  private onTouchStart() {
    this.isTouching = true;
    this.touchStartTime = Date.now();
  }

  private onTouchEnd() {
    if (this.isTouching) {
      this.isTouching = false;
      let touchEndTime = Date.now();
      let touchDuration = touchEndTime - this.touchStartTime;

      touchDuration = Math.min(touchDuration, 5000);
      let rotationAmount = touchDuration * 0.05;

      // console.log("touchEndTime:", touchEndTime);
      // console.log("touchDuration:", touchDuration);
      // console.log("rotationAmount:", rotationAmount);

      this.rotateCenterWheelWithTween(rotationAmount);
    }
  }

  private rotateCenterWheelWithTween(rotationAmount: number) {
    let targetRotation = new Quat();
    Quat.fromEuler(targetRotation, 0, 0, rotationAmount);

    tween(this.centerWheel)
      .by(
        0.5,
        { eulerAngles: new Vec3(0, 0, rotationAmount) },
        { easing: "sineInOut" }
      )
      .start();
  }
}
