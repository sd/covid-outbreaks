import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDataDispatcher } from '../data/reducers/csseDeaths'

class DataLoader extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loading, loaded, errorMessage, data, allDates } = this.props

    if (loading) {
      return <span>Loading Data...</span>
    } else if (loaded) {
      return <span>Most recent date: {allDates[allDates.length - 1]}</span>
    } else if (errorMessage) {
      return <span>Error loading data {errorMessage}</span>
    } else {
      return <span></span>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.csseDeaths.loading,
  loaded: state.csseDeaths.loaded,
  errorMessage: state.csseDeaths.errorMessage,
  data: state.csseDeaths.data,
  allDates: state.csseDeaths.allDates
})

const mapDispatchToProps = (dispatch) => ({
  loadData: () => fetchDataDispatcher(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)
