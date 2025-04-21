import { _decorator, Component, Vec3, warn } from "cc";
import { Player } from "../Player";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class Camera extends Component {
  @property({ type: Player })
  public target: Player | null = null;

  @property
  public verticalOffset: number = 280;

  @property
  public horizontalDeadZone: number = 50;

  @property
  public followSpeed: number = 5;

  private targetPos: Vec3 = new Vec3();

  private currentPos: Vec3 = new Vec3();

  /**
   * @en
   * This function is called every frame.
   */
  update(dt: number) {

    if (!this.target) {
      warn("Camera: Target não atribuído.");

      return;
    }

    const playerPos = this.target.node.getPosition();
    const cameraPos = this.node.getPosition();

    const dx = playerPos.x - cameraPos.x;

    this.targetPos.x = Math.abs(dx) > this.horizontalDeadZone
      ? playerPos.x - Math.sign(dx) * this.horizontalDeadZone
      : cameraPos.x;

    this.targetPos.y = playerPos.y + this.verticalOffset;

    this.targetPos.z = 0;

    const smoothFactor = Math.min(dt * this.followSpeed, 1);

    Vec3.lerp(this.currentPos, cameraPos, this.targetPos, smoothFactor);

    this.node.setPosition(this.currentPos);
  }
}
