import React from 'react'
import { connect } from 'react-redux'

import './TableView.css'
import OutbreakSparkline from '../charts/OutbreakSparkline'

const TableView = ({loading, loaded, data, allDates}) => {
  if (loaded) {
    return (
      <div className='TableView'>
        <div className='TableView-content'>
          {/* <h2>Table View</h2> */}

          <table className='TableView-table'>
            <thead>
              <tr>
                <th>Deaths per day</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.filter(d => d.totalDeaths > 1).map((entry, index) => (
                <tr key={index}>
                  <td><OutbreakSparkline dataPoints={entry.deaths} allDates={allDates} /></td>
                  <td valign='bottom'>{entry.totalDeaths}</td>
                  <td valign='bottom'>{entry.emoji} {entry.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)
