import React from 'react'
import { connect } from 'react-redux'

import './TableView.css'

import OneTableEntry from './components/OneTableEntry'

import { viewOptionsForSorting } from '../../store/sorters'
import { viewOptionsForFiltering } from '../../store/filters'

const TableView = ({
  loaded, data, allDates,
  sort, filter,
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
          <ViewControls />

          <MarkerLegend />
        </div>
        <div className='TableView-content'>
          {data.map((entry, index) => (
            <OneTableEntry key={entry.name}
              entry={entry} index={index} allDates={allDates}
              pinned={pinPositions[entry.name]} expanded={isExpanded[entry.name]}
              pinEntry={pinEntry} unpinEntry={unpinEntry} expandEntry={expandEntry} collapseEntry={collapseEntry}
            />
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
  loaded: state.csseData.loaded,
  data: state.csseData.data,
  allDates: state.csseData.allDates,
  sort: state.ui.sort,
  filter: state.ui.filter,
  pinPositions: state.ui.pinPositions,
  isExpanded: state.ui.isExpanded
})

const mapDispatchToProps = (dispatch) => ({
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
