import { combineReducers } from 'redux'
import ui from './ui'
import csseData from './csseData'

const rootReducer = combineReducers({
  version: (version) => version || '20200317.3',
  ui,
  csseData
})

export default rootReducer
