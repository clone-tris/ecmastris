import { ColorType, ShapeColors, UIColors } from "../screens/main/colors"
import { Button } from "./components/Button"

export type GraphicsPainterProps = {
  width: number
  height: number
}

export class GraphicsPainter {
  width: number
  height: number
  canvas = document.createElement("canvas")
  ctx = this.canvas.getContext("2d")!

  constructor({ width, height }: GraphicsPainterProps) {
    this.canvas.width = this.width = width
    this.canvas.height = this.height = height
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: ColorType,
    strokeWidth: number,
    standAlone = true
  ) {
    if (standAlone) {
      this.ctx.beginPath()
    }
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = strokeWidth
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    if (standAlone) {
      this.ctx.stroke()
    }
  }

  drawText(
    text: string,
    x: number,
    y: number,
    fontSize: number = 17,
    color: ColorType = UIColors.WHITE_TEXT
  ) {
    this.ctx.fillStyle = color
    this.ctx.font = `${fontSize}px "Courier New"`
    this.ctx.fillText(text, x, y + fontSize)
  }

  drawButton(button: Button, color: ColorType = ShapeColors.CYAN) {
    this.ctx.strokeStyle = color
    this.ctx.strokeRect(button.x, button.y, button.width, button.height)
    this.drawText(button.text, button.tx, button.ty, 16, color)
  }
}
