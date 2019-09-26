export class GraphicsPainter {
  width
  height
  buffer = document.createElement("canvas")
  ctx = this.buffer.getContext("2d")
  constructor({ width, height }) {
    this.buffer.width = this.width = width
    this.buffer.height = this.height = height
  }
}
