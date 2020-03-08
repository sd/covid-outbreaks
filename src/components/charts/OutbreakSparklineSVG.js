import React, { Fragment } from 'react'

const SVG_STYLES = {
  default: {
    markerWidth: 8,
    markerHeight: 2,
    radius: 1.1
  },
  emptyMarker: {
    fill: '#444',
  },
  deathMarker: {
    fill: '#F00',
  },
  caseMarker: {
    fill: '#606050',
    radius: 4,
    multiplier: 100
  }
}

const OutbreakSparklineSVG = ({entry, allDates}) => {
  const deathMarkerStyle = {...SVG_STYLES.default, ...SVG_STYLES.deathMarker}
  const caseMarkerStyle = {...SVG_STYLES.default, ...SVG_STYLES.caseMarker}
  const emptyMarkerStyle = {...SVG_STYLES.default, ...SVG_STYLES.emptyMarker}

  let width = allDates.length * SVG_STYLES.default.markerWidth
  let maxDataPoint = Math.max(...allDates.map(d => entry.deaths[d]), ...allDates.map(d => entry.cases[d] / SVG_STYLES.caseMarker.multiplier), 0)
  let height = (maxDataPoint + 1) * SVG_STYLES.default.markerHeight

  if (entry.deaths) {
    return (
      <div className='OutbreakSparkline'>
        <svg width={'100%'} viewBox={`0 0 ${width} ${height}`}>
          {allDates.map((date, index)=> (
            <OutbreakSparklineOneDaySVG
              key={index}
              dayIndex={index}
              count={Math.round(entry.cases[date] / SVG_STYLES.caseMarker.multiplier)}
              xOffset={0}
              yOffset={0}
              height={height}
              markerStyle={caseMarkerStyle}
              zeroMarkerStyle={undefined}
            />
          ))}
          {allDates.map((date, index)=> (
            <OutbreakSparklineOneDaySVG
              key={index}
              dayIndex={index}
              count={entry.deaths[date]}
              xOffset={0}
              yOffset={0}
              height={height}
              markerStyle={deathMarkerStyle}
              zeroMarkerStyle={emptyMarkerStyle}
            />
          ))}
        </svg>
      </div>
    )
  } else {
    return null
  }
}

const OutbreakSparklineOneDaySVG = ({dayIndex, count, xOffset, yOffset, height, markerStyle, zeroMarkerStyle}) => {
  let markers = []
  let style = markerStyle

  if (count === 0) {
    count = 1
    style = zeroMarkerStyle
  }

  if (count > 0 && style) {
    for (let i = 0; i < count; i++) {
      markers.push(
        <circle
          key={i}
          cx={xOffset + (dayIndex * style.markerWidth) + (style.markerWidth / 2)}
          cy={yOffset + height - ((i + 1) * style.markerHeight) - (style.markerHeight / 2)}
          r={style.radius}
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

export default OutbreakSparklineSVG
