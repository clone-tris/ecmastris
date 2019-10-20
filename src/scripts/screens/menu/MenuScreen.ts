import { GameScreen } from "../../framework/GameScreen"
import { Painter } from "./Painter"
import { GlobalConfig } from "../../GlobalConfig"
import { Ecmastris } from "../../Ecmastris"
import { MainScreen } from "../main/MainScreen"
import { Config } from "../main/config"
import { Shape } from "../main/Shape"
import { Square } from "../main/Square"
import { graphicGrid } from "./graphic"
import { Button } from "../../framework/components/Button"

export class MenuScreen extends GameScreen {
  painter = new Painter({
    width: GlobalConfig.CANVAS_WIDTH,
    height: GlobalConfig.CANVAS_HEIGHT,
  })

  graphic = new Shape({
    width: (GlobalConfig.CANVAS_WIDTH / Config.SQUARE_WIDTH) | 0,
    height: (GlobalConfig.CANVAS_HEIGHT / Config.SQUARE_WIDTH) | 0,
    grid: graphicGrid,
  })

  startButton = new Button({
    x: 6 * Config.SQUARE_WIDTH,
    y: 17 * Config.SQUARE_WIDTH,
    text: "Start (S)",
  })

  paint() {
    this.painter.drawBackground()
    this.painter.drawShape(this.graphic)
    this.painter.drawButton(this.startButton)
  }

  keydown = (e: KeyboardEvent) => {
    if (e.code === "KeyS") {
      Ecmastris.useScreen(MainScreen)
      return
    }
  }

  mouseclick = (x: number, y: number) => {
    if (this.startButton.contains(x, y)) {
      Ecmastris.useScreen(MainScreen)
      return
    }
    const targetRow = (y / Config.SQUARE_WIDTH) | 0
    const targetColumn = (x / Config.SQUARE_WIDTH) | 0
    const startingSize = this.graphic.grid.length

    this.graphic.grid = this.graphic.grid.filter(
      square => !(square.row === targetRow && square.column === targetColumn)
    )

    if (startingSize === this.graphic.grid.length) {
      this.graphic.grid = [
        ...this.graphic.grid,
        new Square({
          column: targetColumn,
          row: targetRow,
        }),
      ]
    }
  }
}
