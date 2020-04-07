import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import './Information.css'

const Information = ({to}) => {
  return (
    <span className='Information-trigger'><Link to={to}><FontAwesomeIcon icon={faQuestionCircle} /></Link></span>
  )
}

export default Information
