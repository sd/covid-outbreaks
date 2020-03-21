import React from 'react'
import { Trans } from 'react-i18next';

import { OutbreakSparklineSampleMarker, groupedMarkerSize } from '../entries/OutbreakSparklineSVG'

const MarkerLegend = () => {
  return (
    <div className='MarkerLegend'>
      <span className='segment'>
        <OutbreakSparklineSampleMarker type='deathMarker' /> <Trans i18nKey="legend.deaths_label">1 death</Trans>
      </span>
      <span className=''>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className='segment'>
        <OutbreakSparklineSampleMarker type='groupedDeathMarker' /> <Trans i18nKey="legend.grouped_deaths_label">{{groupSize: groupedMarkerSize}} deaths</Trans>
      </span>
      <span className=''>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className='segment'>
        <OutbreakSparklineSampleMarker type='caseMarker' /> <Trans i18nKey="legend.cases_label">100 cases</Trans>
      </span>
    </div>
  )
}


export default MarkerLegend
