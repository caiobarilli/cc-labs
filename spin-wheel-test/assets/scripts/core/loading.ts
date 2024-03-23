import { _decorator, Component, director, ProgressBar, resources } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loading")
export class loading extends Component {
  @property(ProgressBar)
  progressBar: ProgressBar = null;

  onLoad() {
    resources.loadScene(
      "main",
      (completedCount, totalCount) => {
        const progress = completedCount / totalCount;

        this.progressBar.progress = progress;

        console.log("p:", progress);
        console.log("tc:", totalCount);
        console.log("c:", completedCount);

        // if (completedCount) {
        //   setTimeout(() => {
        //     this.progressBar.progress = 100;
        //   }, 1000);
        // }
      },
      (error) => {
        if (error) {
          console.error("Erro ao pré-carregar recursos:", error);
          return;
        }
        director.loadScene("main");
      }
    );
  }
}
