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

function processOneFile (fieldName, rawData, allDates, processedData ) {
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
      entry[`${fieldName}Total`] = totalCountSoFar
      entry[`${fieldName}Last`] = newCount
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

const COUNTRY_ALIASES = {
  'Mainland China': 'China',
  'US': 'USA',
}

const OUTBREAK_ALIASES = {
  'USA > King County, WA': 'USA > Seattle Metro',
  'USA > Snohomish County, WA': 'USA > Seattle Metro',
  'USA > Pierce County, WA': 'USA > Seattle Metro',

  'USA > New York County, NY': 'USA > New York City Metro',
  'USA > Westchester County, NY': 'USA > New York City Metro',
  'USA > Nassau County, NY': 'USA > New York City Metro',
  'USA > Suffolk County, NY': 'USA > New York City Metro',
  'USA > Rockland County, NY': 'USA > New York City Metro',
  'USA > Bergen County, NJ': 'USA > New York City Metro',
  'USA > Hudson County, NJ': 'USA > New York City Metro',

  'USA > Los Angeles, CA': 'USA > CA > Los Angeles Metro',
  'USA > Contra Costa County, CA': 'USA > CA > Los Angeles Metro',

  'USA > Santa Clara County, CA': 'USA > CA > San Jose Metro',
  'USA > San Francisco County, CA': 'USA > CA > San Francisco Metro',

  'USA > Lee County, FL': 'USA > FL > Lee County (Fort Myers)',
  'USA > Santa Rosa County, FL': 'USA > FL > Santa Rosa County (Pensacola)',

  'USA > Placer County, CA': 'USA > CA > Placer County (Sacramento)',

  'USA > Suffolk County, MA': 'USA > Boston Metro',
  'USA > Norfolk County, MA': 'USA > Boston Metro',
  'USA > Middlesex County, MA': 'USA > Boston Metro',

  'USA > Cook County, IL': 'USA > Chicago Metro',

  'USA > Washington County, OR': 'USA > OR > Portland Metro',

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
  'China > Jiangsu': 'China > Other',
  'China > Ningxia': 'China > Other',
  'China > Shanxi': 'China > Other',
  'China > Qinghai': 'China > Other',
  'Others > Diamond Princess cruise ship': 'Diamond Princess',
  'Hong Kong > Hong Kong': 'Hong Kong',
  'Taiwan > Taiwan': 'Taiwan',
  'USA > Grand Princess Cruise Ship': 'USA > Other',
  'USA > Unassigned Location (From Diamond Princess)': 'USA > Other',
  'UK': 'United Kingdom'
}

const EXTRA_ATTRIBUTES = {
  'China': { emoji: '🇨🇳', link: 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China' },
  'China > Hubei (Wuhan)': { emoji: '🇨🇳', link: 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China' },
  'Hong Kong': { emoji: '🇭🇰', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Hong_Kong' },
  'Taiwan': { emoji: '🇹🇼', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Taiwan' },
  'USA': { emoji: '🇺🇸', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' },
  'Iran': { emoji: '🇮🇷', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iran' },
  'Italy': { emoji: '🇮🇹', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Italy' },
  'Spain': { emoji: '🇪🇸', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Spain' },
  'France': { emoji: '🇫🇷', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_France' },
  'Japan': { emoji: '🇯🇵', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Japan' },
  'South Korea': { emoji: '🇰🇷', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_South_Korea' },
  'United Kingdom': { emoji: '🇬🇧', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Kingdom' },
  'Iraq': { emoji: '🇮🇶', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iraq' },
  'Thailand': { emoji: '🇹🇭', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Thailand' },
  'Australia': { emoji: '🇦🇺', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Australia' },
  'Philippines': { emoji: '🇵🇭', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Philippines' },
  'Switzerland': { emoji: '🇨🇭', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Switzerland' },
  'Netherlands': { emoji: '🇳🇱', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Netherlands' },
  'San Marino': { emoji: '🇸🇲', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_San_Marino' },
  'Singapore': { emoji: '🇸🇬', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Singapore' },
  'Malaysia': { emoji: '🇲🇾', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Malaysia'},
  'Canada': { emoji: '🇨🇦', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Canada' },
  'Germany': { emoji: '🇩🇪', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Germany' },
  'United Arab Emirates': { emoji: '🇦🇪', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Arab_Emirates' },
  'India': { emoji: '🇮🇳', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_India' },
  'Sweden': { emoji: '🇸🇪', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Sweden' },
  'Belgium': { emoji: '🇧🇪' },
  'Lebanon': { emoji: '🇱🇧' },
  'Bahrain': { emoji: '🇧🇭' },
  'Egypt': { emoji: '🇪🇬', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Egypt' },
  'Vietnam': { emoji: '🇻🇳' },
  'Finland': { emoji: '🇫🇮' },
  'Kuwait': { emoji: '🇰🇼' },
  'Austria': { emoji: '🇦🇹' },
  'Greece': { emoji: '🇬🇷' },
  'Norway': { emoji: '🇳🇴' },
  'Iceland': { emoji: '🇮🇸' },
  'Diamond Princess': { name: 'Diamond Princess', emoji: '🛳', type: 'other', link: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_on_cruise_ships#Diamond_Princess' }
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

