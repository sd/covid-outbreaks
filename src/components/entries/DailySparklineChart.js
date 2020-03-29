import React from 'react'
import { DateTime } from 'luxon'

import numeral from 'numeral'
import { useTranslation } from 'react-i18next';

import { formatDateMMDD } from '../../utils/dateFormats'

const SVG_STYLES = {
  marker: {
    fill: '#c00',
    radius: 1.2,
    clipRadiusDelta: 1,
  },
  deathsLine: {
    stroke: '#c00',
    strokeWidth: 1.2,
  },
  hospitalizedLine: {
    stroke: '#663',
    strokeWidth: 1,
  },
  comparableLine: {
    stroke: '#633',
    strokeWidth: 0.8,
  },
  canvas: {
    paddingTop: 10,
    paddingBottom: 10,
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
  gridLabel: {
    fontSize: 10,
    fill: '#555',
    paddingLeft: 2,
    paddingTop: -2,
    paddingRight: 2,
    paddingBottom: 0,
  }
}

const DailySparklineChart =  ({
  entry, dates, ui,
  idPrefix, style,
  comparisonEntry, comparisonOffset,
}) => {
  const { i18n } = useTranslation();

  let verticalScale = ui.showHospitalized ? 5 : 3.5

  let aspectRatio = (dates.length / 7) / verticalScale

  idPrefix = [idPrefix, 'sparkline', entry.code].map(x => x).join('-')

  let values = dates.map(d => entry.daily.deaths[d])

  let highestValue = Math.max(...values.filter(v => v), 1)

  let strokeScale = Math.max(Math.log10(highestValue), 0.8)
  let radiusScale = Math.min(Math.max(Math.log10(highestValue), 1.5), 2.5)

  let allZerosSoFar = true
  let indexOfFirstNonZero = 0
  let indexOfLastNonZero = 0

  let scaledValues = values.map((v, index) => {
    if (v) {
      allZerosSoFar = false
      indexOfLastNonZero = index
      return ((Math.log10(v)) / verticalScale) * 100
    } else if (allZerosSoFar) {
      indexOfFirstNonZero = indexOfFirstNonZero + 1
      return undefined
    } else {
      return undefined
    }
  })
  if (indexOfLastNonZero === indexOfFirstNonZero) indexOfLastNonZero = undefined

  let comparisonValues = undefined
  if (comparisonEntry) {
    let offsetValues = dates.map((d, index) => comparisonEntry.daily.deaths[dates[index - comparisonOffset]])

    comparisonValues = offsetValues.map((v, index) => {
      if (v) {
        return ((Math.log10(v)) / verticalScale) * 100
      } else {
        return undefined
      }
    })
  }

  let hospitalizedValues = undefined
  if (ui.showHospitalized && entry.daily.hospitalized) {
    let vs = dates.map(d => entry.daily.hospitalized[d])

    hospitalizedValues = vs.map((v, index) => {
      if (v) {
        return ((Math.log10(v)) / verticalScale) * 100
      } else {
        return undefined
      }
    })
  }

  let horizontalStep = 100 * aspectRatio / (dates.length - 1)

  let gridLevels
  if (verticalScale > 4.8) {
    gridLevels = [0, 10, 100, 1000, 10000, 100000]
  } if (verticalScale > 3.8) {
    gridLevels = [0, 10, 100, 1000, 10000]
  } else {
    gridLevels = [0, 10, 100, 1000]
  }
  let lines = gridLevels.map(n => ({label: numeral(n).format('0,000'), value: n === 0 ? 0 : Math.log10(n) / verticalScale * 100}))

  const firstDateObj = DateTime.fromISO(dates[0])
  const mondayOffset = firstDateObj.weekday - 1

  let divStyle = {}// {height: '6em', width: `${6 * aspectRatio}em`}
  return (
    <div className='DailySparklineChart' style={divStyle}>
      <svg viewBox={`0 0 ${100 * aspectRatio + SVG_STYLES.canvas.paddingLeft + SVG_STYLES.canvas.paddingRight} ${100 + SVG_STYLES.canvas.paddingTop + SVG_STYLES.canvas.paddingBottom}`}>

        <CanvasAndGridLines
          dates={dates} lines={lines} aspectRatio={aspectRatio}
          mondayOffset={mondayOffset} horizontalStep={horizontalStep} i18n={i18n}
        />

        {comparisonValues &&
          <DataLine
            scaledValues={comparisonValues} aspectRatio={aspectRatio}
            strokeScale={strokeScale} radiusScale={radiusScale}
            horizontalStep={horizontalStep} idPrefix={`${idPrefix}-comp`}
            style={SVG_STYLES.comparableLine}
          />
        }

        {hospitalizedValues &&
          <DataLine
            scaledValues={hospitalizedValues} aspectRatio={aspectRatio}
            strokeScale={strokeScale} radiusScale={radiusScale}
            horizontalStep={horizontalStep} idPrefix={idPrefix}
            style={SVG_STYLES.hospitalizedLine}
          />
        }

        <DataLine
          scaledValues={scaledValues} aspectRatio={aspectRatio}
          strokeScale={strokeScale} radiusScale={radiusScale}
          horizontalStep={horizontalStep} idPrefix={idPrefix}
          style={SVG_STYLES.deathsLine}
        />

        {/* <DataPoints
          scaledValues={scaledValues}
          horizontalStep={horizontalStep} radiusScale={radiusScale} /> */}

        <FirstAndLastNumbers
          scaledValues={scaledValues} values={values}
          horizontalStep={horizontalStep}
          indexOfFirstNonZero={indexOfFirstNonZero} indexOfLastNonZero={indexOfLastNonZero}
        />

      </svg>
    </div>
  )
}

const DataLine = ({scaledValues, aspectRatio, strokeScale, radiusScale, horizontalStep, idPrefix, masked, style}) => {
  return scaledValues.map((value, index) => {
    style = style || SVG_STYLES.deathsLine

    if (value !== undefined && scaledValues[index + 1] !== undefined) {
      return (
        <line
          key={`line-${index}`}
          x1={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep)}
          y1={100 + SVG_STYLES.canvas.paddingTop - value}
          x2={SVG_STYLES.canvas.paddingLeft + ((index + 1 ) * horizontalStep)}
          y2={100 + SVG_STYLES.canvas.paddingTop - scaledValues[index + 1]}
          strokeWidth={style.strokeWidth * strokeScale}
          stroke={style.stroke}
          strokeLinecap='round'
        />
      )
    } else if (value !== undefined && index !== (scaledValues.length - 1) ) {
      return (
        <circle
          key={index}
          cx={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep)}
          cy={100 + SVG_STYLES.canvas.paddingTop - value}
          r={style.strokeWidth * strokeScale / 2}
          fill={style.stroke}
        />
      )
    } else {
      return null
    }
  })
}

const FirstAndLastNumbers = ({scaledValues, values, horizontalStep, indexOfFirstNonZero, indexOfLastNonZero}) => (
  <>
    {values[indexOfFirstNonZero] &&
      <text
        x={SVG_STYLES.canvas.paddingLeft + (indexOfFirstNonZero * horizontalStep) - SVG_STYLES.legend.paddingLeft}
        y={100 + SVG_STYLES.canvas.paddingTop - scaledValues[indexOfFirstNonZero]}
        fontSize={SVG_STYLES.legend.fontSize}
        fill={SVG_STYLES.legend.fill}
        textAnchor='end'
        dominantBaseline='central'
        fontWeight={SVG_STYLES.legend.fontWeight}
      >
        {numeral(values[indexOfFirstNonZero]).format('0,000')}
      </text>
    }
    {values[indexOfLastNonZero] &&
      <text
        x={SVG_STYLES.canvas.paddingLeft + (indexOfLastNonZero) * horizontalStep + SVG_STYLES.legend.paddingLeft}
        y={100 + SVG_STYLES.canvas.paddingTop - scaledValues[indexOfLastNonZero]}
        fontSize={SVG_STYLES.legend.fontSize}
        fill={SVG_STYLES.legend.fill}
        textAnchor='start'
        dominantBaseline='central'
        fontWeight={SVG_STYLES.legend.fontWeight}
      >
        {numeral(values[indexOfLastNonZero]).format('0,000')}
      </text>
    }
  </>
)

const CanvasAndGridLines = ({dates, lines, aspectRatio, mondayOffset, horizontalStep, i18n}) => (
  <>
    {SVG_STYLES.canvas.fill &&
      <rect
        x='0' y='0'
        width={100 * aspectRatio + SVG_STYLES.canvas.paddingLeft + SVG_STYLES.canvas.paddingRight} height={100 + SVG_STYLES.canvas.paddingTop + SVG_STYLES.canvas.paddingBottom}
        fill={SVG_STYLES.canvas.fill}
      />
    }

    {lines.map(({label, value}, index) => (
      <React.Fragment key={`grid-${index}`}>
        <line
          key={`gridline-${index}`}
          x1={SVG_STYLES.canvas.paddingLeft}
          y1={100 + SVG_STYLES.canvas.paddingTop - value}
          x2={100 * aspectRatio + SVG_STYLES.canvas.paddingLeft}
          y2={100 + SVG_STYLES.canvas.paddingTop - value}
          strokeWidth={SVG_STYLES.grid.strokeWidth}
          stroke={SVG_STYLES.grid.stroke}
        />
        <text
          key={`gridlabel-${index}`}
          x={SVG_STYLES.canvas.paddingLeft - SVG_STYLES.gridLabel.paddingRight }
          y={100 + SVG_STYLES.canvas.paddingTop - value}
          fontSize={SVG_STYLES.gridLabel.fontSize}
          fill={SVG_STYLES.gridLabel.fill}
          textAnchor='end'
          dominantBaseline='central'
          fontWeight={SVG_STYLES.gridLabel.fontWeight}
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
          y2={100 + SVG_STYLES.canvas.paddingTop}
          strokeWidth={SVG_STYLES.grid.strokeWidth}
          stroke={SVG_STYLES.grid.stroke}
        />
      )
    )}
    {dates.map((date, index) => (
      ((index + mondayOffset) % 7 === 0) && /* + 2 moves the lines to a monday */
        <text
          key={`text_${index}`}
          x={SVG_STYLES.canvas.paddingLeft + (index * horizontalStep) + SVG_STYLES.gridLabel.paddingLeft }
          y={SVG_STYLES.canvas.paddingTop + SVG_STYLES.gridLabel.fontSize + SVG_STYLES.gridLabel.paddingTop}
          fontSize={SVG_STYLES.gridLabel.fontSize}
          fill={SVG_STYLES.gridLabel.fill}
          textAnchor='start'
          dominantBaseline='text-top'
          fontWeight={SVG_STYLES.gridLabel.fontWeight}
        >
          {formatDateMMDD(date)}
        </text>
      )
    )}
  </>
)

export default  React.memo(DailySparklineChart)
