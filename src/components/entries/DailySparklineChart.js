import React from 'react'

import numeral from 'numeral'
import { useTranslation } from 'react-i18next';

import { formatDateMonthAbbrDD } from '../../utils/dateFormats'

const SVG_STYLES = {
  marker: {
    fill: '#c00',
    radius: 1.2,
    clipRadiusDelta: 1,
  },
  line: {
    stroke: '#c00',
    strokeWidth: 2,
  },
  comparableLine: {
    stroke: '#633',
    strokeWidth: 1,
  },
  canvas: {
    hPadding: 35,
    vPadding: 10,
    fill: '' //'#302a2a'
  },
  legend: {
    hPadding: 8,
    fontSize: 13,
    fill: '#c00',
    fontWeight: 'bold'
  },
  grid: {
    strokeWidth: 0.5,
    stroke: '#444',
  },
  gridLabel: {
    fontSize: 12,
    fill: '#444',
    hPadding: 2,
    vPadding: 2,
  }
}

const VERTICAL_SCALE = 3

const DailySparklineChart =  ({
  entry, dates, aspectRatio,
  idPrefix, style,
  comparisonEntry, comparisonOffset,
}) => {
  const { i18n } = useTranslation();

  aspectRatio = (dates.length / 7)

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
      return ((Math.log10(v)) / VERTICAL_SCALE) * 100
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
        return ((Math.log10(v)) / VERTICAL_SCALE) * 100
      } else {
        return undefined
      }
    })
  }

  let horizontalStep = 100 * aspectRatio / (dates.length - 1)

  let lines = [0, 10, 100, 1000].map(n => ({label: numeral(n).format('0,000'), value: n === 0 ? 0 : Math.log10(n) / VERTICAL_SCALE * 100}))

  const firstDateObj = new Date(dates[0])
  const mondayOffset = firstDateObj.getDay() - 1

  let divStyle = {}// {height: '6em', width: `${6 * aspectRatio}em`}
  return (
    <div className='DailySparklineChart' style={divStyle}>
      <svg viewBox={`0 0 ${100 * aspectRatio + 2 * SVG_STYLES.canvas.hPadding} ${100 + 2 * SVG_STYLES.canvas.vPadding}`}>

        <CanvasAndGridLines
          dates={dates} lines={lines} aspectRatio={aspectRatio}
          mondayOffset={mondayOffset} horizontalStep={horizontalStep} i18n={i18n}
        />

        {comparisonValues &&
          <DataLine
            scaledValues={comparisonValues} aspectRatio={aspectRatio}
            strokeScale={strokeScale} radiusScale={radiusScale}
            horizontalStep={horizontalStep} idPrefix={`${idPrefix}-comp`}
            masked={false} style={SVG_STYLES.comparableLine}
          />
        }

        <DataLine
          scaledValues={scaledValues} aspectRatio={aspectRatio}
          strokeScale={strokeScale} radiusScale={radiusScale}
          horizontalStep={horizontalStep} idPrefix={idPrefix}
          masked={false} style={SVG_STYLES.line}
        />

        {/* <DataPoints
          scaledValues={scaledValues}
          horizontalStep={horizontalStep} radiusScale={radiusScale} /> */}

        <FirstAndLastNumbers
          scaledValues={scaledValues} values={values}
          horizontalStep={horizontalStep}
          indexOfFirstNonZero={indexOfFirstNonZero} indexOfLastNonZero={indexOfLastNonZero} />

      </svg>
    </div>
  )
}

const DataLine = ({scaledValues, aspectRatio, strokeScale, radiusScale, horizontalStep, idPrefix, masked, style}) => {
  return scaledValues.map((value, index) => {
    style = style || SVG_STYLES.line

    if (value !== undefined && scaledValues[index + 1] !== undefined) {
      return (
        <line
          key={`maskedline-${index}`}
          mask={masked ? `url(#${idPrefix}-mask-${index})` : ''}
          x1={SVG_STYLES.canvas.hPadding + (index * horizontalStep)}
          y1={100 + SVG_STYLES.canvas.vPadding - value}
          x2={SVG_STYLES.canvas.hPadding + ((index + 1 ) * horizontalStep)}
          y2={100 + SVG_STYLES.canvas.vPadding - scaledValues[index + 1]}
          strokeWidth={style.strokeWidth * strokeScale}
          stroke={style.stroke}
          strokeLinecap='round'
        />
      )
    } else if (value !== undefined && index !== (scaledValues.length - 1) ) {
      return (
        <circle
          key={index}
          cx={SVG_STYLES.canvas.hPadding + (index * horizontalStep)}
          cy={100 + SVG_STYLES.canvas.vPadding - value}
          r={style.strokeWidth * strokeScale / 2}
          fill={style.stroke}
        />
      )
    }
  })
}

const DataPoints = ({scaledValues, horizontalStep, radiusScale}) => (
  <>
    {scaledValues.map((value, index) => {
      let style = SVG_STYLES.marker

      if (value === undefined) return null

      return (
        <circle
          key={index}
          cx={SVG_STYLES.canvas.hPadding + (index * horizontalStep)}
          cy={100 + SVG_STYLES.canvas.vPadding - value}
          r={style.radius * radiusScale}
          fill={style.fill}
        />
      )
    })}
  </>
)

const FirstAndLastNumbers = ({scaledValues, values, horizontalStep, indexOfFirstNonZero, indexOfLastNonZero}) => (
  <>
    {values[indexOfFirstNonZero] &&
      <text
        x={SVG_STYLES.canvas.hPadding + (indexOfFirstNonZero * horizontalStep) - SVG_STYLES.legend.hPadding}
        y={100 + SVG_STYLES.canvas.vPadding - scaledValues[indexOfFirstNonZero]}
        fontSize={SVG_STYLES.legend.fontSize}
        fill={SVG_STYLES.legend.fill}
        textAnchor='end'
        dominantBaseline='central'
        fontWeight={SVG_STYLES.legend.fontWeight}
      >
        {values[indexOfFirstNonZero]}
      </text>
    }
    {values[indexOfLastNonZero] &&
      <text
        x={SVG_STYLES.canvas.hPadding + (indexOfLastNonZero) * horizontalStep + SVG_STYLES.legend.hPadding}
        y={100 + SVG_STYLES.canvas.vPadding - scaledValues[indexOfLastNonZero]}
        fontSize={SVG_STYLES.legend.fontSize}
        fill={SVG_STYLES.legend.fill}
        textAnchor='start'
        dominantBaseline='central'
        fontWeight={SVG_STYLES.legend.fontWeight}
      >
        {values[indexOfLastNonZero]}
      </text>
    }
  </>
)

const CanvasAndGridLines = ({dates, lines, aspectRatio, mondayOffset, horizontalStep, i18n}) => (
  <>
    {SVG_STYLES.canvas.fill &&
      <rect
        x='0' y='0'
        width={100 * aspectRatio + 2 * SVG_STYLES.canvas.hPadding} height={100 + 2 * SVG_STYLES.canvas.vPadding}
        fill={SVG_STYLES.canvas.fill}
      />
    }

    {lines.map(({label, value}, index) => (
      <React.Fragment key={`grid-${index}`}>
        <line
          key={`gridline-${index}`}
          x1={SVG_STYLES.canvas.hPadding}
          y1={100 + SVG_STYLES.canvas.vPadding - value}
          x2={100 * aspectRatio + SVG_STYLES.canvas.hPadding}
          y2={100 + SVG_STYLES.canvas.vPadding - value}
          strokeWidth={SVG_STYLES.grid.strokeWidth}
          stroke={SVG_STYLES.grid.stroke}
        />
        <text
          key={`gridlabel-${index}`}
          x={SVG_STYLES.canvas.hPadding - SVG_STYLES.gridLabel.vPadding }
          y={100 + SVG_STYLES.canvas.vPadding - value}
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
          x1={SVG_STYLES.canvas.hPadding + (index * horizontalStep)}
          y1={SVG_STYLES.canvas.vPadding}
          x2={SVG_STYLES.canvas.hPadding + (index * horizontalStep)}
          y2={100 + SVG_STYLES.canvas.vPadding}
          strokeWidth={SVG_STYLES.grid.strokeWidth}
          stroke={SVG_STYLES.grid.stroke}
        />
      )
    )}
    {dates.map((date, index) => (
      ((index + mondayOffset) % 7 === 0) && /* + 2 moves the lines to a monday */
        <text
          key={`text_${index}`}
          x={SVG_STYLES.canvas.hPadding + (index * horizontalStep) + 4 }
          y={SVG_STYLES.canvas.vPadding + SVG_STYLES.gridLabel.fontSize}
          fontSize={SVG_STYLES.gridLabel.fontSize}
          fill={SVG_STYLES.gridLabel.fill}
          textAnchor='start'
          dominantBaseline='text-top'
          fontWeight={SVG_STYLES.gridLabel.fontWeight}
        >
          {formatDateMonthAbbrDD(date, i18n)}
        </text>
      )
    )}
  </>
)

export default  React.memo(DailySparklineChart)
