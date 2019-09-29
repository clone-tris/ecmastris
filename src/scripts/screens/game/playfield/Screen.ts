import { GameScreen } from "../../../framework/GameScreen"
import { Painter } from "./Painter"
import { randomTetromino } from "../Tetromino"
import { Shape } from "../Shape"

export class Screen extends GameScreen {
  painter: Painter
  player: Shape

  constructor(width: number, height: number) {
    super()
    this.painter = new Painter({ width, height })
    this.player = randomTetromino()
  }

  paint = () => {
    this.painter.drawBackground()
    this.painter.drawShape(this.player)
  }
}
