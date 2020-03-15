import React from 'react'
import classNames from 'classnames'
import formatNumber from '../../utils/formatNumber'

import OutbreakSparklineSVG from './OutbreakSparklineSVG'
import OutbreakTable from './OutbreakTable'


const OneTableEntry = ({
  entry, dates,
  pinned, expanded, sideBySide,
  pinEntry, unpinEntry, expandEntry, collapseEntry
}) => {
  return (
    <div key={entry.name} className={classNames('TableView-row', { pinned, expanded })}>

      <OutbreakSparklineSVG entry={entry} dates={dates} sideBySide={sideBySide} />

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

        <div className='title'>
          <span className='flag'>{entry.emoji}</span>
          <span className='name'>{entry.displayName || entry.name}</span>
        </div>

        <div className='totals'>
          <div className='deaths'>
            {formatNumber(entry.latestTotal.deaths)} deaths
            {entry.latestDaily.deaths > 0 &&
              ` (+${formatNumber(entry.latestDaily.deaths)})`
            }
          </div>
          <div className='cases'>
            {formatNumber(entry.latestTotal.cases)} cases
            {entry.latestDaily.cases > 0 &&
              ` (+${formatNumber(entry.latestDaily.cases)})`
            }
          </div>
        </div>
      </div>
      {expanded && (
        <div className='TableView-more'>
          {entry && entry.links  && (
            <section>
              <b>Links:&nbsp;&nbsp;</b>
              {Object.keys(entry.links).map(key =>
                <span key={key}><a href={entry.links[key]} target='_blank' rel="noopener noreferrer">{key}</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </section>
          )}

          <section>
            <OutbreakTable entry={entry} dates={dates} />
          </section>

          {entry && entry.sources && entry.sources.deaths && (
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

export default  React.memo(OneTableEntry)
