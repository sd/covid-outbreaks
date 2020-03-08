import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDataDispatcher } from '../data/reducers/csseData'

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
  loading: state.csseData.loading,
  loaded: state.csseData.loaded,
  errorMessage: state.csseData.errorMessage,
  data: state.csseData.data,
  allDates: state.csseData.allDates
})

const mapDispatchToProps = (dispatch) => ({
  loadData: () => fetchDataDispatcher(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)
