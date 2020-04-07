import React from 'react'
import { connect } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next';

import './Entries.css'

import ListOfEntries from '../entries/ListOfEntries'
import OneSummaryEntry from '../entries/OneSummaryEntry'

import { viewOptionsForSorting } from '../../store/sorters'
import { viewOptionsForFiltering, filterBySearch } from '../../store/filters'

const AllEntriesView = ({
  ui, loaded, data, allDates,
  pinEntry, unpinEntry,
  expandEntry, collapseEntry,
  isMobile, isTablet, isDesktop,
  listRef, windowHeight
}) => {
  const { i18n } = useTranslation();

  if (loaded) {
    const comparisonEntry = data.find(entry => entry.code === (ui.compareTo || 'it'))

    let viewOptions = { pinPositions: ui.pinPositions, hideAggregates: ui.hideAggregates }
    viewOptions = viewOptionsForSorting(ui.sort, viewOptions)
    viewOptions = viewOptionsForFiltering(ui.filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    if (ui.search) {
      data = data.filter(entry => filterBySearch(entry, ui.search, i18n.language))
    }

    let dates = allDates

    const actualProps = {
      data, dates, allDates,
      viewOptions, ui, pinEntry, unpinEntry, expandEntry, collapseEntry,
      comparisonEntry,
      listRef, listHeight: windowHeight,
      isMobile, isTablet, isDesktop
    }
    return (
      <ListOfEntries {...actualProps} entryComponent={OneSummaryEntry} />
    )
  } else {
    return (
      <div className='Entries'>
        <div className='Entries-loading'>
          <h2><Trans i18nKey={'general.loading'}>Loading...</Trans></h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  loaded: state.data.loaded,
  data: state.data.data,
  allDates: state.data.allDates,
  ui: state.ui
})

const ConnectedAllEntriesView = connect(
  mapStateToProps
)(AllEntriesView)

export default ConnectedAllEntriesView
