import { _decorator, Button, Component, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
  @property({ type: Button })
  animations: Button = null;

  @property({ type: Button })
  physics: Button = null;

  /**
   * @en
   * This function is called when the scene is loading.
   * create a click listener for the play button.
   */
  protected onLoad(): void {
    let animationsButton = this.animations.node;
    let physicsButton = this.physics.node;

    animationsButton.on(Button.EventType.CLICK, () => {
      director.loadScene("basic-animations");
    });
    physicsButton.on(Button.EventType.CLICK, () => {
      director.loadScene("basic-physics");
    });
  }
}
