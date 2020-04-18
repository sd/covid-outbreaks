import React from 'react'
import { connect } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next';

import './Entries.css'

import ListOfEntries from '../entries/ListOfEntries'
import OneTableEntry from '../entries/OneTableEntry'

import { viewOptionsForSorting } from '../../store/sorters'
import { filterBySearch } from '../../store/filters'

const OneEntryView = ({
  entryName,
  ui, loaded, data, allDates,
  isMobile, isTablet, isDesktop,
  listRef, windowHeight
}) => {
  const { i18n } = useTranslation();

  if (loaded) {
    const comparisonEntry = data.find(entry => entry.code === (ui.compareTo || 'it'))

    let viewOptions = { hideAggregates: ui.hideAggregates }
    viewOptions = viewOptionsForSorting(ui.sort, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))

    if (entryName) {
      if (!entryName.match(/[*,]/)) {
        entryName = `${entryName},${entryName}*`
      }
      data = data.filter(entry => filterBySearch(entry, entryName, i18n.language))
    }

    let dates = allDates

    const actualProps = {
      data, dates, allDates,
      viewOptions, ui,
      permalink: data[0] && data[0].code,
      comparisonEntry,
      listRef, listHeight: windowHeight,
      isMobile, isTablet, isDesktop
    }
    return (
      <div className='Entries OneEntryView'>
        <ListOfEntries {...actualProps} entryComponent={OneTableEntry} />
      </div>
    )
  } else {
    return (
      <div className='Entries OneEntryView'>
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

const ConnectedOneEntryView = connect(
  mapStateToProps
)(OneEntryView)

export default ConnectedOneEntryView
