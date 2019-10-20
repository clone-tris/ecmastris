import { Config } from "./config"
import { Square } from "./Square"
import { ColorType, ShapeColors } from "./colors"
import { ObjectType } from "../../types"

type ShapeProps = {
  grid?: Square[]
  row?: number
  column?: number
  color?: ColorType
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
    row = 0,
    column = 0,
    color = ShapeColors.DEFAULT_SQUARE_COLOR,
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

    if (computeHeight) {
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

  removeFullLines(): number {
    const fullRows = this.findFullRows()
    const fullRowsArray = Object.keys(fullRows)
    if (!fullRowsArray.length) {
      return 0
    }

    this.grid = this.grid.reduce(
      (acc, square) => {
        // skipping square.row as it is part of the full rows
        if (fullRows[square.row]) {
          return acc
        }
        const squareRowBeforeShifting = square.row
        fullRowsArray.forEach(fullRow => {
          if (Number(fullRow) > squareRowBeforeShifting) {
            square.row++
          }
        })

        acc.push(square)

        return acc
      },
      [] as Square[]
    )

    return fullRowsArray.length
  }

  findFullRows(): ObjectType {
    const fullRows: ObjectType = {}
    const rowDensity = { ...Array.from({ length: this.height }, () => 0) }
    this.grid.forEach(square => {
      rowDensity[square.row] = rowDensity[square.row] + 1
      if (rowDensity[square.row] === Config.PUZZLE_WIDTH) {
        fullRows[square.row] = true
      }
    })
    return fullRows
  }

  copy() {
    const props = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    )
    return new Shape(props)
  }

  merge(shape: Shape) {
    this.grid = [...this.absoluteGrid(), ...shape.absoluteGrid()]
  }

  collidesWith(b: Shape): Boolean {
    return this.absoluteGrid().some(cellA =>
      b
        .absoluteGrid()
        .some(cellB => cellB.row === cellA.row && cellB.column === cellA.column)
    )
  }

  rotate() {
    this.grid = this.grid.map(square =>
      square.copy({ row: square.column, column: this.height - square.row - 1 })
    )
    this.computeSize()
  }

  move(rowDirection: number, columnDirection: number) {
    this.row += rowDirection
    this.column += columnDirection
  }

  withinBounds(): Boolean {
    const absoluteMatrix = this.absoluteGrid()

    const afterRight = absoluteMatrix.some(
      square => square.column >= Config.PUZZLE_WIDTH
    )
    if (afterRight) {
      return false
    }

    const bellowBottom = absoluteMatrix.some(
      square => square.row >= Config.PUZZLE_HEIGHT
    )
    if (bellowBottom) {
      return false
    }

    const beforeLeft = absoluteMatrix.some(square => square.column < 0)
    if (beforeLeft) {
      return false
    }

    return true
  }

  absoluteGrid(
    translateRow: number = 0,
    translateColumn: number = 0
  ): Array<Square> {
    return this.grid.map(square =>
      square.copy({
        row: square.row + this.row + translateRow,
        column: square.column + this.column + translateColumn,
      })
    )
  }

  toString() {
    return `{ grid: ${this.grid}, row: ${this.row}, column: ${
      this.column
    }, color: "${this.color}", width: ${this.width}, height: ${
      this.height
    }, computeHeight: ${this.computeHeight} }`
  }

  eraseGrid() {
    this.grid = []
  }
}
