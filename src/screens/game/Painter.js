import { Game } from "../../framework/Game"
import { UIColors } from "./colors"

export class Painter {
  canvas = document.createElement("canvas")
  ctx = this.canvas.getContext("2d")

  constructor({ width, height }) {
    this.canvas.width = width
    this.canvas.height = height
  }

  clear = () => {
    this.ctx.fillStyle = UIColors.BACKGROUND
    this.ctx.fillRect(0, 0, Game.width, Game.height)
  }

  paintPlayer(player) {
    this.ctx.fillStyle = "white"

    // this.ctx.beginPath()
    this.ctx.fillRect(10, 10, 10, 10)
    // this.ctx.fill()
  }
}
