import React from 'react';
import './App.css';
import withSizes from 'react-sizes'
import classNames from 'classnames'
import { Trans } from 'react-i18next'

import TableView from './components/TableView'
import ViewControls from './components/ui/ViewControls'
import MarkerLegend from './components/ui/MarkerLegend'
import DataLoader from './components/DataLoader'
import Information from './components/ui/Information'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
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
    const { isMobile, isTablet, isDesktop } = this.props
    const { error, errorInfo } = this.state

    return (
      <div className={ classNames('App', { mobile: isMobile, tablet: isTablet, desktop: isDesktop }) }>

        <PageHeader />

        {!error &&
          <div className="App-content">
            <ViewControls isMobile={isMobile} />

            <DataLoader />

            <TableView isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
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
    )
  }
}

const PageHeader = () => {
  return (
    <header className='App-header'>
      <h1 onClick={() => window.scrollTo(0, 0)} style={{cursor: 'pointer'}}>
        <img src='covid-128.png' alt='*' className='logo' />
        <Trans i18nKey='general.title'>COVID-19 Outbreaks</Trans>
      </h1>

      <MarkerLegend />
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
        {' • '}<Information content='sources' trigger={<span className='link'>Data Sources</span>}></Information>
      </div>
    </footer>
  )
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 480,
  isTablet: width > 480 && width <= 1024,
  isDesktop: width > 1024
})

export default withSizes(mapSizesToProps)(App)
