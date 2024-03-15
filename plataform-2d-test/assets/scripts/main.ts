import { _decorator, Button, Component, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
  @property({ type: Button })
  play: Button = null;

  /**
   * @en
   * This function is called when the scene is loading.
   * create a click listener for the play button.
   */
  protected onLoad(): void {
    let playButton = this.play.node;

    playButton.on(Button.EventType.CLICK, () => {
      director.loadScene("scene-1");
    });
  }
}
