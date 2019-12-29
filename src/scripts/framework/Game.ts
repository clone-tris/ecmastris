import { GameScreen } from "./GameScreen"

type GameProps = {
  width: number
  height: number
  canvas: string
  screen: { new (): GameScreen }
  start?: boolean
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
  canvas: HTMLCanvasElement
  screens = new Map<{ new (): GameScreen }, GameScreen>()

  constructor({
    width,
    height,
    canvas: canvasID,
    screen: StartScreen,
    start = true,
  }: GameProps) {
    let canvas = document.querySelector<HTMLCanvasElement>(canvasID)!
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.width = canvas.width = width
    this.height = canvas.height = height
    this.screen = new StartScreen()
    this.lastFrameTimeMs = Date.now()
    window.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        this.screen.keydown(e)
      },
      false
    )
    const { top: canvasTop, left: canvasLeft } = canvas.getBoundingClientRect()
    canvas.addEventListener("click", (e: MouseEvent) => {
      this.screen.mouseclick(e.clientX - canvasLeft, e.clientY - canvasTop)
    })

    if (start) {
      this.start()
    }
  }

  redraw() {
    const beforeUpdate = Date.now()
    const dt = beforeUpdate - this.lastFrameTimeMs
    this.screen.update(dt)
    this.screen.paint()
    this.ctx.drawImage(this.screen.canvas(), 0, 0, this.width, this.height)
    const afterPaint = Date.now()
    this.lastFrameTimeMs = afterPaint
    return afterPaint - beforeUpdate
  }

  loop() {
    if (!this.running) {
      return
    }
    const redrawDuration = this.redraw()
    const sleepDuration = this.FRAME_SIZE - redrawDuration
    if (sleepDuration <= 0) {
      this.loop()
    } else {
      setTimeout(this.loop.bind(this), sleepDuration)
    }
  }

  start() {
    this.loop()
  }

  useScreen(screenClass: { new (): GameScreen }) {
    this.screen.unload()
    this.screen = new screenClass()
    this.screens.set(screenClass, this.screen)
  }
}
