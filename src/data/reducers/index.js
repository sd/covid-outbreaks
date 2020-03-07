import { combineReducers } from 'redux'
import ui from './ui'
import csseDeaths from './csseDeaths'

const rootReducer = combineReducers({
  ui,
  csseDeaths
})

export default rootReducer
