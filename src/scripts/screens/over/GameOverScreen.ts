import { GameScreen } from "../../framework/GameScreen"
import { Painter } from "./Painter"
import { GlobalConfig } from "../../GlobalConfig"
import { Ecmastris } from "../../Ecmastris"
import { MainScreen } from "../main/MainScreen"

export class GameOverScreen extends GameScreen {
  painter = new Painter({
    width: GlobalConfig.CANVAS_WIDTH,
    height: GlobalConfig.CANVAS_HEIGHT,
  })
  paint() {
    this.painter.clear()
  }

  keydown = (e: KeyboardEvent) => {
    if (e.code === "KeyR") {
      Ecmastris.useScreen(MainScreen)
    }
  }
}
