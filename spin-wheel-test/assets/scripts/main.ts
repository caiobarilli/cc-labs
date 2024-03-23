import {
  _decorator,
  Button,
  Component,
  Node,
  ProgressBar,
  UIOpacity,
} from "cc";
import { Utils } from "./core/utils";

const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
  @property({ type: Button })
  animations: Button = null;

  @property({ type: Button })
  physics: Button = null;

  @property({ type: Node })
  loading: Node = null;

  @property({ type: ProgressBar })
  progressBar: ProgressBar = null;

  /**
   * @en
   * This function is called when the scene is loading.
   * create a click listener for the play button.
   */
  protected onLoad(): void {
    let animationsButton = this.animations.node;
    let physicsButton = this.physics.node;
    let loadScreen = this.loading;
    let loadOpacity = loadScreen.getComponent(UIOpacity);

    animationsButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("basic-animations", this.progressBar);
    });
    physicsButton.on(Button.EventType.CLICK, () => {
      loadOpacity.opacity = 255;
      Utils.preloadSceneWithProgressBar("basic-physics", this.progressBar);
    });
  }
}
