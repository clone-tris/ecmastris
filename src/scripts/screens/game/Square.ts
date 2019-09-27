import { ColorType, UIColors } from "./colors"

type SquareProps = {
  row: number
  column: number
  color: ColorType
}

export class Square {
  row: number
  column: number
  color: ColorType

  constructor({
    row,
    column,
    color = UIColors.DEFAULT_SQUARE_COLOR,
  }: SquareProps) {
    this.row = row
    this.column = column
    this.color = color
  }
}
