function filterAll (a, options) {
  return true
}

function filterRelevant (a, options) {
  if (options.sort === 'casesLatest') {
    return a.casesTotal > 0
  } else if (options.sort === 'casesTotal') {
    return a.casesTotal > 0
  } else if (options.sort === 'deathsLatest') {
    return a.deathsTotal > 0 || a.deathsPreliminaryTotal > 0
  } else if (options.sort === 'deathsTotal') {
    return a.deathsTotal > 0 || a.deathsPreliminaryTotal > 0
  } else {
    return true
  }
}

function filterAmericas (a, options) {
  return (a.region === 'americas')
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
  relevant: 'Relevant outbreaks',
  americas: 'Outbreaks in The Americas',
  europe: 'Outbreaks in Europe',
  africa: 'Outbreaks in Africa',
  asiaOceania: 'Outbreaks in Asia & Oceania',
  otherRegions: 'Outbreaks in other regions',
  all: 'All outbreaks'
}

export const FILTER_TYPES = ['all', 'relevant', 'asiaOceania', 'europe', 'americas', 'africa', 'otherRegions']

export function viewOptionsForFiltering(filter, moreOptions) {
  filter = FILTER_ALIASES[filter] || FILTER_ALIASES.default
  return {
    filterer: FILTERERS[filter],
    filter,
    filterDescription: FILTER_DESCRIPTIONS[filter],
    ...moreOptions
  }
}

