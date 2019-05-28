export const Game = {
  FRAME_RATE: 1000 / 60,
  lastFrameTimeMs: 0,
  running: true,
  width: 0,
  height: 0,
  canvas: null,
  ctx: null,
  screen: null,

  create: ({ width, height, canvas, screen }) => {
    console.log(width, height)
    Game.width = width
    Game.height = height
    Game.canvas = document.querySelector(canvas)
    Game.ctx = Game.canvas.getContext("2d")
    Game.canvas.width = width
    Game.canvas.height = height
    Game.screen = new screen()
    Game.loop()
  },

  loop: () => {
    if (!Game.running) {
      return
    }
    const redrawDuration = Game.redraw()
    setTimeout(Game.loop, Math.max(0, Game.FRAME_RATE - redrawDuration))
  },

  redraw: () => {
    const t = Date.now()
    const dt = t - Game.lastFrameTimeMs
    if (Game.screen.hasOwnProperty("update")) {
      Game.screen.update(dt)
    }
    Game.screen.paint()
    Game.ctx.drawImage(Game.screen.painter.canvas, 0, 0, Game.width, Game.height)
    Game.lastFrameTimeMs = Date.now()
    return Game.lastFrameTimeMs - t
  }
}
