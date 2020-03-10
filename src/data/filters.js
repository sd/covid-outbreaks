function filterAll (a, options) {
  return true
}

function filterRelevant (a, options) {
  if (options.sort === 'casesLatest') {
    return a.casesTotal > 0
  } else if (options.sort === 'casesTotal') {
    return a.casesTotal > 0
  } else if (options.sort === 'deathsLatest') {
    return a.deathsTotal > 0
  } else if (options.sort === 'deathsTotal') {
    return a.deathsTotal > 0
  } else {
    return true
  }
}

const FILTERERS = {
  all: filterAll,
  relevant: filterRelevant
}

export const FILTER_ALIASES = {
  /* Actual options */
  all: 'all',
  relevant: 'relevant',
  default: 'all',

  /* Aliases */
}

export const FILTER_DESCRIPTIONS = {
  relevant: 'Relevant outbreaks',
  americas: 'Outbreaks in The Americas',
  europe: 'Outbreaks in Europe',
  asia: 'Outbreaks in Asia',
  africa: 'Outbreaks in Africa',
  oceania: 'Outbreaks in Oceania',
  all: 'All outbreaks'
}

export const FILTER_TYPES = ['relevant', 'all']

export function viewOptionsForFiltering(filter, moreOptions) {
  filter = FILTER_ALIASES[filter] || FILTER_ALIASES.default
  return {
    filterer: FILTERERS[filter],
    filter,
    filterDescription: FILTER_DESCRIPTIONS[filter],
    ...moreOptions
  }
}

