import React from 'react'
import { connect } from 'react-redux'
import { VariableSizeList } from 'react-window';
import { Trans, useTranslation } from 'react-i18next';
import classNames from 'classnames'

import './TableView.css'

import MarkerLegend from '../components/ui/MarkerLegend'
import Information from '../components/ui/Information'
// import OneTableEntry from './entries/OneTableEntry'
import OneSummaryEntry from './entries/OneSummaryEntry'

import { viewOptionsForSorting } from '../store/sorters'
import { viewOptionsForFiltering, filterBySearch } from '../store/filters'
// import { totalizeEntries } from '../store/totalize'

export const TableViewContext = React.createContext({})

const TableView = ({
  loaded, data, allDates, last2weeks, last3weeks, last4weeks, last6weeks, last8weeks,

  ui,
  pinEntry, unpinEntry,
  expandEntry, collapseEntry,
  isMobile, isTablet, isDesktop,
  listRef, tableViewRef, listHeight
}) => {
  const { i18n } = useTranslation();

  if (loaded) {
    const comparisonEntry = data.find(entry => entry.code === (ui.compareTo || 'it'))

    let viewOptions = { pinPositions: ui.pinPositions }
    viewOptions = viewOptionsForSorting(ui.sort, viewOptions)
    viewOptions = viewOptionsForFiltering(ui.filter, viewOptions)

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions ))
    data = data.filter((a) => viewOptions.filterer(a, viewOptions ))

    if (ui.search) {
      let lcSearch = ui.search.toLowerCase()
      if (lcSearch[0] === '.' || lcSearch[0] === '=') {
        lcSearch = lcSearch.slice(1)
        data = data.filter(entry => filterBySearch(entry, { codes: lcSearch.split(','), language: i18n.language } ))
      } else {
        data = data.filter(entry => filterBySearch(entry, { names: lcSearch.split(','), language: i18n.language }))
      }
    }

    let totalsEntry
    // if (ui.totals) {
    //   totalsEntry = totalizeEntries(data, allDates)

    //   totalsEntry.displayName = t(
    //     'entry.totals_title', "{{filter}} • TOTALS",
    //     {
    //       filter: t(`filter.description.${viewOptions.filter}`, viewOptions.filterDescription)
    //     }
    //   )

    //   totalsEntry.emoji = '🌎'
    // }

    let dates
    // if (ui.weeks === 'two') {
    //   dates = last2weeks
    // } else if (ui.weeks === 'three') {
    //   dates = last3weeks
    // } else if (ui.weeks === 'four') {
    //   dates = last4weeks
    // } else if (ui.weeks === 'six') {
    //   dates = last6weeks
    // } else if (ui.weeks === 'eight') {
    //   dates = last8weeks
    // } else if (ui.weeks === 'all') {
      dates = allDates
    // } else if (isMobile) {
    //   dates = last4weeks
    // } else if (isTablet) {
    //   dates = last6weeks
    // } else {
    //   dates = last6weeks
    // }

    const actualProps = {
      data, dates, allDates,
      viewOptions, ui, pinEntry, unpinEntry, expandEntry, collapseEntry,
      totalsEntry, comparisonEntry,
      listRef, tableViewRef, listHeight,
      isMobile, isTablet, isDesktop
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
  ui, pinEntry, unpinEntry,
  expandEntry, collapseEntry,
  totalsEntry, comparisonEntry,
  listRef, tableViewRef, listHeight,
  isMobile, isTablet, isDesktop
}) => {
  const { i18n } = useTranslation();
  const entryHeights = React.useRef({});

  const setEntryHeight = React.useCallback((index, size) => {
    const prev = entryHeights.current[index]
    entryHeights.current = { ...entryHeights.current, [index]: size }
    if (prev !== size) {
      listRef.current.resetAfterIndex(index)
    }
  }, [listRef])

  const getEntryHeight = React.useCallback((index) => {
    return entryHeights.current[index] || 100
  }, [])

  const sharedProps = { dates, allDates, pinEntry, unpinEntry, expandEntry, collapseEntry, isMobile, isTablet, isDesktop }

  const EntryView = {
    // 'classic': OneTableEntry,
    'compact': OneSummaryEntry
  }[ui.view] || OneSummaryEntry

  return (
    <TableViewContext.Provider value={{ setEntryHeight }}>
      <div className='TableView' ref={tableViewRef}>
        {totalsEntry &&
          <EntryView {...sharedProps} pinEntry={undefined}
            entry={totalsEntry} index={0} pinned={true} expanded={ui.isExpanded['totals']}
            sideBySide={!ui.noScaling}
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
                <VariableSizeRow style={style} index={index} itemCount={data.length + 1}>
                  <div className='legend'>
                    <Information content='numbers' trigger={
                      <button>
                        <Trans i18nKey='information.what_do_these_mean'>
                          What do these numbers mean?
                        </Trans>
                      </button>
                    } />

                    { ui.view === 'classic' && <MarkerLegend /> }
                    { ui.view !== 'classic' &&
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
                      </div>
                    }
                  </div>
                </VariableSizeRow>
              )
            } else {
              const code = data[index - 1] && data[index - 1].code
              return (
                <VariableSizeRow style={style} index={index} itemCount={data.length + 1}>
                  <EntryView {...sharedProps}
                    entry={data[index - 1]} pinned={ui.pinPositions[code]} expanded={ui.isExpanded[code]}
                    ui={ui}
                    comparisonEntry={comparisonEntry}
                  />
                </VariableSizeRow>
              )
            }
          }}
        </VariableSizeList>

      </div>
    </TableViewContext.Provider>
  )
}

const VariableSizeRow = ({children, index, itemCount, style}) => {
  const { setEntryHeight } = React.useContext(TableViewContext)
  const entryRef = React.useRef()
  React.useEffect(() => {
    setEntryHeight(index, entryRef.current.getBoundingClientRect().height)
  })

  return (
    <div style={{...style}} className={classNames('VariableSizeRow', {first: index === 0, last: index === itemCount - 1})}>
      <div ref={entryRef} className='VariableSizeRow-inner'>
        {children}
      </div>
    </div>
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
  ui: state.ui
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
