import React, { Fragment } from 'react'

const SVG_STYLES = {
  default: {
    markerWidth: 8,
    markerHeight: 2,
    radius: 1
  },
  emptyMarker: {
    fill: '#666',
  },
  deathMarker: {
    fill: '#F00',
  }
}

const OutbreakSparklineSVG = ({dataPoints, allDates}) => {
  const deathMarkerStyle = {...SVG_STYLES.default, ...SVG_STYLES.deathMarker}
  const emptyMarkerStyle = {...SVG_STYLES.default, ...SVG_STYLES.emptyMarker}

  let width = allDates.length * SVG_STYLES.default.markerWidth
  let maxDataPoint = Math.max(...allDates.map(d => dataPoints[d]), 0)
  let height = (maxDataPoint + 1) * deathMarkerStyle.markerHeight

  if (dataPoints) {
    return (
      <div className='OutbreakSparkline'>
        <svg width={'100%'} viewBox={`0 0 ${width} ${height}`}>
          {allDates.map((date, index)=> (
            <OutbreakSparklineOneDaySVG
              key={index}
              dayIndex={index}
              count={dataPoints[date]}
              xOffset={0}
              yOffset={0}
              height={height}
              deathMarkerStyle={deathMarkerStyle}
              emptyMarkerStyle={emptyMarkerStyle}
            />
          ))}
        </svg>
      </div>
    )
  } else {
    return null
  }
}

const OutbreakSparklineOneDaySVG = ({dayIndex, count, xOffset, yOffset, height, deathMarkerStyle, emptyMarkerStyle}) => {
  let markers = []
  let style = deathMarkerStyle

  if (count === 0) {
    count = 1
    style = emptyMarkerStyle
  }

  const xPadding = (style.markerWidth - (2 * style.radius)) / 2;
  const yPadding = (style.markerHeight - (2 * style.radius)) / 2;

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      markers.push(
        <circle
          key={i}
          cx={xOffset + (dayIndex * style.markerWidth) + xPadding}
          cy={yOffset + height - ((i + 1) * style.markerHeight) - yPadding}
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
