import {
  GraphicsPainter,
  GraphicsPainterProps,
} from "../../../framework/GraphicsPainter"
import { ColorType, ShapeColors, UIColors } from "../colors"
import { Rectangle } from "../../../framework/components/Rectangle"
import { Config } from "../config"
import { Shape } from "../Shape"
import { GlobalConfig } from "../../../GlobalConfig"

type PlayfieldProps = {
  customGeometry?: GeometryConfigType
} & GraphicsPainterProps

type GeometryConfigType = {
  SQUARE_WIDTH: number
  SQUARE_BORDER_WIDTH: number
}

export class Painter extends GraphicsPainter {
  geometryConfig: GeometryConfigType
  constructor({
    width,
    height,
    customGeometry = {} as GeometryConfigType,
  }: PlayfieldProps) {
    super({ width, height })
    this.geometryConfig = { ...Config, ...customGeometry }
  }

  drawBackground() {
    this.clear()
    this.drawGuide()
  }

  clear() {
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

    if (GlobalConfig.DEBUG_GRAPHICS) {
      this.ctx.strokeStyle = ShapeColors.BLUE
      this.ctx.strokeRect(
        column * this.geometryConfig.SQUARE_WIDTH,
        row * this.geometryConfig.SQUARE_WIDTH,
        shape.width * this.geometryConfig.SQUARE_WIDTH,
        shape.height * this.geometryConfig.SQUARE_WIDTH
      )

      this.ctx.stroke()
    }
  }

  drawGuide(bounds = new Rectangle(0, 0, this.width, this.height)) {
    const puzzleHeight = bounds.height / this.geometryConfig.SQUARE_WIDTH
    const puzzleWidth = bounds.width / this.geometryConfig.SQUARE_WIDTH

    this.ctx.beginPath()
    for (let i = 0; i <= puzzleHeight + 1; i++) {
      const y = bounds.x + i * this.geometryConfig.SQUARE_WIDTH
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
      const x = bounds.y + i * this.geometryConfig.SQUARE_WIDTH
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
      column * this.geometryConfig.SQUARE_WIDTH,
      row * this.geometryConfig.SQUARE_WIDTH,
      color
    )
  }

  drawTetrominoSquare(x: number, y: number, backgroundColor: ColorType) {
    // background
    this.ctx.fillStyle = backgroundColor
    this.ctx.fillRect(
      x,
      y,
      this.geometryConfig.SQUARE_WIDTH,
      this.geometryConfig.SQUARE_WIDTH
    )

    // borders
    this.ctx.beginPath()
    this.ctx.fillStyle = ShapeColors.BORDER_SIDE

    // left border
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(
      x + this.geometryConfig.SQUARE_BORDER_WIDTH,
      y + this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x + this.geometryConfig.SQUARE_BORDER_WIDTH,
      y +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(x, y + this.geometryConfig.SQUARE_WIDTH)

    // right border
    this.ctx.moveTo(x + this.geometryConfig.SQUARE_WIDTH, y)
    this.ctx.lineTo(
      x +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH,
      y + this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH,
      y +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x + this.geometryConfig.SQUARE_WIDTH,
      y + this.geometryConfig.SQUARE_WIDTH
    )

    this.ctx.fill()

    // top border
    this.ctx.beginPath()
    this.ctx.fillStyle = ShapeColors.BORDER_TOP

    this.ctx.moveTo(x, y)
    this.ctx.lineTo(
      x + this.geometryConfig.SQUARE_BORDER_WIDTH,
      y + this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH,
      y + this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(x + this.geometryConfig.SQUARE_WIDTH, y)
    this.ctx.fill()

    // bottom border
    this.ctx.beginPath()
    this.ctx.fillStyle = ShapeColors.BORDER_BOTTOM

    this.ctx.moveTo(x, y + this.geometryConfig.SQUARE_WIDTH)
    this.ctx.lineTo(
      x + this.geometryConfig.SQUARE_BORDER_WIDTH,
      y +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH,
      y +
        this.geometryConfig.SQUARE_WIDTH -
        this.geometryConfig.SQUARE_BORDER_WIDTH
    )
    this.ctx.lineTo(
      x + this.geometryConfig.SQUARE_WIDTH,
      y + this.geometryConfig.SQUARE_WIDTH
    )

    this.ctx.fill()
  }
}
