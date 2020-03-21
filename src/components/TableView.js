import React from 'react'
import { connect } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next';

import './TableView.css'

import OneTableEntry from './entries/OneTableEntry'

import { viewOptionsForSorting } from '../store/sorters'
import { viewOptionsForFiltering } from '../store/filters'
import { totalizeEntries } from '../store/totalize'

const TableView = ({
  loaded, data, allDates, last4weeks, last6weeks, last8weeks,
  sort, filter, noScaling, weeks, totals,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry,
  isMobile, isTablet
}) => {
  const { t } = useTranslation();

  if (loaded) {
    let viewOptions = { pinPositions }
    viewOptions = viewOptionsForSorting(sort, viewOptions)
    viewOptions = viewOptionsForFiltering(filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    let totalsEntry
    if (totals) {
      totalsEntry = totalizeEntries(data, allDates)
      totalsEntry.displayName = t(
        'entry.totals_title', "{{filter}} • TOTALS",
        {
          filter: t(`filter.description.${viewOptions.filter}`, viewOptions.filterDescription)
        }
      )

      totalsEntry.emoji = '🌎'
    }

    let dates
    if (weeks === 'four') {
      dates = last4weeks
    } else if (weeks === 'six') {
      dates = last6weeks
    } else if (weeks === 'eight') {
      dates = last8weeks
    } else if (weeks === 'all') {
      dates = allDates
    } else if (isMobile) {
      dates = last4weeks
    } else if (isTablet) {
      dates = last6weeks
    } else {
      dates = last6weeks
    }

    const sharedProps = { dates, allDates, pinEntry, unpinEntry, expandEntry, collapseEntry }

    return (
      <div className='TableView'>
        {totalsEntry &&
          <OneTableEntry {...sharedProps} pinEntry={undefined}
            entry={totalsEntry} index={0} pinned={true} expanded={isExpanded['totals']}
            sideBySide={!noScaling}
          />
        }

        {data.map((entry, index) => (
          <OneTableEntry key={entry.name} {...sharedProps}
            entry={entry} index={index} pinned={pinPositions[entry.name]} expanded={isExpanded[entry.name]}
            sideBySide={!noScaling}
          />
        ))}

      </div>
    )
  } else {
    return (
      <div className='TableView'>
        <div className='TableView-loading'>
          <h2><Trans i18nKey={'general.loading'}>Loading...</Trans></h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  loaded: state.csseData.loaded,
  data: state.csseData.data,
  allDates: state.csseData.allDates,
  last4weeks: state.csseData.last4weeks,
  last6weeks: state.csseData.last6weeks,
  last8weeks: state.csseData.last8weeks,
  sort: state.ui.sort,
  filter: state.ui.filter,
  noScaling: state.ui.noScaling,
  weeks: state.ui.weeks,
  totals: state.ui.totals,
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
