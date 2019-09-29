export function randomItem<T>(array: Array<T>) {
  return array[(Math.random() * array.length) | 0]
}

export function randomizeArray<T>(array: Array<T>): Array<T> {
  return array.sort(() => Math.random() - 0.5)
}
