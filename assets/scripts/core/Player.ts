import {
  _decorator,
  CCFloat,
  Component,
  Animation,
  Sprite,
  RigidBody2D,
  Vec3,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  @property({
    group: { name: "Player Infos" },
    tooltip: "Set the velocity x and y value",
  })
  public velocity: Vec2 = new Vec2(4, 10);

  @property({
    type: CCFloat,
    group: { name: "Player Infos" },
    tooltip: "Set the jump duration value",
  })
  public jumpDuration: number = 1.5;

  public isMoving: boolean | undefined;
  public lookAtLeft: boolean | undefined;
  public onGround: boolean | undefined;

  public sprite: Sprite;
  public rigidbody: RigidBody2D;
  public worldPosition: Vec3;

  /**
   * @en
   * The animation component.
   * clips order:
   * 0 - player_animation_idle (default clip)
   * 1 - player_animation_run
   */
  public animation: Animation;

  /**
   * @en
   * Get the sprite component.
   * Get the animation component.
   * Get the rigidbody component.
   * Set the fixedRotation to rigidbody.
   * Set the worldPosition value.
   */
  onLoad() {
    this.sprite = this.getComponent(Sprite);
    this.animation = this.getComponent(Animation);
    this.worldPosition = this.node.getWorldPosition();
    this.rigidbody = this.node.getComponent(RigidBody2D);
    this.rigidbody.fixedRotation = true;
  }

  /**
   * @en
   * Set the default clip to play on load.
   * Set the collider2D.
   */
  start() {
    this.animation.defaultClip = this.animation.clips[0];
    this.animation.playOnLoad = true;
  }

  /**
   * @en
   * Set the lookAtLeft value.
   * Check if the player is lookAtLeft and set the scale value.
   * @param {boolean} lookAtLeft
   */
  onFlip(lookAtLeft: boolean) {
    this.lookAtLeft = lookAtLeft;
    this.lookAtLeft
      ? this.node.setScale(-2, 2, 0)
      : this.node.setScale(2, 2, 0);
  }

  /**
   * @en
   * Play the idle animation.
   */
  onIddle() {
    this.isMoving = false;
    this.animation.play("player_animation_idle");
  }

  /**
   * @en
   * Change the lookAtLeft value and play the run animation.
   */
  onMove() {
    this.isMoving = true;
    this.animation.play("player_animation_run");
  }
}
