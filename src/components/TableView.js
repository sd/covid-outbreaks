import React from 'react'
import { connect } from 'react-redux'
import { VariableSizeList } from 'react-window';
import { Trans, useTranslation } from 'react-i18next';

import './TableView.css'

import ViewControls from '../components/ui/ViewControls'
import OneTableEntry from './entries/OneTableEntry'

import { viewOptionsForSorting } from '../store/sorters'
import { viewOptionsForFiltering } from '../store/filters'
import { totalizeEntries } from '../store/totalize'

export const TableViewContext = React.createContext({})

const TableView = ({
  loaded, data, allDates, last4weeks, last6weeks, last8weeks,
  sort, filter, noScaling, weeks, totals,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry,
  isMobile, isTablet,
  listRef, tableViewRef, listHeight
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

    const comparisonEntry = undefined //data.find(entry => entry.code === 'it')

    const actualProps = {
      data, dates, allDates,
      viewOptions, pinPositions, isExpanded, pinEntry, unpinEntry, expandEntry, collapseEntry,
      totalsEntry, comparisonEntry,
      listRef, tableViewRef, listHeight,
      isMobile
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
  noScaling,
  pinPositions, pinEntry, unpinEntry,
  isExpanded, expandEntry, collapseEntry,
  totalsEntry, comparisonEntry,
  listRef, tableViewRef, listHeight,
  isMobile
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
      return 140 // first row with ViewControls
    }
    else {
      return entryHeights.current[data[index - 1].code] || 200
    }
  }, [data])

  const sharedProps = { dates, allDates, pinEntry, unpinEntry, expandEntry, collapseEntry }

  return (
    <TableViewContext.Provider value={{ setEntryHeight }}>
      <div className='TableView' ref={tableViewRef}>
        {totalsEntry &&
          <OneTableEntry {...sharedProps} pinEntry={undefined}
            entry={totalsEntry} index={0} pinned={true} expanded={isExpanded['totals']}
            sideBySide={!noScaling}
          />
        }

        <VariableSizeList
          height={listHeight}
          itemCount={data.length}
          itemSize={getEntryHeight}
          ref={listRef}
        >
          {({ index, style }) => {
            if (index === 0) {
              return <ViewControls isMobile={isMobile} />
            } else {
              const code = data[index - 1] && data[index - 1].code

              return (
                <div style={{...style}}>
                  <OneTableEntry {...sharedProps}
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

const mapDispatchToProps = (dispatch, props) => ({
  pinEntry: (entry) => {
    console.log('pin', props)
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.PIN_ENTRY', value: entry.code })
  },
  unpinEntry: (entry) => {
    props.listRef.current.resetAfterIndex(0)
    dispatch({ type: 'UI.UNPIN_ENTRY', value: entry.code })
  },
  expandEntry: (entry) => dispatch({ type: 'UI.EXPAND_ENTRY', value: entry.code }),
  collapseEntry: (entry) => dispatch({ type: 'UI.COLLAPSE_ENTRY', value: entry.code })
})

const ConnectedTableView = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)

export default ConnectedTableView
