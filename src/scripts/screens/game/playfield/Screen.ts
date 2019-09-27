import { GameScreen } from "../../../framework/GameScreen"
import { Painter } from "./Painter"

export class Screen extends GameScreen {
  painter: Painter
  constructor(width: number, height: number) {
    super()
    this.painter = new Painter({ width, height })
  }
  paint = () => {
    this.painter.clear()
    this.painter.paint()
  }
}
