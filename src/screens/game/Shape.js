import { Config } from "./config"

export class Shape {
  grid
  row
  column
  set color(value) {
    this.grid.forEach(square => (square.color = value))
  }
  width
  height
  computeHeight

  constructor(grid = [], row, column, color, width = 0, height = 0, computeHeight = true) {
    Object.assign(this, {
      grid,
      row,
      column,
      color,
      width,
      height,
      computeHeight
    })
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
