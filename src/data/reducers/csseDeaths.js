import { csv as d3CSV } from 'd3-fetch'

const SOURCE_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'

const initialState = {
  loaded: false,
  loading: false,
  data: {},
}

export function reducer (state = initialState, action) {
  switch(action.type) {
    case 'CSSE_DEATHS.LOAD.BEGIN':
      return { ...state, loading: true, error: undefined }

    case 'CSSE_DEATHS.LOAD.SUCCESS':
      return { ...state, loading: false, loaded: true, data: action.data }

    case 'CSSE_DEATHS.LOAD.FAILURE':
      return { ...state, loading: false, loaded: false, error: action.error }

    default:
      return state
  }
}

export function fetchDataDispatcher(dispatch) {
  dispatch({type: 'CSSE_DEATHS.LOAD.BEGIN'})
  return d3CSV(SOURCE_URL)
    .then(data => {
      dispatch({type: 'CSSE_DEATHS.LOAD.SUCCESS', data})
      return data
    })
    .catch(error => dispatch({type: 'CSSE_DEATHS.LOAD.FAILURE', error}))
}

export default reducer

