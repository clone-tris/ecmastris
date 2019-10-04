import { GraphicsPainter } from "../../framework/GraphicsPainter"

export class Painter extends GraphicsPainter {
  clear() {
    this.ctx.fillStyle = "khaki"
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
}
