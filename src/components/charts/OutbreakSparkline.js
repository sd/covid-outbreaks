import React from 'react'
import './OutbreakSparkline.css'

const OutbreakSparklineOneDay = ({count}) => {
  let markers = []

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      markers.push(<div key={i} className='OutbreakSparkline-one'>.</div>)
    }
  } else {
    markers.push(<div key={0} className='OutbreakSparkline-zero'>.</div>)
  }

  return (
    <div className='OutbreakSparkline-day'>{markers}</div>
  )
}

const OutbreakSparkline = ({dataPoints, allDates}) => {
  if (dataPoints) {
    return (
      <div className='OutbreakSparkline'>
        {allDates.map((date, index)=> (
          <OutbreakSparklineOneDay key={index} index={index} count={dataPoints[date]} />
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default OutbreakSparkline
