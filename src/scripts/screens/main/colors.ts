export enum UIColors {
  BACKGROUND = "#333333",
  SIDEBAR_BACKGROUND = "#545454",
  GUIDE = "#555555",
  WHITE_TEXT = "#FFFFFF",
}

export enum ShapeColors {
  CYAN = "#6DECEE",
  BLUE = "#0014E6",
  ORANGE = "#E4A338",
  YELLOW = "#F0EF4F",
  GREEN = "#6EEB47",
  PURPLE = "#9225E7",
  RED = "#DC2F20",
  DEFAULT_SQUARE_COLOR = "#CC8081",
  BORDER_TOP = "rgba(255, 255, 255, 0.7)",
  BORDER_BOTTOM = "rgba(0, 0, 0, 0.5)",
  BORDER_SIDE = "rgba(0, 0, 0, 0.1)",
}

export type ColorType = ShapeColors | UIColors | string
