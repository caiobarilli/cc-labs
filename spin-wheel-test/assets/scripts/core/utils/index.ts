import { _decorator, Component, director, ProgressBar, resources } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Utils")
export class Utils extends Component {
  /**
   * @en
   * Calculate the percentage of a value.
   * @param {number} screenSize The screen size.
   * @param {number} percentage The percentage value.
   * @returns {number} The percentage of a value.
   */
  getScreenPercentage(screenSize: number, percentage: number): number {
    return (screenSize * percentage) / 100;
  }

  /**
   * @en
   * Preload a scene while updating a progress bar.
   * @param {string} sceneName The name of the scene to preload.
   * @param {ProgressBar} progressBar The progress bar to update.
   */
  static preloadSceneWithProgressBar(
    sceneName: string,
    progressBar: ProgressBar
  ): void {
    resources.preloadScene(
      sceneName,
      (completedCount, totalCount) => {
        const progress = completedCount / totalCount;
        progressBar.progress = progress;
      },
      (error) => {
        if (error) {
          console.error("Erro ao pré-carregar recursos:", error);
          return;
        }
        director.loadScene(sceneName);
      }
    );
  }
}
