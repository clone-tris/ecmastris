import { Config as GameScreenConfig } from "./screens/main/config"

const {
  SIDEBAR_WIDTH,
  WAR_ZONE_WIDTH,
  PUZZLE_HEIGHT,
  SQUARE_WIDTH,
} = GameScreenConfig

export const GlobalConfig = Object.freeze({
  CANVAS_WIDTH: SIDEBAR_WIDTH + WAR_ZONE_WIDTH,
  CANVAS_HEIGHT: PUZZLE_HEIGHT * SQUARE_WIDTH,
  DEBUG_GRAPHICS: false,
  ENABLE_LOG: true,
})
