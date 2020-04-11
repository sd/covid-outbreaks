import React from 'react';
import { connect } from 'react-redux'
import withSizes from 'react-sizes'
import classNames from 'classnames'
import { Trans } from 'react-i18next'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import { fetchDataDispatcher } from './store/reducers/data'

import Navigation from './components/ui/Navigation'

import AllEntriesView from './components/views/AllEntriesView'
import OneEntryView from './components/views/OneEntryView'
import CreditsView from './components/views/CreditsView'
import ExplainNumbersView from './components/views/ExplainNumbersView'
import TableView from './components/views/TableView'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
    this.listRef = React.createRef()
  }

  componentDidMount() {
    this.props.loadData()
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    console.error('Error Caught by App')
    console.error(error)
    console.error(errorInfo)
  }

  resetAndReload = () => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.location.reload()
  }

  render() {
    const { isMobile, isTablet, isDesktop, windowHeight } = this.props
    const { error, errorInfo } = this.state

    const childProps = { isMobile, isTablet, isDesktop, windowHeight, listRef: this.listRef }

    return (
      <Router>
        <div className={ classNames('App', { mobile: isMobile, tablet: isTablet, desktop: isDesktop }) }>

          <PageHeader {...childProps} />

          {!error &&
            <div className="App-content">
              <Switch>
                <Route exact path="/sources" render={() => <CreditsView {...childProps} />} />
                <Route exact path="/explain" render={() => <ExplainNumbersView {...childProps} />} />

                <Route exact path="/t"        render={() => <TableView {...childProps} filter="relevant" />} />

                <Route exact path="/"        render={() => <TableView {...childProps} filter="relevant" />} />
                <Route exact path="/all"     render={() => <TableView {...childProps} filter="all" />} />
                <Route exact path="/euro"    render={() => <TableView {...childProps} filter="europe" />} />
                <Route exact path="/usa"     render={() => <TableView {...childProps} filter="usa" />} />
                <Route exact path="/latam"   render={() => <TableView {...childProps} filter="latam" />} />
                <Route exact path="/asia"    render={() => <TableView {...childProps} filter="asia" />} />

                <Route path="/:name" render={({match}) => <OneEntryView {...childProps} entryName={match.params.name} />} />

              </Switch>
            </div>
          }

          {error &&
            <div className="App-error">
              <div>
                <h2><Trans i18nKey={'general.error_title'}>ERROR</Trans></h2>

                <Trans i18nKey={'general.error_text'}>
                  <p>
                    Something unexpected happened. We suggest clicking the
                    button below to reset cached data and try loading the page again.
                  </p>
                  <p>
                    If an error is still happening, reach out to <a href='https://twitter.com/'>@sd on twitter</a>.
                  </p>
                </Trans>

                <button onClick={() => this.resetAndReload()}>
                  <Trans i18nKey={'general.reload_button'}>Try Again!</Trans>
                </button>
              </div>

              <div className="error-info">
                <pre>
                  {/* <b>{error.message}</b><br /> */}
                  {errorInfo.componentStack}
                </pre>
              </div>
            </div>
          }

          <PageFooter />
        </div>
      </Router>
    )
  }
}

const PageHeader = ({listRef, isMobile}) => {
  return (
    <header className='App-header'>
      <h1 onClick={() => listRef.current && listRef.current.scrollTo(0, 0)} style={{cursor: 'pointer'}}>
        <Link to="/">
          <img src='covid-128.png' alt='*' className='logo' />
          <Trans i18nKey='general.title'>COVID-19 Outbreaks</Trans>
        </Link>
      </h1>

      <Navigation isMobile={isMobile} listRef={listRef} />

    </header>
  )
}

const PageFooter = () => {
  return (
    <footer className="App-footer">
      <div className='credits'>
        <Trans i18nKey='general.credits'>
          Visualization by Sebastián Delmont
        </Trans>
        {' • '}<a href='https://twitter.com/sd'>@sd</a>
        {' • '}<a href='https://github.com/sd/covid-outbreaks'>github</a>
        {' • '}<Link to='/sources'>Data Sources</Link>
      </div>
    </footer>
  )
}


const mapStateToProps = (state, ownProps) => ({
  loading: state.data.loading,
  loaded: state.data.loaded,
  errorMessage: state.data.errorMessage,
  lastDate: state.data.lastDate
})

const mapDispatchToProps = (dispatch) => ({
  loadData: () => fetchDataDispatcher(dispatch),
})

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

const mapSizesToProps = ({ width, height }) => ({
  isMobile: width <= 480,
  isTablet: width > 480 && width <= 1024,
  isDesktop: width > 1024,
  windowHeight: height
})

const ConnectedAndSizedApp = withSizes(mapSizesToProps)(ConnectedApp)

export default ConnectedAndSizedApp
