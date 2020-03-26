import { csv as d3CSV } from 'd3-fetch'

import { findAggregateMapping, findOverlayMapping, countryForCSSName, attributesForCountry } from '../helpers/countryInfo'
import { DATA_OVERRIDES } from '../../data/dataOverrides'
import { setupConsoleTools } from '../../utils/consoleTools'

import rawcases from '../../data/rawcases.csv'
import rawdeaths from '../../data/rawdeaths.csv'

// const CASES_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
// const DEATHS_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'

const initialState = {
  loaded: false,
  loading: false,
  data: {},
  allDates: []
}

export function reducer (state = initialState, action) {
  switch(action.type) {
    case 'CSSE_DATA.LOAD.BEGIN':
      return { ...state, loading: true, error: undefined, errorMessage: '', lastDate: undefined }

    case 'CSSE_DATA.LOAD.SUCCESS':
      return { ...state, loading: false, loaded: true, ...action.values }

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
    name = countryForCSSName([rawRow['Country/Region'], rawRow['Province/State']].filter(x => x).join(' > '))

    if (name) {
      rows[name] = {}

      dates.forEach(d => {
        if (overrides[name] && (overrides[name][d] || overrides[name][d] === 0)) {
          rows[name][d] = overrides[name][d]
        } else if (rawRow[d] || rawRow[d] === '0') {
          rows[name][d] = parseInt(rawRow[d], 10)
        }
      })
    }
  })

  return { dates, rows, codes: Object.keys(rows), sources }
}

function combineRows (data, combinationMethod, combinationRules) {
  let targetCodes
  let row
  let rows = {}
  let sources = data.sources

  data.codes.forEach(code => {
    targetCodes = combinationRules(code)
    if (targetCodes) {
      if (!targetCodes.forEach) {
        targetCodes = [targetCodes]
      }

      targetCodes.forEach(targetCode => {
        row = rows[targetCode] || {}
        data.dates.forEach(d => {
          if (data.rows[code][d] || data.rows[code][d] === 0) {
            row[d] = combinationMethod(row[d],data.rows[code][d])
          }
        })
        data.sources[targetCode] = (data.sources[targetCode] || []).concat(code)
        rows[targetCode] = row
      })
    } else {
      rows[code] = data.rows[code]
    }
  })

  return {dates: data.dates, sources, rows, codes: Object.keys(rows)}
}

function prepareEntries (data, fieldName, entries) {
  entries = entries || {}

  let sources, entry

  Object.keys(data.rows).forEach(code => {
    sources = data.sources[code]
    if (sources && sources.length < 2) sources = undefined

    entry = entries[code] || {
      code,
      ...attributesForCountry(code)
    }

    entry.sources = entry.sources || {}
    entry.sources[fieldName] = sources

    entry.keyDates = entry.keyDates || {}

    entry.totals = entry.totals || {}
    entry.totals[fieldName] = {}

    entry.daily = entry.daily || {}
    entry.daily[fieldName] = {}

    entry.percent = entry.percent || {}
    entry.percent[fieldName] = {}

    entry.velocity = entry.velocity || {}
    entry.velocity[fieldName] = {}

    entry.acceleration = entry.acceleration || {}
    entry.acceleration[fieldName] = {}

    entry.rollingAcceleration = entry.rollingAcceleration || {}
    entry.rollingAcceleration[fieldName] = {}

    entry.outbreakDay = entry.outbreakDay || {}
    entry.outbreakDay[fieldName] = {}

    entry.latestTotal = entry.latestTotal || {}
    entry.latestTotal[fieldName] = 0

    entry.latestDaily = entry.latestDaily || {}
    entry.latestDaily[fieldName] = 0

    entry.latestVelocity = entry.latestVelocity || {}
    entry.latestVelocity[fieldName] = 0

    entry.latestAcceleration = entry.latestAcceleration || {}
    entry.latestAcceleration[fieldName] = 0

    entry.latestOutbreakDay = entry.latestOutbreakDay || {}

    entries[entry.code] = entry
  })

  return entries
}

function processOneFile (fieldName, rawData, entries ) {
  let data
  data = parseRawData(rawData, DATA_OVERRIDES[fieldName])
  data = combineRows(data, (a, b) => (a === undefined || b === undefined ? (a || b) : (a || 0) + (b || 0)), findAggregateMapping)
  data = combineRows(data, (a, b) => Math.max(a || 0, b || 0), findOverlayMapping)

  entries = prepareEntries(data, fieldName, entries)

  let dates = data.dates
  let lastDate = dates.slice(-1)

  let row, entry, sum, cnt, i

  const logForVelocity = Math.log10
  const velocityOffset = 7
  const rollingCount = 3

  data.codes.forEach(code => {
    row = data.rows[code]
    entry = entries[code]

    let outbreakCounter = undefined

    dates.forEach((d, index) => {
      let value = row[d]

      /* Prevent errors when data is missing */
      if (value === undefined || value === null || value < entry.latestTotal[fieldName]) {
        value = (d === lastDate) ? (entry.latestTotal[fieldName] || 0) : undefined
      }

      if (value !== undefined) {
        entry.totals[fieldName][d] = value
        entry.daily[fieldName][d] = entry.totals[fieldName][d] - entry.latestTotal[fieldName]

        if (entry.totals[fieldName][d] > 1 && entry.totals[fieldName][dates[index - velocityOffset]] > 1) {
          entry.velocity[fieldName][d] = logForVelocity(entry.totals[fieldName][d] - entry.totals[fieldName][dates[index - velocityOffset]])
        }

        if (entry.velocity[fieldName][d] && entry.velocity[fieldName][dates[index - 1]] > 0) {
          entry.acceleration[fieldName][d] = entry.velocity[fieldName][d] - entry.velocity[fieldName][dates[index - 1]]
        }

        sum = undefined
        cnt = 0
        for (i = 0; i < rollingCount; i++) {
          if (entry.acceleration[fieldName][dates[index - i]] !== undefined) {
            sum = (sum || 0) + (entry.acceleration[fieldName][dates[index - i]])
            cnt = cnt + 1
          }
        }
        if (sum !== undefined) {
          entry.rollingAcceleration[fieldName][d] = sum / cnt
        }

        if (
          !entry.daily[fieldName][d]
          && !entry.daily[fieldName][dates[index - 1]]
          && !entry.daily[fieldName][dates[index - 2]]
          && !entry.daily[fieldName][dates[index - 3]]
        ) {
          outbreakCounter = undefined
        } else {
          outbreakCounter = (outbreakCounter || 0) + 1
        }
        entry.outbreakDay[fieldName][d] = outbreakCounter

        entry.latestTotal[fieldName] = entry.totals[fieldName][d]
        entry.latestDaily[fieldName] = entry.daily[fieldName][d]
        entry.latestVelocity[fieldName] = entry.velocity[fieldName][d]
        entry.latestAcceleration[fieldName] = entry.rollingAcceleration[fieldName][d]
        entry.latestOutbreakDay[fieldName] = entry.outbreakDay[fieldName][d]

        if (fieldName === 'deaths') {
          let parsedDate = new Date(d)
          ;[1, 5, 25, 125, 625].forEach(n => {
            if (!entry.keyDates[`death${n}`] && entry.totals.deaths[d] >= n) {
              entry.keyDates[`death${n}`] = parsedDate
            }
          })
        }
      }
    })

    entries[entry.code] = entry
  })

  return { entries, codes: data.codes, dates: data.dates }
}

export function fetchDataDispatcher (dispatch) {
  dispatch({type: 'CSSE_DATA.LOAD.BEGIN'})
  return Promise.all([d3CSV(rawcases), d3CSV(rawdeaths)])
    .then(results => {
      let caseData = results[0]
      let deathData = results[1]

      let casesResults = processOneFile('cases', caseData, {})
      let deathsResults = processOneFile('deaths', deathData, casesResults.entries)

      let data = Object.keys(deathsResults.entries).filter(k => k !== 'ignore').map(k => deathsResults.entries[k])

      let allDates = deathsResults.dates
      let lastDate = deathsResults.dates[deathsResults.dates.length - 1]

      let last2weeks = allDates.slice(-14)
      let last3weeks = allDates.slice(-21)
      let last4weeks = allDates.slice(-28)
      let last6weeks = allDates.slice(-42)
      let last8weeks = allDates.slice(-56)

      dispatch({type: 'CSSE_DATA.LOAD.SUCCESS', values: {
        data, allDates, last2weeks, last3weeks, last4weeks, last6weeks, last8weeks,
        lastDate
      }})

      setupConsoleTools(data, allDates)

      return data
    })
    // .catch(error => {
    //   debugger
    //   dispatch({type: 'CSSE_DATA.LOAD.FAILURE', error})
    // })
}

export default reducer

