import { _decorator, Component, Node, SpriteFrame, Sprite, Vec3, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Parallax')
export class Parallax extends Component {
    @property({
        group: { name: "Layer 1" },
        tooltip: "Set the layer one sprite",
        type: SpriteFrame,
    })
    public layerOne: SpriteFrame;

    @property({
        group: { name: "Layer 2" },
        tooltip: "Set the layer two sprite",
        type: SpriteFrame,
    })
    public layerTwo: SpriteFrame;

    @property({
        group: { name: "Layer 3" },
        tooltip: "Set the layer three sprite",
        type: SpriteFrame,
    })
    public layerThree: SpriteFrame;

    @property({
        group: { name: "Layer 4" },
        tooltip: "Set the layer four sprite",
        type: SpriteFrame,
    })
    public layerFour: SpriteFrame;

    @property({
        group: { name: "Layer 5" },
        tooltip: "Set the layer five sprite",
        type: SpriteFrame,
    })
    public layerFive: SpriteFrame;

    @property({
        type: [CCFloat],
        tooltip: "Velocidade de scroll dos layers (ordem: fundo → frente)"
    })
    public scrollSpeeds: number[] = [0.01, 0.05, 0.85, 0.15, 0.25];

    @property({ type: Node, tooltip: "Referência ao Node do jogador" })
    public player: Node | null = null;

    @property({ tooltip: "Zona morta horizontal em pixels" })
    public horizontalDeadZone: number = 250;

    private layerNodes: Node[] = [];
    private initialPositions: Vec3[] = [];
    private initialPlayerX: number = 0;
    private lastPlayerX: number = NaN;

    start() {
        this.validateSpriteFrames();
        this.setupLayers();
        this.recordInitialPlayerX();
    }

    update(deltaTime: number) {
        if (!this.player) return;
        this.updateParallax();
    }

    private validateSpriteFrames() {
        if (
            !this.layerOne || !this.layerTwo || !this.layerThree ||
            !this.layerFour || !this.layerFive
        ) {
            console.warn("Algum SpriteFrame de layer não foi atribuído!");
        }
    }

    private setupLayers() {
        this.layerNodes = this.node.children.slice(0, 5);

        const spriteFrames = [
            this.layerOne,
            this.layerTwo,
            this.layerThree,
            this.layerFour,
            this.layerFive,
        ];

        for (let i = 0; i < spriteFrames.length; i++) {
            const node = this.layerNodes[i];
            if (!node) continue;

            const sprite = node.getComponent(Sprite);
            if (sprite && spriteFrames[i]) {
                sprite.spriteFrame = spriteFrames[i];
            }

            this.initialPositions[i] = node.position.clone();
        }
    }

    private recordInitialPlayerX() {
        if (this.player) {
            this.initialPlayerX = this.player.getPosition().x;
        }
    }

    private updateParallax() {
        const playerX = this.player!.worldPosition.x;
        const cameraX = this.node.worldPosition.x;
        const dx = playerX - cameraX;

        if (playerX < 950) {
            return;
        }

        if (Math.abs(dx) <= this.horizontalDeadZone) {
            return;
        }

        const sign = Math.sign(dx);
        const adjustedDeltaX = dx - sign * this.horizontalDeadZone;

        for (let i = 0; i < this.layerNodes.length; i++) {
            const node = this.layerNodes[i];
            const speed = this.scrollSpeeds[i] ?? 0;
            const initPos = this.initialPositions[i];

            const parallaxX = initPos.x - adjustedDeltaX * speed;
            node.setPosition(parallaxX, initPos.y, initPos.z);
        }
    }
}
