import { _decorator, Component, Node, Vec3 } from "cc";
import { Utils } from "./Utils";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class Camera extends Component {
  @property({
    group: { name: "Camera nodes" },
    tooltip: "Add target node",
    type: Node,
  })
  public target: Node;

  public utils: Utils;
  public worldPosition: Vec3;

  public widthScreenSize: number = 1280;
  public heightScreenSize: number = 720;

  onLoad() {
    this.utils = new Utils();
  }

  /**
   * @en
   * This function is called every frame.
   */
  update() {
    this.worldPosition = this.target.getWorldPosition();

    if (this.worldPosition.x > this.utils.getScreenPercentage(1280, 50)) {
      this.node.position = new Vec3(
        this.target.position.x,
        this.worldPosition.y - 90,
        0
      );
    }
  }
}
