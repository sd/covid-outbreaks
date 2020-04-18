function sortEntriesByDeathsLatest(a, b) {
  if (b.latestDaily.deaths !== a.latestDaily.deaths) {
    return (b.latestDaily.deaths || 0) - (a.latestDaily.deaths || 0)
  } else if (b.latestTotal.deaths !== a.latestTotal.deaths) {
    return (b.latestTotal.deaths || 0) - (a.latestTotal.deaths || 0)
  } else if (b.latestDaily.cases !== a.latestDaily.cases) {
    return (b.latestDaily.cases || 0) - (a.latestDaily.cases || 0)
  } else if (b.latestTotal.cases !== a.latestTotal.cases) {
    return (b.latestTotal.cases || 0) - (a.latestTotal.cases || 0)
  } else {
    return b.name < a.name ? 1 : -1
  }
}

function sortEntriesByDeathsTotal(a, b) {
  if (b.latestTotal.deaths !== a.latestTotal.deaths) {
    return (b.latestTotal.deaths || 0) - (a.latestTotal.deaths || 0)
  } else if (b.latestDaily.deaths !== a.latestDaily.deaths) {
    return (b.latestDaily.deaths || 0) - (a.latestDaily.deaths || 0)
  } else if (b.latestTotal.cases !== a.latestTotal.cases) {
    return (b.latestTotal.cases || 0) - (a.latestTotal.cases || 0)
  } else {
    return b.name < a.name ? 1 : -1
  }
}

function sortEntriesByCasesLatest(a, b) {
  if (b.latestDaily.cases !== a.latestDaily.cases) {
    return (b.latestDaily.cases || 0) - (a.latestDaily.cases || 0)
  } else if (b.latestTotal.cases !== a.latestTotal.cases) {
    return (b.latestTotal.cases || 0) - (a.latestTotal.cases || 0)
  } else if (b.latestDaily.deaths !== a.latestDaily.deaths) {
    return (b.latestDaily.deaths || 0) - (a.latestDaily.deaths || 0)
  } else if (b.latestTotal.deaths !== a.latestTotal.deaths) {
    return (b.latestTotal.deaths || 0) - (a.latestTotal.deaths || 0)
  } else {
    return b.name < a.name ? 1 : -1
  }
}

function sortEntriesByCasesTotal(a, b) {
  if (b.latestTotal.cases !== a.latestTotal.cases) {
    return (b.latestTotal.cases || 0) - (a.latestTotal.cases || 0)
  } else if (b.latestDaily.cases !== a.latestDaily.cases) {
    return (b.latestDaily.cases || 0) - (a.latestDaily.cases || 0)
  } else {
    defaultSorting(a, b)
  }
}

function sortEntriesByName(a, b) {
  return b.name < a.name ? 1 : -1
}

function sortEntriesByOutbreakDay(a, b) {
  if (b.latestOutbreakDay.deaths !== a.latestOutbreakDay.deaths) {
    return (b.latestOutbreakDay.deaths || 0) - (a.latestOutbreakDay.deaths || 0)
  } else {
    defaultSorting(a, b)
  }
}

function sortEntriesByVelocity(a, b) {
  if (b.latestVelocity.deaths !== a.latestVelocity.deaths) {
    return (b.latestVelocity.deaths || 0) - (a.latestVelocity.deaths || 0)
  } else {
    defaultSorting(a, b)
  }
}

function sortEntriesByAcceleration(a, b) {
  if (b.latestAcceleration.deaths !== a.latestAcceleration.deaths) {
    return Math.abs(b.latestAcceleration.deaths || 0) - Math.abs(a.latestAcceleration.deaths || 0)
  } else {
    defaultSorting(a, b)
  }
}

function defaultSorting(a, b) {
  if (b.latestTotal.deaths !== a.latestTotal.deaths) {
    return (b.latestTotal.deaths || 0) - (a.latestTotal.deaths || 0)
  } else if (b.latestTotal.cases !== a.latestTotal.cases) {
    return (b.latestTotal.cases || 0) - (a.latestTotal.cases || 0)
  } else {
    return b.name < a.name ? 1 : -1
  }
}

const SORTERS = {
  name: sortEntriesByName,
  casesTotal: sortEntriesByCasesTotal,
  casesLatest: sortEntriesByCasesLatest,
  deathsTotal: sortEntriesByDeathsTotal,
  deathsLatest: sortEntriesByDeathsLatest,
  outbreakDay: sortEntriesByOutbreakDay,
  velocity: sortEntriesByVelocity,
  acceleration: sortEntriesByAcceleration
}

export const SORTER_ALIASES = {
  /* Actual Options */
  name: 'name',
  casesTotal: 'casesTotal',
  casesLatest: 'casesLatest',
  deathsTotal: 'deathsTotal',
  deathsLatest: 'deathsLatest',
  outbreakDay: 'outbreakDay',
  velocity: 'velocity',
  acceleration: 'acceleration',
  default: 'deathsLatest',

  /* Aliases */
  cases: 'casesTotal',
  deaths: 'deathsTotal',
  deathsLast: 'deathsLatest',
  casesLast: 'casesLatest',
  lastDeaths: 'deathsLatest',
  lastCases: 'casesLatest',
  latestDeaths: 'deathsLatest',
  latestCases: 'deathsLatest'
}

export const SORTER_DESCRIPTIONS = {
  name: "Name",
  casesTotal: "Total Cases",
  casesLatest: "Latest Cases",
  deathsTotal: "Total Deaths",
  deathsLatest: "Latest Deaths",
  outbreakDay: "Days into outbreak",
  velocity: 'Velocity',
  acceleration: 'Acceleration'
}

export const SORTER_TYPES = ['deathsLatest', 'deathsTotal', 'velocity', 'acceleration', 'outbreakDay', 'name']

export function viewOptionsForSorting(sort, moreOptions) {
  sort = SORTER_ALIASES[sort] || SORTER_ALIASES.default
  return {
    sorter: SORTERS[sort],
    sortDescription: SORTER_DESCRIPTIONS[sort],
    sort,
    ...moreOptions
  }
}


