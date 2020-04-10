import React from 'react'
import { DateTime } from 'luxon'

import numeral from 'numeral'

const SVG_STYLES = {
  accelerationLine: {
    stroke: 'var(--data-acceleration-color)',
    strokeWidth: 1.2,
  },
  canvas: {
    paddingTop: 6,
    paddingBottom: 4,
    paddingLeft: 50,
    paddingRight: 50,
    fill: ''
  },
  grid: {
    strokeWidth: 0.5,
    stroke: 'var(--chart-grid-color)',
  },
  axisGrid: {
    strokeWidth: 0.5,
    stroke: 'var(--chart-axis-color)',
  },
  gridLabel: {
    fontSize: 10,
    fill: 'var(--chart-grid-text-color)',
    paddingLeft: 2,
    paddingTop: -2,
    paddingRight: 2,
    paddingBottom: 0,
  },
  axisGridLabel: {
    fontSize: 10,
    fill: 'var(--chart-axis-text-color)',
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

  let blockHeight = 25
  let blockCount = 1.5
  let accelerationScale = 0.16

  idPrefix = [idPrefix, 'acc-chart', entry.code].map(x => x).join('-')

  let values = dates.map(d => entry.rollingAcceleration.deaths && entry.rollingAcceleration.deaths[d])

  let scaledValues = values.map(v => {
    if (v !== undefined) {
      return (v / accelerationScale) * blockHeight
    } else {
      return undefined
    }
  })

  let horizontalStep = 100 * aspectRatio / (dates.length - 1)

  let gridLevels = [0.16, 0.08, 0, -0.08]
  let lines = gridLevels.map(n => ({
    label: n === 0 ? 'APEX' : numeral(n).format('0.00'), value: n === 0 ? 0 : n / accelerationScale * blockHeight,
    style: n === 0 ? SVG_STYLES.axisGrid : SVG_STYLES.grid,
    labelStyle: n === 0 ? SVG_STYLES.axisGridLabel : SVG_STYLES.gridLabel
  }))

  const firstDateObj = DateTime.fromISO(dates[0])
  const mondayOffset = firstDateObj.weekday - 1

  return (
    <div className='AccelerationChart'>
      <svg viewBox={`0 0 ${100 * aspectRatio + SVG_STYLES.canvas.paddingLeft + SVG_STYLES.canvas.paddingRight} ${blockCount * blockHeight + SVG_STYLES.canvas.paddingTop + SVG_STYLES.canvas.paddingBottom}`}>

        <CanvasAndGridLines
          dates={dates} lines={lines} aspectRatio={aspectRatio} blockHeight={blockHeight} blockCount={blockCount}
          mondayOffset={mondayOffset} horizontalStep={horizontalStep}
        />

        <DataLine
          scaledValues={scaledValues} aspectRatio={aspectRatio} blockHeight={blockHeight} blockCount={blockCount}
          horizontalStep={horizontalStep} idPrefix={idPrefix}
          style={SVG_STYLES.accelerationLine}
        />

      </svg>
    </div>
  )
}

const DataLine = ({scaledValues, blockHeight, blockCount, horizontalStep, style}) => {
  return scaledValues.map((value, index) => {
    style = style || SVG_STYLES.deathsLine

    if (value !== undefined && scaledValues[index + 1] !== undefined) {
      return (
        <line
          key={`line-${index}`}
          x1={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep)}
          y1={blockHeight + SVG_STYLES.canvas.paddingTop - value}
          x2={SVG_STYLES.canvas.paddingLeft + ((index + 1 ) * horizontalStep)}
          y2={blockHeight + SVG_STYLES.canvas.paddingTop - scaledValues[index + 1]}
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
          cy={blockHeight + SVG_STYLES.canvas.paddingTop - value}
          r={style.strokeWidth / 2}
          fill={style.stroke}
        />
      )
    } else {
      return null
    }
  })
}

const CanvasAndGridLines = ({dates, lines, aspectRatio, blockHeight, blockCount, mondayOffset, horizontalStep}) => (
  <>
    {SVG_STYLES.canvas.fill &&
      <rect
        x='0' y='0'
        width={100 * aspectRatio + SVG_STYLES.canvas.paddingLeft + SVG_STYLES.canvas.paddingRight} height={blockCount * blockHeight + SVG_STYLES.canvas.paddingTop + SVG_STYLES.canvas.paddingBottom}
        fill={SVG_STYLES.canvas.fill}
      />
    }

    {lines.map(({label, value, style, labelStyle}, index) => (
      <React.Fragment key={`grid-${index}`}>
        <line
          key={`gridline-${index}`}
          x1={SVG_STYLES.canvas.paddingLeft}
          y1={blockHeight + SVG_STYLES.canvas.paddingTop - value}
          x2={100 * aspectRatio + SVG_STYLES.canvas.paddingLeft}
          y2={blockHeight + SVG_STYLES.canvas.paddingTop - value}
          strokeWidth={style.strokeWidth}
          stroke={style.stroke}
        />
        <text
          key={`gridlabel-${index}`}
          x={SVG_STYLES.canvas.paddingLeft - labelStyle.paddingRight }
          y={blockHeight + SVG_STYLES.canvas.paddingTop - value}
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
          y2={blockCount * blockHeight + SVG_STYLES.canvas.paddingTop}
          strokeWidth={SVG_STYLES.grid.strokeWidth}
          stroke={SVG_STYLES.grid.stroke}
        />
      )
    )}
  </>
)

export default  React.memo(AccelerationChart)
