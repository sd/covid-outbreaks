import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import SelectionPopup from '../../components/shared/SelectionPopup'
import { formatDateMonthDD } from '../../utils/dateFormats'
import formatNumber from '../../utils/formatNumber'

import './TableView.css'
import OutbreakSparklineSVG, { OutbreakSparklineSampleMarker } from '../charts/OutbreakSparklineSVG'
import OutbreakTable from '../charts/OutbreakTable'
import { viewOptionsForSorting, SORTER_TYPES, SORTER_DESCRIPTIONS } from '../../store/sorters'
import { viewOptionsForFiltering, FILTER_TYPES, FILTER_DESCRIPTIONS } from '../../store/filters'

const TableView = ({
  loading, loaded, data, allDates, lastDate,
  sort, setSort, filter, setFilter,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry
}) => {
  if (loaded) {
    let viewOptions = { pinPositions }
    viewOptions = viewOptionsForSorting(sort, viewOptions)
    viewOptions = viewOptionsForFiltering(filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    return (
      <div className='TableView'>
        <div className='TableView-header'>
          <h3>
            <span className='segment blockUnder600px'>
              <SelectionPopup
                selected={viewOptions.filter}
                options={FILTER_TYPES}
                descriptions={FILTER_DESCRIPTIONS}
                title='Filtering options'
                onSelect={(option) => setFilter(option)}
              />
            </span>
            <span className='segment blockUnder600px'>
              {' sorted by '}
              <SelectionPopup
                selected={viewOptions.sort}
                options={SORTER_TYPES}
                descriptions={SORTER_DESCRIPTIONS}
                title='Sorting options'
                onSelect={(option) => setSort(option)}
              />
            </span>
            <span className='segment blockUnder600px'>
              {' as of '}
              {formatDateMonthDD(lastDate)}
            </span>

          </h3>
          <div>
            <span className='blockUnder600px'>
              <OutbreakSparklineSampleMarker type='deathMarker' /> 1 death
            </span>
            <span className='hideUnder600px'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className='blockUnder600px'>
              <OutbreakSparklineSampleMarker type='preliminaryDeathMarker' /> (preliminary data)
            </span>
            <span className='hideUnder600px'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className='blockUnder600px'>
              <OutbreakSparklineSampleMarker type='caseMarker' /> 100 cases
            </span>
          </div>
        </div>
        <div className='TableView-content'>
          {data.map((entry, index) => (
            <div key={entry.name} className={classNames('TableView-row', { pinned: pinPositions[entry.name], expanded: isExpanded[entry.name] })}>

              <OutbreakSparklineSVG entry={entry} allDates={allDates} />

              <div className='TableView-title'>
                <div className='tools'>
                  {
                    pinPositions[entry.name]
                    ? <button className='segment activated' onClick={ () => unpinEntry(entry) }>pinned to top</button>
                    : <button className='segment' onClick={ () => pinEntry(entry) }>pin</button>
                  }
                  {
                    isExpanded[entry.name]
                    ? <button className='segment activated' onClick={ () => collapseEntry(entry) }>hide data</button>
                    : <button className='segment' onClick={ () => expandEntry(entry) }>show more</button>
                  }
                </div>

                <div className='name'>
                  {entry.emoji}
                  &nbsp;&nbsp;
                  <b>{entry.name}</b>
                </div>

                <div className='totals'>
                  {
                    entry.latestTotal.deaths > 0
                    ? <>
                        <div className='segment'>{formatNumber(entry.latestCount.deaths)} new deaths</div>
                        <div className='segment'><b>{formatNumber(entry.latestTotal.deaths)} total</b></div>
                        {entry.deathsPreliminaryTotal > 0 && (
                          <div className='segment preliminary'><b>+ {formatNumber(entry.deathsPreliminaryTotal)} prelim</b></div>
                        )}
                      </>
                    : <>
                        <div className='segment'>{formatNumber(entry.latestTotal.cases)} total cases</div>
                        {
                          entry.deathsPreliminaryTotal > 0
                          ? <div className='segment preliminary'><b>{formatNumber(entry.deathsPreliminaryTotal)} deaths (prelim)</b></div>
                          : <div className='segment'><b>{formatNumber(entry.latestTotal.deaths)} deaths</b></div>
                        }
                      </>
                  }
                </div>
              </div>
              {isExpanded[entry.name] && (
                <div className='TableView-more'>
                  {entry.wikipedia && (
                    <section>
                      <b>Links:&nbsp;&nbsp;</b>
                      <a href={entry.wikipedia}>Wikipedia Outbreak Page</a>
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
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='TableView'>
        <div className='Views-paddedContent'>
          <h2>Table View (Loading...)</h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.csseData.loading,
  loaded: state.csseData.loaded,
  data: state.csseData.data,
  allDates: state.csseData.allDates,
  lastDate: state.csseData.lastDate,
  sort: state.ui.sort,
  filter: state.ui.filter,
  pinPositions: state.ui.pinPositions,
  isExpanded: state.ui.isExpanded
})

const mapDispatchToProps = (dispatch) => ({
  setSort: (value) => dispatch({ type: 'UI.SET_SORT', value }),
  setFilter: (value) => dispatch({ type: 'UI.SET_FILTER', value }),
  pinEntry: (entry) => dispatch({ type: 'UI.PIN_ENTRY', value: entry.name }),
  unpinEntry: (entry) => dispatch({ type: 'UI.UNPIN_ENTRY', value: entry.name }),
  expandEntry: (entry) => dispatch({ type: 'UI.EXPAND_ENTRY', value: entry.name }),
  collapseEntry: (entry) => dispatch({ type: 'UI.COLLAPSE_ENTRY', value: entry.name })
})

const ConnectedTableView = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)

export default ConnectedTableView
