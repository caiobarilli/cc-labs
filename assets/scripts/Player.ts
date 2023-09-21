import {
  _decorator,
  Component,
  Animation,
  Sprite,
  RigidBody2D,
  Vec3,
  Vec2,
  SpriteFrame,
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
    group: { name: "Player Sprites" },
    tooltip: "Set the default sprite",
    type: SpriteFrame,
  })
  public defaultSprite: SpriteFrame;

  @property({
    group: { name: "Player Sprites" },
    tooltip: "Set the fall sprite",
    type: SpriteFrame,
  })
  public fallSprite: SpriteFrame;

  @property({
    group: { name: "Player Sprites" },
    tooltip: "Set the jump sprite",
    type: SpriteFrame,
  })
  public jumpSprite: SpriteFrame;

  public onGround: boolean | undefined;
  public isMoving: boolean | undefined;
  public isJumping: boolean | undefined;
  public lookAtLeft: boolean | undefined;
  public isPressingLeftMove: boolean | undefined;
  public isPressingRightMove: boolean | undefined;
  public isPressingJump: boolean | undefined;

  public sprite: Sprite;
  public rigidbody: RigidBody2D;
  public worldPosition: Vec3;
  public animation: Animation;

  /**
   * @en
   * Get the sprite component.
   * Get the animation component.
   * Get the rigidbody component.
   * Set the fixedRotation to rigidbody.
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
   * Set the lookAtLeft value.
   * Check if the player is lookAtLeft and set the scale value.
   * @param {boolean} lookAtLeft
   */
  onFlip(lookAtLeft: boolean) {
    this.lookAtLeft = lookAtLeft;
    lookAtLeft ? this.node.setScale(-2, 2, 0) : this.node.setScale(2, 2, 0);
  }

  /**
   * @en
   */
  onIddle() {
    this.isMoving = false;
    this.animation.play("player_animation_idle");
  }

  /**
   * @en
   */
  onMove() {
    this.isMoving = true;
    this.animation.play("player_animation_run");
  }

  /**
   * @en
   */
  onJump() {
    this.isJumping = true;
    this.sprite.spriteFrame = this.jumpSprite;
  }

  /**
   * @en
   */
  onFall() {
    this.isJumping = false;
    this.sprite.spriteFrame = this.fallSprite;
  }
}
