function sortEntriesByDeathsLatest(a, b, { pinPositions }) {
  if (pinPositions[b.name] &&  pinPositions[a.name]) {
    return (pinPositions[b.name] - pinPositions[a.name])
  } else if (pinPositions[a.name]) {
    return -1
  } else if (pinPositions[b.name]) {
    return 1
  } else if (b.latestDaily.deaths !== a.latestDaily.deaths) {
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

function sortEntriesByDeathsTotal(a, b, { pinPositions }) {
  if (pinPositions[b.name] &&  pinPositions[a.name]) {
    return (pinPositions[b.name] - pinPositions[a.name])
  } else if (pinPositions[a.name]) {
    return -1
  } else if (pinPositions[b.name]) {
    return 1
  } else if (b.latestTotal.deaths !== a.latestTotal.deaths) {
    return (b.latestTotal.deaths || 0) - (a.latestTotal.deaths || 0)
  } else if (b.latestDaily.deaths !== a.latestDaily.deaths) {
    return (b.latestDaily.deaths || 0) - (a.latestDaily.deaths || 0)
  } else if (b.latestTotal.cases !== a.latestTotal.cases) {
    return (b.latestTotal.cases || 0) - (a.latestTotal.cases || 0)
  } else {
    return b.name < a.name ? 1 : -1
  }
}

function sortEntriesByCasesLatest(a, b, { pinPositions }) {
  if (pinPositions[b.name] &&  pinPositions[a.name]) {
    return (pinPositions[b.name] - pinPositions[a.name])
  } else if (pinPositions[a.name]) {
    return -1
  } else if (pinPositions[b.name]) {
    return 1
  } else if (b.latestDaily.cases !== a.latestDaily.cases) {
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

function sortEntriesByCasesTotal(a, b, { pinPositions }) {
  if (pinPositions[b.name] &&  pinPositions[a.name]) {
    return (pinPositions[b.name] - pinPositions[a.name])
  } else if (pinPositions[a.name]) {
    return -1
  } else if (pinPositions[b.name]) {
    return 1
  } else if (b.latestTotal.cases !== a.latestTotal.cases) {
    return (b.latestTotal.cases || 0) - (a.latestTotal.cases || 0)
  } else if (b.latestDaily.cases !== a.latestDaily.cases) {
    return (b.latestDaily.cases || 0) - (a.latestDaily.cases || 0)
  } else if (b.latestTotal.deaths !== a.latestTotal.deaths) {
    return (b.latestTotal.deaths || 0) - (a.latestTotal.deaths || 0)
  } else if (b.latestDaily.deaths !== a.latestDaily.deaths) {
    return (b.latestDaily.deaths || 0) - (a.latestDaily.deaths || 0)
  } else {
    return b.name < a.name ? 1 : -1
  }
}

function sortEntriesByName(a, b, { pinPositions }) {
  if (pinPositions[b.name] &&  pinPositions[a.name]) {
    return (pinPositions[b.name] - pinPositions[a.name])
  } else if (pinPositions[a.name]) {
    return -1
  } else if (pinPositions[b.name]) {
    return 1
  } else {
    return b.name < a.name ? 1 : -1
  }
}

function sortEntriesByOutbreakDay(a, b, { pinPositions }) {
  if (pinPositions[b.name] &&  pinPositions[a.name]) {
    return (pinPositions[b.name] - pinPositions[a.name])
  } else if (pinPositions[a.name]) {
    return -1
  } else if (pinPositions[b.name]) {
    return 1
  } else if (b.latestOutbreakDay.deaths !== a.latestOutbreakDay.deaths) {
    return (b.latestOutbreakDay.deaths || 0) - (a.latestOutbreakDay.deaths || 0)
  } else if (b.latestTotal.deaths !== a.latestTotal.deaths) {
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
  outbreakDay: sortEntriesByOutbreakDay
}

export const SORTER_ALIASES = {
  /* Actual Options */
  name: 'name',
  casesTotal: 'casesTotal',
  casesLatest: 'casesLatest',
  deathsTotal: 'deathsTotal',
  deathsLatest: 'deathsLatest',
  outbreakDay: 'outbreakDay',
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
}

export const SORTER_TYPES = ['deathsLatest', 'deathsTotal', 'name', 'outbreakDay']

export function viewOptionsForSorting(sort, moreOptions) {
  sort = SORTER_ALIASES[sort] || SORTER_ALIASES.default
  return {
    sorter: SORTERS[sort],
    sortDescription: SORTER_DESCRIPTIONS[sort],
    sort,
    ...moreOptions
  }
}


