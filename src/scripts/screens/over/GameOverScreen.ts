import { GameScreen } from "../../framework/GameScreen"
import { Painter } from "./Painter"
import { GlobalConfig } from "../../GlobalConfig"
import { Ecmastris } from "../../Ecmastris"
import { MainScreen } from "../main/MainScreen"
import { Button } from "../../framework/components/Button"
import { Config } from "../main/config"
import { resetScore } from "../main/Score"
import { ShapeColors, UIColors } from "../main/colors"

export class GameOverScreen extends GameScreen {
  painter = new Painter({
    width: GlobalConfig.CANVAS_WIDTH,
    height: GlobalConfig.CANVAS_HEIGHT,
  })

  restartButton = new Button({
    text: "Restart (R)",
    x: 6 * Config.SQUARE_WIDTH,
    y: 17 * Config.SQUARE_WIDTH,
  })

  paint() {
    this.painter.drawMainScreen()
    this.painter.drawPopup()
    this.painter.drawButton({
      button: this.restartButton,
      background: ShapeColors.CYAN,
      color: UIColors.POPUP_BACKGROUND,
    })
  }

  restart() {
    resetScore()
    Ecmastris.useScreen(MainScreen)
  }

  keydown = (e: KeyboardEvent) => {
    if (e.code === "KeyR") {
      this.restart()
    }
  }

  mouseclick = (x: number, y: number) => {
    if (this.restartButton.contains(x, y)) {
      this.restart()
    }
  }
}
