import { _decorator, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class Camera extends Component {
  @property({
    group: { name: "Camera target node" },
    tooltip: "Add target node",
    type: Node,
  })
  private target: Node = null;

  private worldPosition: Vec3;

  update(): void {
    this.worldPosition = this.target.getWorldPosition();

    this.node.position = new Vec3(
      this.target.position.x + 600,
      this.worldPosition.y - 90,
      0
    );
  }
}
