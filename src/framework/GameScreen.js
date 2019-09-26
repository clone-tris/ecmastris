export class GameScreen {
  paintCanvas() {
    this.paint()
    return this.painter.buffer
  }
}
