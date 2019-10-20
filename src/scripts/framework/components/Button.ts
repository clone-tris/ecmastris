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

  constructor({ x, y, text }: ButtonProps) {
    this.x = x
    this.y = y
    this.text = text
    const wordWidth = this.ctx.measureText(text).width

    const paddingTop = 8
    const paddingLeft = 10
    this.width = 2 * paddingLeft + wordWidth
    this.height = 2 * paddingTop + 12

    this.tx = x + (this.width - wordWidth) / 2
    this.ty = y + (this.height - 14) / 2

    this.bounds = new Rectangle(x, y, this.width, this.height)
  }
}
