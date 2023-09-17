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
   * This function is called every frame.
   */
  update(deltaTime: number) {}

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
   * @param lookAtLeft boolean
   */
  onMove(lookAtLeft: boolean) {
    this.onFlip(lookAtLeft);
    this.isMoving = true;
    this.animation.play("player_animation_run");
  }
}
