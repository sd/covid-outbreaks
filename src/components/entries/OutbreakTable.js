import React from 'react'
import { Trans } from 'react-i18next';
import numeral from 'numeral'
import Information from '../ui/Information'

import { formatDateWeekdayAbbrDDorFirstOfMonth } from '../../utils/dateFormats'

import { VelocityWithStyles, AccelerationWithStyles } from '../ui/NumbersWithStyles'

import './OutbreakTable.css'

const OutbreakTable = ({entry, dates}) => {
  let reversedDates = [...dates]
  reversedDates.reverse()

  // Remove dates without data at the end of the series
  while (!entry.totals.deaths[reversedDates[0]]) {
    reversedDates = reversedDates.slice(1)
  }

  if (entry && entry.daily && entry.daily.deaths) {
    return (
      <div className='OutbreakTable'>
        <div className='OutbreakTable-values' >
          {reversedDates.map((date, index)=> (
            <div key={date} className='row'>

              <div className='date'>{formatDateWeekdayAbbrDDorFirstOfMonth(date)}</div>

              <div className='outbreakDay'>
                {entry.outbreakDay.deaths[date]
                  ? <Trans i18nKey='entry.outbreak_day'>day {{day: entry.outbreakDay.deaths[date]}}</Trans>
                  : <span>&nbsp;</span>
                }
              </div>

              <div className='deaths totals'>
                {entry.totals.deaths[date]
                  ? numeral(entry.totals.deaths[date]).format('0,000')
                  : <span>&nbsp;</span>
                }
              </div>

              <div className='deaths daily'>
                {entry.daily.deaths[date] > 0
                  ? `+${numeral(entry.daily.deaths[date]).format('0,000')}`
                  : <span>&nbsp;</span>
                }
              </div>

              {entry.latestVelocity.deaths &&
                <div className='velocity' title={`${entry.velocity.deaths[date]}`}>
                  <VelocityWithStyles value={entry.velocity.deaths[date]} />
                </div>
              }

              {entry.latestAcceleration.deaths !== undefined &&
                <>
                  <div className='acceleration' title={`${entry.acceleration.deaths[date]}`}>
                    <AccelerationWithStyles value={entry.acceleration.deaths[date]} />
                  </div>
                  <div className='acceleration' title={`${entry.rollingAcceleration.deaths[date]}`}>
                    <AccelerationWithStyles value={entry.rollingAcceleration.deaths[date]} />
                  </div>
                  <div className='acceleration change' title={`${entry.rollingAcceleration.deaths[date] / entry.rollingAcceleration.deaths[reversedDates[index + 1]]}`}>
                    <AccelerationWithStyles percentChange={true} signs={true} colors={true} arrows={false} format={'0'} value={entry.rollingAcceleration.deaths[date] / entry.rollingAcceleration.deaths[reversedDates[index + 1]]} />
                  </div>
                  <div className='acceleration' title={`${1 / entry.rollingAcceleration.deaths[date]}`}>
                    <AccelerationWithStyles value={1 / entry.rollingAcceleration.deaths[date]} arrows={false} colors={false} format={'0,000.0'} />
                  </div>
                </>
              }

              <div className='cases totals'>
                {entry.totals.cases && entry.totals.cases[date] > 0
                  ? numeral(entry.totals.cases[date]).format('0,000')
                  : <span>&nbsp;</span>
                }
              </div>

              <div className='cases daily'>
                {entry.daily.cases && entry.totals.cases[date] > 0
                  ? `+${numeral(entry.daily.cases[date]).format('0,000')}`
                  : <span>&nbsp;</span>
                }
              </div>

            </div>
          ))}
        </div>
        <div className='OutbreakTable-headers'>
          <div className='row'>
            <div className='date'><Trans i18nKey='entry.table_date_label'>Date</Trans></div>
            <div className='outbreakDay'>&nbsp;</div>

            <div className='deaths totals'><Trans i18nKey='entry.table_deaths_label'>Deaths</Trans></div>
            <div className='deaths daily'>&nbsp;</div>

            {entry.latestVelocity.deaths &&
              <div className='velocity'>
                <Trans i18nKey='entry.table_velocity_label'>Velocity</Trans>
                <Information content='numbers' />

              </div>
            }
            {entry.latestAcceleration.deaths !== undefined &&
              <>
                <div className='acceleration'>
                  <Trans i18nKey='entry.table_acceleration_label'>Acceleration</Trans>
                </div>
                <div className='acceleration'>
                  <Trans i18nKey='entry.table_average_acceleration_label'>3-day Average</Trans>
                </div>
                <div className='acceleration change'>
                  &nbsp;
                </div>
                <div className='acceleration'>
                  <Trans i18nKey='entry.table_days_to_tenx_label'>Days to 10x</Trans>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default  React.memo(OutbreakTable)
