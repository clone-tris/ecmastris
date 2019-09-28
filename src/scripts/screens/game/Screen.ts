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
    this.painter.stitch(this.sidebar.canvas(), this.playfield.canvas())
    return this.painter.canvas
  }
}
