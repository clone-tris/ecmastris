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

  drawText({
    text,
    x,
    y,
    fontSize = 17,
    fontFamily = `"Courier New"`,
    color = UIColors.WHITE_TEXT,
  }: {
    text: string
    x: number
    y: number
    fontSize?: number
    fontFamily?: string
    color?: ColorType
  }) {
    this.ctx.fillStyle = color
    this.ctx.font = `${fontSize}px ${fontFamily}`
    this.ctx.fillText(text, x, y + fontSize)
  }

  // todo: make it so you can draw a button based on its center position instead of left and top
  drawButton({
    button,
    color = ShapeColors.CYAN,
    background,
  }: {
    button: Button
    color?: ColorType
    background?: ColorType
  }) {
    if (background) {
      this.ctx.fillStyle = background
      this.ctx.fillRect(button.x, button.y, button.width, button.height)
    }
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = color
    this.ctx.strokeRect(button.x, button.y, button.width, button.height)
    this.drawText({
      text: button.text,
      x: button.tx,
      y: button.ty,
      fontSize: button.fontSize,
      fontFamily: button.fontFamily,
      color,
    })
  }
}
