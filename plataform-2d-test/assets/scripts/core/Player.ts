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
    tooltip: "Velocidade do jogador nos eixos X e Y",
  })
  public velocity: Vec2 = new Vec2(4, 10);

  @property({
    group: { name: "Player Sprites" },
    tooltip: "Sprite padrão (idle)",
    type: SpriteFrame,
  })
  public defaultSprite: SpriteFrame;

  @property({
    group: { name: "Player Sprites" },
    tooltip: "Sprite de queda",
    type: SpriteFrame,
  })
  public fallSprite: SpriteFrame;

  @property({
    group: { name: "Player Sprites" },
    tooltip: "Sprite de pulo",
    type: SpriteFrame,
  })
  public jumpSprite: SpriteFrame;

  public onGround = false;
  public isMoving = false;
  public isJumping = false;
  public lookAtLeft = false;
  public isPressingLeftMove = false;
  public isPressingRightMove = false;
  public isPressingJump = false;

  public sprite: Sprite;
  public rigidbody: RigidBody2D;
  public animation: Animation;
  public worldPosition: Vec3;

  onLoad() {
    this.initSprite();
    this.initAnimation();
    this.initRigidbody();
    this.cacheWorldPosition();
  }

  private initSprite() {
    this.sprite = this.getComponent(Sprite)!;
  }

  private initAnimation() {
    this.animation = this.getComponent(Animation)!;
  }

  private initRigidbody() {
    this.rigidbody = this.getComponent(RigidBody2D)!;
    this.rigidbody.fixedRotation = true;
  }

  private cacheWorldPosition() {
    this.worldPosition = this.node.getWorldPosition();
  }

  /**
   * Inverte a escala do jogador com base na direção para olhar para esquerda/direita.
   */
  onFlip(lookAtLeft: boolean) {
    this.lookAtLeft = lookAtLeft;
    const scaleX = lookAtLeft ? -2 : 2;
    this.node.setScale(scaleX, 2, 0);
  }

  /**
   * Define o estado de idle e ativa a animação correspondente.
   */
  onIddle() {
    this.isMoving = false;
    this.animation.play("player_animation_idle");
  }

  /**
   * Define o estado de movimento e ativa a animação de corrida.
   */
  onMove() {
    this.isMoving = true;
    this.animation.play("player_animation_run");
  }

  /**
   * Ativa o estado de pulo e troca para o sprite de pulo.
   */
  onJump() {
    this.isJumping = true;
    this.sprite.spriteFrame = this.jumpSprite;
  }

  /**
   * Ativa o estado de queda e troca para o sprite de queda.
   */
  onFall() {
    this.isJumping = false;
    this.sprite.spriteFrame = this.fallSprite;
  }
}
