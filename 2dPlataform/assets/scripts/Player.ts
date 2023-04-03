import {
  _decorator,
  Component,
  Input,
  input,
  EventKeyboard,
  KeyCode,
  RigidBody2D,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  @property({ group: { name: "Default Props" } })
  velocity: Vec2 = new Vec2(4, 10);

  private rigidbody: RigidBody2D;

  private isMoving: boolean = false;
  private lookAtLeft: boolean = true;
  private pressRight: boolean = false;
  private pressLeft: boolean = false;

  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  start() {
    this.rigidbody = this.node.getComponent(RigidBody2D);
  }

  update() {
    if (this.isMoving) {
      if (this.lookAtLeft) {
        this.rigidbody.linearVelocity = new Vec2(-this.velocity.x, 0);
      } else {
        this.rigidbody.linearVelocity = new Vec2(this.velocity.x, 0);
      }
    }
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.onMove(true);
        this.pressLeft = true;

        break;

      case KeyCode.ARROW_RIGHT:
        this.onMove(false);
        this.pressRight = true;

        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.SPACE:
        break;

      case KeyCode.ARROW_LEFT:
        this.pressLeft = false;
        this.isMoving = false;

        break;

      case KeyCode.ARROW_RIGHT:
        this.pressRight = false;
        this.isMoving = false;

        break;
    }
  }

  onMove(lookAtLeft: boolean) {
    this.isMoving = true;
    this.onFlip(lookAtLeft);
  }

  onFlip(lookAtLeft: boolean) {
    this.lookAtLeft = lookAtLeft;
    lookAtLeft ? this.node.setScale(-2, 2, 0) : this.node.setScale(2, 2, 0);
  }
}
