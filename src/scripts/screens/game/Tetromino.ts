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
          new Square(0, 0),
          new Square(0, 1),
          new Square(0, 2),
          new Square(1, 1),
        ],
        color: ShapeColors.PURPLE,
      }
    case Tetromino.Z:
      return {
        grid: [
          new Square(0, 0),
          new Square(0, 1),
          new Square(1, 1),
          new Square(1, 2),
        ],
        color: ShapeColors.RED,
      }
    case Tetromino.S:
      return {
        grid: [
          new Square(0, 1),
          new Square(0, 2),
          new Square(1, 0),
          new Square(1, 1),
        ],
        color: ShapeColors.GREEN,
      }
    case Tetromino.L:
      return {
        grid: [
          new Square(0, 0),
          new Square(0, 1),
          new Square(0, 2),
          new Square(1, 0),
        ],
        color: ShapeColors.ORANGE,
      }
    case Tetromino.J:
      return {
        grid: [
          new Square(0, 0),
          new Square(1, 0),
          new Square(1, 1),
          new Square(1, 2),
        ],
        color: ShapeColors.BLUE,
      }
    case Tetromino.O:
      return {
        grid: [
          new Square(0, 0),
          new Square(0, 1),
          new Square(1, 0),
          new Square(1, 1),
        ],
        color: ShapeColors.YELLOW,
      }
    case Tetromino.I:
      return {
        grid: [
          new Square(0, 0),
          new Square(0, 1),
          new Square(0, 2),
          new Square(0, 3),
        ],
        color: ShapeColors.CYAN,
      }
  }
}

export function randomTetromino(): Shape {
  const tetrominoes = Object.values(Tetromino)
  const randomTetrominoOrder = tetrominoes.sort(() => Math.random() - 0.5)
  const tetromino = getTetromino(randomItem(randomTetrominoOrder))

  return new Shape({
    grid: tetromino.grid,
    color: tetromino.color,
    column: 0,
    row: 0,
  })
}
