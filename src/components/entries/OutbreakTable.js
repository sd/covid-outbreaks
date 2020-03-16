import React from 'react'
import classNames from 'classnames'
import { Trans, useTranslation } from 'react-i18next';

import formatNumber from '../../utils/formatNumber'
import { formatDateMonthAbbrDD, formatDateWeekdayAbbrDD } from '../../utils/dateFormats'

import './OutbreakTable.css'

const OutbreakTable = ({entry, dates}) => {
  const { i18n } = useTranslation();

  let reversedDates = [...dates]
  reversedDates.reverse()

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
              <div className='deaths'>{formatNumber(entry.daily.deaths[date], i18n)}</div>
              <div className={classNames('percent', {
                  positive: entry.percent.deaths[date] > 0,
                  negative: entry.percent.deaths[date] < 0,
                  large: Math.abs(entry.percent.deaths[date]) > 15,
                  huge: Math.abs(entry.percent.deaths[date]) > 50
                })}
              >
                { entry.percent.deaths[date] > 0 && '+' }
                {
                  formatNumber(entry.percent.deaths[date], i18n)
                }
                {entry.percent.deaths[date] !== undefined ? '%': <span>&nbsp;</span>}
              </div>

              <div className='cases'>{formatNumber(entry.daily.cases[date], i18n)}</div>
              <div className={classNames('percent cases', {
                  positive: entry.percent.cases[date] > 0,
                  negative: entry.percent.cases[date] < 0,
                  large: Math.abs(entry.percent.cases[date]) > 25,
                  huge: Math.abs(entry.percent.cases[date]) > 50
                })}
              >
                { entry.percent.cases[date] > 0 && '+' }
                {
                  formatNumber(entry.percent.cases[date], i18n)
                }
                {entry.percent.cases[date] !== undefined ? '%' : <span>&nbsp;</span>}
              </div>

            </div>
          ))}
        </div>
        <div className='OutbreakTable-headers'>
          <div className='row'>
            <div className='date'><Trans i18nKey='entry.table_date_label'>Date</Trans></div>
            <div className='outbreakDay'>&nbsp;</div>
            <div className='deaths'><Trans i18nKey='entry.table_deaths_label'>Deaths</Trans></div>
            <div className='percent'>&nbsp;</div>
            <div className='cases'><Trans i18nKey='entry.table_cases_label'>Cases</Trans></div>
            <div className='percent'>&nbsp;</div>
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
