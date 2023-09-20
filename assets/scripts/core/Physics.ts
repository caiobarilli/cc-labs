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
   * Set the player onGround to false.
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
      if (isMoving) {
        this.onPlayerMove(this.player.lookAtLeft);
      } else {
        this.onPlayerStop();
      }

      if (isJumping) {
        this.onPlayerJump();
      }
    } else {
      this.onChangePlayerYPos(this.player.rigidbody.linearVelocity.y);
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
   */
  onChangePlayerYPos(linearVelocityY: number) {
    if (linearVelocityY > 0) {
      this.player.animation.stop();
      this.player.onJump();
    } else {
      this.player.animation.stop();
      this.player.onFall();
    }
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
   */
  onBeginContact() {
    this.player.onGround = true;

    if (!this.player.isMoving) {
      this.player.animation.play("player_animation_idle");
    }
  }

  /**
   * @en
   * Set the player onGround value to false.
   */
  onEndContact() {
    this.player.onGround = false;
  }
}
