import "./framework/bootstrap"
import "../styles/style.css"

import { GlobalConfig } from "./GlobalConfig"
import { Game } from "./framework/Game"
import { MenuScreen } from "./screens/menu/MenuScreen"

export const Ecmastris = new Game({
  width: GlobalConfig.CANVAS_WIDTH,
  height: GlobalConfig.CANVAS_HEIGHT,
  canvas: "#canvas",
  screen: MenuScreen,
})

