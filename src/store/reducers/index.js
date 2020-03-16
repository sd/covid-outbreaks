import { combineReducers } from 'redux'
import ui from './ui'
import csseData from './csseData'

const rootReducer = combineReducers({
  version: () => '20200316',
  ui,
  csseData
})

export default rootReducer
