import { _decorator, Button, Component, Node, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
  @property({ type: Button })
  play: Button = null;

  /*
   * This function is called when the scene is loaded.
   * It is not called when the scene is resumed.
   */
  protected onLoad(): void {
    let playButton = this.play.node;

    playButton.on(Button.EventType.CLICK, () => {
      director.loadScene("scene-1");
    });
  }

  /*
   * This function is called when the scene is resumed.
   * It is not called when the scene is loaded.
   */
  start() {}

  /*
   * This function is called every frame.
   */
  update(deltaTime: number) {}
}
