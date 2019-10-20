import { GraphicsPainter } from "../../framework/GraphicsPainter"
import { Config } from "./config"
import { GlobalConfig } from "../../GlobalConfig"

export class Painter extends GraphicsPainter {
  stitch = (
    sidebarBuffer: HTMLCanvasElement,
    playfieldBuffer: HTMLCanvasElement
  ) => {
    this.ctx.drawImage(
      sidebarBuffer,
      0,
      0,
      Config.SIDEBAR_WIDTH,
      GlobalConfig.CANVAS_HEIGHT
    )
    this.ctx.drawImage(
      playfieldBuffer,
      Config.SIDEBAR_WIDTH,
      0,
      Config.WAR_ZONE_WIDTH,
      GlobalConfig.CANVAS_HEIGHT
    )
  }
}
