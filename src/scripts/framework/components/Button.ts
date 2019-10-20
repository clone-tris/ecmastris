import { Rectangle } from "./Rectangle"

type ButtonProps = {
  text: string
  x: number
  y: number
}

export class Button {
  canvas = document.createElement("canvas")
  ctx = this.canvas.getContext("2d")!
  width: number
  height: number
  text: string
  x: number
  y: number
  tx: number
  ty: number
  bounds: Rectangle
  fontSize = 16
  fontFamily = "Helvetica Neue"

  constructor({ x, y, text }: ButtonProps) {
    this.x = x
    this.y = y
    this.text = text
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`
    const wordWidth = this.ctx.measureText(text).width
    const paddingTop = 8
    const paddingLeft = 10
    this.width = 2 * paddingLeft + wordWidth
    this.height = 2 * paddingTop + this.fontSize

    this.tx = x + (this.width - wordWidth) / 2
    this.ty = y + (this.height - this.fontSize - 2) / 2

    this.bounds = new Rectangle(x, y, this.width, this.height)
  }
}
