import { _decorator, Component, Vec3, warn } from "cc";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class Camera extends Component {
  @property({ type: Player })
  public target: Player | null = null;

  @property
  public verticalOffset: number = 280;

  @property
  public horizontalDeadZone: number = 50;

  @property
  public followSpeed: number = 5;

  private targetPos: Vec3 = new Vec3();
  private currentPos: Vec3 = new Vec3();

  update(dt: number) {
    if (this.target) {
      this.updateCameraPosition(dt);
    } else {
      warn("Camera: Target não atribuído.");
    }
  }

  private updateCameraPosition(dt: number) {
    const playerPos = this.target.node.getPosition();
    const cameraPos = this.node.getPosition();

    this.calculateTargetPosition(playerPos, cameraPos);
    this.smoothMoveCamera(cameraPos, dt);
  }

  /**
   * Calcula a posição-alvo da câmera com base na posição do jogador.
   */
  private calculateTargetPosition(playerPos: Vec3, cameraPos: Vec3) {
    const dx = playerPos.x - cameraPos.x;

    // Zona morta horizontal
    this.targetPos.x = Math.abs(dx) > this.horizontalDeadZone
      ? playerPos.x - Math.sign(dx) * this.horizontalDeadZone
      : cameraPos.x;

    // Offset vertical
    this.targetPos.y = playerPos.y + this.verticalOffset;

    // Mantém z em 0 (jogo 2D)
    this.targetPos.z = 0;
  }

  /**
   * Move suavemente a câmera para a posição-alvo usando interpolação linear.
   */
  private smoothMoveCamera(cameraPos: Vec3, dt: number) {
    const smoothFactor = Math.min(dt * this.followSpeed, 1);
    Vec3.lerp(this.currentPos, cameraPos, this.targetPos, smoothFactor);
    this.node.setPosition(this.currentPos);
  }
}
