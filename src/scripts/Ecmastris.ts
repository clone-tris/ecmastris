import "./framework/bootstrap"
import "../styles/style.css"

import { GameConfig } from "./GameConfig"
import { Game as GameFactory } from "./framework/Game"
import { Screen } from "./screens/game/Screen"
const { CANVAS_WIDTH, CANVAS_HEIGHT } = GameConfig

export const Game = new GameFactory({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  canvas: "#canvas",
  screen: Screen,
})

Game.loop()
