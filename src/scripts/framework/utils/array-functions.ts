export function randomItem<T>(array: Array<T>) {
  return array[(Math.random() * array.length) | 0]
}
