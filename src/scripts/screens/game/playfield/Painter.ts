import { GraphicsPainter } from "../../../framework/GraphicsPainter"
import { ColorType, ShapeColors, UIColors } from "../colors"
import { Rectangle } from "../../../framework/utils/Rectangle"
import { Config } from "../config"
import { Shape } from "../Shape"

export class Painter extends GraphicsPainter {
  drawBackground = () => {
    this.clear()
    this.drawGuide()
  }

  clear = () => {
    this.ctx.fillStyle = UIColors.BACKGROUND
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawShape(
    shape: Shape,
    row: number = shape.row,
    column: number = shape.column
  ) {
    shape.grid.forEach(square =>
      this.drawSquareAt(row + square.row, column + square.column, square.color)
    )

    // if (DEBUG_GRAPHICS) {
    //   g.color = Color.BLUE
    //   g.drawRect(
    //     column * SQUARE_WIDTH,
    //     row * SQUARE_WIDTH,
    //     shape.width * SQUARE_WIDTH,
    //     shape.height * SQUARE_WIDTH
    //   )
    // }
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: ColorType,
    strokeWidth: number,
    standAlone = true
  ) {
    if (standAlone) {
      this.ctx.beginPath()
    }
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = strokeWidth
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    if (standAlone) {
      this.ctx.stroke()
    }
  }

  drawGuide(bounds = new Rectangle(0, 0, this.width, this.height)) {
    const puzzleHeight = bounds.height / Config.SQUARE_WIDTH
    const puzzleWidth = bounds.width / Config.SQUARE_WIDTH

    this.ctx.beginPath()
    for (let i = 0; i <= puzzleHeight + 1; i++) {
      const y = bounds.x + i * Config.SQUARE_WIDTH
      this.drawLine(
        bounds.x,
        y,
        bounds.x + bounds.width,
        y,
        UIColors.GUIDE,
        1,
        false
      )
    }

    for (let i = 0; i <= puzzleWidth + 1; i++) {
      const x = bounds.y + i * Config.SQUARE_WIDTH
      this.drawLine(
        x,
        bounds.y,
        x,
        bounds.y + bounds.height,
        UIColors.GUIDE,
        1,
        false
      )
    }
    this.ctx.stroke()
  }
  drawSquareAt(row: number, column: number, color: ColorType) {
    this.drawTetrominoSquare(
      column * Config.SQUARE_WIDTH,
      row * Config.SQUARE_WIDTH,
      color
    )
  }
  drawTetrominoSquare(x: number, y: number, backgroundColor: ColorType) {
    this.ctx.fillStyle = backgroundColor
    this.ctx.fillRect(x, y, Config.SQUARE_WIDTH, Config.SQUARE_WIDTH)

    this.ctx.beginPath()
    this.ctx.fillStyle = ShapeColors.BORDER_SIDE

    // left
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(
      x + Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x + Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(x, y + Config.SQUARE_WIDTH)

    // right
    this.ctx.moveTo(x + Config.SQUARE_WIDTH, y)
    this.ctx.lineTo(
      x + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(x + Config.SQUARE_WIDTH, y + Config.SQUARE_WIDTH)

    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.fillStyle = ShapeColors.BORDER_TOP

    this.ctx.moveTo(x, y)
    this.ctx.lineTo(
      x + Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(x + Config.SQUARE_WIDTH, y)
    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.fillStyle = ShapeColors.BORDER_BOTTOM

    this.ctx.moveTo(x, y + Config.SQUARE_WIDTH)
    this.ctx.lineTo(
      x + Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH,
      y + Config.SQUARE_WIDTH - Config.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(x + Config.SQUARE_WIDTH, y + Config.SQUARE_WIDTH)

    this.ctx.fill()
  }
}
