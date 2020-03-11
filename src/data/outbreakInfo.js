export function findAggregateMapping (name) {
  if (OUTBREAK_DATA_AGGREGATES[name]) {
    return OUTBREAK_DATA_AGGREGATES[name]
  } else {
    let parts

    parts = name.match(/US > (.*), (\w\w)/)
    if (parts && US_STATES[parts[2]]) {
      return `USA > ${US_STATES[parts[2]]}`
    }
  }

  return false
}

export function findOverlayMapping (name) {
  if (OUTBREAK_DATA_OVERLAYS[name]) {
    return OUTBREAK_DATA_OVERLAYS[name]
  } else {
    let parts

    parts = name.match(/US > ([^,]+)$/)
    if (parts) {
      return `USA > ${parts[1]}`
    }
  }

  return false
}

const US_STATES = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DC': 'D.C.',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'LA': 'Louisiana',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'ME': 'Maine',
  'MA': 'Massachusetts',
  'MD': 'Maryland',
  'MN': 'Minnesota',
  'MO': 'Missouri',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
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
  'WI': 'Wisconsin',
}

export const OUTBREAK_DATA_AGGREGATES = {

  'Hong Kong > Hong Kong': 'China > Other',
  'Hong Kong SAR > Hong Kong': 'China > Other',
  'Taiwan > Taiwan': 'Taiwan',
  'Taipei and environs > Taiwan': 'Taiwan',
  'Macau > Macau': 'China > Other',
  'Macao SAR > Macau': 'China > Other',
  'occupied Palestinian territory': 'Palestine',
  'UK': 'United Kingdom',
  'Russian Federation': 'Russia',
  'Republic of Moldova': 'Moldova',
  'Holy See': 'Vatican City',

  'Others > Diamond Princess cruise ship': 'Diamond Princess (out of Japan)',
  'US > Diamond Princess': 'Diamond Princess (out of Japan)',
  'US > Grand Princess': 'Grand Princess (out of US)',

  // 'US > Pinal County, AZ': 'USA > Arizona',
  // 'US > Maricopa County, AZ': 'USA > Arizona',

  // 'US > Los Angeles, CA': 'USA > California',
  // 'US > Contra Costa County, CA': 'USA > California',
  // 'US > Orange County, CA': 'USA > California',
  // 'US > Riverside, CA': 'USA > California',
  // 'US > San Mateo, CA': 'USA > California',
  // 'US > San Diego County, CA': 'USA > California',
  // 'US > Santa Clara County, CA': 'USA > California',
  // 'US > San Francisco County, CA': 'USA > California',
  // 'US > Sonoma County, CA': 'USA > California',
  // 'US > Alameda County, CA': 'USA > California',
  // 'US > Placer County, CA': 'USA > California',
  // 'US > Sacramento County, CA': 'USA > California',
  // 'US > Fresno County, CA': 'USA > California',
  // 'US > Madera County, CA': 'USA > California',
  // 'US > Riverside County, CA': 'USA > California',
  // 'US > Solano, CA': 'USA > California',

  // 'US > Denver County, CO': 'USA > Colorado',
  // 'US > Douglas County, CO': 'USA > Colorado',
  // 'US > Arapahoe, CO': 'USA > Colorado',
  // 'US > Eagle, CO': 'USA > Colorado',
  // 'US > Larimer, CO': 'USA > Colorado',

  // 'US > Fairfield County, CT': 'USA > Connecticut',

  // 'US > Washington, D.C.': 'USA > D.C.',

  // 'US > Lee County, FL': 'USA > Florida',
  // 'US > Santa Rosa County, FL': 'USA > Florida',
  // 'US > Broward County, FL': 'USA > Florida',
  // 'US > Manatee County, FL': 'USA > Florida',
  // 'US > Hillsborough, FL': 'USA > Florida',

  // 'US > Cobb County, GA': 'USA > Georgia',
  // 'US > Fulton County, GA': 'USA > Georgia',
  // 'US > Cherokee County, GA': 'USA > Georgia',
  // 'US > Dekalb, GA': 'USA > Georgia',

  // 'US > Honolulu County, HI': 'USA > Hawaii',

  // 'US > Cook County, IL': 'USA > Illinois',

  // 'US > Johnson County, IA': 'USA > Iowa',

  // 'US > Kendricks County, IN': 'USA > Indiana',

  // 'US > Fayette County, KY': 'USA > Kentucky',

  // 'US > Montgomery County, MD': 'USA > Maryland',
  // 'US > Harford County, MD': 'USA > Maryland',
  // 'US > Prince George, MD': 'USA > Maryland',

  // 'US > Suffolk County, MA': 'USA > Massachusetts',
  // 'US >  Norfolk County, MA': 'USA > Massachusetts',
  // 'US > Norfolk County, MA': 'USA > Massachusetts',
  // 'US > Middlesex County, MA': 'USA > Massachusetts',
  // 'US > Berkshire County, MA': 'USA > Massachusetts',

  // 'US > Clark County, NV': 'USA > Nevada',
  // 'US > Washoe County, NV': 'USA > Nevada',

  // 'US > Douglas County, NE': 'USA > Nebraska',

  // 'US > Grafton County, NH': 'USA > New Hampshire',

  // 'US > Bergen County, NJ': 'USA > New Jersey',
  // 'US > Hudson County, NJ': 'USA > New Jersey',
  // 'US > Burlington, NJ': 'USA > New Jersey',
  // 'US > Monmouth, NJ': 'USA > New Jersey',

  // 'US > New York County, NY': 'USA > New York',
  // 'US > Westchester County, NY': 'USA > New York',
  // 'US > Wetchester County, NY': 'USA > New York',
  // 'US > Nassau County, NY': 'USA > New York',
  // 'US > Suffolk County, NY': 'USA > New York',
  // 'US > Rockland County, NY': 'USA > New York',

  // 'US > Camden County, NC': 'USA > North Carolina',
  // 'US > Wake County, NC': 'USA > North Carolina',

  // 'US > Cuyahoga County, OH': 'USA > Ohio',
  // 'US > Cuyahoga, OH': 'USA > Ohio',

  // 'US > Washington County, OR': 'USA > Oregon',
  // 'US > Jackson County, OR': 'USA > Oregon',

  // 'US > Montgomery County, PA': 'USA > Pennsilvania',

  // 'US > providence County, RI': 'USA > Rhode Island',

  // 'US > Camden County, SC': 'USA > South Carolina',

  // 'US > Harris County, TX': 'USA > Texas',
  // 'US > Fort Bend County, TX': 'USA > Texas',
  // 'US > Collin County, TX': 'USA > Texas',

  // 'US > Fairfax County, VA': 'USA > Virginia',

  // 'US > King County, WA': 'USA > Washington',
  // 'US > Snohomish County, WA': 'USA > Washington',
  // 'US > Pierce County, WA': 'USA > Washington',
  // 'US > Grant County, WA': 'USA > Washington',

  // 'US > Dane, WI': 'USA > Wisconsin',

  'Mainland China > Hubei': 'China > Hubei (Wuhan)',
  'Mainland China > Henan': 'China > Other',
  'Mainland China > Beijing': 'China > Other',
  'Mainland China > Guangdong': 'China > Other',
  'Mainland China > Heilongjiang': 'China > Other',
  'Mainland China > Anhui': 'China > Other',
  'Mainland China > Chongqing': 'China > Other',
  'Mainland China > Hainan': 'China > Other',
  'Mainland China > Hebei': 'China > Other',
  'Mainland China > Shandong': 'China > Other',
  'Mainland China > Hunan': 'China > Other',
  'Mainland China > Shanghai': 'China > Other',
  'Mainland China > Sichuan': 'China > Other',
  'Mainland China > Tianjin': 'China > Other',
  'Mainland China > Xinjiang': 'China > Other',
  'Mainland China > Gansu': 'China > Other',
  'Mainland China > Guangxi': 'China > Other',
  'Mainland China > Guizhou': 'China > Other',
  'Mainland China > Yunnan': 'China > Other',
  'Mainland China > Fujian': 'China > Other',
  'Mainland China > Inner Mongolia': 'China > Other',
  'Mainland China > Jiangxi': 'China > Other',
  'Mainland China > Jilin': 'China > Other',
  'Mainland China > Liaoning': 'China > Other',
  'Mainland China > Shaanxi': 'China > Other',
  'Mainland China > Zhejiang': 'China > Other',
  'Mainland China > Jiangsu': 'China > Other',
  'Mainland China > Ningxia': 'China > Other',
  'Mainland China > Shanxi': 'China > Other',
  'Mainland China > Qinghai': 'China > Other',
}

export const OUTBREAK_DATA_OVERLAYS = {
  'US > Washington, D.C.': 'USA > D.C.',

  // 'US > Alabama': 'USA > Alabama',
  // 'US > Alaska': 'USA > Alaska',
  // 'US > Arizona': 'USA > Arizona',
  // 'US > California': 'USA > California',
  // 'US > Colorado': 'USA > Colorado',
  // 'US > Connecticut': 'USA > Connecticut',
  // 'US > D.C.': 'USA > D.C.',
  // 'US > District of Columbia': 'USA > D.C.',
  // 'US > Florida': 'USA > Florida',
  // 'US > Georgia': 'USA > Georgia',
  // 'US > Hawaii': 'USA > Hawaii',
  // 'US > Illinois': 'USA > Illinois',
  // 'US > Indiana': 'USA > Indiana',
  // 'US > Iowa': 'USA > Iowa',
  // 'US > Kentucky': 'USA > Kentucky',
  // 'US > Maine': 'USA > Maine',
  // 'US > Massachusetts': 'USA > Massachusetts',
  // 'US > Maryland': 'USA > Maryland',
  // 'US > Minnesota': 'USA > Minnesota',
  // 'US > Nebraska': 'USA > Nebraska',
  // 'US > Nevada': 'USA > Nevada',
  // 'US > New Hampshire': 'USA > New Hampshire',
  // 'US > New Jersey': 'USA > New Jersey',
  // 'US > New York': 'USA > New York',
  // 'US > North Carolina': 'USA > North Carolina',
  // 'US > North Dakota': 'USA > North Dakota',
  // 'US > Ohio': 'USA > Ohio',
  // 'US > Oklahoma': 'USA > Oklahoma',
  // 'US > Oregon': 'USA > Oregon',
  // 'US > Pennsylvania': 'USA > Pennsylvania',
  // 'US > Rhode Island': 'USA > Rhode Island',
  // 'US > South Carolina': 'USA > South Carolina',
  // 'US > South Dakota': 'USA > South Dakota',
  // 'US > Tennessee': 'USA > Tennessee',
  // 'US > Texas': 'USA > Texas',
  // 'US > Utah': 'USA > Utah',
  // 'US > Vermont': 'USA > Vermont',
  // 'US > Virginia': 'USA > Virginia',
  // 'US > Washington': 'USA > Washington',
  // 'US > Wisconsin': 'USA > Wisconsin',

  'Iran (Islamic Republic of)': 'Iran',
  'Republic of Korea': 'South Korea',
}

export const OUTBREAK_ATTRIBUTES = {
  'China': { emoji: '🇨🇳', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China' },
  'China > Hubei (Wuhan)': { emoji: '🇨🇳', wikipedia: 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China' },
  'Hong Kong': { emoji: '🇭🇰', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Hong_Kong' },
  'Taiwan': { emoji: '🇹🇼', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Taiwan' },
  'Japan': { emoji: '🇯🇵', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Japan' },
  'South Korea': { emoji: '🇰🇷', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_South_Korea' },
  'Thailand': { emoji: '🇹🇭', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Thailand' },
  'Singapore': { emoji: '🇸🇬', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Singapore' },
  'Malaysia': { emoji: '🇲🇾', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Malaysia'},
  'Vietnam': { emoji: '🇻🇳', region: 'asia' },
  'Indonesia': { emoji: '🇮🇩', region: 'asia' },
  'Macau': { emoji: '🇲🇴', region: 'asia' },
  'Cambodia': { emoji: '🇰🇭', region: 'asia' },
  'Laos': { emoji: '🇱🇦', region: 'asia' },
  'Bhutan': { emoji: '🇧🇹', region: 'asia' },
  'Brunei': { emoji: '🇧🇳', region: 'asia' },
  'Nepal': { emoji: '🇳🇵', region: 'asia' },
  'India': { emoji: '🇮🇳', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_India' },
  'Sri Lanka': { emoji: '🇱🇰', region: 'asia' },
  'Maldives': { emoji: '🇲🇻', region: 'asia' },
  'Bangladesh': { emoji: '🇧🇩', region: 'asia' },

  'Canada': { emoji: '🇨🇦', region: 'americas', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Canada' },
  'USA': { emoji: '🇺🇸', region: 'americas', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' },
  'Mexico': { emoji: '🇲🇽', region: 'americas' },
  'Argentina': { emoji: '🇦🇷', region: 'americas' },
  'Brazil': { emoji: '🇧🇷', region: 'americas' },
  'Ecuador': { emoji: '🇪🇨', region: 'americas' },
  'Uruguay': { emoji: '🇺🇾', region: 'americas' },
  'Paraguay': { emoji: '🇵🇾', region: 'americas' },
  'Chile': { emoji: '🇨🇱', region: 'americas' },
  'Colombia': { emoji: '🇨🇴', region: 'americas' },
  'Venezuela': { emoji: '🇻🇪', region: 'americas' },
  'Bolivia': { emoji: '🇧🇴', region: 'americas' },
  'Peru': { emoji: '🇵🇪', region: 'americas' },
  'Panama': { emoji: '🇵🇦', region: 'americas' },
  'Costa Rica': { emoji: '🇨🇷', region: 'americas' },
  'El Salvador': { emoji: '🇸🇻', region: 'americas' },
  'Honduras': { emoji: '🇭🇳', region: 'americas' },
  'Dominican Republic': { emoji: '🇩🇴', region: 'americas' },
  'French Guiana': { emoji: '🇬🇫', region: 'americas' },
  'Martinique': { emoji: '🇲🇶', region: 'americas' },
  'Saint Martin': { emoji: '🇸🇽', region: 'americas' },
  'Saint Barthelemy': { emoji: '🇫🇷', region: 'americas' },

  'Iran': { emoji: '🇮🇷', region: 'middle east', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iran' },
  'Israel': { emoji: '🇮🇱', region: 'middle east' },
  'Palestine': { emoji: '🇵🇸', region: 'middle east' },
  'Kuwait': { emoji: '🇰🇼', region: 'middle east' },
  'Iraq': { emoji: '🇮🇶', region: 'middle east', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iraq' },
  'United Arab Emirates': { emoji: '🇦🇪', region: 'middle east', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Arab_Emirates' },
  'Lebanon': { emoji: '🇱🇧', region: 'middle east' },
  'Bahrain': { emoji: '🇧🇭', region: 'middle east' },
  'Egypt': { emoji: '🇪🇬', region: 'middle east', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Egypt' },
  'Qatar': { emoji: '🇶🇦', region: 'middle east' },
  'Oman': { emoji: '🇴🇲', region: 'middle east' },
  'Saudi Arabia': { emoji: '🇸🇦', region: 'middle east' },
  'Pakistan': { emoji: '🇵🇰', region: 'middle east' },
  'Afghanistan': { emoji: '🇦🇫', region: 'middle east' },
  'Turkey': { emoji: '🇹🇷', region: 'middle east' },
  'Jordan': { emoji: '🇯🇴', region: 'middle east' },

  'Algeria': { emoji: '🇩🇿', region: 'africa' },
  'Senegal': { emoji: '🇸🇳', region: 'africa' },
  'South Africa': { emoji: '🇿🇦', region: 'africa' },
  'Cameroon': { emoji: '🇨🇲', region: 'africa' },
  'Morocco': { emoji: '🇲🇦', region: 'africa' },
  'Tunisia': { emoji: '🇹🇳', region: 'africa' },
  'Togo': { emoji: '🇹🇬', region: 'africa' },
  'Nigeria': { emoji: '🇳🇬', region: 'africa' },

  'Australia': { emoji: '🇦🇺', region: 'oceania', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Australia' },
  'New Zealand': { emoji: '🇳🇿', region: 'oceania' },

  'Italy': { emoji: '🇮🇹', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Italy' },
  'Spain': { emoji: '🇪🇸', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Spain' },
  'Portugal': { emoji: '🇵🇹', region: 'europe' },
  'France': { emoji: '🇫🇷', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_France' },
  'United Kingdom': { emoji: '🇬🇧', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Kingdom' },
  'Philippines': { emoji: '🇵🇭', region: 'asia', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Philippines' },
  'Switzerland': { emoji: '🇨🇭', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Switzerland' },
  'Netherlands': { emoji: '🇳🇱', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Netherlands' },
  'San Marino': { emoji: '🇸🇲', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_San_Marino' },
  'Germany': { emoji: '🇩🇪', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Germany' },
  'Sweden': { emoji: '🇸🇪', region: 'europe', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Sweden' },
  'Belgium': { emoji: '🇧🇪', region: 'europe' },
  'Ireland': { emoji: '🇮🇪', region: 'europe' },
  'Russia': { emoji: '🇷🇺', region: 'europe' },
  'Poland': { emoji: '🇵🇱', region: 'europe' },
  'Slovenia': { emoji: '🇸🇮', region: 'europe' },
  'Georgia': { emoji: '🇬🇪', region: 'europe' },
  'Romania': { emoji: '🇷🇴', region: 'europe' },
  'Croatia': { emoji: '🇭🇷', region: 'europe' },
  'Estonia': { emoji: '🇪🇪', region: 'europe' },
  'Azerbaijan': { emoji: '🇦🇿', region: 'europe' },
  'Hungary': { emoji: '🇭🇺', region: 'europe' },
  'Armenia': { emoji: '🇦🇲', region: 'europe' },
  'Andorra': { emoji: '🇦🇩', region: 'europe' },
  'Belarus': { emoji: '🇧🇾', region: 'europe' },
  'Latvia': { emoji: '🇱🇻', region: 'europe' },
  'Bulgaria': { emoji: '🇧🇬', region: 'europe' },
  'Finland': { emoji: '🇫🇮', region: 'europe' },
  'Austria': { emoji: '🇦🇹', region: 'europe' },
  'Greece': { emoji: '🇬🇷', region: 'europe' },
  'Norway': { emoji: '🇳🇴', region: 'europe' },
  'Iceland': { emoji: '🇮🇸', region: 'europe' },
  'Moldova': { emoji: '🇲🇩', region: 'europe' },
  'Denmark': { emoji: '🇩🇰', region: 'europe' },
  'Faroe Islands': { emoji: '🇫🇴', region: 'europe' },
  'Czech Republic': { emoji: '🇨🇿', region: 'europe' },
  'Bosnia and Herzegovina': { emoji: '🇧🇦', region: 'europe' },
  'Slovakia': { emoji: '🇸🇰', region: 'europe' },
  'Luxembourg': { emoji: '🇱🇺', region: 'europe' },
  'Malta': { emoji: '🇲🇹', region: 'europe' },
  'North Macedonia': { emoji: '🇲🇰', region: 'europe' },
  'Albania': { emoji: '🇦🇱', region: 'europe' },
  'Cyprus': { emoji: '🇨🇾', region: 'europe' },
  'Gibraltar': { emoji: '🇬🇮', region: 'europe' },
  'Liechtenstein': { emoji: '🇱🇮', region: 'europe' },
  'Lithuania': { emoji: '🇱🇹', region: 'europe' },
  'Monaco': { emoji: '🇲🇨', region: 'europe' },
  'Serbia': { emoji: '🇷🇸', region: 'europe' },
  'Vatican City': { emoji: '🇻🇦', region: 'europe' },
  'Ukraine': { emoji: '🇺🇦', region: 'europe' },


  'Diamond Princess (out of Japan)': { emoji: '🛳', region: 'other', type: 'other', wikipedia: 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_on_cruise_ships#Diamond_Princess' },
  'Grand Princess (out of US)': { emoji: '🛳', region: 'other', type: 'other' }
}
