import { GameScreen } from "../../../framework/GameScreen"
import { Painter } from "./Painter"
import { Shape } from "../Shape"

export class Screen extends GameScreen {
  painter: Painter
  nextPlayer: Shape
  constructor(width: number, height: number, nextPlayer: Shape) {
    super()
    this.painter = new Painter({ width, height })
    this.nextPlayer = nextPlayer
  }
  paint = () => {
    this.painter.drawBackground()
    this.painter.drawShape(this.nextPlayer, 1, 1)
    this.painter.drawLevel()
    this.painter.drawLinesCleared()
    this.painter.drawScore()
  }
}
