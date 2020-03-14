import React from 'react'

import { OutbreakSparklineSampleMarker } from './entries/OutbreakSparklineSVG'

const MarkerLegend = () => {
  return (
    <div className='MarkerLegend'>
      <span className='segment'>
        <OutbreakSparklineSampleMarker type='deathMarker' /> 1 death
      </span>
      <span className=''>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className='segment'>
        <OutbreakSparklineSampleMarker type='caseMarker' /> 100 cases
      </span>
    </div>
  )
}

export default MarkerLegend
