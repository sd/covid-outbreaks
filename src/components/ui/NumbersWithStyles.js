import React from 'react'
import classNames from 'classnames'
import numeral from 'numeral'

export const VelocityWithStyles = ({value}) => {
  return (
    <span className={classNames('velocity', {
      // good: value < 1.5,
      // medium: value > 2,
      // bad: value > 4,
      // terrible: value > 10
    })}
    >
    {value
      ? `${numeral(value).format('0,000.00')}`
      : <span>&nbsp;</span>
    }
    </span>
  )
}

export const AccelerationWithStyles = (props) => {
  return <NumberWithStyles {...{
    arrows: true, colors: true, abs: false, isPercent: false, className: 'acceleration',
    ...props
  }} />
}

export const NumberWithStyles = ({
  value, className, format,
  arrows = false, percent = false, colors = false, abs = false
}) => {

  if (percent) {
    return (
      <span className={classNames(className, {
        increasing: colors && value > 1,
        decreasing: colors && value < 1
      })}
      >
        {value > 1 &&
          <span>
            {arrows && <span className='arrow'>▲</span>}
            {numeral((value - 1) * 100).format(format || '0,000.0')}%
          </span>
        }
        {value < 1 &&
          <span>
            {arrows && <span className='arrow'>▼</span>}
            {numeral((1 - value) * 100).format(format || '0,000.0')}%
          </span>
        }
        {!value && <span>&nbsp;</span>}
      </span>
    )
  } else {
    const displayValue = abs ? Math.abs(value) : value

    return (
      <span className={classNames(className, {
        increasing: colors && value > 0,
        decreasing: colors && value < 0
      })}
      >
        {value > 0 &&
          <span>
            {arrows && <span className='arrow'>▲</span>}
            {numeral(displayValue).format(format || '0,000.00')}
          </span>
        }
        {value === 0 && <span>&nbsp;</span>}
        {value < 0 &&
          <span>
            {arrows && <span className='arrow'>▼</span>}
            {numeral(displayValue).format(format || '0,000.00')}
          </span>
        }
        {!value && <span>&nbsp;</span>}
      </span>
    )
  }
}
