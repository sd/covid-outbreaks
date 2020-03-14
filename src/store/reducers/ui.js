const initialState = {
  view: 'table',
  sort: undefined,
  filter: undefined,
  pinned: undefined,
  pinPositions: {},
  expanded: undefined,
  noScaling: undefined,
  isExpanded: {}
}

function processPinned(pinned) {
  pinned = pinned || []
  let pinPositions = {}
  pinned.forEach((n, i) => { pinPositions[n] = (i + 1) })
  if (pinned.length === 0) {
    pinned = undefined
  }
  return { pinned, pinPositions }
}

function processExpanded(expanded) {
  expanded = expanded || []
  let isExpanded = {}
  expanded.forEach((n, i) => { isExpanded[n] = true })
  if (expanded.length === 0) {
    expanded = undefined
  }
  return { expanded, isExpanded }
}

function reducer (state = initialState, action) {
  let newValues

  switch(action.type) {
    case 'UI.SET_VIEW':
      return { ...state, view: action.value || undefined }

    case 'UI.SET_SORT':
      return { ...state, sort: action.value || undefined }

    case 'UI.SET_FILTER':
      return { ...state, filter: action.value || undefined }

    case 'UI.SET_NO_SCALING':
      return { ...state, noScaling: action.value || undefined}

    case 'UI.SET_PINNED_ENTRIES':
      newValues = processPinned(action.value)
      return { ...state, ...newValues }

    case 'UI.PIN_ENTRY':
      newValues = processPinned([...(state.pinned || []).filter(e => e !== action.value), action.value])
      return { ...state, ...newValues }

    case 'UI.UNPIN_ENTRY':
      newValues = processPinned((state.pinned || []).filter(e => e !== action.value))
      return { ...state, ...newValues }

    case 'UI.SET_EXPANDED_ENTRIES':
      newValues = processExpanded(action.value)
      return { ...state, ...newValues }

    case 'UI.EXPAND_ENTRY':
      newValues = processExpanded([...(state.expanded || []).filter(e => e !== action.value), action.value])
      return { ...state, ...newValues }

    case 'UI.COLLAPSE_ENTRY':
      newValues = processExpanded((state.expanded || []).filter(e => e !== action.value))
      return { ...state, ...newValues }

    default:
      return state
  }
}

export default reducer
