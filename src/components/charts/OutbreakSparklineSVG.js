import React, { Fragment } from 'react'

const SVG_STYLES = {
  weekLines: {
    stroke: '#555',
    strokeWidth: 0.6,
  },
  emptyMarker: {
    fill: '#444',
    markerWidth: 9,
    markerHeight: 2,
    radius: 0.5
  },
  deathMarker: {
    fill: '#F00',
    markerWidth: 9,
    markerHeight: 2,
    radius: 1.2
  },
  preliminaryDeathMarker: {
    fill: 'none',
    stroke: '#e96',
    strokeWidth: 0.6,
    markerWidth: 9,
    markerHeight: 2,
    radius: 1.2
  },
  caseMarker: {
    fill: '#6a6a6a',
    markerWidth: 9,
    markerHeight: 2,
    radius: 3.0,
    multiplier: 100
  }
}

const OutbreakSparklineSVG = ({entry, allDates}) => {
  let width = allDates.length * SVG_STYLES.emptyMarker.markerWidth

  let maxDataPoint = Math.max(
    ...allDates.map(d => entry.counts.deaths[d] || 0),
    ...allDates.map(d => (entry.counts.cases[d] || 0) / SVG_STYLES.caseMarker.multiplier)
    , 0
  )
  let height = (maxDataPoint + 1) * SVG_STYLES.emptyMarker.markerHeight + 10

  if (entry.counts.deaths) {
    return (
      <div className='OutbreakSparkline'>
        <svg width={'100%'} viewBox={`0 0 ${width} ${height}`}>
          {allDates.map((date, index) => (
            (index % 7 === 0) &&
              <line
                key={`line_${index}`}
                x1={index * SVG_STYLES.emptyMarker.markerWidth}
                y1={0}
                x2={index * SVG_STYLES.emptyMarker.markerWidth}
                y2={height}
                strokeWidth={SVG_STYLES.weekLines.strokeWidth}
                stroke={SVG_STYLES.weekLines.stroke}
              />
          ))}
          {allDates.map((date, index) => (
            <OutbreakSparklineOneDaySVG
              key={`empty_${date}`}
              dayIndex={index}
              count={1}
              height={height}
              markerStyle={SVG_STYLES.emptyMarker}
            />
          ))}
          {allDates.map((date, index) => (
            entry.counts.cases[date] &&
              <OutbreakSparklineOneDaySVG
                key={`cases_${date}`}
                dayIndex={index}
                count={entry.counts.cases[date] / SVG_STYLES.caseMarker.multiplier}
                height={height}
                markerStyle={SVG_STYLES.caseMarker}
              />
          ))}
          {allDates.map((date, index)=> (
            (entry.counts.deaths[date]) &&
              <OutbreakSparklineOneDaySVG
                key={`deaths_${date}`}
                dayIndex={index}
                count={entry.counts.deaths[date]}
                height={height}
                markerStyle={entry.counts.deaths[date] !== undefined ? SVG_STYLES.deathMarker : SVG_STYLES.preliminaryDeathMarker}
              />
          ))}
        </svg>
      </div>
    )
  } else {
    return null
  }
}

const OutbreakSparklineOneDaySVG = ({dayIndex, count, xOffset = 0, yOffset = 0, height, markerStyle}) => {
  let markers = []
  let style = markerStyle

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
          cx={xOffset + (dayIndex * style.markerWidth) + (style.markerWidth / 2)}
          cy={yOffset + height - ((i + 1) * style.markerHeight) - (style.markerHeight / 2)}
          r={radius}
          stroke={style.stroke}
          fill={style.fill}
          strokeWidth={style.strokeWidth}
        />
      )
    }
  }

  return (
    <Fragment>{markers}</Fragment>
  )
}

export const OutbreakSparklineSampleMarker = ({type}) => {
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
