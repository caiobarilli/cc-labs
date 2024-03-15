import { _decorator, Component } from "cc";
const { ccclass } = _decorator;

@ccclass("Game")
export class Game extends Component {
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
