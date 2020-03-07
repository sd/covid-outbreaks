const initialState = {
  view: 'table'
}

function reducer (state = initialState, action) {
  switch(action.type) {
    case 'UI.SET_VIEW':
      return { ...state, view: action.value }

    default:
      return state
  }
}

export default reducer
