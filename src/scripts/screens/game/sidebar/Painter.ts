import { GraphicsPainter } from "../../../framework/GraphicsPainter"
import { ShapeColors, UIColors } from "../colors"

export class Painter extends GraphicsPainter {
  drawBackground = () => {
    this.clear()
  }
  clear = () => {
    this.ctx.fillStyle = UIColors.SIDEBAR_BACKGROUND
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
}
