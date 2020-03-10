import React from 'react'
import Popup from 'reactjs-popup'
import classNames from 'classnames'

import './SelectionPopup.css'

const SelectionPopup = ({options, descriptions, title, selected, onSelect}) => {
  const description = descriptions[selected] || descriptions.default
  return (
    <Popup
      tooltip
      arrow={false}
      closeOnDocumentClick
      className='Selection-popup'
      contentStyle={{
        backgroundColor: '#444',
        color: '#DDD',
        border: '1px solid #000',
        minWidth: '20em'
      }}
      trigger={<span className='Selection-trigger'>{description}</span>}
    >
      {close => (
        <div className='Selection-content'>
          {title && <h4>{title}</h4>}
          <ul className='Selection-options'>
            {options.map(option => (
              <li
                key={option}
                className={classNames({selected: option === selected})}
                onClick={() => {close(); onSelect && onSelect(option)}}
              >
                {descriptions[option]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Popup>
  )
}

export default SelectionPopup
