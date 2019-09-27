import "../styles/style.css"

import { GameConfig } from "./GameConfig"
import { Game } from "./framework/Game"
import { Screen } from "./screens/game/Screen"
const { CANVAS_WIDTH, CANVAS_HEIGHT } = GameConfig

const game = new Game({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  canvas: "#canvas",
  screen: Screen
})
