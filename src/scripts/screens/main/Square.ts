import { ColorType, ShapeColors } from "./colors"

type SquareProps = {
  row: number
  column: number
  color?: ColorType
}

export class Square {
  row: number
  column: number
  color: ColorType

  constructor({
    row,
    column,
    color = ShapeColors.DEFAULT_SQUARE_COLOR,
  }: SquareProps) {
    this.row = row
    this.column = column
    this.color = color
  }

  copy(override: Partial<Square> = {}) {
    const props = Object.assign(
      Object.assign(Object.create(Object.getPrototypeOf(this)), this),
      override
    )

    return new Square(props)
  }

  toString() {
    return `{row: ${this.row}, column: ${this.column}, color: "${this.color}"}`
  }
}
