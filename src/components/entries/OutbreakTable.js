import React from 'react'
import { Trans, useTranslation } from 'react-i18next';
import numeral from 'numeral'

import Information from '../ui/Information'

import { formatDateMonthAbbrDD, formatDateWeekdayAbbrDD } from '../../utils/dateFormats'

import { VelocityWithStyles, AccelerationWithStyles } from './OneTableEntry'

import './OutbreakTable.css'

const OutbreakTable = ({entry, dates}) => {
  const { i18n } = useTranslation();

  let reversedDates = [...dates]
  reversedDates.reverse()

  // Remove dates without data at the end of the series
  while (!entry.totals.deaths[reversedDates[0]] && !entry.totals.cases[reversedDates[0]]) {
    reversedDates = reversedDates.slice(1)
  }

  if (entry && entry.daily && entry.daily.deaths) {
    return (
      <div className='OutbreakTable'>
        <div className='OutbreakTable-values' >
          {reversedDates.map((date, index)=> (
            <div key={date} className='row'>

              <div className='date'><DateHeader d={date} i18n={i18n} /></div>

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
                <div className='velocity'>
                  <VelocityWithStyles value={entry.velocity.deaths[date]} />
                </div>
              }

              {entry.latestAcceleration.deaths &&
                <>
                  <div className='acceleration'>
                    <AccelerationWithStyles value={entry.acceleration.deaths[date]} />
                  </div>
                  <div className='acceleration'>
                    <AccelerationWithStyles value={entry.rollingAcceleration.deaths[date]} />
                  </div>
                </>
              }

              <div className='cases totals'>
                {entry.totals.cases[date] > 0
                  ? numeral(entry.totals.cases[date]).format('0,000')
                  : <span>&nbsp;</span>
                }
              </div>

              <div className='cases daily'>
                {entry.daily.cases[date] > 0
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
            {entry.latestAcceleration.deaths &&
              <>
                <div className='acceleration'>
                  <Trans i18nKey='entry.table_acceleration_label'>Acceleration</Trans>
                </div>
                <div className='acceleration'>
                  <Trans i18nKey='entry.table_average_acceleration_label'>3-day Average</Trans>
                </div>
              </>
            }

            <div className='cases totals'><Trans i18nKey='entry.table_cases_label'>Cases</Trans></div>
            <div className='cases daily'>&nbsp;</div>

            {/* <div className='velocity'>&nbsp;</div> */}
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

 /* Sat 29   MAR 1   Mon 2   Tue 3 ... */
const DateHeader = ({d, i18n}) => {
  if (d) {
    const date = new Date(d)
    if (date.getDate() === 1) {
      return <b>{formatDateMonthAbbrDD(d, i18n).toUpperCase()}</b>
    } else {
      return formatDateWeekdayAbbrDD(d, i18n)
    }
  } else {
    return ''
  }
}

export default  React.memo(OutbreakTable)
