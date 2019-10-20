const initialScore = {
  linesCleared: 0,
  total: 0,
  level: 1,
}

export const Score = {
  ...initialScore,
}

export function resetScore() {
  Object.assign(Score, initialScore)
}
