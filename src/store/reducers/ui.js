const initialState = {
  view: undefined,
  sort: undefined,
  filter: undefined,
  search: undefined,
  hideAggregates: undefined,
  noScaling: undefined,
  weeks: undefined,
  totals: undefined,
  keyDate: undefined,
  showHospitalized: false,
  compareTo: undefined,
  isExpanded: {}
}

function reducer (state = initialState, action) {
  switch(action.type) {
    case 'UI.RESET':
      return initialState

    case 'UI.SET':
      return { ...state, ...action.values }

    default:
      return state
  }
}

export default reducer
