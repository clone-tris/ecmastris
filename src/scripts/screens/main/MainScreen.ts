import { Painter } from "./Painter"
import { GameScreen } from "../../framework/GameScreen"
import { Screen as Playfield } from "./playfield/Screen"
import { Screen as Sidebar } from "./sidebar/Screen"
import { Config } from "./config"
import { GlobalConfig } from "../../GlobalConfig"
import { Ecmastris } from "../../Ecmastris"
import { GameOverScreen } from "../over/GameOverScreen"
import { resetScore } from "./Score"

export class MainScreen extends GameScreen {
  painter = new Painter({
    width: GlobalConfig.CANVAS_WIDTH,
    height: GlobalConfig.CANVAS_HEIGHT,
  })
  playfield = new Playfield(Config.WAR_ZONE_WIDTH, GlobalConfig.CANVAS_HEIGHT)
  sidebar = new Sidebar(
    Config.SIDEBAR_WIDTH,
    GlobalConfig.CANVAS_HEIGHT,
    this.playfield.nextPlayer
  )
  nextFall = 0
  playerIsFalling = false
  paused = false
  remainingAfterPaused = 0

  constructor() {
    super()
    resetScore()
  }

  paint() {
    this.playfield.paint()
    this.sidebar.paint()
  }

  canvas = () => {
    this.painter.stitch(this.sidebar.canvas(), this.playfield.canvas())
    return this.painter.canvas
  }

  update(dt: number) {
    if (this.paused || this.playfield.gameEnded) {
      return
    }
    this.applyGravity()
  }

  keydown = (e: KeyboardEvent) => {
    if (this.paused) {
      if ("KeyP") {
        this.togglePaused()
      }
    } else {
      switch (e.code) {
        case "KeyW":
          this.playfield.rotatePlayer()
          break
        case "KeyS":
          this.makePlayerFall()
          break
        case "KeyA":
          this.playfield.moveLeft()
          break
        case "KeyD":
          this.playfield.moveRight()
          break
        case "KeyR":
          this.restart()
          break
        case "KeyI":
          this.playfield.inspect = true
          break
        case "KeyP":
          this.togglePaused()
          break
        case "KeyO":
          this.loseTheGame()
          break
      }
    }
  }

  restart() {
    Ecmastris.useScreen(MainScreen)
  }

  togglePaused() {
    this.paused = !this.paused
    const time = Date.now()
    if (this.paused) {
      const remaining = this.nextFall - time
      this.remainingAfterPaused = remaining >= 0 ? remaining : 0
    } else {
      this.nextFall = time + this.remainingAfterPaused
    }
  }

  applyGravity() {
    const time = Date.now()
    if (time >= this.nextFall) {
      this.nextFall = time + this.playfield.fallRate
      this.makePlayerFall()
    }
  }

  makePlayerFall() {
    if (this.playerIsFalling) {
      return
    }
    this.playerIsFalling = true
    const ableToMove = this.playfield.fallDown()
    if (!ableToMove && this.playfield.isGameOver()) {
      this.loseTheGame()
    }
    if (!ableToMove && this.playfield.onFloor) {
      this.nextFall = this.playfield.endOfLock
      this.sidebar.nextPlayer = this.playfield.nextPlayer
    }
    this.playerIsFalling = false
  }

  loseTheGame() {
    Ecmastris.useScreen(GameOverScreen)
  }
}
