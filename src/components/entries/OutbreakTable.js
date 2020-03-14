import React from 'react'
import classNames from 'classnames'

import formatNumber from '../../utils/formatNumber'
import { formatDateMonDD } from '../../utils/dateFormats'

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
              <div className='date'>{formatDateMonDD(date)}</div>
              <div className='cases'>{formatNumber(entry.daily.cases[date])}</div>
              <div className={classNames('percent', {
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
            </div>
          ))}
        </div>
        <div className='OutbreakTable-headers'>
          <div className='row'>
            <div className='date'>Date</div>
            <div className='cases'>Cases</div>
            <div className='percent'>&nbsp;</div>
            <div className='deaths'>Deaths</div>
            <div className='percent'>&nbsp;</div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default OutbreakTable
