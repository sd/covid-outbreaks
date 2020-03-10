import React from 'react'

import formatNumber from '../../utils/formatNumber'

const OutbreakTable = ({entry, allDates}) => {
  let reversedDates = [...allDates]
  reversedDates.reverse()

  if (entry.deaths) {
    return (
      <div className='OutbreakTable'>
        <table>
          <thead>
            <tr>
              <th className='dateColumn'>Date</th>
              <th className='casesColumn'>Cases</th>
              <th className='deathsColumn'>Deaths</th>
            </tr>
          </thead>
          <tbody>
            {reversedDates.map((date, index)=> (
              <tr key={date}>
                <td className='dateColumn'>{date}</td>
                <td className='casesColumn'>{formatNumber(entry.cases[date])}</td>
                <td className='deathsColumn'>{formatNumber(entry.deaths[date])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return null
  }
}

export default OutbreakTable
