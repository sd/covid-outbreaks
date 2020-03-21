import React from 'react'
import { useTranslation } from 'react-i18next';
import { formatDateMonthAbbrDD } from '../../utils/dateFormats'

const markerWidth = 12
const markerHeight = 4

export const groupedMarkerSize = 10

const SVG_STYLES = {
  weekLines: {
    stroke: '#555',
    strokeWidth: 0.6,
  },
  emptyMarker: {
    fill: '#444',
    markerWidth,
    markerHeight,
    radius: 0.5
  },
  deathMarker: {
    fill: '#f00',
    stroke: '#900',
    strokeWidth: 0.5,
    markerWidth,
    markerHeight,
    radius: 1.3
  },
  groupedDeathMarker: {
    fill: '#f33',
    stroke: '#700',
    strokeWidth: 0.5,
    markerWidth,
    markerHeight,
    radius: 2.5
  },
  caseMarker: {
    fill: '#535353',
    markerWidth,
    markerHeight,
    radius: 4.0,
    multiplier: 100
  }
}

const OutbreakSparklineSVG =  ({entry, dates, sideBySide}) => {
  const { i18n } = useTranslation();

  let canvasWidth = dates.length * SVG_STYLES.emptyMarker.markerWidth

  if (!entry || !entry.daily || !entry.daily.deaths || !entry.daily.cases) return null

  let scalingFactor = 1
  let maxDeaths = Math.max(...dates.map(d => entry.daily.deaths[d] || 0), 0)
  let maxCases = Math.max(...dates.map(d => entry.daily.cases[d] || 0), 0) / SVG_STYLES.caseMarker.multiplier

  if (maxDeaths >= 100 && sideBySide) {
    scalingFactor = groupedMarkerSize
    maxDeaths = maxDeaths / scalingFactor
    maxCases = maxCases / scalingFactor
  }

  let maxDataPoint = Math.max(maxDeaths, maxCases)

  let columns = 1

  if (sideBySide) {
    if (maxDataPoint > 600) columns = 6
    else if (maxDataPoint >= 200) columns = 4
    else if (maxDataPoint >= 150) columns = 3
    else if (maxDataPoint >= 100) columns = 3
    else if (maxDataPoint >= 50) columns = 2
  }

  maxDataPoint = maxDataPoint / columns

  let canvasHeight = (maxDataPoint + 1) * SVG_STYLES.emptyMarker.markerHeight + 10

  const firstDateObj = new Date(dates[0])
  const mondayOffset = firstDateObj.getDay() - 1

  if (entry.daily.deaths) {
    return (
      <div className='OutbreakSparkline'>
        <svg width={'100%'} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          {dates.map((date, index) => (
            ((index + mondayOffset) % 7 === 0) && /* + 2 moves the lines to a monday */
              <line
                key={`line_${index}`}
                x1={index * SVG_STYLES.emptyMarker.markerWidth}
                y1={0}
                x2={index * SVG_STYLES.emptyMarker.markerWidth}
                y2={canvasHeight}
                strokeWidth={SVG_STYLES.weekLines.strokeWidth}
                stroke={SVG_STYLES.weekLines.stroke}
              />
            )
          )}
          {dates.map((date, index) => (
            ((index + mondayOffset) % 7 === 0) && /* + 2 moves the lines to a monday */
              <text
                key={`text_${index}`}
                x={index * SVG_STYLES.emptyMarker.markerWidth + 2}
                y={8}
                style={{fontSize: '9px', fill: `${SVG_STYLES.weekLines.stroke}`}}
              >
                {formatDateMonthAbbrDD(date, i18n)}
              </text>
            )
          )}
          {dates.map((date, index) => (
            <OutbreakSparklineOneDaySVG
              key={`empty_${date}`}
              dayIndex={index}
              count={1}
              columns={columns}
              height={canvasHeight}
              markerStyle={SVG_STYLES.emptyMarker}
            />
          ))}
          {dates.map((date, index) => (
            entry.daily.cases[date] &&
              <OutbreakSparklineOneDaySVG
                key={`cases_${date}`}
                dayIndex={index}
                count={entry.daily.cases[date] / SVG_STYLES.caseMarker.multiplier / scalingFactor }
                columns={columns}
                round={false}
                height={canvasHeight}
                markerStyle={SVG_STYLES.caseMarker}
              />
          ))}
          {dates.map((date, index)=> (
            (entry.daily.deaths[date] &&
              <OutbreakSparklineOneDaySVG
                key={`deaths_${date}`}
                dayIndex={index}
                count={entry.daily.deaths[date] / scalingFactor}
                columns={columns}
                round={true}
                height={canvasHeight}
                markerStyle={scalingFactor === 1 ? SVG_STYLES.deathMarker : SVG_STYLES.groupedDeathMarker}
              />
            )
          ))}
        </svg>
      </div>
    )
  } else {
    return null
  }
}

const OutbreakSparklineOneDaySVG = ({dayIndex, count, columns, round, height, markerStyle}) => {
  let columnCounts = []

  if (count < 1) {
    columnCounts[0] = count
    for (let i = 1; i < columns; i++) {
      columnCounts[i] = 0
    }
  } else if (count < columns) {
    columnCounts[0] = count
    for (let i = 0; count > 0; i++) {
      columnCounts[i] = 1
      count = count - 1
    }
  } else {
    let perColumn = count / columns
    if (round) perColumn = Math.floor(perColumn)

    for (let i = 0; i < columns; i++) {
      columnCounts.push(perColumn)
      count = count - perColumn
    }

    let remainder = count % columns
    for (let i = 0; i < remainder; i++) {
      columnCounts[i] = columnCounts[i] + 1
    }
  }

  let offsetPerColumn = markerStyle.markerWidth / (columns + 1)

  return columnCounts.map(
    (count, index) => (
      <OutbreakSparklineOneColumnSVG
          key={`column_${index + 1}`}
          dayIndex={dayIndex}
          count={count}
          xOffset={(index + 1) * offsetPerColumn}
          yOffset={markerStyle.markerHeight / 2}
          height={height}
          style={markerStyle}
        />
    )
  )
}

const OutbreakSparklineOneColumnSVG = ({dayIndex, count, xOffset, yOffset, height, style}) => {
  let markers = []

  let rounded = Math.round(count)

  let radiusScale
  if (rounded < count) {
    radiusScale = (count - rounded)

    if (radiusScale < 0.1) radiusScale = 0.3
    else if (radiusScale < 0.6) radiusScale = 0.6
    else if (radiusScale < 0.75) radiusScale = 0.75
  } else {
    radiusScale = 1
  }

  if (count > 0 && style) {
    let radius
    for (let i = 0; i < count; i++) {
      radius = style.radius * (i < (count - 1) ? 1 : radiusScale)

      markers.push(
        <circle
          key={i}
          cx={(dayIndex * style.markerWidth) + xOffset}
          cy={height - ((i + 1) * style.markerHeight) - yOffset}
          r={radius}
          stroke={style.stroke}
          fill={style.fill}
          strokeWidth={style.strokeWidth}
        />
      )
    }
  }

  return (
    <>{markers}</>
  )
}

export const OutbreakSparklineSampleMarker = ({ type }) => {
  let style = SVG_STYLES[type]

  if (style) {
    return (
      <svg
        style={{ height: '2ex', width: '2ex', position: 'relative', top: '0.5ex' }}
        viewBox={`0 0 ${style.markerWidth} ${style.markerHeight}`}
      >
        <circle
          cx={(style.markerWidth / 2)}
          cy={(style.markerHeight / 2)}
          r={style.radius}
          stroke={style.stroke}
          fill={style.fill}
          strokeWidth={style.strokeWidth}
        />
      </svg>
    )
  } else {
    return null
  }

}
export default  React.memo(OutbreakSparklineSVG)
