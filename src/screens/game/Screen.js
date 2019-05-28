import { Game } from "../../framework/Game"
import { Painter } from "./Painter"

export class Screen {
  painter = new Painter()
  paint = () => {
    // this.painter.ctx.fillStyle = "white"
    this.painter.ctx.fillRect(0, 0, Game.width, Game.height)
    // console.log(Game.width, Game.height)
  }
}
