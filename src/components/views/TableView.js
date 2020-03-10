import React from 'react'
import { connect } from 'react-redux'

import './TableView.css'
import OutbreakSparklineSVG from '../charts/OutbreakSparklineSVG'

function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function compareEntries(a, b, pinPosition) {
  if (pinPosition[b.name] &&  pinPosition[a.name]) {
    return (pinPosition[b.name] - pinPosition[a.name])
  } else if (pinPosition[a.name]) {
    return -1
  } else if (pinPosition[b.name]) {
    return 1
  } else if (b.deathsLast !== a.deathsLast) {
    return b.deathsLast - a.deathsLast
  } else if (b.deathsTotal !== a.deathsTotal) {
    return b.deathsTotal - a.deathsTotal
  } else if (b.casesTotal !== a.casesTotal) {
    return b.casesTotal - a.casesTotal
  } else {
    return b.name < a.name ? 1 : -1
  }
}

const TableView = ({
  loading, loaded, data, allDates,
  pinned, expanded, pinEntry, unpinEntry, expandEntry, collapseEntry
}) => {
  if (loaded) {
    let pinPosition = {}
    if (pinned) {
      pinned.forEach((n, i) => { pinPosition[n] = (i + 1) })
    }

    data = data.sort((a, b) => compareEntries(a, b, pinPosition))

    // data = data.filter(d => d.casesTotal > 10)

    return (
      <div className='TableView'>
        <div className='TableView-content'>
          <h3>Sorted by number of new deaths in the last day</h3>

          {data.map((entry, index) => (
            <div key={entry.name} className='TableView-row'>
              <OutbreakSparklineSVG entry={entry} allDates={allDates} />
              <div className='TableView-caption'>
                <div className='TableView-tools'>
                  {
                    pinPosition[entry.name]
                    ? <button className='activated' onClick={ () => unpinEntry(entry) }>Pinned to top</button>
                    : <button onClick={ () => pinEntry(entry) }>pin</button>
                  }
                </div>
                <b>
                  {
                    entry.link
                    ? <a href={entry.link}>{entry.name}</a>
                    : entry.name
                  }
                </b>
                &nbsp;&nbsp;&nbsp;
                {entry.emoji}
                &nbsp;&nbsp;
                {
                  entry.deathsTotal > 0
                  ? <span>
                      {numberWithCommas(entry.deathsLast)} new deaths
                      &nbsp;&nbsp;
                      <b>{numberWithCommas(entry.deathsTotal)} total</b>
                    </span>
                  : <span>
                      {numberWithCommas(entry.casesTotal)} total cases
                      &nbsp;&nbsp;
                      <b>0 deaths</b>
                    </span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='TableView'>
        <div className='Views-paddedContent'>
          <h2>Table View (Loading...)</h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.csseData.loading,
  loaded: state.csseData.loaded,
  data: state.csseData.data,
  allDates: state.csseData.allDates,
  pinned: state.ui.pinned,
  expanded: state.ui.expanded
})

const mapDispatchToProps = (dispatch) => ({
  pinEntry: (entry) => dispatch({ type: 'UI.PIN_ENTRY', value: entry.name }),
  unpinEntry: (entry) => dispatch({ type: 'UI.UNPIN_ENTRY', value: entry.name }),
  expandEntry: (entry) => dispatch({ type: 'UI.EXPAND_ENTRY', value: entry.name }),
  collapsEntry: (entry) => dispatch({ type: 'UI.COLLAPSE_ENTRY', value: entry.name })
})

const ConnectedTableView = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)

export default ConnectedTableView
