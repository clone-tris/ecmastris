import "./framework/bootstrap"
import "../styles/style.css"

import { GameConfig } from "./GameConfig"
import { Game as GameFactory } from "./framework/Game"
import { LoadingScreen } from "./screens/loading/LoadingScreen"
const { CANVAS_WIDTH, CANVAS_HEIGHT } = GameConfig

export const Ecmastris = new GameFactory({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  canvas: "#canvas",
  screen: LoadingScreen,
})

Ecmastris.start()
