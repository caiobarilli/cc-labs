import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("TestCollision")
export class TestCollision extends Component {
  start() {
    let node = this.node,
      collider = node.getComponent(Collider2D);

    collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
  }

  update(deltaTime: number) {}

  onCollisionEnter(
    other: Collider2D,
    self: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    console.log("on collision enter", other, self, contact);
  }
}
