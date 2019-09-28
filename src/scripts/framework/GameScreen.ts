import { GraphicsPainter } from "./GraphicsPainter"

export abstract class GameScreen {
  abstract paint: () => void
  abstract painter: GraphicsPainter

  canvas() {
    return this.painter.canvas
  }

  update?: (dt: number) => void
}
