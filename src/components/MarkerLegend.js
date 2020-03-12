import React from 'react'
import { connect } from 'react-redux'

import { OutbreakSparklineSampleMarker } from './entries/OutbreakSparklineSVG'

const MarkerLegend = ({showPreliminary}) => {
  return (
    <div className='MarkerLegend'>
      <span className='segment'>
        <OutbreakSparklineSampleMarker type='deathMarker' /> 1 death
      </span>
      <span className=''>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      {showPreliminary &&
        <>
          <span className='segment preliminary'>
            <OutbreakSparklineSampleMarker type='preliminaryDeathMarker' /> (preliminary data)
          </span>
          <span className=''>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </>
      }
      <span className='segment'>
        <OutbreakSparklineSampleMarker type='caseMarker' /> 100 cases
      </span>
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    showPreliminary: !!state.csseData.lastPreliminaryDate
  })
)(MarkerLegend)
