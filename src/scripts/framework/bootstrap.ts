const arrayToString = Array.prototype.toString

Array.prototype.toString = function() {
  return `[${arrayToString.apply(this)}]`
}

export {}
