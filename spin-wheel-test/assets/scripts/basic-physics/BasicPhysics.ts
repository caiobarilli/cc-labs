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

  onLoad(): void {
    let mainScreenButton = this.mainBtn.node;

    mainScreenButton.on(Button.EventType.CLICK, () => {
      director.loadScene("main");
    });
  }
}
