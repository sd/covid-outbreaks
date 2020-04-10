import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next';

import './Entries.css'

import ListOfEntries from '../entries/ListOfEntries'
import OneSummaryEntry from '../entries/OneSummaryEntry'

import { viewOptionsForSorting } from '../../store/sorters'
import { viewOptionsForFiltering, filterBySearch } from '../../store/filters'

const AllEntriesView = ({
  loaded, data, allDates,
  ui, filter,
  pinEntry, unpinEntry,
  expandEntry, collapseEntry,
  isMobile, isTablet, isDesktop,
  listRef, windowHeight
}) => {
  const { i18n } = useTranslation()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  if (loaded) {
    const comparisonEntry = data.find(entry => entry.code === (ui.compareTo || 'it'))

    let viewOptions = { pinPositions: ui.pinPositions, hideAggregates: ui.hideAggregates }
    viewOptions = viewOptionsForSorting(ui.sort, viewOptions)
    viewOptions = viewOptionsForFiltering(filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    if (query.get('search')) {
      console.log('search', query.get('search'))
      data = data.filter(entry => filterBySearch(entry, query.get('search'), i18n.language))
    }

    if (data === []) return null

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
