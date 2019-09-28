import { Painter } from "./Painter"
import { GameScreen } from "../../framework/GameScreen"
import { Screen as Playfield } from "./playfield/Screen"
import { Screen as Sidebar } from "./sidebar/Screen"
import { Config } from "./config"
import { GameConfig } from "../../GameConfig"

export class Screen implements GameScreen {
  painter = new Painter({
    width: GameConfig.CANVAS_WIDTH,
    height: GameConfig.CANVAS_HEIGHT,
  })
  playfield = new Playfield(Config.WAR_ZONE_WIDTH, GameConfig.CANVAS_HEIGHT)
  sidebar = new Sidebar(Config.SIDEBAR_WIDTH, GameConfig.CANVAS_HEIGHT)

  paint = () => {
    this.playfield.paint()
    this.sidebar.paint()
  }

  canvas = () => {
    const playfieldBuffer = this.playfield.painter.canvas
    const sidebarBuffer = this.sidebar.painter.canvas

    this.painter.ctx.drawImage(
      sidebarBuffer,
      0,
      0,
      Config.SIDEBAR_WIDTH,
      GameConfig.CANVAS_HEIGHT
    )
    this.painter.ctx.drawImage(
      playfieldBuffer,
      Config.SIDEBAR_WIDTH,
      0,
      Config.WAR_ZONE_WIDTH,
      GameConfig.CANVAS_HEIGHT
    )

    return this.painter.canvas
  }
}
