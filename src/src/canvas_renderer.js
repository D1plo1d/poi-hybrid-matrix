export default ({
  canvas,
  leftPattern,
  rightPattern,
  trailLength,
  trailResolution,
  decayLinearity,
  showArms,
}) => {
  const ballRadiusPercent = 1.5
  const armWidthPercent = 1
  const tetherWidthPercent = 0.5

  let measurements = null

  const scale = () => {
    var {width, height} = canvas.parentNode.getBoundingClientRect()
    canvas.width = width
    canvas.height = height

    const minDimension = Math.min(width, height)

    const ballRadius = minDimension * ballRadiusPercent / 100
    const armLength = minDimension / 4 - ballRadius

    measurements = {
      ballRadius,
      armLength,
      armWidth: Math.max(4, minDimension * armWidthPercent / 100),
      tetherWidth: Math.max(2, minDimension * tetherWidthPercent / 100),
      tetherLength: armLength,
      center: {
        x: width / 2,
        y: height / 2,
      },
    }
  }

  scale()

  const ctx = canvas.getContext("2d")

  const drawSinglePosition = (time, pattern) => {
    const {
      ballRadius,
    } = measurements
    const {x, y} = pattern.ballPosition(time, measurements)

    ctx.beginPath()
    ctx.moveTo(x-.1, y-.1)
    ctx.lineWidth = ballRadius * 2
    ctx.lineCap = "round"
    ctx.lineTo(x+.1, y+.1)
    ctx.stroke()
  }

  const drawArm = (time, pattern) => {
    const {
      center,
      armWidth,
    } = measurements
    const hand = pattern.handPosition(time, measurements)

    ctx.beginPath()
    ctx.moveTo((hand.x + center.x) / 2, (hand.y + center.y) / 2)
    ctx.lineWidth = armWidth
    ctx.lineCap = "round"
    ctx.lineTo(hand.x, hand.y)
    ctx.stroke()
  }

  const drawHand = (time, pattern) => {
    const {
      ballRadius,
    } = measurements
    const hand = pattern.handPosition(time, measurements)

    ctx.beginPath()
    ctx.lineTo(hand.x - 0.1, hand.y - 0.1)
    ctx.lineWidth = ballRadius * 2
    ctx.lineCap = "round"
    ctx.lineTo(hand.x + 0.1, hand.y + 0.1)
    ctx.stroke()
  }

  const drawTether = (time, pattern) => {
    const {
      tetherWidth,
    } = measurements
    const hand = pattern.handPosition(time, measurements)
    const ball = pattern.ballPosition(time, measurements)

    ctx.beginPath()
    ctx.moveTo(hand.x, hand.y)
    ctx.lineWidth = tetherWidth
    ctx.lineCap = "round"
    ctx.lineTo(ball.x, ball.y)
    ctx.stroke()
  }

  let previousTime = 0
  const self = (time) => {
    previousTime = time
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Trails
    for (let i = 0; i < trailLength; i += trailResolution) {
      const opacity = (
        decayLinearity > 0 ?
          Math.pow((trailLength - i) / trailLength, decayLinearity)
        : 1
      )
      // Left arm
      ctx.strokeStyle = `rgba(171, 0, 171, ${opacity})`
      drawSinglePosition(time - i, self.leftPattern)
      // Right arm
      ctx.strokeStyle = `rgba(0, 171, 158, ${opacity})`
      drawSinglePosition(time - i, self.rightPattern)
    }

    if (showArms) {
      // Arms
      ctx.strokeStyle = `rgba(100, 100, 100, 1.0)`
      drawArm(time, self.leftPattern)
      drawArm(time, self.rightPattern)

      // Tethers
      ctx.strokeStyle = `rgba(150, 150, 150, 1.0)`
      drawTether(time, self.leftPattern)
      drawTether(time, self.rightPattern)

      // Hands
      ctx.strokeStyle = `rgba(100, 100, 100, 1.0)`
      drawHand(time, self.leftPattern)
      drawHand(time, self.rightPattern)
    }

  }
  self.leftPattern = leftPattern
  self.rightPattern = rightPattern

  self.onResize = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    scale()
    self.render(previousTime)
  }
  self.render = self

  return self
}
