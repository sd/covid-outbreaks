import { csv as d3CSV } from 'd3-fetch'

import { OUTBREAK_ALIASES, OUTBREAK_ATTRIBUTES } from '../outbreakInfo'

const CASES_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
const DEATHS_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'

const initialState = {
  loaded: false,
  loading: false,
  data: {},
  allDates: []
}

export function reducer (state = initialState, action) {
  switch(action.type) {
    case 'CSSE_DATA.LOAD.BEGIN':
      return { ...state, loading: true, error: undefined, errorMessage: '' }

    case 'CSSE_DATA.LOAD.SUCCESS':
      return { ...state, loading: false, loaded: true, data: action.data, allDates: action.allDates }

    case 'CSSE_DATA.LOAD.FAILURE':
      return { ...state, loading: false, loaded: false, error: action.error, errorMessage: action.errorMessage }

    default:
      return state
  }
}

function processOneFile (fieldName, rawData, allDates, processedData ) {
  rawData.forEach(raw => {
    let country = raw['Country/Region']
    let province = raw['Province/State']

    let originalName = [country, province].filter(x => x).join(' > ')

    let name = OUTBREAK_ALIASES[originalName] || originalName
    country = OUTBREAK_ALIASES[country] || country

    let entry = processedData[name] || {
      name,
      country,
      otherNames: [],
      type: province ? 'province' : 'country',
      lat: raw['Lat'],
      lon: raw['Long'],
      ...OUTBREAK_ATTRIBUTES[country],
      ...OUTBREAK_ATTRIBUTES[name],
    }

    if (name !== originalName) {
      entry.otherNames = [...entry.otherNames.filter(n => n !== originalName), originalName]
    }

    entry[fieldName] = entry[fieldName] || {}

    // if( name.match(/Hubei/)) debugger

    let previousCount = 0
    let newCount, totalCountSoFar
    allDates.forEach(d => {
      totalCountSoFar = parseInt(raw[d], 10)
      newCount = totalCountSoFar - previousCount
      previousCount = totalCountSoFar

      if (DATA_OVERRIDES[originalName] && DATA_OVERRIDES[originalName][d] && DATA_OVERRIDES[originalName][d][fieldName] !== undefined) {
        newCount = DATA_OVERRIDES[originalName][d][fieldName]
      }

      entry[fieldName][d] = (entry[fieldName][d] || 0) + newCount
    })
    entry[`${fieldName}Total`] = (entry[`${fieldName}Total`] || 0) + totalCountSoFar
    entry[`${fieldName}Latest`] = (entry[`${fieldName}Latest`] || 0) + newCount

    processedData[entry.name] = entry
  })

  return processedData
}

export function fetchDataDispatcher (dispatch) {
  dispatch({type: 'CSSE_DATA.LOAD.BEGIN'})
  return Promise.all([d3CSV(CASES_URL), d3CSV(DEATHS_URL)])
    .then(results => {
      let caseData = results[0]
      let deathData = results[1]

      const allDates =  Object.keys(caseData[0]).filter(k => k.match(/\d+\/\d+\/\d+/))

      let processedData = {}

      processedData = processOneFile('cases', caseData, allDates, processedData)
      processedData = processOneFile('deaths', deathData, allDates, processedData)

      let sortedData = Object.keys(processedData).map(k => processedData[k])
      sortedData = sortedData.sort((a, b) => {
        if (b.deathsTotal !== a.deathsTotal) {
          return (b.deathsTotal - a.deathsTotal)
        } else if (b.casesTotal !== a.casesTotal) {
          return (b.casesTotal - a.casesTotal)
        } else {
          return b.name < a.name ? 1 : -1
        }
      })

      dispatch({type: 'CSSE_DATA.LOAD.SUCCESS', data: sortedData, allDates})
      return sortedData
    })
    // .catch(error => {
    //   debugger
    //   dispatch({type: 'CSSE_DATA.LOAD.FAILURE', error})
    // })
}

const DATA_OVERRIDES = {
  'Mainland China > Hubei': {
    '1/29/20': { deaths: 37 / 2 },
    '1/30/20': { deaths: 37 / 2 },
    '2/12/20': { deaths: 242 / 2 },
    '2/13/20': { deaths: 242 / 2 },
    '2/21/20': { deaths: 202 / 2 },
    '2/22/20': { deaths: 202 / 2 },
    '2/23/20': { deaths: 149 / 2 },
    '2/24/20': { deaths: 149 / 2 }
  }
}
export default reducer

