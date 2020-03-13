import { csv as d3CSV } from 'd3-fetch'

import { OUTBREAK_ATTRIBUTES, findAggregateMapping, findOverlayMapping } from '../../data/outbreakInfo'
import { DATA_PRELIMINARY } from '../../data/dataPreliminary'
import { DATA_OVERRIDES } from '../../data/dataOverrides'

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
      return { ...state, loading: true, error: undefined, errorMessage: '', lastDate: undefined, lastPreliminaryDate: undefined }

    case 'CSSE_DATA.LOAD.SUCCESS':
      return { ...state, loading: false, loaded: true, ...action.payload }

    case 'CSSE_DATA.LOAD.FAILURE':
      return { ...state, loading: false, loaded: false, error: action.error, errorMessage: action.errorMessage }

    default:
      return state
  }
}

/* ================================================================================================================== */

function parseRawData (rawData, overrides) {
  overrides = overrides || {}

  let dates = Object.keys(rawData[0]).filter(k => k.match(/\d+\/\d+\/\d+/))
  let rows = {}
  let sources = {}
  let name

  rawData.forEach(rawRow => {
    name = [rawRow['Country/Region'], rawRow['Province/State']].filter(x => x).join(' > ')
    rows[name] = {}

    dates.forEach(d => {
      if (overrides[name] && (overrides[name][d] || overrides[name][d] === 0)) {
        rows[name][d] = overrides[name][d]
      } else if (rawRow[d] || rawRow[d] === '0') {
        rows[name][d] = parseInt(rawRow[d], 10)
      }
    })
  })

  return { dates, rows, names: Object.keys(rows), sources }
}

function combineRows (data, combinationMethod, combinationRules) {
  let targetName
  let row
  let rows = {}
  let sources = data.sources

  data.names.forEach(name => {
    targetName = combinationRules(name)
    if (targetName) {
      row = rows[targetName] || {}
      data.dates.forEach(d => {
        if (data.rows[name][d] || data.rows[name][d] === 0) {
          row[d] = combinationMethod(row[d],data.rows[name][d])
        }
      })
      data.sources[targetName] = (data.sources[targetName] || []).concat(name)
      rows[targetName] = row
    } else {
      rows[name] = data.rows[name]
    }
  })

  return {dates: data.dates, sources, rows, names: Object.keys(rows)}
}

function prepareEntries (data, fieldName, entries) {
  entries = entries || {}

  let sources, nameParts, entry

  Object.keys(data.rows).forEach(name => {
    sources = data.sources[name]

    nameParts = name.split(' > ')

    entry = entries[name] || {
      name,
      country: nameParts[0],
      type: nameParts[1] ? 'province' : 'country',
      ...OUTBREAK_ATTRIBUTES[nameParts[0]],
      ...OUTBREAK_ATTRIBUTES[name]
    }

    entry.sources = entry.sources || {}
    entry.sources[fieldName] = sources

    entry.totals = entry.totals || {}
    entry.totals[fieldName] = {}

    entry.daily = entry.daily || {}
    entry.daily[fieldName] = {}

    entry.preliminaryDaily = entry.preliminaryDaily || {}
    entry.preliminaryDaily[fieldName] = {}

    entry.latestTotal = entry.latestTotal || {}
    entry.latestTotal[fieldName] = 0

    entry.latestPreliminaryTotal = entry.latestPreliminaryTotal || {}
    entry.latestPreliminaryTotal[fieldName] = 0

    entry.latestDaily = entry.latestDaily || {}
    entry.latestDaily[fieldName] = 0

    entry.latestPreliminaryDaily = entry.latestPreliminaryDaily || {}
    entry.latestPreliminaryDaily[fieldName] = 0

    entries[entry.name] = entry
  })

  return entries
}

function processOneFile (fieldName, rawData, entries ) {
  let data
  data = parseRawData(rawData, DATA_OVERRIDES[fieldName])
  data = combineRows(data, (a, b) => (a === undefined || b === undefined ? (a || b) : (a || 0) + (b || 0)), findAggregateMapping)
  data = combineRows(data, (a, b) => (a || b), findOverlayMapping)

  entries = prepareEntries(data, fieldName, entries)

  let dates = data.dates
  let preliminaryDates = []

  if (DATA_PRELIMINARY.total && DATA_PRELIMINARY.total[fieldName]) {
    preliminaryDates = Object.keys(DATA_PRELIMINARY.total[fieldName]).filter(d => dates.indexOf(d) < 0)
  }

  let row, entry

  data.names.forEach(name => {
    row = data.rows[name]
    entry = entries[name]

    dates.forEach(d => {
      let value = row[d]

      /* Prevent errors when data is missing */
      if (value === undefined || value === null || value < entry.latestTotal[fieldName]) {
        value = entry.latestTotal[fieldName] || 0
      }

      entry.totals[fieldName][d] = value
      entry.daily[fieldName][d] = entry.totals[fieldName][d] - entry.latestTotal[fieldName]
      entry.latestTotal[fieldName] = entry.totals[fieldName][d]
      entry.latestDaily[fieldName] = entry.daily[fieldName][d]
    })

    entry.latestPreliminaryTotal[fieldName] = entry.latestTotal[fieldName]

    preliminaryDates.forEach(d => {
      if (DATA_PRELIMINARY.total[fieldName][d] && DATA_PRELIMINARY.total[fieldName][d][entry.name]) {
        let total = DATA_PRELIMINARY.total[fieldName][d][entry.name]
        let daily = total - entry.latestTotal[fieldName]

        entry.preliminaryDaily[fieldName][d] = daily
        entry.latestPreliminaryTotal[fieldName] = entry.latestPreliminaryTotal[fieldName] + daily
        entry.latestPreliminaryDaily[fieldName] = (entry.latestPreliminaryDaily[fieldName] || 0) + daily
      } else if (DATA_PRELIMINARY.daily[fieldName][d] && DATA_PRELIMINARY.daily[fieldName][d][entry.name]) {
        let daily = DATA_PRELIMINARY.daily[fieldName][d][entry.name]

        entry.preliminaryDaily[fieldName][d] = daily
        entry.latestPreliminaryTotal[fieldName] = entry.latestPreliminaryTotal[fieldName] + daily
        entry.latestPreliminaryDaily[fieldName] = (entry.latestPreliminaryDaily[fieldName || 0]) + daily
      }
    })

    entry.latestPreliminaryDaily[fieldName] = entry.latestPreliminaryDaily[fieldName] || entry.latestDaily[fieldName]

    entries[entry.name] = entry
  })

  return { entries, names: data.names, dates: data.dates, preliminaryDates }
}

export function fetchDataDispatcher (dispatch) {
  dispatch({type: 'CSSE_DATA.LOAD.BEGIN'})
  return Promise.all([d3CSV(CASES_URL), d3CSV(DEATHS_URL)])
    .then(results => {
      let caseData = results[0]
      let deathData = results[1]

      let casesResults = processOneFile('cases', caseData, {})
      let deathsResults = processOneFile('deaths', deathData, casesResults.entries)

      let data = Object.keys(deathsResults.entries).filter(k => k !== 'ignore').map(k => deathsResults.entries[k])

      let allDates = [...deathsResults.dates, ...deathsResults.preliminaryDates]
      let lastDate = deathsResults.dates[deathsResults.dates.length - 1]
      let lastPreliminaryDate = deathsResults.preliminaryDates[deathsResults.preliminaryDates.length - 1]

      dispatch({type: 'CSSE_DATA.LOAD.SUCCESS', payload: { data, allDates, lastDate, lastPreliminaryDate }})
      return data
    })
    // .catch(error => {
    //   debugger
    //   dispatch({type: 'CSSE_DATA.LOAD.FAILURE', error})
    // })
}

export default reducer

