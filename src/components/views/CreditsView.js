import React from 'react'

import { useHistory } from "react-router-dom";

const CreditsView = () => {
  const history = useHistory()

  return (
    <div className='ScrollView'>
      <div className='information lightTheme yellowTheme content'>
        <button className='backLink' onClick={() => history.goBack()}>Go back</button>
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
          For France, we use <a target='_blank' rel='noreferrer noopener' href='https://www.data.gouv.fr/en/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/'>the official data at data.gouv.fr</a>.
        </p>

        <p>
          We also try to update some numbers during the day from reliable data sources, and mostly for countries with large numbers of deaths.
          For this we look at official pages, but also at
          {' '}<a target='_blank' rel='noreferrer noopener' href='https://www.worldometers.info/coronavirus/#countries'>Worldometers</a>,
          {' '}<a target='_blank' rel='noreferrer noopener' href='https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/'>BNO News</a> and
          {' '}<a target='_blank' rel='noreferrer noopener' href='https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html'>NY Times</a>.
        </p>

      </div>
    </div>
  )
}

export default CreditsView
