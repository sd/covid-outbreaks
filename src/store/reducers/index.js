import { combineReducers } from 'redux'
import ui from './ui'
import data from './data'

const rootReducer = combineReducers({
  version: (version) => version || '20200326',
  ui,
  data
})

export default rootReducer
