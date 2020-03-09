import React from 'react'
import { connect } from 'react-redux'
import withSizes from 'react-sizes'

import './TableView.css'
import OutbreakSparklineSVG from '../charts/OutbreakSparklineSVG'

function numberWithCommas (x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const TableView = ({loading, loaded, data, allDates, windowWidth}) => {
  if (loaded) {
    return (
      <div className='TableView'>
        <div className='TableView-content'>

          {data.filter(d => d.totalCases > 20).map((entry, index) => (
            <div key={index} className='TableView-row'>
              <OutbreakSparklineSVG entry={entry} allDates={allDates} />
              <div className='TableView-caption'>
                {entry.name}
                &nbsp;&nbsp;&nbsp;
                {entry.emoji}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {numberWithCommas(entry.deaths[allDates[allDates.length - 1]])} new deaths
                &nbsp;&nbsp;
                <b>{numberWithCommas(entry.totalDeaths)} total</b>
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
