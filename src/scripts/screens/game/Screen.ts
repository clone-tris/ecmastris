import { Painter } from "./Painter"
import { GameScreen } from "../../framework/GameScreen"
import { Screen as Playfield } from "./playfield/Screen"
import { Screen as Sidebar } from "./sidebar/Screen"
import { Config } from "./config"
import { GameConfig } from "../../GameConfig"

export class Screen implements GameScreen {
  painter = new Painter({
    width: GameConfig.CANVAS_WIDTH,
    height: GameConfig.CANVAS_HEIGHT,
  })
  playfield = new Playfield(Config.WAR_ZONE_WIDTH, GameConfig.CANVAS_HEIGHT)
  sidebar = new Sidebar(
    Config.SIDEBAR_WIDTH,
    GameConfig.CANVAS_HEIGHT,
    this.playfield.nextPlayer
  )
  nextFall = 0
  wasAnimating = false
  playerIsFalling = false
  paused = false
  remainingAfterPaused = 0

  paint = () => {
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
    if (this.playfield.animating) {
      this.wasAnimating = true
    } else if (this.wasAnimating) {
      this.nextFall = Date.now() + this.playfield.fallRate
      this.wasAnimating = false
    }
    if (!this.wasAnimating) {
      this.applyGravity()
    }
  }

  keydown = (e: KeyboardEvent) => {
    if (this.paused) {
      switch (e.code) {
        case "KeyP":
          this.togglePaused()
      }
    } else {
      switch (e.code) {
        case "KeyW":
          this.playfield.rotatePlayer()
          break
        case "KeyS":
          this.handlePlayerFalling()
          break
        case "KeyA":
          this.playfield.moveLeft()
          break
        case "KeyD":
          this.playfield.moveRight()
          break
        case "KeyR":
          this.playfield.restart()
          break
        case "KeyI":
          this.playfield.inspect = true
          break
        case "KeyP":
          this.togglePaused()
          break
      }
    }
  }

  togglePaused() {
    this.paused = !this.paused
    const time = Date.now()
    if (this.paused) {
      const remaining = this.nextFall - time
      const remainingAfterPaused = remaining >= 0 ? remaining : 0
    } else {
      this.nextFall = time + this.remainingAfterPaused
    }
  }

  applyGravity() {
    const time = Date.now()
    if (time >= this.nextFall) {
      this.nextFall = time + this.playfield.fallRate
      this.handlePlayerFalling()
    }
  }

  handlePlayerFalling() {
    if (this.playerIsFalling) {
      return
    }
    this.playerIsFalling = true
    const ableToMove = this.playfield.fallDown()
    if (!ableToMove && this.playfield.onFloor) {
      this.nextFall = this.playfield.endOfLock
      this.sidebar.nextPlayer = this.playfield.nextPlayer
    }
    this.playerIsFalling = false
  }
}
