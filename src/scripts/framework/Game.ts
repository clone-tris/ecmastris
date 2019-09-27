import { GameScreen } from "./GameScreen"

type GameProps = {
  width: number
  height: number
  canvas: string
  screen: { new (): GameScreen }
}

export class Game {
  static FRAME_RATE = 1000 / 60
  static lastFrameTimeMs = 0
  static running = true
  static width = 0
  static height = 0
  static screen: GameScreen
  static ctx: CanvasRenderingContext2D

  constructor({
    width,
    height,
    canvas: canvasID,
    screen: StartScreen,
  }: GameProps) {
    let canvas = document.querySelector<HTMLCanvasElement>(canvasID)!
    Game.ctx = canvas.getContext("2d")!
    Game.width = canvas.width = width
    Game.height = canvas.height = height
    Game.screen = new StartScreen()
    Game.loop()
  }

  static redraw = () => {
    const t = Date.now()
    const dt = t - Game.lastFrameTimeMs
    if (Game.screen.update && typeof Game.screen.update === "function") {
      Game.screen.update(dt)
    }
    Game.screen.paint()
    Game.ctx.drawImage(Game.screen.paintCanvas(), 0, 0, Game.width, Game.height)
    Game.lastFrameTimeMs = Date.now()
    return Game.lastFrameTimeMs - t
  }

  static loop = () => {
    if (!Game.running) {
      return
    }
    const redrawDuration = Game.redraw()
    setTimeout(Game.loop, Math.max(0, Game.FRAME_RATE - redrawDuration))
  }
}
