import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

export function configureStore (state) {
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

  const store = createStore(rootReducer, state, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
