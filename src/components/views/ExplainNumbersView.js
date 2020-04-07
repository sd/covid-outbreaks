import { VelocityWithStyles, AccelerationWithStyles } from '../ui/NumbersWithStyles'

import React from 'react'
import { useHistory } from "react-router-dom";

export const ExplainNumbersView = () => {
  const history = useHistory()

  return (
    <div className='ScrollView'>
      <div className='information lightTheme yellowTheme content'>
        <button className='backLink' onClick={() => history.goBack()}>Go back</button>
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
      </div>
    </div>
  )
}

export default ExplainNumbersView
