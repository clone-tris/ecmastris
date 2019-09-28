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
}
