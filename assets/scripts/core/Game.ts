import { _decorator, Component } from "cc";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  @property({
    type: Player,
    group: { name: "Game nodes" },
    tooltip: "Add Player node",
  })
  public player: Player;

  start() {}

  update(deltaTime: number) {
    if (this.player) {
      let lookAtLeft = this.player.lookAtLeft;
      console.log(lookAtLeft);
    }
  }
}
