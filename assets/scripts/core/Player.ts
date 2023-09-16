import { _decorator, CCFloat, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  @property({
    type: CCFloat,
    group: { name: "Player Infos" },
    tooltip: "Set the jump height value",
  })
  public jumpHeight: number = 1.5;

  @property({
    type: CCFloat,
    group: { name: "Player Infos" },
    tooltip: "Set the jump duration value",
  })
  public jumpDuration: number = 1.5;

  public isMoving: boolean = false;
  public lookAtLeft: boolean = true;

  onMove(lookAtLeft: boolean) {
    this.isMoving = true;
  }

  onFlip(lookAtLeft: boolean) {
    lookAtLeft ? this.node.setScale(-2, 2, 0) : this.node.setScale(2, 2, 0);
  }
}
