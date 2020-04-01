import React from 'react'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { VelocityWithStyles, AccelerationWithStyles } from './NumbersWithStyles'

import './Information.css'

ReactModal.setAppElement('#root')

const Information = ({content, position, trigger}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  let ContentClass = null
  const contentComponents = {
    numbers: InfoNumbers,
    sources: InfoSources,
  }

  ContentClass = contentComponents[content]

  if (ContentClass) {
    return (
      <>
        <span onClick={() => setIsOpen(true)}>
          { trigger || <span className='Information-trigger'><FontAwesomeIcon icon={faQuestionCircle} /></span> }
        </span>

        <ReactModal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          onRequestClose={() => setIsOpen(false)}
          style={{
            overlay: {
              background: 'rgba(99, 99, 99, 0.3)',
              backgroundOpacity: 0.3,
            },
            content: {
              backgroundColor: '#ffb',
              minWidth: '25em',
              maxWidth: '75vw',
              maxHeight: '60vh',
              marginTop: '10em',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 0,
              border: 0,
            }
          }}
        >
          <div className='Information-content lightTheme yellowTheme content'>
            {ContentClass && <ContentClass />}
          </div>
        </ReactModal>
      </>
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
        Our data comes mainly from the <a target='_blank' rel='noreferrer noopener' href='https://github.com/CSSEGISandData/COVID-19'>Johns Hopkins University Center for Systems Science and Engineering</a> github
        repository, and it's the same data used in their popular <a target='_blank' rel='noreferrer noopener' href='https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6'>dashboard and map</a>.
      </p>

      <p>
        They update their files once a day, around 8pm EST (Midnight UTC). Soon after that we integrate their latest numbers into our data files.
        We used to grab our data directly from their repository, but things broke when they added, removed or renamed countries, so we now merge their numbers manually.
      </p>

      <p>
        For the USA, we use the numbers collected by <a target='_blank' rel='noreferrer noopener' href='https://covidtracking.com/'>The COVID Tracking Project</a>, all from the best official sources.
      </p>

      <p>
        For Spain, we use <a target='_blank' rel='noreferrer noopener' href='https://github.com/datadista/datasets/tree/master/COVID%2019'>the files collected by Datadista</a>.
      </p>

      <p>
        For Italy, we use <a target='_blank' rel='noreferrer noopener' href='https://github.com/pcm-dpc/COVID-19'>the official github repository for the Presidenza del Consiglio dei Ministri - Dipartimento della Protezione Civile</a>.
      </p>

      <p>
        For France, we use <a target='_blank' rel='noreferrer noopener' href='https://github.com/cedricguadalupe/FRANCE-COVID-19'>the files collected by Cedric Guadalupe</a>.
      </p>

      <p>
        We also try to update some numbers during the day from reliable data sources, and mostly for countries with large numbers of deaths.
        For this we look at official pages, but also at
        {' '}<a target='_blank' rel='noreferrer noopener' href='https://www.worldometers.info/coronavirus/#countries'>Worldometers</a>,
        {' '}<a target='_blank' rel='noreferrer noopener' href='https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/'>BNO News</a> and
        {' '}<a target='_blank' rel='noreferrer noopener' href='https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html'>NY Times</a>.
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
        {' '}
        <b>Starting on the day when the outbreak passes 10 total deaths.</b>
      </p>



      <h3>Velocity • <VelocityWithStyles value={2.2} /></h3>

      <p>
        How much larger is the total number of deaths, <b>compared to 7 days before</b>, but using a <b>logarithmic (base 10) scale</b>.
      </p>

      <p>
        If you plot the number of deaths in a logarithmic scale, this is the slope of the curve. If you want to
        compare different outbreaks, this is the best number to use but only if you compare similar stages based
        on days into the outbreak or total number of deaths.
      </p>



      <h3>Acceleration • <span style={{opacity: 0.3}}><VelocityWithStyles value={2.2} /></span>&nbsp;<AccelerationWithStyles value={0.14} /></h3>

      <p>
        How much has <i>velocity</i> changed, compared to the previous day.
      </p>

      <p>
        <b>This is the best indicator that progress of the outbreak is speeding up or slowing down.</b>
      </p>

      <p>
        Negative numbers are good news, and that's why we show them in green.
      </p>


      <h3>Days to 10x • <span style={{opacity: 1}}><AccelerationWithStyles value={7.1} colors={false} arrows={false} /></span></h3>

      <p>
         If an outbreak is accelerating at <AccelerationWithStyles value={0.14} /> per day, it means that if nothing else
         changes, it would take <tt>1/0.14</tt> days
         for Velocity to increase from <VelocityWithStyles value={2.2} /> to <VelocityWithStyles value={3.2} />,
         which is the same as saying that the total number of new deaths in the last 7 days increased 10x.
      </p>

      <p>
        This is just another way to understand acceleration data, using units that might make it easier to see the impact
        it has on real world numbers.
      </p>

      <h3>DISCLAIMER</h3>

      <p>
        <b>I'm not an Epidemiologist or a Statistician, nor do I play one on TV.</b>{ ' ' }
        I believe these metrics are sound mathematically and give good insights into the progression of each outbreak,
        but it's possible that I'm wrong about their interpretation or calculation. If that's the case,
        and you're a real expert in this subject, please reach out on twitter <a target='_blank' rel='noreferrer noopener' href='https://twitter.com/sd'>@sd</a> to discuss.
      </p>
    </>
  )
}

export default Information
