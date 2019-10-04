import { Painter as PlayfieldPainter } from "../playfield/Painter"
import { UIColors } from "../colors"
import { Config } from "../config"
import { Rectangle } from "../../../framework/utils/Rectangle"
import { Score } from "../Score"

export class Painter extends PlayfieldPainter {
  drawBackground() {
    this.clear()
    this.drawSmallGuide()
  }

  clear() {
    this.ctx.fillStyle = UIColors.SIDEBAR_BACKGROUND
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawSmallGuide() {
    this.drawGuide(
      new Rectangle(
        Config.SQUARE_WIDTH,
        Config.SQUARE_WIDTH,
        Config.SQUARE_WIDTH * 4,
        Config.SQUARE_WIDTH * 2
      )
    )
  }

  drawLevel() {
    this.drawText(
      `Level : ${Score.level}`,
      Config.SQUARE_WIDTH / 2,
      Config.SQUARE_WIDTH * 4
    )
  }

  drawLinesCleared() {
    this.drawText(
      `Cleared : ${Score.linesCleared}`,
      Config.SQUARE_WIDTH / 2,
      Config.SQUARE_WIDTH * 5
    )
  }

  drawScore() {
    this.drawText(
      `Score : ${Score.total}`,
      Config.SQUARE_WIDTH / 2,
      Config.SQUARE_WIDTH * 6
    )
  }
}
