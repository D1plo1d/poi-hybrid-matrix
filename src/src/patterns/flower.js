export default ({
  inspin = false,
  petals = 3,
  invert = false,
  horizontal = false,
  position = 'bottom',
  boxPattern = false,
  offset = 0,
  forward = true,
}) => {
  let ratio
  if (inspin == false) {
    ratio = petals - 1
  } else {
    ratio = petals + 1
  }

  if (petals === 1 && position === 'bottom') {
    offset = Math.PI / 2
  } else if (petals === 1 && position === 'top') {
    offset = -Math.PI / 2
  } else if (petals === 1 && position === 'right') {
    offset = Math.PI
  } else if (petals === 2 && horizontal) {
    offset = Math.PI
  } else if (petals === 3) {
    offset = Math.PI / 2
  } else if (petals === 4) {
    offset = boxPattern ? 0 : Math.PI
  } else if (petals === 5) {
    offset = -Math.PI / 2
  }

  offset = offset + (invert ? Math.PI : 0)

  const handPosition = (radians, measurements) => {
    const {
      armLength,
      center,
    } = measurements
    const r = (forward ? 1 : -1) * radians
    const x = (
      Math.cos(r) * armLength +
      center.x
    )
    const y = (
      Math.sin(r) * armLength +
      center.y
    )
    return {x, y}
  }

  const ballPosition = (radians, measurements) => {
    const {
      tetherLength,
    } = measurements
    const hand = handPosition(radians, measurements)
    const r = (forward ? 1 : -1) * radians * ratio + offset
    return {
      x: hand.x + (inspin ? 1 : -1) * Math.cos(r) * tetherLength,
      y: hand.y + Math.sin(r) * tetherLength,
    }
  }

  return {
    handPosition,
    ballPosition,
    params: {
      inspin,
      petals,
      invert,
      horizontal,
      position,
      boxPattern,
      offset,
      forward,
    }
  }
}
