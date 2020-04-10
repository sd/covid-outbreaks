import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { persistStore, persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router'
import defaultStorage from 'redux-persist/lib/storage'

import createRootReducer from './reducers'

export const history = createBrowserHistory()

export function configureStore (state) {
  let reducer = createRootReducer(history)

  const persistConfig = {
    key: "root",
    storage: defaultStorage,
    stateReconciler: (stateFromStorage, stateFromCode) => {
      if (!stateFromStorage.version || stateFromStorage.version !== stateFromCode.version) {
        return stateFromCode
      } else {
        return stateFromStorage
      }
    }
  }

  reducer = persistReducer(persistConfig, reducer)


  const middlewares = [thunkMiddleware, routerMiddleware(history)]

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

  const persistor = persistStore(store, state)

  return { store, persistor, history }
}
