import React from 'react';
import './App.css';
import withSizes from 'react-sizes'
import classNames from 'classnames'
import { Trans } from 'react-i18next'

import ViewControls from './components/ViewControls'
import MarkerLegend from './components/MarkerLegend'
import TableView from './components/TableView'
import DataLoader from './components/DataLoader'

const App = ({ isMobile, isTablet, isDesktop }) => {
  return (
    <div className={ classNames('App', { mobile: isMobile, tablet: isTablet, desktop: isDesktop }) }>

      <PageHeader />

      <div className="App-content">
        { isMobile && <DataSources isMobile={isMobile} /> }

        <ViewControls isMobile={isMobile} />

        <DataLoader />

        <TableView isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
      </div>

      <PageFooter extraFooterInfo={ !isMobile && <DataSources isMobile={isMobile} /> } />

    </div>
  )
}

const DataSources = ({isMobile}) => {
  return (
    <div className='dataSources'>
      <Trans i18nKey='general.data_credits'>
        Data from <a target='_blank' rel='noopener noreferrer' href='https://github.com/CSSEGISandData/COVID-19'>John Hopkins University</a>, <a target='_blank' rel="noopener noreferrer" href='https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/'>BNO News</a> and other sources.
      </Trans>
    </div>
  )
}

const PageHeader = () => {
  return (
    <header className='App-header'>
      <h1>
        <img src='covid-128.png' alt='*' className='logo' />
        <Trans i18nKey='general.title'>COVID-19 Outbreaks</Trans>
      </h1>

      <MarkerLegend />
    </header>
  )
}

const PageFooter = ({extraFooterInfo}) => {
  return (
    <footer className="App-footer">
      {extraFooterInfo}

      <div className='credits'>
        <Trans i18nKey='general.credits'>
          Visualization by Sebastián Delmont • <a href='https://twitter.com/sd'>@sd</a> • <a href='https://twitter.com/sd'>github</a>
        </Trans>
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
