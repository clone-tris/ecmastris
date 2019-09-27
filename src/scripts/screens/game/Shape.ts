import { Config } from "./config"
import { Square } from "./Square"
import { ColorType } from "./colors"

type ShapeProps = {
  grid: Square[]
  row: number
  column: number
  color: ColorType
  width: number
  height: number
  computeHeight: boolean
}

export class Shape {
  grid: Square[]
  row: number
  column: number
  set color(value: ColorType) {
    this.grid.forEach(square => (square.color = value))
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
    this.width = width
    this.height = height
    this.computeHeight = computeHeight
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
}
