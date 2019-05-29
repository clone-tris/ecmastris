import { Painter } from "./Painter"
import { Game } from "../../framework/Game"

export class Screen {
  painter = new Painter({ width: Game.width, height: Game.height})
  player = {
    x: 0,
    y: 0
  }
  paint = () => {
    this.painter.clear()
    this.painter.paintPlayer(this.player)
  }
}
