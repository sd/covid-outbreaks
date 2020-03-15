function filterAll (a, options) {
  return a.daily.deaths && a.daily.cases && a.latestTotal.cases > 0
}

function filterRelevant (a, options) {
  if (options.sort === 'casesLatest') {
    return a.latestTotal.cases > 0
  } else if (options.sort === 'casesTotal') {
    return a.latestTotal.cases > 0
  } else if (options.sort === 'deathsLatest') {
    return a.latestTotal.cases > 100
  } else if (options.sort === 'deathsTotal') {
    return a.latestTotal.cases > 100
  } else {
    return a.latestTotal.cases > 0
  }
}

function filterAmericas (a, options) {
  return (a.region === 'americas')
}

function filterUSA (a, options) {
  return (a.name.startsWith('USA >'))
}

function filterEurope (a, options) {
  return (a.region === 'europe')
}

function filterMiddleEast (a, options) {
  return (a.region === 'middle east')
}

function filterAfrica (a, options) {
  return (a.region === 'africa')
}

function filterAsiaOceania (a, options) {
  return (a.region === 'asia' || a.region === 'oceania')
}

function filterOtherRegions (a, options) {
  return (a.region === 'other' || !a.region)
}

const FILTERERS = {
  all: filterAll,
  relevant: filterRelevant,
  americas: filterAmericas,
  usa: filterUSA,
  europe: filterEurope,
  middleEast: filterMiddleEast,
  africa: filterAfrica,
  asiaOceania: filterAsiaOceania,
  otherRegions: filterOtherRegions
}

export const FILTER_ALIASES = {
  /* Actual options */
  all: 'all',
  relevant: 'relevant',
  default: 'all',
  americas: 'americas',
  usa: 'usa',
  europe: 'europe',
  middleEast: 'middleEast',
  africa: 'africa',
  asiaOceania: 'asiaOceania',
  otherRegions: 'otherRegions',

  /* Aliases */
  asia: 'asiaOceania',
  oceania: 'asiaOceania',
  america: 'americas',
  northAmerica: 'americas',
  centralAmerica: 'americas',
  southAmerica: 'americas',
}

export const FILTER_DESCRIPTIONS = {
  relevant: 'Important outbreaks',
  americas: 'Outbreaks in The Americas',
  usa: 'Outbreaks in USA',
  europe: 'Outbreaks in Europe',
  africa: 'Outbreaks in Africa',
  asiaOceania: 'Outbreaks in Asia & Oceania',
  otherRegions: 'Outbreaks in other regions',
  all: 'All outbreaks'
}

export const FILTER_TYPES = ['all', 'relevant', 'asiaOceania', 'europe', 'americas', 'usa', 'africa', 'otherRegions']

export function viewOptionsForFiltering(filter, moreOptions) {
  filter = FILTER_ALIASES[filter] || FILTER_ALIASES.default
  return {
    filterer: FILTERERS[filter],
    filter,
    filterDescription: FILTER_DESCRIPTIONS[filter],
    ...moreOptions
  }
}

