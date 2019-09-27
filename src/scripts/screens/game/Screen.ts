import { Painter } from "./Painter"
import { Game } from "../../framework/Game"
import { GameScreen } from "../../framework/GameScreen"
import { Screen as Playfield } from "./playfield/Screen"
import { Screen as Sidebar } from "./sidebar/Screen"
import { Config } from "./config"

export class Screen implements GameScreen {
  painter = new Painter({ width: Game.width, height: Game.height })
  playfield = new Playfield(Config.WAR_ZONE_WIDTH, Game.height)
  sidebar = new Sidebar(Config.SIDEBAR_WIDTH, Game.height)

  paint = () => {
    this.playfield.paint()
    this.sidebar.paint()
  }

  paintCanvas = () => {
    this.paint()
    const playfieldBuffer = this.playfield.painter.buffer
    const sidebarBuffer = this.sidebar.painter.buffer

    this.painter.ctx.drawImage(sidebarBuffer, 0, 0, Config.SIDEBAR_WIDTH, Game.height)
    this.painter.ctx.drawImage(
      playfieldBuffer,
      Config.SIDEBAR_WIDTH,
      0,
      Config.WAR_ZONE_WIDTH,
      Game.height
    )

    return this.painter.buffer
  }
}
