import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Vec2,
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
    this.player.onGround = false;
    this.setCollider2D();
  }

  /**
   * @en
   */
  update() {
    this.playerPhysics(
      this.player.isMoving,
      this.player.isJumping,
      this.player.onGround
    );
  }

  /**
   * @en
   */
  playerPhysics(isMoving: boolean, isJumping: boolean, onGround: boolean) {
    if (onGround) {
      this.player.sprite.spriteFrame = this.player.defaultSprite;

      if (isMoving) {
        this.onPlayerMove(this.player.lookAtLeft);
      } else {
        this.onPlayerStop();
      }

      if (isJumping) {
        this.onPlayerJump();
      }
    } else {
      this.player.onFall();
    }
  }

  /**
   * @en
   */
  onPlayerMove(lookAtLeft: boolean) {
    lookAtLeft
      ? (this.player.rigidbody.linearVelocity = new Vec2(
          -this.player.velocity.x,
          0
        ))
      : (this.player.rigidbody.linearVelocity = new Vec2(
          this.player.velocity.x,
          0
        ));
  }

  /**
   * @en
   */
  onPlayerJump() {
    this.player.rigidbody.applyLinearImpulse(
      new Vec2(0, this.player.velocity.y * this.player.velocity.x),
      new Vec2(this.player.worldPosition.x, this.player.worldPosition.y),
      true
    );
  }

  /**
   * @en
   */
  onPlayerStop() {
    this.player.rigidbody.linearVelocity = new Vec2(0, 0);
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
   * @param {Collider2D} selfCollider
   * @param {Collider2D} otherCollider
   * @param {IPhysics2DContact | null} contact
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
   * @param {Collider2D} selfCollider
   * @param {Collider2D} otherCollider
   * @param {IPhysics2DContact | null} contact
   */
  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.player.onGround = false;
  }
}
