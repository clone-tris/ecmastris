import { GraphicsPainter } from "../../../framework/GraphicsPainter"
import { ColorType, ShapeColors, UIColors } from "../colors"
import { Rectangle } from "../../../framework/utils/Rectangle"
import { Config } from "../config"

export class Painter extends GraphicsPainter {
  drawBackground = () => {
    this.clear()
    this.drawGuide()
  }

  clear = () => {
    this.ctx.fillStyle = UIColors.BACKGROUND
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: ColorType,
    strokeWidth: number
  ) => {
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = strokeWidth
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  drawGuide = (bounds = new Rectangle(0, 0, this.width, this.height)) => {
    const puzzleHeight = bounds.height / Config.SQUARE_WIDTH
    const puzzleWidth = bounds.width / Config.SQUARE_WIDTH

    for (let i = 0; i <= puzzleHeight + 1; i++) {
      const y = bounds.x + i * Config.SQUARE_WIDTH
      this.drawLine(bounds.x, y, bounds.x + bounds.width, y, UIColors.GUIDE, 1)
    }

    for (let i = 0; i <= puzzleWidth + 1; i++) {
      const x = bounds.y + i * Config.SQUARE_WIDTH
      this.drawLine(x, bounds.y, x, bounds.y + bounds.height, UIColors.GUIDE, 1)
    }
  }
}
