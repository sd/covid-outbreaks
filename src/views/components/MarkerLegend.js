import React from 'react'

import { OutbreakSparklineSampleMarker } from '../../charts/OutbreakSparklineSVG'

const MarkerLegend = () => {
  return (
    <div>
      <span className='blockUnder600px'>
        <OutbreakSparklineSampleMarker type='deathMarker' /> 1 death
      </span>
      <span className='hideUnder600px'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className='blockUnder600px preliminary'>
        <OutbreakSparklineSampleMarker type='preliminaryDeathMarker' /> (preliminary data)
      </span>
      <span className='hideUnder600px'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className='blockUnder600px'>
        <OutbreakSparklineSampleMarker type='caseMarker' /> 100 cases
      </span>
    </div>
  )
}

export default MarkerLegend
