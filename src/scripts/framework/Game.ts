import { GameScreen } from "./GameScreen"

type GameProps = {
  width: number
  height: number
  canvas: string
  screen: { new (): GameScreen }
}

export class Game {
   FRAME_RATE = 1000 / 60
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
  }

   redraw = () => {
    const t = Date.now()
    const dt = t - this.lastFrameTimeMs
    if (this.screen.update && typeof this.screen.update === "function") {
      this.screen.update(dt)
    }
    this.screen.paint()
    this.ctx.drawImage(this.screen.canvas(), 0, 0, this.width, this.height)
    this.lastFrameTimeMs = Date.now()
    return this.lastFrameTimeMs - t
  }

   loop = () => {
    if (!this.running) {
      return
    }
    const redrawDuration = this.redraw()
    setTimeout(this.loop, Math.max(0, this.FRAME_RATE - redrawDuration))
  }
}
