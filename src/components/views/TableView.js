import React from 'react'
import { connect } from 'react-redux'
import withSizes from 'react-sizes'

import './TableView.css'
import OutbreakSparklineSVG from '../charts/OutbreakSparklineSVG'

const TableView = ({loading, loaded, data, allDates, windowWidth}) => {
  if (loaded) {
    return (
      <div className='TableView'>
        <div className='TableView-content'>

          {data.filter(d => d.totalDeaths > 0).map((entry, index) => (
            <div key={index} className='TableView-row'>
              <OutbreakSparklineSVG dataPoints={entry.deaths} allDates={allDates} />
              <div className='TableView-caption'>
                {entry.name}&nbsp;&nbsp;&nbsp;{entry.emoji}&nbsp;&nbsp;{entry.totalDeaths}
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
  loading: state.csseDeaths.loading,
  loaded: state.csseDeaths.loaded,
  data: state.csseDeaths.data,
  allDates: state.csseDeaths.allDates
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
