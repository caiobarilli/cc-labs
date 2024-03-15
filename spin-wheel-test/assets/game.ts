import { _decorator, Component, Node, Button, Sprite, Animation } from "cc";
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
    tooltip: "Set the center wheel node",
    type: Node,
  })
  public centerWhell: Node;

  public sprite: Sprite;
  public animation: Animation;

  public isStoped: boolean | undefined;

  onLoad(): void {
    this.sprite = this.getComponent(Sprite);
    this.animation = this.getComponent(Animation);
  }

  start() {
    let stopButton = this.stop.node;
    stopButton.on(Button.EventType.CLICK, () => {
      this.onStop();
    });
  }

  /**
   * @en
   */
  onStop() {
    this.isStoped = true;
    const animation = this.centerWhell.getComponent(Animation);
    animation && animation.stop();
  }

  update(deltaTime: number) {}
}
