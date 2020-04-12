import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
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
      data, dates, allDates,
      viewOptions, ui, pinEntry, unpinEntry, expandEntry, collapseEntry,
      comparisonEntry,
      listRef, listHeight: windowHeight,
      isMobile, isTablet, isDesktop
    }

    const AllEntriesHeader = () => {
      return (
        <>
          {title && <h2>{title}</h2>}

          <div className='legend'>
            <div>
              <section className='deaths'>
                {' –– '}
                <Trans i18nKey='information.legend_deaths'>
                  Daily deaths
                </Trans>
              </section>
              <section className='comparedTo'>
                {' –– '}
                <Trans i18nKey='information.legend_compared'>
                  Compared to {{name: comparisonEntry[`${i18n.language}Name`] || comparisonEntry.name || comparisonEntry.code}}
                </Trans>
              </section>
              <section className='acceleration'>
                {' –– '}
                <Trans i18nKey='information.legend_acceleration'>
                  Acceleration
                </Trans>
              </section>
              <section>
                <Link to='/explain'>
                  <Trans i18nKey='information.explain'>
                    Explain?
                  </Trans>
                </Link>
              </section>
            </div>
          </div>
        </>
      )
    }

    return (
      <div className='Entries AllEntriesView'>
        <ListOfEntries {...actualProps} entryComponent={OneSummaryEntry} headerComponent={AllEntriesHeader} />
      </div>
    )
  } else {
    return (
      <div className='Entries AllEntriesView'>
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
