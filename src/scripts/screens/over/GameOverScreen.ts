import { GameScreen } from "../../framework/GameScreen"
import { Painter } from "./Painter"
import { GameConfig } from "../../GameConfig"
import { Ecmastris } from "../../Ecmastris"
import { MainScreen } from "../game/MainScreen"

export class GameOverScreen extends GameScreen {
  painter = new Painter({
    width: GameConfig.CANVAS_WIDTH,
    height: GameConfig.CANVAS_HEIGHT,
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
