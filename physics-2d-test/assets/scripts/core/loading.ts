import { _decorator, Component, director, ProgressBar, resources } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loading")
export class loading extends Component {
  @property(ProgressBar)
  progressBar: ProgressBar = null;

  onLoad() {
    resources.loadScene(
      "main-scene",
      (completedCount, totalCount) => {
        const progress = completedCount / totalCount;
        this.progressBar.progress = progress;
      },
      (error) => {
        if (error) {
          console.error("Erro ao pré-carregar recursos:", error);
          return;
        }
        director.loadScene("main-scene");
      }
    );
  }
}
