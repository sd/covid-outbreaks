import { combineReducers } from 'redux'
import ui from './ui'
import csseData from './csseData'

const rootReducer = combineReducers({
  ui,
  csseData
})

export default rootReducer