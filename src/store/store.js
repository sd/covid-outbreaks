import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import setupQueryStringSync from './queryString'
import { persistStore, persistReducer } from 'redux-persist'
import defaultStorage from 'redux-persist/lib/storage'

export function configureStore (state) {
  let reducer = rootReducer

  const persistConfig = {
    key: "root",
    storage: defaultStorage,
    stateReconciler: (stateFromStorage, stateFromQueryString) => {
      if (!stateFromStorage.version || stateFromStorage.version !== stateFromQueryString.version) {
        return stateFromQueryString
      }

      const storedUi = stateFromStorage.ui || {}
      const urlUi = stateFromQueryString.ui || {}

      return {
        ...stateFromStorage,
        ui: {
          ...storedUi,
          sort: urlUi.sort || storedUi.sort,
          filter: urlUi.filter || storedUi.filter,
          noScaling: urlUi.noScaling || storedUi.noScaling,
          pinned: urlUi.pinned || storedUi.pinned,
          expanded: urlUi.expanded || storedUi.expanded,
          weeks: urlUi.weeks || storedUi.weeks,
          totals: urlUi.totals || storedUi.totals,
          search: urlUi.search || storedUi.search,
          aggregateCountries: urlUi.aggregaaggregateCountrieste || storedUi.aggregateCountries,
        }
      }
    }
  }

  reducer = persistReducer(persistConfig, reducer)


  const middlewares = [thunkMiddleware]

  // Add more middleware here

  if (process.env.NODE_ENV === 'development') {
    // Add DEV MODE middleware here
  }

  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]

  // Add more enhancers here

  if (process.env.NODE_ENV === 'development') {
    // Add DEV MODE enhancers here
  }

  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(reducer, state, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducer))
  }

  setupQueryStringSync(store)

  const persistor = persistStore(store, state)

  return { store, persistor }
}
