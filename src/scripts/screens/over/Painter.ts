import { GraphicsPainter } from "../../framework/GraphicsPainter"
import { GlobalConfig } from "../../GlobalConfig"
import { Ecmastris } from "../../Ecmastris"
import { MainScreen } from "../main/MainScreen"
import { UIColors } from "../main/colors"

export class Painter extends GraphicsPainter {
  drawMainScreen() {
    this.ctx.drawImage(
      Ecmastris.screens.get(MainScreen)!.painter.canvas,
      0,
      0,
      this.width,
      this.height
    )
  }

  drawPopup() {
    const padding = 20
    const message = "Game Over!"
    const stringWidth = this.ctx.measureText(message).width
    const boxWidth = padding * 2 + stringWidth
    const boxHeight = padding * 2 + 18
    const boxX = (GlobalConfig.CANVAS_WIDTH - boxWidth) / 2
    const boxY = (GlobalConfig.CANVAS_HEIGHT - boxHeight) / 3

    this.ctx.fillStyle = UIColors.POPUP_BACKGROUND
    this.ctx.fillRect(boxX, boxY, boxWidth, boxHeight)

    this.ctx.fillStyle = UIColors.POPUP_TEXT
    this.ctx.font = "18px Monospaced"
    this.ctx.fillText(message, boxX + padding, boxY + padding + 18)
  }

}
