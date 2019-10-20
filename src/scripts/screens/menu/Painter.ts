import { GraphicsPainter } from "../../framework/GraphicsPainter"
import { Painter as PlayfieldPainter } from "../main/playfield/Painter"
import { UIColors } from "../main/colors"

export class Painter extends PlayfieldPainter {
  drawBackground() {
    this.clear()
    this.drawGuide()
  }

  clear() {
    this.ctx.fillStyle = UIColors.BACKGROUND
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
}
