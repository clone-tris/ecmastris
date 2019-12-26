import { GraphicsPainter } from "./GraphicsPainter"

export abstract class GameScreen {
  abstract paint(): void
  abstract painter: GraphicsPainter

  canvas() {
    return this.painter.canvas
  }

  update(dt: number) {}
  keydown = (e: KeyboardEvent) => {}
  mousemove = (x: number, y: number) => {}
  mouseclick = (x: number, y: number) => {}

  unload() {}
}
