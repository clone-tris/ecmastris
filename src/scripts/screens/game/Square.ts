import { ColorType, UIColors } from "./colors"

export class Square {
  row: number
  column: number
  color: ColorType

  constructor(
    row: number,
    column: number,
    color: ColorType = UIColors.DEFAULT_SQUARE_COLOR
  ) {
    this.row = row
    this.column = column
    this.color = color
  }

  toString() {
    return `{row: ${this.row}, column: ${this.column}, color: "${this.color}"}`
  }
}
