import { csv as d3CSV } from 'd3-fetch'

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

function processOneFile (fieldName, totalFieldName, rawData, allDates, processedData ) {
  rawData.forEach(raw => {
    let country = raw['Country/Region']
    let province = raw['Province/State']

    let originalName = [country, province].filter(x => x).join(' > ')

    country = COUNTRY_ALIASES[country] || country
    let name = [country, province].filter(x => x).join(' > ')

    name = OUTBREAK_ALIASES[name] || name
    name = (EXTRA_ATTRIBUTES[name] && EXTRA_ATTRIBUTES[name].name) || name

    let entry = processedData[name] || {
      name,
      type: province ? 'province' : 'country',
      lat: raw['Lat'],
      lon: raw['Long'],
      ...EXTRA_ATTRIBUTES[country],
      ...EXTRA_ATTRIBUTES[name],
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
      entry[totalFieldName] = (entry[totalFieldName] || 0) + newCount
    })

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

      processedData = processOneFile('cases', 'totalCases', caseData, allDates, processedData)
      processedData = processOneFile('deaths', 'totalDeaths', deathData, allDates, processedData)

      let sortedData = Object.keys(processedData).map(k => processedData[k])
      sortedData = sortedData.sort((a, b) => (b.totalDeaths - a.totalDeaths))

      dispatch({type: 'CSSE_DATA.LOAD.SUCCESS', data: sortedData, allDates})
      return sortedData
    })
    .catch(error => {
      dispatch({type: 'CSSE_DATA.LOAD.FAILURE', error})
    })
}

const COUNTRY_ALIASES = {
  'Mainland China': 'China',
  'US': 'USA',
}

const OUTBREAK_ALIASES = {
  'USA > King County, WA': 'USA > WA > Seattle Metro',
  'USA > Snohomish County, WA': 'USA > WA > Seattle Metro',
  'China > Hubei': 'China > Hubei (Wuhan)',
  'China > Henan': 'China > Other',
  'China > Beijing': 'China > Other',
  'China > Guangdong': 'China > Other',
  'China > Heilongjiang': 'China > Other',
  'China > Anhui': 'China > Other',
  'China > Chongqing': 'China > Other',
  'China > Hainan': 'China > Other',
  'China > Hebei': 'China > Other',
  'China > Shandong': 'China > Other',
  'China > Hunan': 'China > Other',
  'China > Shanghai': 'China > Other',
  'China > Sichuan': 'China > Other',
  'China > Tianjin': 'China > Other',
  'China > Xinjiang': 'China > Other',
  'China > Gansu': 'China > Other',
  'China > Guangxi': 'China > Other',
  'China > Guizhou': 'China > Other',
  'China > Yunnan': 'China > Other',
  'China > Fujian': 'China > Other',
  'China > Inner Mongolia': 'China > Other',
  'China > Jiangxi': 'China > Other',
  'China > Jilin': 'China > Other',
  'China > Liaoning': 'China > Other',
  'China > Shaanxi': 'China > Other',
  'China > Zhejiang': 'China > Other',
  'China > Zhejiang': 'China > Other',
  'Others > Diamond Princess cruise ship': 'Diamond Princess',
  'Hong Kong > Hong Kong': 'Hong Kong',
  'Taiwan > Taiwan': 'Taiwan',
  'USA > Grand Princess Cruise Ship': 'USA > Other'
}

const EXTRA_ATTRIBUTES = {
  'China': { emoji: '🇨🇳'},
  'China > Hubei': { name: 'China > Hubei (Wuhan)', emoji: '🇨🇳'},
  'Hong Kong': { name: 'Hong Kong', emoji: '🇭🇰'},
  'Taiwan': { name: 'Taiwan', emoji: '🇹🇼'},
  'USA': { emoji: '🇺🇸' },
  'Iran': { emoji: '🇮🇷' },
  'Italy': { emoji: '🇮🇹' },
  'Spain': { emoji: '🇪🇸' },
  'France': { emoji: '🇫🇷' },
  'Japan': { emoji: '🇯🇵' },
  'South Korea': { emoji: '🇰🇷' },
  'Iraq': { emoji: '🇮🇶' },
  'Thailand': { emoji: '🇹🇭' },
  'Australia': { emoji: '🇦🇺' },
  'Philippines': { emoji: '🇵🇭' },
  'Switzerland': { emoji: '🇨🇭' },
  'Netherlands': { emoji: '🇳🇱' },
  'San Marino': { emoji: '🇸🇲' },
  'Singapore': { emoji: '🇸🇬' },
  'Malaysia': { emoji: '🇲🇾'},
  'Canada': { emoji: '🇨🇦' },
  'Germany': { emoji: '🇩🇪' },
  'United Arab Emirates': { emoji: '🇦🇪' },
  'India': { emoji: '🇮🇳' },
  'Sweden': { emoji: '🇸🇪' },
  'Belgium': { emoji: '🇧🇪' },
  'Lebanon': { emoji: '🇱🇧' },
  'Bahrain': { emoji: '🇧🇭' },
  'UK': { name: 'United Kingdom', emoji: '🇬🇧' },
  'Diamond Princess': { name: 'Diamond Princess', emoji: '🛳', type: 'other' }
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

