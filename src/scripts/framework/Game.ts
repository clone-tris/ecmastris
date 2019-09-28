import { GameScreen } from "./GameScreen"

type GameProps = {
  width: number
  height: number
  canvas: string
  screen: { new (): GameScreen }
}

export class Game {
  FRAMES_PER_SECOND = 120
  FRAME_SIZE = 1000 / this.FRAMES_PER_SECOND
  lastFrameTimeMs = 0
  running = true
  width = 0
  height = 0
  screen: GameScreen
  ctx: CanvasRenderingContext2D

  constructor({
    width,
    height,
    canvas: canvasID,
    screen: StartScreen,
  }: GameProps) {
    let canvas = document.querySelector<HTMLCanvasElement>(canvasID)!
    this.ctx = canvas.getContext("2d")!
    this.width = canvas.width = width
    this.height = canvas.height = height
    this.screen = new StartScreen()
    this.lastFrameTimeMs = Date.now()
  }

  redraw = () => {
    const beforeUpdate = Date.now()
    const dt = beforeUpdate - this.lastFrameTimeMs
    if (this.screen.update && typeof this.screen.update === "function") {
      this.screen.update(dt)
    }
    this.screen.paint()
    this.ctx.drawImage(this.screen.canvas(), 0, 0, this.width, this.height)
    const afterPaint = Date.now()
    this.lastFrameTimeMs = afterPaint
    return afterPaint - beforeUpdate
  }

  loop = () => {
    if (!this.running) {
      return
    }
    const redrawDuration = this.redraw()
    const sleepDuration = this.FRAME_SIZE - redrawDuration

    if (sleepDuration <= 0) {
      this.loop()
    } else {
      setTimeout(this.loop, sleepDuration)
    }
  }
}
