import { GameScreen } from "../../../framework/GameScreen"
import { Painter } from "./Painter"
import { randomTetromino } from "../Tetromino"
import { Shape } from "../Shape"
import { Config } from "../config"

export class Screen extends GameScreen {
  painter: Painter
  player: Shape
  opponent: Shape = new Shape({
    grid: [],
    row: 0,
    column: 0,
    height: Config.PUZZLE_HEIGHT,
    width: Config.PUZZLE_WIDTH,
    computeHeight: false,
  })

  constructor(width: number, height: number) {
    super()
    this.painter = new Painter({ width, height })
    this.player = randomTetromino()
  }

  paint = () => {
    this.painter.drawBackground()
    this.painter.drawShape(this.player)
    this.painter.drawShape(this.opponent)
  }
}
