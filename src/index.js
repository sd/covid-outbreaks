import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { configureStore } from './store/store'

const storeInfo = configureStore()

const renderApp = () => (
  ReactDOM.render(
    <Provider store={storeInfo.store}>
      <PersistGate loading={null} persistor={storeInfo.persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp)
}

renderApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
