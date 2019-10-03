const initialScore = {
  linesCleared: 0,
  total: 0,
  level: 0,
}

export const Score = {
  ...initialScore,
}

export function resetScore() {
  Object.assign(Score, initialScore)
}
