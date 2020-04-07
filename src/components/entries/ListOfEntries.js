import React from 'react'
import { connect } from 'react-redux'
import { VariableSizeList } from 'react-window';
import { Trans, useTranslation } from 'react-i18next';
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import OneSummaryEntry from './OneSummaryEntry'

export const TableViewContext = React.createContext({})

const ListOfEntries = ({
  entryComponent,
  data, dates, allDates,
  ui, pinEntry, unpinEntry,
  expandEntry, collapseEntry,
  totalsEntry, comparisonEntry,
  listRef, listHeight,
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

  const EntryView = entryComponent || OneSummaryEntry

  return (
    <TableViewContext.Provider value={{ setEntryHeight }}>
      <div className='Entries'>
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
                    <Link to='/explain'>
                      <Trans i18nKey='information.what_do_these_mean'>
                        What do these numbers mean?
                      </Trans>
                    </Link>

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

const ConnectedListOfEntries = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfEntries)

export default ConnectedListOfEntries
