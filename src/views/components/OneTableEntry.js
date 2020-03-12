import React from 'react'
import classNames from 'classnames'
import formatNumber from '../../../utils/formatNumber'

import OutbreakSparklineSVG from '../../charts/OutbreakSparklineSVG'
import OutbreakTable from '../../charts/OutbreakTable'


const OneTableEntry = ({entry, allDates, pinned, expanded, pinEntry, unpinEntry, expandEntry, collapseEntry}) => {
  return (
    <div key={entry.name} className={classNames('TableView-row', { pinned, expanded })}>

      <OutbreakSparklineSVG entry={entry} allDates={allDates} />

      <div className='TableView-title'>
        <div className='tools'>
          {
            pinned
            ? <button className='segment activated' onClick={ () => unpinEntry(entry) }>pinned to top</button>
            : <button className='segment' onClick={ () => pinEntry(entry) }>pin</button>
          }
          {
            expanded
            ? <button className='segment activated' onClick={ () => collapseEntry(entry) }>hide data</button>
            : <button className='segment' onClick={ () => expandEntry(entry) }>show more</button>
          }
        </div>

        <div className='name'>
          {entry.emoji}
          &nbsp;&nbsp;
          <b>{entry.displayName || entry.name}</b>
        </div>

        <div className='totals'>
          {
            entry.latestTotal.deaths > 0
            ? <div className='segment'>{formatNumber(entry.latestDaily.deaths)} new deaths</div>
            : <div className='segment'>{formatNumber(entry.latestTotal.cases)} total cases</div>
          }
          <div className='segment'><b>
            {formatNumber(entry.latestTotal.deaths)} total
            {entry.latestPreliminaryTotal.deaths !== entry.latestTotal.deaths && (
              <span className='preliminary'>{' +'}{formatNumber(entry.latestPreliminaryDaily.deaths)}</span>
            )}
          </b></div>
        </div>
      </div>
      {expanded && (
        <div className='TableView-more'>
          {entry.links  && (
            <section>
              <b>Links:&nbsp;&nbsp;</b>
              {Object.keys(entry.links).map(key =>
                <span key={key}><a href={entry.links[key]} target='_blank' rel="noopener noreferrer">{key}</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </section>
          )}

          <section>
            <OutbreakTable entry={entry} allDates={allDates} />
          </section>

          {entry.sources.deaths && (
            <section>
              <b>Includes data labeled as&nbsp;&nbsp;</b>
              {entry.sources.deaths.map(name =>
                <span key={name}>{name}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  )
}

export default OneTableEntry
