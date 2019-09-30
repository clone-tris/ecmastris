import { ColorType, ShapeColors } from "./colors"

export class Square {
  row: number
  column: number
  color: ColorType

  constructor(
    row: number,
    column: number,
    color: ColorType = ShapeColors.DEFAULT_SQUARE_COLOR
  ) {
    this.row = row
    this.column = column
    this.color = color
  }

  copy(override: Partial<Square> = {}) {
    return { ...this, ...override }
  }

  toString() {
    return `{row: ${this.row}, column: ${this.column}, color: "${this.color}"}`
  }
}
