import ReduxQuerySync from 'redux-query-sync'

function arrayToString (array) {
  if (array) {
    return array.join('|')
  } else {
    return undefined
  }
}

function stringToArray (csv) {
  if (csv) {
    return csv.split('|')
  } else {
    return []
  }
}

function setupQueryStringSync (store) {
  ReduxQuerySync({
    store,
    params: {
        pin: {
          selector: state => state.ui.pinned,
          action: value => ({ type: 'UI.SET_PINNED_ENTRIES', value }),
          valueToString: arrayToString,
          stringToValue: stringToArray
        },
        exp: {
          selector: state => state.ui.expanded,
          action: value => ({ type: 'UI.SET_EXPANDED_ENTRIES', value }),
          valueToString: arrayToString,
          stringToValue: stringToArray
        },
        search: {
          selector: state => state.ui.search,
          action: value => ({ type: 'UI.SET', values: {search: value} })
        },
        view: {
          selector: state => state.ui.view,
          action: value => ({ type: 'UI.SET', values: {view: value} })
        },
        sort: {
          selector: state => state.ui.sort,
          action: value => ({ type: 'UI.SET', values: {sort: value} })
        },
        filter: {
          selector: state => state.ui.filter,
          action: value => ({ type: 'UI.SET', values: {filter: value} })
        },
        noscale: {
          selector: state => state.ui.noScaling,
          action: value => ({ type: 'UI.SET', values: {noScaling: value} })
        },
        weeks: {
          selector: state => state.ui.weeks,
          action: value => ({ type: 'UI.SET', values: {weeks: value} })
        },
        totals: {
          selector: state => state.ui.totals,
          action: value => ({ type: 'UI.SET', values: {totals: value} })
        }
      },
    replaceState: true,
    initialTruth: 'location'
  })
}

export default setupQueryStringSync
