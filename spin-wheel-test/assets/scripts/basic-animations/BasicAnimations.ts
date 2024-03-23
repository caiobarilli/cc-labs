import { _decorator, Component, Node, Button, Animation, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("game")
export class game extends Component {
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
  public centerWhell: Node;

  public animation: Animation | undefined;

  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;
    this.animation = this.getComponent(Animation);

    mainScreenButton.on(Button.EventType.CLICK, () => {
      director.loadScene("main");
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
    this.animation = this.centerWhell.getComponent(Animation);

    this.animation.stop();
  }

  /**
   * @en
   */
  onSpin() {
    this.animation = this.centerWhell.getComponent(Animation);
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
    this.animation = this.centerWhell.getComponent(Animation);
    if (
      typeof this.animation !== "undefined" &&
      this.animation instanceof Animation
    ) {
      this.animation.play("spin-reverse");
    }
  }

  update(deltaTime: number) {}
}
