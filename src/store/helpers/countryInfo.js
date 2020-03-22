import countryByAbbreviation from 'country-json/src/country-by-abbreviation'

export const CSSE_AGGREGATE = {
  'Cruise Ship > Diamond Princess': 'Diamond Princess',
  'US > Diamond Princess': 'Diamond Princess',
  'Australia > From Diamond Princess': 'Diamond Princess',
}

/* Rows that started under one name and now continue under another */
export const CSSE_OVERLAY = {
  'Congo (Brazzaville)': 'Republic of the Congo',
  'Gambia, The': 'The Gambia',
  'Bahamas, The': 'The Bahamas',
  'US > Puerto Rico': 'Puerto Rico',

  'Taiwan*': 'Taiwan',
  'occupied Palestinian territory': 'Palestine',
  'United Kingdom > United Kingdom': 'United Kingdom',
  'Holy See': 'Vatican City',

  'US > Grand Princess': 'Grand Princess',

  'France > France': 'France',

  'Czechia': 'Czech Republic',

  'Korea, South': 'South Korea',

  'US > Washington, D.C.': 'USA > District of Columbia',
  'US > Virgin Islands, U.S.': 'USA > Virgin Islands',
}

const US_STATES = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'D.C.',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MA': 'Massachusetts',
  'MD': 'Maryland',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
}

export function findAggregateMapping (name) {
  if (CSSE_AGGREGATE[name]) {
    return [CSSE_AGGREGATE[name]]
  } else {
    let parts

    parts = name.match(/US > (.*), (\w\w)/)
    if (parts && US_STATES[parts[2]]) {
      return ['ignore']
      // return `USA > ${US_STATES[parts[2]]}`
    }

    parts = name.match(/US > ([^,]+)$/)
    if (parts) {
      // if (parts[1] === 'New York' || parts[1] === 'New Jersey' || parts[1] === 'Connecticut') {
      //   return [`USA > ${parts[1]}`, 'USA > NY/NJ/CT TriState Area']
      // } else {
        return [`USA > ${parts[1]}`]
      // }
    }

    parts = name.match(/Mainland China > (.*)/)
    if (parts) {
      if (parts[1].indexOf('Hubei') >= 0) return 'China > Hubei (Wuhan)'
      else return ['China > Other']
    }

    parts = name.match(/^China > (.*)/)
    if (parts) {
      if (parts[1].indexOf('Hubei') >= 0) return 'China > Hubei (Wuhan)'
      else return ['China > Other']
    }
  }

  return false
}

export function findOverlayMapping (name) {
  if (CSSE_OVERLAY[name]) {
    return [CSSE_OVERLAY[name]]
  }

  return false
}
