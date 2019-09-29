import { Config } from "./config"
import { Square } from "./Square"
import { ColorType } from "./colors"

type ShapeProps = {
  grid: Square[]
  row: number
  column: number
  color: ColorType
  width?: number
  height?: number
  computeHeight?: boolean
}

export class Shape {
  grid: Square[]
  row: number
  column: number
  _color: ColorType
  set color(value: ColorType) {
    this._color = value
    this.grid.forEach(square => (square.color = value))
  }
  get color() {
    return this._color
  }
  width: number
  height: number
  computeHeight: boolean

  constructor({
    grid = [],
    row,
    column,
    color,
    width = 0,
    height = 0,
    computeHeight = true,
  }: ShapeProps) {
    this.grid = grid
    this.row = row
    this.column = column
    this.color = color
    this._color = color
    this.width = width
    this.height = height
    this.computeHeight = computeHeight

    if(computeHeight) {
      this.computeSize()
    }
  }

  computeSize() {
    let minRow = Config.PUZZLE_HEIGHT
    let maxRow = 0
    let minColumn = Config.PUZZLE_WIDTH
    let maxColumn = 0

    this.grid.forEach(cell => {
      if (cell.row > maxRow) {
        maxRow = cell.row
      }
      if (cell.column > maxColumn) {
        maxColumn = cell.column
      }
      if (cell.row < minRow) {
        minRow = cell.row
      }
      if (cell.column < minColumn) {
        minColumn = cell.column
      }
    })

    this.height = maxRow - minRow + 1
    this.width = maxColumn - minColumn + 1
  }

  toString() {
    return `{ grid: ${this.grid}, row: ${this.row}, column: ${
      this.column
    }, color: "${this.color}", width: ${this.width}, height: ${
      this.height
    }, computeHeight: ${this.computeHeight} }`
  }
}
