import "./style.css"

import { Ecmastris } from "./Ecmastris"
import { GameConfig } from "./GameConfig"
const { CANVAS_WIDTH, CANVAS_HEIGHT } = GameConfig

const canvas = document.getElementById("canvas")
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
const ctx = canvas.getContext("2d")

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
