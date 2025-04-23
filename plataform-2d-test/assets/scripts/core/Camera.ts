import { _decorator, Component, Vec3, warn } from "cc";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class Camera extends Component {
  @property({ type: Player })
  public target: Player | null = null;

  @property({ tooltip: "Distância vertical da câmera em relação ao jogador." })
  public verticalOffset: number = 280;

  @property({ tooltip: "Zona morta horizontal. A câmera só se move se o jogador sair dessa zona." })
  public horizontalDeadZone: number = 250;

  @property({ tooltip: "Velocidade de acompanhamento da câmera." })
  public followSpeed: number = 5;

  @property({ tooltip: "Altura mínima da câmera." })
  public minY: number = -Infinity;

  @property({ tooltip: "Altura máxima da câmera." })
  public maxY: number = Infinity;

  private targetPos: Vec3;
  private currentPos: Vec3;

  start() {
    this.targetPos = new Vec3();
    this.currentPos = new Vec3();
  }

  update(dt: number) {
    if (!this.target) {
      warn("Camera: Target não atribuído.");
      return;
    }

    this.updateCameraPosition(dt);
  }

  private updateCameraPosition(dt: number) {
    const playerPos = this.target.node.getPosition();
    const cameraPos = this.node.getPosition();

    this.calculateTargetPosition(playerPos, cameraPos);
    this.smoothMoveCamera(cameraPos, dt);
  }

  private calculateTargetPosition(playerPos: Vec3, cameraPos: Vec3) {
    this.targetPos.x = this.calculateXWithDeadZone(playerPos.x, cameraPos.x);
    this.targetPos.y = this.calculateYWithOffset(playerPos.y);
    this.targetPos.z = 0; // mantém o plano 2D
  }

  private calculateXWithDeadZone(playerX: number, cameraX: number): number {
    const dx = playerX - cameraX;
    const outsideDeadZone = Math.abs(dx) > this.horizontalDeadZone;
    return outsideDeadZone ? playerX - Math.sign(dx) * this.horizontalDeadZone : cameraX;
  }

  private calculateYWithOffset(playerY: number): number {
    const y = playerY + this.verticalOffset;
    return Math.max(this.minY, Math.min(this.maxY, y));
  }

  private smoothMoveCamera(cameraPos: Vec3, dt: number) {
    const smoothFactor = Math.min(dt * this.followSpeed, 1);
    Vec3.lerp(this.currentPos, cameraPos, this.targetPos, smoothFactor);
    this.node.setPosition(this.currentPos);
  }
}
