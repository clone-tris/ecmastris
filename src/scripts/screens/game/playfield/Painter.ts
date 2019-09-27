import { GraphicsPainter } from "../../../framework/GraphicsPainter"
import { ShapeColors, UIColors } from "../colors"

export class Painter extends GraphicsPainter {
  clear = () => {
    this.ctx.fillStyle = UIColors.BACKGROUND
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  paint() {
    this.ctx.fillStyle = ShapeColors.RED

    this.ctx.beginPath()
    this.ctx.arc(10, 10, 5, 0, Math.PI * 2, false)
    this.ctx.fill()
  }
}
