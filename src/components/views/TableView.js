import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next';

import './Entries.css'

import OneTableEntry from '../entries/OneTableEntry'

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

    const sharedProps = {
      ui, dates, allDates, comparisonEntry,
      isMobile, isTablet, isDesktop
    }

    return (
      <div className='ScrollView'>
        {title && <h2>{title}</h2>}

        <div className='Entries TableView'>
          {/* <div className='TableView-headers TableView-row'>
            <section className='title header'>Outbreak</section>
            <section className='outbreakDay header'>Day</section>
            <section className='deaths header'>Deaths</section>
            <section className='latestDaily header'>Last 4 days</section>
            <section className='acceleration header'>Acceleration</section>
          </div> */}

          {data.map((entry, index) => (
            <OneTableEntry key={entry.code} {...sharedProps} entry={entry} />
          ))}
        </div>
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
