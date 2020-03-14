import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDataDispatcher } from '../store/reducers/csseData'

import { formatDateMonthDD } from '../utils/dateFormats'

class DataLoader extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loading, loaded, errorMessage, lastDate } = this.props

    if (loading) {
      if (lastDate) {
        return <span> as of {formatDateMonthDD(lastDate)}…</span>
      } else {
        return <span> (loading data…)</span>
      }
    } if (loaded) {
      return <span> as of {formatDateMonthDD(lastDate)}</span>
    } else if (errorMessage) {
      return <div>{errorMessage}</div>
    } else if (loading) {
      return <span> (loading data…)</span>
    } else {
      return <span> …</span>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.csseData.loading,
  loaded: state.csseData.loaded,
  errorMessage: state.csseData.errorMessage,
  lastDate: state.csseData.lastDate,
  lastPreliminaryDate: state.csseData.lastPreliminaryDate
})

const mapDispatchToProps = (dispatch) => ({
  loadData: () => fetchDataDispatcher(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)
