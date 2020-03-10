import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import SelectionPopup from '../../components/shared/SelectionPopup'

import formatNumber from '../../utils/formatNumber'

import './TableView.css'
import OutbreakSparklineSVG from '../charts/OutbreakSparklineSVG'
import OutbreakTable from '../charts/OutbreakTable'
import { viewOptionsForSorting, SORTER_TYPES, SORTER_DESCRIPTIONS } from '../../data/sorters'
import { viewOptionsForFiltering, FILTER_TYPES, FILTER_DESCRIPTIONS } from '../../data/filters'

const TableView = ({
  loading, loaded, data, allDates,
  sort, setSort, filter, setFilter,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry
}) => {
  if (loaded) {
    console.log(sort, filter)
    let viewOptions = { pinPositions }
    viewOptions = viewOptionsForSorting(sort, viewOptions)
    viewOptions = viewOptionsForFiltering(filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    return (
      <div className='TableView'>
        <div className='TableView-content'>
          <h3>
            <SelectionPopup
              selected={viewOptions.filter}
              options={FILTER_TYPES}
              descriptions={FILTER_DESCRIPTIONS}
              title='Filtering options'
              onSelect={(option) => setFilter(option)}
            />
            {' sorted by '}
            <SelectionPopup
              selected={viewOptions.sort}
              options={SORTER_TYPES}
              descriptions={SORTER_DESCRIPTIONS}
              title='Sorting options'
              onSelect={(option) => setSort(option)}
            />
          </h3>
          <div>
            <span className='blockUnder900px'>Red: deaths, one dot per case.</span>
            <span className='hideUnder900px'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className='blockUnder900px'>Gray: confirmed cases, but at a 1:100 scale.</span>
          </div>

          {data.map((entry, index) => (
            <div key={entry.name} className={classNames('TableView-row', { pinned: pinPositions[entry.name], expanded: isExpanded[entry.name] })}>

              <OutbreakSparklineSVG entry={entry} allDates={allDates} />

              <div className='TableView-title'>
                <div className='left'>
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

                <div className='center'>
                  <b>
                    {
                      entry.link
                      ? <a href={entry.link}>{entry.name}</a>
                      : entry.name
                    }
                  </b>
                  &nbsp;&nbsp;&nbsp;
                  {entry.emoji}
                </div>

                <div className='right'>
                  {
                    entry.deathsTotal > 0
                    ? <span>
                        <span className='segment'>{formatNumber(entry.deathsLatest)} new deaths</span>
                        <span className='segment'><b>{formatNumber(entry.deathsTotal)} total</b></span>
                      </span>
                    : <span>
                        <span className='segment'>{formatNumber(entry.casesTotal)} total cases</span>
                        <span className='segment'><b>{formatNumber(entry.deathsTotal)} deaths</b></span>
                      </span>
                  }
                </div>
              </div>
              {isExpanded[entry.name] && (
                <div className='TableView-more'>
                  <div style={{float: 'right', textAlign: 'right'}}>
                    {entry.otherNames && entry.otherNames.length > 1 && (
                      <div>
                        <br />
                        <b>Includes data for</b><br/>
                        {entry.otherNames.map(name =>
                          <div key={name}>{name}</div>
                        )}
                      </div>
                    )}
                  </div>

                  <OutbreakTable entry={entry} allDates={allDates} />
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
