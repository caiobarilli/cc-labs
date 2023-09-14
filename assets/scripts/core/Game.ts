import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  start() {
    console.log("game started");
  }

  update(deltaTime: number) {}
}
