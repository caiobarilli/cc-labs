import { _decorator, Component, Vec3, view } from "cc";
import { Utils } from "./Utils";
import { Player } from "../Player";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class Camera extends Component {
  @property({
    group: { name: "Camera nodes" },
    tooltip: "Add player node",
    type: Player,
  })
  public target: Player;

  public utils: Utils;
  public worldPosition: Vec3;

  public screenSize: number[] = [];

  /**
   * @en
   * Creates a new instance of Utils.
   * Set the screen size.
   */
  onLoad() {
    this.utils = new Utils();
    this.screenSize = [
      view.getVisibleSize().width,
      view.getVisibleSize().height,
    ];
  }

  /**
   * @en
   * This function is called every frame.
   */
  update() {
    this.worldPosition = this.target.node.getWorldPosition();

    if (this.targetInHalfScreen(this.worldPosition)) {
      this.focusTargetOnCenter();
    } else {
      this.target.onGround && this.focusTargetOnRight();
    }
  }

  /**
   * @en
   */
  targetInHalfScreen(targetPosX: Vec3) {
    if (targetPosX.x > this.utils.getScreenPercentage(this.screenSize[0], 50)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @en
   */
  focusTargetOnCenter() {
    this.node.position = new Vec3(
      this.target.node.position.x,
      this.worldPosition.y - 90,
      0
    );
  }

  /**
   * @en
   */
  focusTargetOnRight() {
    this.node.position = new Vec3(0, this.worldPosition.y - 90, 0);
  }
}
