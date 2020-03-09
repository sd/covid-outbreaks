import React from 'react'
import { connect } from 'react-redux'
import withSizes from 'react-sizes'

import './TableView.css'
import OutbreakSparklineSVG from '../charts/OutbreakSparklineSVG'

function numberWithCommas (x) {
  return x
}

const TableView = ({loading, loaded, data, allDates, windowWidth}) => {
  if (loaded) {
    data = data.sort((a, b) => {
      if (b.deathsLast !== a.deathsLast) {
        return (b.deathsLast - a.deathsLast)
      } else if (b.deathsTotal !== a.deathsTotal) {
        return (b.deathsTotal - a.deathsTotal)
      } else if (b.casesTotal !== a.casesTotal) {
        return (b.casesTotal - a.casesTotal)
      } else {
        return b.name < a.name ? 1 : -1
      }
    })

    // data = data.filter(d => d.casesTotal > 10)

    return (
      <div className='TableView'>
        <div className='TableView-content'>
          <h3>Sorted by number of new deaths in the last day</h3>

          {data.map((entry, index) => (
            <div key={index} className='TableView-row'>
              <OutbreakSparklineSVG entry={entry} allDates={allDates} />
              <div className='TableView-caption'>
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
  allDates: state.csseData.allDates
})

const mapDispatchToProps = (dispatch) => ({
})

const ConnectedTableView = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)

const ConnectedWithSizesTableView = withSizes(
  ({ width }) => ({ windowWidth: width })
)(ConnectedTableView)

export default ConnectedWithSizesTableView
