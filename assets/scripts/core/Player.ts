import { _decorator, CCFloat, Component, Node, Vec3 } from "cc";
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

  public playerAnimation: Animation;
  public playerLocation: Vec3;
  public isMoving: boolean = false;
  public lookAtLeft: boolean = true;

  onMove(lookAtLeft: boolean) {
    this.isMoving = true;
    this.onFlip(lookAtLeft);
  }

  onFlip(lookAtLeft: boolean) {
    this.lookAtLeft = lookAtLeft;
    lookAtLeft ? this.node.setScale(-2, 2, 0) : this.node.setScale(2, 2, 0);
  }
}
