import { Config as GameScreenConfig } from "./screens/game/config"

const {
  SIDEBAR_WIDTH,
  WAR_ZONE_WIDTH,
  PUZZLE_HEIGHT,
  SQUARE_WIDTH,
} = GameScreenConfig

export const GameConfig = Object.freeze({
  CANVAS_WIDTH: SIDEBAR_WIDTH + WAR_ZONE_WIDTH,
  CANVAS_HEIGHT: PUZZLE_HEIGHT * SQUARE_WIDTH,
  DEBUG_GRAPHICS: false,
  ENABLE_LOG: true,
})
