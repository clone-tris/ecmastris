const FRAME_RATE = 1000 / 60
let lastFrameTimeMs = 0
let running = true
let width = 0
let height = 0
let canvas = null
let ctx = null
let screen = null

export function Game({ width: w, height: h, canvas: canvasID, screen: StartScreen }) {
  Game.width = width = w
  Game.height = height = h
  canvas = document.querySelector(canvasID)
  ctx = canvas.getContext("2d")
  canvas.width = width
  canvas.height = height
  screen = new StartScreen()
  loop()
}

function loop() {
  if (!running) {
    return
  }
  const redrawDuration = redraw()
  setTimeout(loop, Math.max(0, FRAME_RATE - redrawDuration))
}

function redraw() {
  const t = Date.now()
  const dt = t - lastFrameTimeMs
  if (screen.update && typeof screen.update === "function") {
    screen.update(dt)
  }
  screen.paint()
  ctx.drawImage(screen.paintCanvas(), 0, 0, width, height)
  lastFrameTimeMs = Date.now()
  return lastFrameTimeMs - t
}
