import { Game } from "../../framework/Game"
import { GraphicsPainter } from "../../framework/GraphicsPainter"

import { UIColors } from "./colors"

export class Painter extends GraphicsPainter {
  clear = () => {
    this.ctx.fillStyle = UIColors.BACKGROUND
    this.ctx.fillRect(0, 0, Game.width, Game.height)
  }

}
