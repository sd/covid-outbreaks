import React from 'react'
import { connect } from 'react-redux'

import './TableView.css'

const TableView = ({loading, loaded, data}) => {
  if (loaded) {
    return (
      <div className='TableView paddedContent'>
        <div className='TableView-content'>
          <h2>Table View</h2>

          <table className='TableView-table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Province/State</th>
                <th>Country/Region</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{row['Province/State']}</td>
                  <td>{row['Country/Region']}</td>
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
  data: state.csseDeaths.data
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)
