import { _decorator, Button, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BasicPhysics")
export class BasicPhysics extends Component {
  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the main screen button",
    type: Button,
  })
  mainBtn: Button = null;

  @property({
    group: { name: "UI Buttons" },
    tooltip: "Set the play button",
    type: Button,
  })
  playtBtn: Button = null;

  @property({
    tooltip: "Set the center wheel node",
    type: Node,
  })
  public centerWhell: Node;

  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;
    let playButton = this.mainBtn.node;

    mainScreenButton.on(Button.EventType.CLICK, () => {
      director.loadScene("main");
    });
  }
}
