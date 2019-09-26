import { UIColors } from "./colors"

export class Square {
  row
  column
  color
  constructor({ row, column, color = UIColors.DEFAULT_SQUARE_COLOR }) {
    this.row = row
    this.column = column
    this.color = color
  }
}
