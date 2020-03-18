import React from 'react'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import './Information.css'

const Information = ({about, position}) => {
  let ContentClass = null
  const contentComponents = {
    outbreakDay: InfoForOutbreakDay,
    velocity: InfoForVelocity,
    acceleration: InfoForAcceleration
  }

  ContentClass = contentComponents[about]

  if (ContentClass) {
    return (
      <Popup
        tooltip
        position={position || 'bottom center'}
        arrow={true}
        closeOnDocumentClick
        className='ViewControls-popup'
        overlayStyle={{
          zIndex: 1000
        }}
        contentStyle={{
          zIndex: 1001,
          backgroundColor: '#ffb',
          color: '#333',
        }}
        trigger={
            <span className='Information-trigger'><FontAwesomeIcon icon={faQuestionCircle} /></span>
        }
      >
        {close => (
          <div className='Information-content'>
            {ContentClass && <ContentClass />}
          </div>
        )}
      </Popup>
    )
  } else {
    return null
  }
}

const InfoForOutbreakDay = () => {
  return (
    <>
      <h1>Outbreak Day</h1>

      <p>
        A counter for how many days have passed since this outbreak started.
      </p>

      <p>
        We start counting on the first day with new deaths,
        but reset it back to zero after two consecutive days with no new deaths.
      </p>
    </>
  )
}

const InfoForVelocity = () => {
  return (
    <>
      <h1>Velocity (per week)</h1>

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
    </>
  )
}


const InfoForAcceleration = () => {
  return (
    <>
      <h1>Acceleration</h1>

      <p>
        How much has <i>velocity</i> changed, compared to the previous day. It's the best indicator that
        progress of the outbreak is speeding up or slowing down.
      </p>

      <p>
        <i>Velocity</i> is calculated by comparing <i>death totals</i> 7 days appart,
        while <i>Acceleration</i> compares <i>velocity</i> day to day.
      </p>
    </>
  )
}

export default Information
