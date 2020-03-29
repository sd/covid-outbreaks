import React from 'react'
import { DateTime } from 'luxon'

import numeral from 'numeral'

const SVG_STYLES = {
  marker: {
    fill: '#c00',
    radius: 1.2,
    clipRadiusDelta: 1,
  },
  accelerationLine: {
    stroke: '#fa6',
    strokeWidth: 1.2,
  },
  canvas: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 50,
    paddingRight: 50,
    fill: '' //'#302a2a'
  },
  legend: {
    paddingLeft: 6,
    fontSize: 13,
    fill: '#c00',
    fontWeight: 'bold'
  },
  grid: {
    strokeWidth: 0.5,
    stroke: '#444',
  },
  axisGrid: {
    strokeWidth: 0.5,
    stroke: '#777',
  },
  gridLabel: {
    fontSize: 8,
    fill: '#555',
    paddingLeft: 2,
    paddingTop: -2,
    paddingRight: 2,
    paddingBottom: 0,
  },
  axisGridLabel: {
    fontSize: 10,
    fill: '#777',
    paddingLeft: 2,
    paddingTop: -2,
    paddingRight: 2,
    paddingBottom: 0,
  }
}

const AccelerationChart =  ({
  entry, dates, ui,
  idPrefix, style,
  comparisonEntry, comparisonOffset,
}) => {
  // mimic normal daily chart to get the same aspect ratio per week
  let dailyVerticalScale = ui.showHospitalized ? 5 : 3.5

  let aspectRatio = (dates.length / 7) / dailyVerticalScale

  let heightBlock = 25
  let accelerationScale = 0.20

  idPrefix = [idPrefix, 'acc-chart', entry.code].map(x => x).join('-')

  let values = dates.map(d => entry.rollingAcceleration.deaths[d])

  let scaledValues = values.map(v => {
    if (v !== undefined) {
      return (v / accelerationScale) * heightBlock
    } else {
      return undefined
    }
  })

  let horizontalStep = 100 * aspectRatio / (dates.length - 1)

  let gridLevels = [0.20, 0.10, 0, -0.10, -0.20]
  let lines = gridLevels.map(n => ({
    label: numeral(n).format('0.00'), value: n === 0 ? 0 : n / accelerationScale * heightBlock,
    style: n === 0 ? SVG_STYLES.axisGrid : SVG_STYLES.grid,
    labelStyle: n === 0 ? SVG_STYLES.axisGridLabel : SVG_STYLES.gridLabel
  }))

  const firstDateObj = DateTime.fromISO(dates[0])
  const mondayOffset = firstDateObj.weekday - 1

  return (
    <div className='AccelerationChart'>
      <svg viewBox={`0 0 ${100 * aspectRatio + SVG_STYLES.canvas.paddingLeft + SVG_STYLES.canvas.paddingRight} ${2 * heightBlock + SVG_STYLES.canvas.paddingTop + SVG_STYLES.canvas.paddingBottom}`}>

        <CanvasAndGridLines
          dates={dates} lines={lines} aspectRatio={aspectRatio} heightBlock={heightBlock}
          mondayOffset={mondayOffset} horizontalStep={horizontalStep}
        />

        <DataLine
          scaledValues={scaledValues} aspectRatio={aspectRatio} heightBlock={heightBlock}
          horizontalStep={horizontalStep} idPrefix={idPrefix}
          style={SVG_STYLES.accelerationLine}
        />

      </svg>
    </div>
  )
}

const DataLine = ({scaledValues, heightBlock, horizontalStep, style}) => {
  return scaledValues.map((value, index) => {
    style = style || SVG_STYLES.deathsLine

    if (value !== undefined && scaledValues[index + 1] !== undefined) {
      return (
        <line
          key={`line-${index}`}
          x1={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep)}
          y1={heightBlock + SVG_STYLES.canvas.paddingTop - value}
          x2={SVG_STYLES.canvas.paddingLeft + ((index + 1 ) * horizontalStep)}
          y2={heightBlock + SVG_STYLES.canvas.paddingTop - scaledValues[index + 1]}
          strokeWidth={style.strokeWidth}
          stroke={style.stroke}
          strokeLinecap='round'
        />
      )
    } else if (value !== undefined && index !== (scaledValues.length - 1) ) {
      return (
        <circle
          key={index}
          cx={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep)}
          cy={heightBlock + SVG_STYLES.canvas.paddingTop - value}
          r={style.strokeWidth / 2}
          fill={style.stroke}
        />
      )
    } else {
      return null
    }
  })
}

const CanvasAndGridLines = ({dates, lines, aspectRatio, heightBlock, mondayOffset, horizontalStep}) => (
  <>
    {SVG_STYLES.canvas.fill &&
      <rect
        x='0' y='0'
        width={100 * aspectRatio + SVG_STYLES.canvas.paddingLeft + SVG_STYLES.canvas.paddingRight} height={2 * heightBlock + SVG_STYLES.canvas.paddingTop + SVG_STYLES.canvas.paddingBottom}
        fill={SVG_STYLES.canvas.fill}
      />
    }

    {lines.map(({label, value, style, labelStyle}, index) => (
      <React.Fragment key={`grid-${index}`}>
        <line
          key={`gridline-${index}`}
          x1={SVG_STYLES.canvas.paddingLeft}
          y1={heightBlock + SVG_STYLES.canvas.paddingTop - value}
          x2={100 * aspectRatio + SVG_STYLES.canvas.paddingLeft}
          y2={heightBlock + SVG_STYLES.canvas.paddingTop - value}
          strokeWidth={style.strokeWidth}
          stroke={style.stroke}
        />
        <text
          key={`gridlabel-${index}`}
          x={SVG_STYLES.canvas.paddingLeft - labelStyle.paddingRight }
          y={heightBlock + SVG_STYLES.canvas.paddingTop - value}
          fontSize={labelStyle.fontSize}
          fill={labelStyle.fill}
          textAnchor='end'
          dominantBaseline='central'
          fontWeight={labelStyle.fontWeight}
        >
          {label}
        </text>
      </React.Fragment>
    ))}

    {dates.map((date, index) => (
      ((index + mondayOffset) % 7 === 0) && /* + 2 moves the lines to a monday */
        <line
          key={`line_${index}`}
          x1={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep)}
          y1={SVG_STYLES.canvas.paddingTop}
          x2={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep)}
          y2={2 * heightBlock + SVG_STYLES.canvas.paddingTop}
          strokeWidth={SVG_STYLES.grid.strokeWidth}
          stroke={SVG_STYLES.grid.stroke}
        />
      )
    )}
  </>
)

export default  React.memo(AccelerationChart)
