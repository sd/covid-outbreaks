import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next'

import { fetchDataDispatcher } from '../store/reducers/data'

import { formatDateMonthDD } from '../utils/dateFormats'

class DataLoader extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { loading, loaded, errorMessage, lastDate, i18n } = this.props

    if (loading) {
      if (lastDate) {
        return (
          <div className='DataLoader'>
            <Trans i18nKey="view_description.as_of_date">Up to {{date: formatDateMonthDD(lastDate, i18n)}}</Trans>
          </div>
        )
      } else {
        return (
          <div className='DataLoader'>
            <Trans i18nKey="view_description.loading">(refreshing data…)</Trans>
          </div>
        )
      }
    } if (loaded) {
      return (
        <div className='DataLoader'>
          <Trans i18nKey="view_description.as_of_date">Up to {{date: formatDateMonthDD(lastDate, i18n)}}</Trans>
        </div>
      )
    } else if (errorMessage) {
      return <div className='DataLoader error'>{errorMessage}</div>
    } else if (loading) {
      return (
        <div className='DataLoader'>
          <Trans i18nKey="view_description.loading">(refreshing data…)</Trans>
        </div>
      )
    } else {
      return <span>…</span>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.data.loading,
  loaded: state.data.loaded,
  errorMessage: state.data.errorMessage,
  lastDate: state.data.lastDate
})

const mapDispatchToProps = (dispatch) => ({
  loadData: () => fetchDataDispatcher(dispatch),
})

export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader))
