export type GraphicsPainterProps = {
  width: number
  height: number
}
export class GraphicsPainter {
  width: number
  height: number
  buffer = document.createElement("canvas")
  ctx = this.buffer.getContext("2d")!
  constructor({ width, height }: GraphicsPainterProps) {
    this.buffer.width = this.width = width
    this.buffer.height = this.height = height
  }
}
