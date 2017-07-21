import React from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import FlowDiagram from '../flow_diagram.jsx'
import TimeSliderFlowDiagram from '../time_slider_flow_diagram.jsx'
import flower from '../../patterns/flower.js'
import {
  Link
} from 'react-router-dom'

const oneHandedPatterns = (overrides = {}) => {
  const patterns = []

  const numberOfPetals = [1, 2, 3, 4, 5]

  numberOfPetals.forEach((petals) => {
    (petals === 4 ? [false] : [true, false]).forEach((invert) => {
      (petals === 4 ? [true, false] : [false]).forEach((boxPattern) => {
        (petals >= 3 ? [true, false] : [true]).forEach((inspin) => {
          patterns.push(
            flower({
              inspin,
              petals,
              invert,
              boxPattern,
              horizontal: false,
              position: 'bottom',
              offset: 0,
              forward: true,
              ...overrides,
            })
          )
        })
      })
    })
  })
  return patterns
}

const patternCount = oneHandedPatterns().length
const colWidth = `${100/(patternCount + 1)}vw`
const baseStyle = {
  width: colWidth,
  height: colWidth,
  marginBottom: 3,
  marginTop: 3,
}

const headerStyle = {
  outline: '3px solid transparent',
  ...baseStyle,
}

const cellStyle = {
  ...baseStyle,
  ':hover': {
  },
}

const cellNavLinkStyle = {
  outline: '3px solid transparent',
  width: colWidth,
  height: colWidth,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.5,
  },
}

const Header = ({ pattern }) => (
  <FlowDiagram
    leftPattern={pattern}
    rightPattern={pattern}
    radians={0}
    trailLength={Math.PI * 2}
    trailResolution={0.05}
    decayLinearity={0}
    showArms={false}
    style={headerStyle}
  />
)

const Cell = Radium(({leftPattern, rightPattern}) => (
  <div
    style={cellNavLinkStyle}
  >
    <Link
      to={`/hybrids/${btoa(JSON.stringify({
        leftPattern: {pattern: 'flower', params: leftPattern.params},
        rightPattern: {pattern: 'flower', params: rightPattern.params}
      }))}`}
    >
      <FlowDiagram
        leftPattern={leftPattern}
        rightPattern={rightPattern}
        radians={0}
        trailLength={Math.PI * 2}
        trailResolution={0.03}
        decayLinearity={0}
        showArms={false}
        style={cellStyle}
      />
    </Link>
  </div>
))

export default () => (
  <div
  >
    <div
      style={{
        paddingTop: 10,
        position: 'fixed',
        background: '#FFF',
      }}
    >
      <header
        style={{
          color: '#555',
          fontFamily: 'sans-serif',
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        {patternCount * (patternCount - 1) / 2} Interactive Poi Hybrid Matrix
      </header>
      { /* Headers */ }
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            width: colWidth,
          }}
        />
        {
          oneHandedPatterns().map((pattern, i) => (
            <Header
              key={`col-header-${i}`}
              pattern={pattern}
            />
          ))
        }
      </div>
    </div>

    { /* Rows */ }
    <div
      style={{
        paddingTop: `calc(60px + ${colWidth})`,
      }}
    >
      {
        oneHandedPatterns().map((leftPattern, i) => (
          <div
            key={`row-${i}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Header
              key={`row-header-${i}`}
              pattern={leftPattern}
            />

            <div style={{flex: 1}}/>

            {
              Array.apply(null, Array(patternCount - i))
                .map((value, j) => (
                  <Cell
                    key={`cell-${i}-${j}`}
                    leftPattern={leftPattern}
                    rightPattern={oneHandedPatterns()[i + j]}
                  />
                ))
            }
          </div>
        ))
      }
    </div>
  </div>

)
