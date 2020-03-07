import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDataDispatcher } from '../data/reducers/csseDeaths'

class DataLoader extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const {loading, loaded, error, data} = this.props

    if (loading) {
      return <span>Loading Data...</span>
    } else if (loaded) {
      return <span>Data Loaded! {data.length} records</span>
    } else if (error) {
      return <span>Error loading data {error}</span>
    } else {
      return <span></span>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.csseDeaths.loading,
  loaded: state.csseDeaths.loaded,
  error: state.csseDeaths.error,
  data: state.csseDeaths.data
})

const mapDispatchToProps = (dispatch) => ({
  loadData: () => fetchDataDispatcher(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)
