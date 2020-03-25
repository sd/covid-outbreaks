import React from 'react'
import { Trans } from 'react-i18next';

import { DeathsChartSampleMarker } from '../entries/DeathsChart'
import { DEATHS_SCALE, CASES_SCALE } from '../entries/OneTableEntry'

const MarkerLegend = () => {
  return (
    <div className='MarkerLegend'>
      <span className='segment'>
        <DeathsChartSampleMarker type='deathMarker' /> <Trans i18nKey="legend.deaths_label">1 death</Trans>
      </span>
      <span className=''>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className='segment'>
        <DeathsChartSampleMarker type='groupedDeathMarker' /> <Trans i18nKey="legend.grouped_deaths_label">{{groupSize: DEATHS_SCALE}} deaths</Trans>
      </span>
      <span className=''>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className='segment'>
        <DeathsChartSampleMarker type='caseMarker' /> <Trans i18nKey="legend.cases_label">{{groupSize: CASES_SCALE}} cases</Trans>
      </span>
    </div>
  )
}


export default MarkerLegend
