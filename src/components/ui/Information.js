import React from 'react'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { VelocityWithStyles, AccelerationWithStyles } from '../entries/OneTableEntry'

import './Information.css'

const Information = ({content, position, trigger}) => {
  let ContentClass = null
  const contentComponents = {
    numbers: InfoNumbers,
    sources: InfoSources,
  }

  ContentClass = contentComponents[content]

  if (ContentClass) {
    return (
      <Popup
        modal
        closeOnDocumentClick
        className='ViewControls-popup'
        overlayStyle={{
          zIndex: 1000
        }}
        contentStyle={{
          zIndex: 1001,
          backgroundColor: '#cca',
          color: '#333',
          minWidth: '50vh',
          maxWidth: '70vh',
          maxHeight: '60vh',
          overflow: 'auto'
        }}
        trigger={
          trigger || <span className='Information-trigger'><FontAwesomeIcon icon={faQuestionCircle} /></span>
        }
      >
        {close => (
          <div className='Information-content lightTheme yellowTheme content'>
            {ContentClass && <ContentClass />}
          </div>
        )}
      </Popup>
    )
  } else {
    return null
  }
}

const InfoSources = () => {
  return (
    <>
      <h1>Data Sources</h1>

      <p>
        Our data comes mainly from the <a href='https://github.com/CSSEGISandData/COVID-19'>Johns Hopkins University Center for Systems Science and Engineering</a>
        github repository, and it's the same data used in their popular <a href='https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6'>dashboard and map</a>.
      </p>

      <p>
        They update their files once a day, around 8pm EST (Midnight UTC). Soon after that we integrate their latest numbers into our data files.
        We used to grab our data directly from their repository, but things broke when they added, removed or renamed countries, so we now merge their numbers manually.
      </p>

      <p>
        We also try to update some numbers during the day from reliable data sources, and mostly for countries with large numbers of deaths.
        For this we look at official pages, but also at
        {' '}<a href='https://www.worldometers.info/coronavirus/#countries'>Worldometers</a>,
        {' '}<a href='https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/'>BNO News</a> and
        {' '}<a href='https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html'>NY Times</a>.
      </p>

    </>
  )
}

const InfoNumbers = () => {
  return (
    <>
      <h1>What do these numbers mean?</h1>

      <p>
        Most of the information presented here is based on the <b>Number of Deaths</b> for each outbreak.
        We do not use <b>Number of Cases</b> for much because it's not a reliable metric
        over time or accross outbreaks.
      </p>

      <h3>Outbreak Day • <span className='outbreakDay'>day 15</span></h3>

      <p>
        A counter for how many days have passed since this outbreak started.
      </p>

      <p>
        We start counting on the first day with new deaths,
        but reset it back to zero after two consecutive days with no new deaths.
      </p>

      <h3>Velocity, or growth per week • <VelocityWithStyles value={3.2} /></h3>

      <p>
        How much larger is the total number of deaths, compared to 7 days before.
      </p>

      <p>
        A velocity of 5x corresponds to about 30% day-over-day increases over 7 days.
      </p>

      <p>
        2x → 12%, 3x → 20%, 4x → 26%, 5x → 31%<br />
        8x → 41%, 10x → 47%, 15x → 57%, 20x → 65%.
      </p>

      <h3>Acceleration • <span style={{opacity: 0.3}}><VelocityWithStyles value={3.2} /></span>&nbsp;<AccelerationWithStyles value={-1.3} /></h3>

      <p>
        How much has <i>velocity</i> changed, compared to the previous day. It's the best indicator that
        progress of the outbreak is speeding up or slowing down.
      </p>

      <p>
        <i>Velocity</i> is calculated by comparing <i>death totals</i> 7 days appart,
        while <i>Acceleration</i> compares <i>velocity</i> day to day.
      </p>

      <p>
        Negative numbers are good news, and that's why we show them in green.
      </p>

      <h3>DISCLAIMER</h3>

      <p>
        I'm not an Epidemiologist or a Statisticial, nor do I play one on TV.
        I believe these metrics are sound mathematically and give good insights into the progression of each outbreak,
        but it's possible that I'm wrong about their interpretation or calculation. If that's the case,
        and you're a real expert in this subject, please reach out on twitter <a href='https://twitter.com/sd'>@sd</a> to discuss.
      </p>
    </>
  )
}

export default Information
