const initialState = {
  view: 'table',
  pinned: [],
  expanded: []
}

function reducer (state = initialState, action) {
  switch(action.type) {
    case 'UI.SET_VIEW':
      return { ...state, view: action.value }

    case 'UI.SET_PINNED_ENTRIES':
      return { ...state, pinned: action.value }

    case 'UI.PIN_ENTRY':
      return { ...state, pinned: [...(state.pinned || []).filter(e => e !== action.value), action.value] }

    case 'UI.UNPIN_ENTRY':
        return { ...state, pinned: (state.pinned || []).filter(e => e !== action.value) }

    case 'UI.SET_EXPANDED_ENTRIES':
      return { ...state, expanded: action.value }

    case 'UI.EXPAND_ENTRY':
      return { ...state, expanded: [...(state.expanded || []).filter(e => e !== action.value), action.value] }

    case 'UI.COLLAPSE_ENTRY':
        return { ...state, pinned: (state.pinned || []).filter(e => e !== action.value) }

    default:
      return state
  }
}

export default reducer
