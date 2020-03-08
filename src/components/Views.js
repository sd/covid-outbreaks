import React, { Component } from 'react'
import { connect } from 'react-redux'

import MapView from './views/MapView'
import TableView from './views/TableView'
import './Views.css'

const viewComponents = {
  map: MapView,
  table: TableView,
  default: TableView
}

class Views extends Component {

  render() {
    const { view } = this.props

    let SelectedView = viewComponents[view] || viewComponents.default

    return (
      <div className='Views'>
        <div className='Views-selectors'>
          {/* <a href='#view=map' onClick={showMapView}>
            Map
          </a>
          <a href='#view=table' onClick={showTableView}>
            Table
          </a> */}
        </div>
        <div className='Views-content'>
          <SelectedView />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  view: state.ui.view,
})

const mapDispatchToProps = (dispatch) => ({
  showMapView: () => dispatch({ type: 'UI.SET_VIEW', value: 'map'}),
  showTableView: () => dispatch({ type: 'UI.SET_VIEW', value: 'table'})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Views)
