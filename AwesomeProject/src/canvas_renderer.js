export default (canvas) => {
  // const armLength = 50
  // const tetherLength = 50
  // const ballRadius = 6
  const ballRadiusPercent = 1.5
  const armWidthPercent = 1
  const tetherWidthPercent = 0.5
  const trailLength = Math.PI * 2
  const decayLinearity = 2

  let ballRadius, armLength, tetherLength, width, height, armWidth, tetherWidth
  let center

  const scale = () => {
    width = window.innerWidth
    height = window.innerHeight
    const minDimension = Math.min(width, height)

    ballRadius = minDimension * ballRadiusPercent / 100
    armLength = minDimension / 4 - ballRadius
    armWidth = minDimension * armWidthPercent / 100
    tetherWidth = minDimension * tetherWidthPercent / 100
    tetherLength = armLength
    center = {
      x: width / 2,
      y: height / 2
    }
    canvas.width  = width
    canvas.height = height
  }
  scale()

  // Try changing these:
  const flower = ({
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

    // console.log(offset)
    return {
      inspin,
      ratio,
      forward,
      offset: offset + (invert ? Math.PI : 0),
    }
  }

  const ctx = canvas.getContext("2d")

  const handPosition = (time, {
    inspin,
    ratio,
    offset,
    forward,
  }) => {
    const radians = (forward ? 1 : -1) * time
    const x = (
      Math.cos(radians) * armLength +
      center.x
    )
    const y = (
      Math.sin(radians) * armLength +
      center.y
    )
    return {x, y}
  }

  const ballPosition = (time, pattern) => {
    const {
      inspin,
      ratio,
      offset,
      forward,
    } = pattern
    const hand = handPosition(time, pattern)
    const ballRaidans = time * ratio + offset
    return {
      x: hand.x + (inspin ? 1 : -1) * Math.cos(ballRaidans) * tetherLength,
      y: hand.y + Math.sin(ballRaidans) * tetherLength,
    }
  }

  const drawSinglePosition = (time, pattern) => {
    const {x, y} = ballPosition(time, pattern)

    ctx.beginPath()
    ctx.moveTo(x-.1, y-.1)
    ctx.lineWidth = ballRadius * 2
    ctx.lineCap = "round"
    ctx.lineTo(x+.1, y+.1)
    ctx.stroke()
  }

  const drawArm = (time, pattern) => {
    const hand = handPosition(time, pattern)

    ctx.beginPath()
    ctx.moveTo(center.x, center.y)
    ctx.lineWidth = armWidth
    ctx.lineCap = "round"
    ctx.lineTo(hand.x, hand.y)
    ctx.stroke()
  }

  const drawHand = (time, pattern) => {
    const hand = handPosition(time, pattern)

    ctx.beginPath()
    ctx.lineTo(hand.x - 0.1, hand.y - 0.1)
    ctx.lineWidth = ballRadius * 2
    ctx.lineCap = "round"
    ctx.lineTo(hand.x + 0.1, hand.y + 0.1)
    ctx.stroke()
  }

  const drawTether = (time, pattern) => {
    const hand = handPosition(time, pattern)
    const ball = ballPosition(time, pattern)

    ctx.beginPath()
    ctx.moveTo(hand.x, hand.y)
    ctx.lineWidth = tetherWidth
    ctx.lineCap = "round"
    ctx.lineTo(ball.x, ball.y)
    ctx.stroke()
  }

  const Renderer = ({leftPattern, rightPattern}) => {
    const self = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Trails
      for (let i = 0; i < trailLength; i += 0.01) {
        const opacity = Math.pow((trailLength - i) * 0.6 / trailLength, decayLinearity)
        // Left arm
        ctx.strokeStyle = `rgba(171, 0, 171, ${opacity})`
        drawSinglePosition(time - i, self.leftPattern)
        // Right arm
        ctx.strokeStyle = `rgba(0, 171, 158, ${opacity})`
        drawSinglePosition(time - i, self.rightPattern)
      }

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
    self.leftPattern = leftPattern
    self.rightPattern = rightPattern
    return self
  }

  let renderer = Renderer({
    leftPattern: flower({
      inspin: true,
      petals: 3,
      invert: false,
      horizontal: false,
      position: 'bottom',
      boxPattern: true,
      offset: 0,
      forward: true,
    }),
    rightPattern: flower({
      inspin: true,
      petals: 3,
      invert: true,
      horizontal: false,
      position: 'bottom',
      boxPattern: true,
      offset: 0,
      forward: false,
    }),
  })

  const onResize = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    scale()
  }

  return {render: renderer, renderer, onResize}
}
