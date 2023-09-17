import { _decorator, CCFloat, Component, Animation } from "cc";
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

  public isMoving: boolean = false;
  public lookAtLeft: boolean = false;

  /**
   * @en
   * The animation component.
   * clips order:
   * 0 - player_animation_idle (default clip)
   * 1 - player_animation_run
   */
  private animation: Animation;

  /**
   * @en
   * Get the animation component and set the default clip to play on load.
   */
  onLoad() {
    this.animation = this.getComponent(Animation);
    this.animation.defaultClip = this.animation.clips[0];
    this.animation.playOnLoad = true;
  }

  /**
   * @en
   * Check every frame if the player is looking at left.
   */
  update(deltaTime: number) {
    this.lookAtLeft
      ? this.onFlip(this.lookAtLeft)
      : this.onFlip(this.lookAtLeft);
  }

  /**
   * @en
   * Flip the player sprite.
   * @param lookAtLeft boolean
   * @returns void
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
   * Play the run animation.
   * @param lookAtLeft boolean
   */
  onMove(lookAtLeft: boolean) {
    lookAtLeft ? (this.lookAtLeft = true) : (this.lookAtLeft = false);
    this.isMoving = true;
    this.animation.play("player_animation_run");
  }
}
