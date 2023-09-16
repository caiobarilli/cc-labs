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

  /**
   * @en
   * This function is called when the scene is resumed.
   */
  start() {}

  /**
   * @en
   * This function is called every frame.
   */
  update(deltaTime: number) {}
}
