import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next';

import './Entries.css'

import OneTableEntry from '../entries/OneTableEntry'
import ListOfEntries from '../entries/ListOfEntries'

import { viewOptionsForSorting } from '../../store/sorters'
import { viewOptionsForFiltering, filterBySearch } from '../../store/filters'

const TableView = ({
  loaded, data, allDates,
  ui, filter,
  pinEntry, unpinEntry,
  expandEntry, collapseEntry,
  isMobile, isTablet, isDesktop,
  listRef, windowHeight
}) => {
  const { i18n, t } = useTranslation()
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

    let title = ''
    if (viewOptions && viewOptions.filter) {
      title = t(`filter.description.${viewOptions.filter}`, viewOptions.filterDescription)
    }

    let dates = allDates

    const actualProps = {
      data, dates, allDates, comparisonEntry,
      viewOptions, ui, pinEntry, unpinEntry, expandEntry, collapseEntry,
      listRef, listHeight: windowHeight, defaultHeight: 58,
      isMobile, isTablet, isDesktop
    }

    const HeaderComponent = () => (
      <>{title && <h2>{title}</h2>}</>
    )
    return (
      <div className='Entries TableView'>
        <ListOfEntries {...actualProps} entryComponent={OneTableEntry} headerComponent={HeaderComponent} />
      </div>
    )
  } else {
    return (
      <div className='Entries TableView'>
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
)(TableView)

export default ConnectedAllEntriesView
