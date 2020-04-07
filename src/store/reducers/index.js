import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import ui from './ui'
import data from './data'

export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  version: (version) => version || '20200329',
  ui,
  data
})

export default createRootReducer
