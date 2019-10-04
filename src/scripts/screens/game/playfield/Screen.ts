import { GameScreen } from "../../../framework/GameScreen"
import { Painter } from "./Painter"
import { randomTetromino } from "../Tetromino"
import { Shape } from "../Shape"
import { Config } from "../config"
import { resetScore, Score } from "../Score"

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
  gameEnded = false

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
    this.spawnPlayer()
  }

  paint() {
    this.painter.drawBackground()
    this.painter.drawShape(this.player)
    this.painter.drawShape(this.opponent)
  }

  isGameOver() {
    return this.gameEnded
  }

  eatPlayer() {
    this.opponent.merge(this.player)
    const linesRemoved = this.opponent.removeFullLines()
    if (linesRemoved == 0) {
      return
    }
    const currentLevel = Score.level
    this.applyScore(linesRemoved)
    if (currentLevel != Score.level) {
      this.fallRate -= this.fallRate / 3
    }
  }

  applyScore(linesRemoved: number) {
    let points
    switch (linesRemoved) {
      case 1:
        points = 40
        break
      case 2:
        points = 100
        break
      case 3:
        points = 300
        break
      case 4:
        points = 1200
        break
      default:
        points = 0
    }

    points *= Score.level + 1

    Score.total += points
    Score.linesCleared += linesRemoved
    Score.level = (Score.linesCleared / 10) | 0
  }

  restart() {
    this.opponent.eraseGrid()
    this.player = randomTetromino()
    resetScore()
  }

  spawnPlayer() {
    this.nextPlayer.row -= this.nextPlayer.height
    this.nextPlayer.column =
      ((Config.PUZZLE_WIDTH - this.nextPlayer.width) / 2) | 0
    this.player = this.nextPlayer
    this.nextPlayer = randomTetromino()
  }

  rotatePlayer() {
    const foreshadow = this.player.copy()
    foreshadow.rotate()
    if (foreshadow.collidesWith(this.opponent) || !foreshadow.withinBounds()) {
      return
    }
    this.player = foreshadow
  }

  movePlayer(rowDirection: number, columnDirection: number): Boolean {
    const foreshadow = this.player.copy()
    const movingDown = rowDirection == +1
    foreshadow.move(rowDirection, columnDirection)
    const ableToMove =
      !foreshadow.collidesWith(this.opponent) && foreshadow.withinBounds()
    if (ableToMove) {
      this.player = foreshadow
      if (movingDown) {
        this.onFloor = false
      }
    } else if (movingDown) {
      this.handleFallingDown()
    }
    return ableToMove
  }

  handleFallingDown() {
    const time = Date.now()
    if (!this.onFloor) {
      this.onFloor = true
      this.endOfLock = time + this.floorRate
      return
    } else if (time < this.endOfLock) {
      return
    }

    this.eatPlayer()
    this.spawnPlayer()
    if (this.player.collidesWith(this.opponent)) {
      this.gameEnded = true
    }
  }

  moveRight() {
    this.movePlayer(0, +1)
  }

  moveLeft() {
    this.movePlayer(0, -1)
  }

  fallDown(): Boolean {
    const ableToMove = this.movePlayer(+1, 0)
    if (this.inspect) {
      this.inspect = false
    }
    return ableToMove
  }
}
