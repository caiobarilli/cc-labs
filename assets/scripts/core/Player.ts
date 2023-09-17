import { _decorator, CCFloat, Component, Animation, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  @property({
    type: CCFloat,
    group: { name: "Player Infos" },
    tooltip: "Set the jump height value",
  })
  public jumpHeight: number = 1.5;

  @property({
    type: CCFloat,
    group: { name: "Player Infos" },
    tooltip: "Set the jump duration value",
  })
  public jumpDuration: number = 1.5;

  public isMoving: boolean | undefined;
  public lookAtLeft: boolean | undefined;
  public onGround: boolean | undefined;

  /**
   * @en
   * The player sprite.
   */
  public sprite: Sprite;

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
   * Get the sprite component;
   * Get the animation component;
   */
  onLoad() {
    this.sprite = this.getComponent(Sprite);
    this.animation = this.getComponent(Animation);
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
   * Flip the player sprite.
   * @param lookAtLeft boolean
   */
  onFlip(lookAtLeft: boolean) {
    lookAtLeft ? this.node.setScale(-2, 2, 0) : this.node.setScale(2, 2, 0);
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
