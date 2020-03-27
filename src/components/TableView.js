import React from 'react'
import { connect } from 'react-redux'
import { VariableSizeList } from 'react-window';
import { Trans, useTranslation } from 'react-i18next';

import './TableView.css'

import MarkerLegend from '../components/ui/MarkerLegend'
import Information from '../components/ui/Information'
import OneTableEntry from './entries/OneTableEntry'
import OneSummaryEntry from './entries/OneSummaryEntry'

import { viewOptionsForSorting } from '../store/sorters'
import { viewOptionsForFiltering } from '../store/filters'
import { totalizeEntries } from '../store/totalize'

export const TableViewContext = React.createContext({})

const TableView = ({
  loaded, data, allDates, last2weeks, last3weeks, last4weeks, last6weeks, last8weeks,
  search, view, sort, filter, noScaling, weeks, totals,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry,
  isMobile, isTablet, isDesktop,
  listRef, tableViewRef, listHeight
}) => {
  const { t, i18n } = useTranslation();

  if (loaded) {
    const comparisonEntry = data.find(entry => entry.code === 'it')

    let viewOptions = { pinPositions }
    viewOptions = viewOptionsForSorting(sort, viewOptions)
    viewOptions = viewOptionsForFiltering(filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    if (search) {
      let lcSearch = search.toLowerCase()
      if (lcSearch[0] === '.') {
        lcSearch = lcSearch.slice(1)
        data = data.filter(entry => {
          return (entry.code || '').toLowerCase().startsWith(lcSearch)
        })
      } else {
        data = data.filter(entry => {
          return (entry[`${i18n.language}Name`] || entry.name || entry.code || '').toLowerCase().indexOf(lcSearch) >= 0
        })
      }
    }

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
    if (weeks === 'two') {
      dates = last2weeks
    } else if (weeks === 'three') {
      dates = last3weeks
    } else if (weeks === 'four') {
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

    const actualProps = {
      data, dates, allDates,
      viewOptions, pinPositions, isExpanded, pinEntry, unpinEntry, expandEntry, collapseEntry,
      totalsEntry, comparisonEntry,
      listRef, tableViewRef, listHeight,
      isMobile, isTablet, isDesktop, view
    }
    return (
      <ActualTableView {...actualProps} />
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

const ActualTableView = ({
  data, dates, allDates,
  view, noScaling,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry,
  totalsEntry, comparisonEntry,
  listRef, tableViewRef, listHeight,
  isMobile, isTablet, isDesktop
}) => {
  const entryHeights = React.useRef({});

  const setEntryHeight = React.useCallback((code, index, size) => {
    const prev = entryHeights.current[code]
    entryHeights.current = { ...entryHeights.current, [code]: size }
    if (prev !== size) {
      listRef.current.resetAfterIndex(index)
    }
  }, [listRef])

  const getEntryHeight = React.useCallback((index) => {
    if (index === 0) {
      return view === 'classic' ? 140 : 120 // first row with ViewControls
    }
    else {
      return entryHeights.current[data[index - 1].code] || 120
    }
  }, [data, view])

  const sharedProps = { dates, allDates, pinEntry, unpinEntry, expandEntry, collapseEntry, isMobile, isTablet, isDesktop }

  const EntryView = { 'classic': OneTableEntry, 'compact': OneSummaryEntry }[view] || OneSummaryEntry

  return (
    <TableViewContext.Provider value={{ setEntryHeight }}>
      <div className='TableView' ref={tableViewRef}>
        {totalsEntry &&
          <EntryView {...sharedProps} pinEntry={undefined}
            entry={totalsEntry} index={0} pinned={true} expanded={isExpanded['totals']}
            sideBySide={!noScaling}
          />
        }

        <VariableSizeList
          height={listHeight}
          itemCount={data.length + 1}
          itemSize={getEntryHeight}
          ref={listRef}
        >
          {({ index, style }) => {
            if (index === 0) {
              return (
                <div style={{padding: '2em'}}>
                  <Information content='numbers' trigger={
                    <button>
                      <Trans i18nKey='information.what_do_these_mean'>
                        What do these numbers mean?
                      </Trans>
                    </button>
                  } />

                  { view === 'classic' && <MarkerLegend /> }
                  { view !== 'classic' &&
                    <>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className='comparedTo'>
                        {' –– '}
                        <Trans i18nKey='information.compared_to_italy'>
                          Compared to Italy
                        </Trans>
                      </span>
                    </>
                  }
                </div>
              )
            } else {
              const code = data[index - 1] && data[index - 1].code
              return (
                <div style={{...style}}>
                  <EntryView {...sharedProps}
                    entry={data[index - 1]} index={index - 1} pinned={pinPositions[code]} expanded={isExpanded[code]}
                    sideBySide={!noScaling}
                    comparisonEntry={comparisonEntry}
                  />
                </div>
              )
            }
          }}
        </VariableSizeList>

      </div>
    </TableViewContext.Provider>
  )
}

const mapStateToProps = (state, ownProps) => ({
  loaded: state.data.loaded,
  data: state.data.data,
  allDates: state.data.allDates,
  last2weeks: state.data.last2weeks,
  last3weeks: state.data.last3weeks,
  last4weeks: state.data.last4weeks,
  last6weeks: state.data.last6weeks,
  last8weeks: state.data.last8weeks,
  search: state.ui.search,
  view: state.ui.view,
  sort: state.ui.sort,
  filter: state.ui.filter,
  noScaling: state.ui.noScaling,
  weeks: state.ui.weeks,
  totals: state.ui.totals,
  pinPositions: state.ui.pinPositions,
  isExpanded: state.ui.isExpanded
})

const mapDispatchToProps = (dispatch, props) => ({
  pinEntry: (entry) => {
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.PIN_ENTRY', value: entry.code })
  },
  unpinEntry: (entry) => {
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.UNPIN_ENTRY', value: entry.code })
  },
  expandEntry: (entry) => {
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.EXPAND_ENTRY', value: entry.code })
  },
  collapseEntry: (entry) => {
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.COLLAPSE_ENTRY', value: entry.code })
  }
})

const ConnectedTableView = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)

export default ConnectedTableView
