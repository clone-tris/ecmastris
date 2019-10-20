import { Square } from "./Square"
import { ColorType, ShapeColors } from "./colors"
import { randomItem } from "../../framework/utils/array-functions"
import { Shape } from "./Shape"

enum Tetromino {
  T = "T",
  Z = "Z",
  S = "S",
  L = "L",
  J = "J",
  O = "O",
  I = "I",
}

type TetrominoConfig = {
  grid: Square[]
  color: ColorType
}

function getTetromino(t: Tetromino): TetrominoConfig {
  switch (t) {
    case Tetromino.T:
      return {
        grid: [
          new Square({row:0, column: 0}),
          new Square({row:0, column: 1}),
          new Square({row:0, column: 2}),
          new Square({row:1, column: 1}),
        ],
        color: ShapeColors.PURPLE,
      }
    case Tetromino.Z:
      return {
        grid: [
          new Square({row:0, column: 0}),
          new Square({row:0, column: 1}),
          new Square({row:1, column: 1}),
          new Square({row:1, column: 2}),
        ],
        color: ShapeColors.RED,
      }
    case Tetromino.S:
      return {
        grid: [
          new Square({row:0, column: 1}),
          new Square({row:0, column: 2}),
          new Square({row:1, column: 0}),
          new Square({row:1, column: 1}),
        ],
        color: ShapeColors.GREEN,
      }
    case Tetromino.L:
      return {
        grid: [
          new Square({row:0, column: 0}),
          new Square({row:0, column: 1}),
          new Square({row:0, column: 2}),
          new Square({row:1, column: 0}),
        ],
        color: ShapeColors.ORANGE,
      }
    case Tetromino.J:
      return {
        grid: [
          new Square({row:0, column: 0}),
          new Square({row:1, column: 0}),
          new Square({row:1, column: 1}),
          new Square({row:1, column: 2}),
        ],
        color: ShapeColors.BLUE,
      }
    case Tetromino.O:
      return {
        grid: [
          new Square({row:0, column: 0}),
          new Square({row:0, column: 1}),
          new Square({row:1, column: 0}),
          new Square({row:1, column: 1}),
        ],
        color: ShapeColors.YELLOW,
      }
    case Tetromino.I:
      return {
        grid: [
          new Square({row:0, column: 0}),
          new Square({row:0, column: 1}),
          new Square({row:0, column: 2}),
          new Square({row:0, column: 3}),
        ],
        color: ShapeColors.CYAN,
      }
  }
}

export function randomTetromino(): Shape {
  const tetrominoes = Object.values(Tetromino)
  const randomTetrominoOrder = tetrominoes.sort(() => Math.random() - 0.5)
  const tetromino = getTetromino(randomItem(randomTetrominoOrder))
  return new Shape(tetromino)
}
