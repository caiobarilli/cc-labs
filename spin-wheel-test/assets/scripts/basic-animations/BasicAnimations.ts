import {
  _decorator,
  Component,
  Node,
  Button,
  Animation,
  ProgressBar,
  UIOpacity,
} from "cc";
import { Utils } from "../core/utils";

const { ccclass, property } = _decorator;

@ccclass("game")
export class game extends Component {
  @property({ type: Node })
  loading: Node = null;

  @property({ type: ProgressBar })
  progressBar: ProgressBar = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the stop button",
    type: Button,
  })
  stop: Button = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the spin button",
    type: Button,
  })
  spin: Button = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the reverse spin button",
    type: Button,
  })
  spinReverse: Button = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the main screen button",
    type: Button,
  })
  mainBtn: Button = null;

  @property({
    tooltip: "Set the center wheel node",
    type: Node,
  })
  public centerWheel: Node;

  public animation: Animation | undefined;

  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;
    this.animation = this.getComponent(Animation);
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    mainScreenButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("main", this.progressBar);
    });
  }

  start() {
    let stopButton = this.stop.node;
    let spinButton = this.spin.node;
    let spinReverseButton = this.spinReverse.node;
    stopButton.on(Button.EventType.CLICK, () => {
      this.onStop();
    });
    spinButton.on(Button.EventType.CLICK, () => {
      this.onSpin();
    });
    spinReverseButton.on(Button.EventType.CLICK, () => {
      this.onReverseSpin();
    });
  }

  /**
   * @en
   */
  onStop() {
    this.animation = this.centerWheel.getComponent(Animation);

    this.animation.stop();
  }

  /**
   * @en
   */
  onSpin() {
    this.animation = this.centerWheel.getComponent(Animation);
    if (
      typeof this.animation !== "undefined" &&
      this.animation instanceof Animation
    ) {
      this.animation.play("spin");
    }
  }

  /**
   * @en
   */
  onReverseSpin() {
    this.animation = this.centerWheel.getComponent(Animation);
    if (
      typeof this.animation !== "undefined" &&
      this.animation instanceof Animation
    ) {
      this.animation.play("spin-reverse");
    }
  }

  update(deltaTime: number) {}
}
