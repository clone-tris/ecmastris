import { GameScreen } from "../../../framework/GameScreen"
import { Painter } from "./Painter"
import { randomTetromino } from "../Tetromino"
import { Shape } from "../Shape"
import { Config } from "../config"

export class Screen extends GameScreen {
  painter: Painter
  player: Shape = randomTetromino()
  nextPlayer: Shape = randomTetromino()
  fallRate = 1000
  floorRate = 500
  onFloor = false
  endOfLock = 0
  animating = false
  inspect = false

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
  }

  paint = () => {
    this.painter.drawBackground()
    this.painter.drawShape(this.player)
    this.painter.drawShape(this.opponent)
  }

  spawnPlayer() {
    this.nextPlayer.row -= this.nextPlayer.height
    this.nextPlayer.column = (Config.PUZZLE_WIDTH - this.nextPlayer.width) / 2
    this.player = this.nextPlayer
    this.nextPlayer = randomTetromino()
  }
}
