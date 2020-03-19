import { combineReducers } from 'redux'
import ui from './ui'
import csseData from './csseData'

const rootReducer = combineReducers({
  version: (version) => version || '20200319',
  ui,
  csseData
})

export default rootReducer
