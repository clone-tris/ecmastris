import { Painter as PlayfieldPainter } from "../playfield/Painter"
import { UIColors } from "../colors"
import { Config } from "../config"
import { Rectangle } from "../../../framework/components/Rectangle"
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
    this.drawText({
      text: `Level : ${Score.level}`,
      x: Config.SQUARE_WIDTH / 2,
      y: Config.SQUARE_WIDTH * 4,
    })
  }

  drawLinesCleared() {
    this.drawText({
      text: `Cleared : ${Score.linesCleared}`,
      x: Config.SQUARE_WIDTH / 2,
      y: Config.SQUARE_WIDTH * 5,
    })
  }

  drawScore() {
    this.drawText({
      text: `Score : ${Score.total}`,
      x: Config.SQUARE_WIDTH / 2,
      y: Config.SQUARE_WIDTH * 6,
    })
  }
}
