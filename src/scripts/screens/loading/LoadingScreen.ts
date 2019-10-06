import { GameScreen } from "../../framework/GameScreen"
import { Painter } from "./Painter"
import { GameConfig } from "../../GameConfig"
import { Ecmastris } from "../../Ecmastris"
import { MainScreen } from "../game/MainScreen"
import { Config } from "../game/config"
import { Shape } from "../game/Shape"
import { Square } from "../game/Square"
import { graphicGrid } from "./graphic"

export class LoadingScreen extends GameScreen {
  painter = new Painter({
    width: GameConfig.CANVAS_WIDTH,
    height: GameConfig.CANVAS_HEIGHT,
  })

  graphic = new Shape({
    width: (GameConfig.CANVAS_WIDTH / Config.SQUARE_WIDTH) | 0,
    height: (GameConfig.CANVAS_HEIGHT / Config.SQUARE_WIDTH) | 0,
    grid: graphicGrid,
  })

  paint() {
    this.painter.drawBackground()
    this.painter.drawShape(this.graphic)
  }

  keydown = (e: KeyboardEvent) => {
    if (e.code === "KeyS") {
      Ecmastris.useScreen(MainScreen)
    }

    if (e.code === "KeyL") {
      console.log(JSON.stringify(this.graphic.grid))
    }
  }

  mouseclick = (x: number, y: number) => {
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
