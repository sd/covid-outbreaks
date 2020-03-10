function sortEntriesByDeathsLatest(a, b, { pinPositions }) {
  if (pinPositions[b.name] &&  pinPositions[a.name]) {
    return (pinPositions[b.name] - pinPositions[a.name])
  } else if (pinPositions[a.name]) {
    return -1
  } else if (pinPositions[b.name]) {
    return 1
  } else if (b.deathsLatest !== a.deathsLatest) {
    return b.deathsLatest - a.deathsLatest
  } else if (b.deathsTotal !== a.deathsTotal) {
    return b.deathsTotal - a.deathsTotal
  } else if (b.casesTotal !== a.casesTotal) {
    return b.casesTotal - a.casesTotal
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
  } else if (b.deathsTotal !== a.deathsTotal) {
    return b.deathsTotal - a.deathsTotal
  } else if (b.deathsLatest !== a.deathsLatest) {
    return b.deathsLatest - a.deathsLatest
  } else if (b.casesTotal !== a.casesTotal) {
    return b.casesTotal - a.casesTotal
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
  } else if (b.casesLatest !== a.casesLatest) {
    return b.casesLatest - a.casesLatest
  } else if (b.casesTotal !== a.casesTotal) {
    return b.casesTotal - a.casesTotal
  } else if (b.deathsLatest !== a.deathsLatest) {
    return b.deathsLatest - a.deathsLatest
  } else if (b.deathsTotal !== a.deathsTotal) {
    return b.deathsTotal - a.deathsTotal
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
  } else if (b.casesTotal !== a.casesTotal) {
    return b.casesTotal - a.casesTotal
  } else if (b.casesLatest !== a.casesLatest) {
    return b.casesLatest - a.casesLatest
  } else if (b.deathsTotal !== a.deathsTotal) {
    return b.deathsTotal - a.deathsTotal
  } else if (b.deathsLatest !== a.deathsLatest) {
    return b.deathsLatest - a.deathsLatest
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

const SORTERS = {
  name: sortEntriesByName,
  casesTotal: sortEntriesByCasesTotal,
  casesLatest: sortEntriesByCasesLatest,
  deathsTotal: sortEntriesByDeathsTotal,
  deathsLatest: sortEntriesByDeathsLatest,
}

export const SORTER_ALIASES = {
  /* Actual Options */
  name: 'name',
  casesTotal: 'casesTotal',
  casesLatest: 'casesLatest',
  deathsTotal: 'deathsTotal',
  deathsLatest: 'deathsLatest',
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
}

export const SORTER_TYPES = ['deathsLatest', 'deathsTotal', 'casesTotal', 'name']

export function viewOptionsForSorting(sort, moreOptions) {
  sort = SORTER_ALIASES[sort] || SORTER_ALIASES.default
  return {
    sorter: SORTERS[sort],
    sortDescription: SORTER_DESCRIPTIONS[sort],
    sort,
    ...moreOptions
  }
}


