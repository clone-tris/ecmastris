import { GraphicsPainter } from "./GraphicsPainter"

export abstract class GameScreen {
  abstract paint: () => void
  abstract painter: GraphicsPainter


  paintCanvas() {
    this.paint()
    return this.painter.buffer
  }

  update?: (dt: number) => void
}
