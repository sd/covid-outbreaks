import React from 'react'

const SVG_STYLES = {
  weekLines: {
    stroke: '#555',
    strokeWidth: 0.6,
  },
  emptyMarker: {
    fill: '#444',
    markerWidth: 10,
    markerHeight: 2,
    radius: 0.5
  },
  deathMarker: {
    fill: '#F00',
    markerWidth: 10,
    markerHeight: 2,
    radius: 1.2
  },
  preliminaryDeathMarker: {
    fill: 'none',
    stroke: '#e96',
    strokeWidth: 0.6,
    markerWidth: 10,
    markerHeight: 2,
    radius: 1.2
  },
  caseMarker: {
    fill: '#6a6a6a',
    markerWidth: 10,
    markerHeight: 2,
    radius: 3.0,
    multiplier: 100
  }
}

const OutbreakSparklineSVG = ({entry, dates, sideBySide}) => {
  let canvasWidth = dates.length * SVG_STYLES.emptyMarker.markerWidth

  let maxDataPoint = Math.max(
    ...dates.map(d => entry.daily.deaths[d] || 0),
    ...dates.map(d => entry.preliminaryDaily.deaths[d] || 0),
    ...dates.map(d => (entry.daily.cases[d] || 0) / SVG_STYLES.caseMarker.multiplier),
    0
  )

  let columns = 1

  if (sideBySide && maxDataPoint > 50) {
    columns = 2
    maxDataPoint = maxDataPoint / 2
  }

  let canvasHeight = (maxDataPoint + 1) * SVG_STYLES.emptyMarker.markerHeight + 10

  if (entry.daily.deaths) {
    return (
      <div className='OutbreakSparkline'>
        <svg width={'100%'} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          {dates.map((date, index) => (
            ((index + 2) % 7 === 0) && /* + 2 moves the lines to a monday */
              <line
                key={`line_${index}`}
                x1={index * SVG_STYLES.emptyMarker.markerWidth}
                y1={0}
                x2={index * SVG_STYLES.emptyMarker.markerWidth}
                y2={canvasHeight}
                strokeWidth={SVG_STYLES.weekLines.strokeWidth}
                stroke={SVG_STYLES.weekLines.stroke}
              />
          ))}
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
                count={entry.daily.cases[date] / SVG_STYLES.caseMarker.multiplier}
                columns={columns}
                round={false}
                height={canvasHeight}
                markerStyle={SVG_STYLES.caseMarker}
              />
          ))}
          {dates.map((date, index)=> (
            (entry.daily.deaths[date] || entry.preliminaryDaily.deaths[date]) &&
              <OutbreakSparklineOneDaySVG
                key={`deaths_${date}`}
                dayIndex={index}
                count={entry.daily.deaths[date] || entry.preliminaryDaily.deaths[date]}
                columns={columns}
                round={true}
                height={canvasHeight}
                markerStyle={entry.daily.deaths[date] !== undefined ? SVG_STYLES.deathMarker : SVG_STYLES.preliminaryDeathMarker}
              />
          ))}
        </svg>
      </div>
    )
  } else {
    return null
  }
}

const OutbreakSparklineOneDaySVG = ({dayIndex, count, columns, round, height, markerStyle}) => {
  let markerColumns = []
  let perColumn = count / columns
  if (round) {
    perColumn = Math.round(perColumn)
  }
  let column = 1

  let offsetPerColumn = markerStyle.markerWidth / (columns + 1)

  while (count > 0) {
    markerColumns.push(
      <OutbreakSparklineOneColumnSVG
        key={`column_${column}`}
        dayIndex={dayIndex}
        count={count > perColumn ? (perColumn * column) : count}
        xOffset={column * offsetPerColumn}
        yOffset={markerStyle.markerHeight / 2}
        height={height}
        style={markerStyle}
      />
    )
    count = count - perColumn
    column = column + 1
  }

  return <>{markerColumns}</>
}

const OutbreakSparklineOneColumnSVG = ({dayIndex, count, xOffset, yOffset, height, style}) => {
  let markers = []

  let rounded = Math.round(count)

  let radiusScale
  if (rounded < count) {
    radiusScale = (count - rounded)

    if (radiusScale < 0.1) radiusScale = 0.3
    else if (radiusScale < 0.5) radiusScale = 0.5
    else if (radiusScale < 0.7) radiusScale = 0.7
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
export default OutbreakSparklineSVG
