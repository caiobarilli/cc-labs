import { _decorator, Component, Node } from "cc";
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
}
