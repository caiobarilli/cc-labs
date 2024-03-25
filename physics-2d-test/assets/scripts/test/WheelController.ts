import { _decorator, Component, Node, RigidBody2D, Vec2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("WheelController")
export class WheelController extends Component {
  @property({ type: RigidBody2D })
  wheelRigidBody: RigidBody2D = null;

  private isSpinning: boolean = false;

  onLoad() {
    // Configura o evento de clique do botão de giro
    this.node.on(Node.EventType.TOUCH_END, this.spinWheel, this);
  }

  spinWheel() {
    if (this.isSpinning) return; // Evita girar a roda duas vezes seguidas
    this.isSpinning = true;

    // Aplica uma força aleatória ao Rigidbody2D para girar a roda
    const force = Math.random() * 3000 + 3000; // Força aleatória entre 3000 e 6000
    const torque = force * 0.5;
    this.wheelRigidBody.applyTorque(torque, true); // O segundo argumento indica que o corpo rígido deve ser acordado

    // Aguarda um tempo aleatório antes de parar a roda
    const stopTime = Math.random() * 4 + 3; // Tempo aleatório entre 3 e 7 segundos
    this.scheduleOnce(this.stopWheel, stopTime);
  }

  stopWheel() {
    // Define a velocidade angular para zero, parando a roda
    this.wheelRigidBody.angularVelocity = 0;

    // Detém a roda de girar
    this.isSpinning = false;
  }
}
