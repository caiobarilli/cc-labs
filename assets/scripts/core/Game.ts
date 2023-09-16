import { _decorator, Component, Input, input, Node } from "cc";
import { Player } from "./Player";
import { Controls } from "./Controls";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  @property({
    type: Controls,
    group: { name: "Game nodes" },
    tooltip: "Add Controls node",
  })
  public controls: Controls;

  @property({
    type: Player,
    group: { name: "Game nodes" },
    tooltip: "Add Player node",
  })
  public player: Player;

  onLoad(): void {
    input.on(Input.EventType.KEY_DOWN, this.controls.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.controls.onKeyUp, this);
  }

  start() {
    console.log("game started");
  }

  update(deltaTime: number) {}
}
