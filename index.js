console.log('wat')

const canvas = document.getElementById("canvas")

const armLength = 50
const tetherLength = 50
const ballRadius = 6
const trailLength = Math.PI * 2
const decayLinearity = 2

// Try changing these:
const flower = ({
  inspin = false,
  petals = 3,
  invert = false,
  horizontal = false,
  position = 'bottom',
  boxPattern = false
}) => {
  let offset = 0
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

  console.log(offset)
  return {
    inspin,
    ratio,
    offset: offset + (invert ? Math.PI : 0),
  }
}

const center = {
  x: armLength + tetherLength + ballRadius,
  y: armLength + tetherLength + ballRadius
}

canvas.width = center.x * 2
canvas.height = center.y * 2
const ctx = canvas.getContext("2d")

const drawSinglePosition = (time, {
  inspin,
  ratio,
  offset,
}) => {
  const x = (
    Math.cos(time) * armLength +
    (inspin ? 1 : -1) * Math.cos(time * ratio + offset) * tetherLength +
    center.x
  )
  const y = (
    Math.sin(time) * armLength +
    Math.sin(time * ratio + offset) * tetherLength +
    center.y
  )

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineWidth = ballRadius * 2
  ctx.lineCap = "round"
  ctx.lineTo(x, y)
  ctx.stroke()
}

const Renderer = ({leftPattern, rightPattern}) => {
  let time = 0
  let walltime = 0
  return (ntime) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(walltime != 0) {
      time += (ntime - walltime) * 0.001
    }
    walltime = ntime

    // Trails
    for (let i = 0; i < trailLength; i += 0.01) {
      const opacity = Math.pow((trailLength - i) * 0.6 / trailLength, decayLinearity)
      // Left arm
      ctx.strokeStyle = `rgba(171, 0, 171, ${opacity})`
      drawSinglePosition(time - i, leftPattern)
      // Right arm
      ctx.strokeStyle = `rgba(0, 171, 158, ${opacity})`
      drawSinglePosition(-(time - i), rightPattern)
    }
//     // Left arm
//     ctx.strokeStyle = 'rgb(255, 0, 255)'
//     drawSinglePosition(time, leftPattern)
//     // Right arm
//     ctx.strokeStyle = 'rgb(0, 255, 200)'
//     drawSinglePosition(-time, rightPattern)

  }
}

const renderer = Renderer({
  leftPattern: flower({
    inspin: true,
    petals: 3,
    invert: false,
    horizontal: false,
    position: 'bottom',
    boxPattern: true
  }),
  rightPattern: flower({
    inspin: true,
    petals: 3,
    invert: true,
    horizontal: false,
    position: 'bottom',
    boxPattern: true
  })
})

const slider = document.getElementById("timeSlider")
slider.addEventListener("input", () => {
  renderer(slider.value * Math.PI * 2 / 100 / 0.001)
})

renderer(slider.value)
// render = (t) => {
//   renderer(t)
//   window.requestAnimationFrame(render)
// }

// window.requestAnimationFrame(render)
