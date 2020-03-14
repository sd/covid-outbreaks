import React from 'react'
import classNames from 'classnames'

import formatNumber from '../../utils/formatNumber'
import { formatDateMonDD, ABBREVIATED_MONTHS, ABBREVIATED_WEEKDAYS } from '../../utils/dateFormats'

import './OutbreakTable.css'

const OutbreakTable = ({entry, dates}) => {
  let reversedDates = [...dates]
  reversedDates.reverse()

  if (entry.daily.deaths) {
    return (
      <div className='OutbreakTable'>
        <div className='OutbreakTable-values' >
          {reversedDates.map((date, index)=> (
            <div key={date} className='row'>
              <div className='date'><DateHeader d={date} /></div>

              <div className='deaths'>{formatNumber(entry.daily.deaths[date])}</div>
              <div className={classNames('percent', {
                  positive: entry.percent.deaths[date] > 0,
                  negative: entry.percent.deaths[date] < 0,
                  large: Math.abs(entry.percent.deaths[date]) > 15,
                  huge: Math.abs(entry.percent.deaths[date]) > 50
                })}
              >
                {
                  formatNumber(entry.percent.deaths[date])
                }
                {entry.percent.deaths[date] !== undefined ? '%': <span>&nbsp;</span>}
              </div>

              <div className='cases'>{formatNumber(entry.daily.cases[date])}</div>
              <div className={classNames('percent cases', {
                  positive: entry.percent.cases[date] > 0,
                  negative: entry.percent.cases[date] < 0,
                  large: Math.abs(entry.percent.cases[date]) > 25,
                  huge: Math.abs(entry.percent.cases[date]) > 50
                })}
              >
                {
                  formatNumber(entry.percent.cases[date])
                }
                {entry.percent.cases[date] !== undefined ? '%' : <span>&nbsp;</span>}
              </div>

            </div>
          ))}
        </div>
        <div className='OutbreakTable-headers'>
          <div className='row'>
            <div className='date'>Date</div>
            <div className='deaths'>Deaths</div>
            <div className='percent'>&nbsp;</div>
            <div className='cases'>Cases</div>
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
const DateHeader = ({d}) => {
  if (d) {
    const date = new Date(d)
    if (date.getDate() === 1) {
      return <b>{`${ABBREVIATED_MONTHS[date.getMonth() + 1].toUpperCase()} ${date.getDate()}`}</b>
    } else {
      return `${ABBREVIATED_WEEKDAYS[date.getDay()]} ${date.getDate()}`
    }
  } else {
    return ''
  }
}

export default  React.memo(OutbreakTable)
