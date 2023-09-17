import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  RigidBodyComponent,
} from "cc";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("Physics")
export class Physics extends Component {
  @property({
    type: Player,
    group: { name: "Physics components" },
    tooltip: "Add Player node",
  })
  public player: Player;

  /**
   * @en
   * Call the setCollider2D function.
   */
  onLoad() {
    this.setCollider2D();
  }

  /**
   * @en
   * Creates listner on collision events (BEGIN_CONTACT & END_CONTACT)
   */
  setCollider2D() {
    let collider = this.player.getComponent(Collider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
  }

  /**
   * @en
   * Set the player onGround value to true.
   * @param selfCollider <Collider2D>
   * @param otherCollider <Collider2D>
   * @param contact <IPhysics2DContact>
   */
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.player.onGround = true;
  }

  /**
   * @en
   * Set the player onGround value to false.
   * @param selfCollider <Collider2D>
   * @param otherCollider <Collider2D>
   * @param contact <IPhysics2DContact>
   */
  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.player.onGround = false;
  }
}
