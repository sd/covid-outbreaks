import numeral from 'numeral'
import padStart from 'lodash/padStart'
import { DateTime } from 'luxon'

export function setupConsoleTools (data, dates, dispatch) {
  console.log('🦠📈COVID Outbreak Tracker. Console tools available.')
  window.covid = window.covid || {}

  window.covid.entries = {}
  data.forEach(entry => window.covid.entries[entry.code] = entry)

  window.covid.dates = dates
  window.covid.dates = dates
  window.covid.projection = covidProjection
  window.covid.config = (values) => {
    dispatch({ type: 'UI.SET', values })
  }
}

export function covidProjection(country, options = {}) {
  const entry = window.covid.entries[country]

  // let dayCount = options.days || 7

  let last7days = window.covid.dates.slice(-7)
  if (!entry.totals.deaths[last7days[6]]) {
    last7days = window.covid.dates.slice(-8, -1)
  }

  let total = entry.totals.deaths[last7days[6]]
  let velocity = entry.velocity.deaths[last7days[6]]
  let acceleration = options.acc || entry.rollingAcceleration.deaths[last7days[6]]
  let accelerationDelta = options.accDelta || entry.rollingAcceleration.deaths[last7days[6]] - entry.rollingAcceleration.deaths[last7days[5]]

  console.log(`%c${entry.emoji} ${entry.code} • ${entry.name}`, 'font-weight: bold')
  console.log(
    `%c${padStart(last7days[6], 10)}:  ${padStart(numeral(total).format('0,000'), 6)}`
    + ` ${padStart('+' + numeral(entry.daily.deaths[last7days[6]]).format('0,000'), 6)}`
    + `    v: ${padStart(numeral(velocity).format('0.000'), 7)}`
    + `    acc: ${padStart(numeral(acceleration).format('0.000'), 6)}`,
    'color: #000'
  )
  console.log(`        assuming accDelta of ${numeral(accelerationDelta).format('0.000')} per day`)

  let weekLater, dateObj, newTotal, daily
  let table = []
  last7days.forEach((date, index) => {
    dateObj = DateTime.fromISO(date)
    dateObj = dateObj.plus({days: 7})
    weekLater = `${dateObj.month + 1}/${dateObj.day}`

    acceleration = acceleration + accelerationDelta
    velocity = velocity + acceleration

    newTotal = entry.totals.deaths[date] + Math.pow(10, velocity)
    daily = newTotal - total
    total = newTotal

    table.push({
      date: weekLater,
      total,
      daily,
      v: velocity,
      acc: acceleration,
      explain: `(on ${date}: ${numeral(entry.totals.deaths[date]).format('0,000')} * 10^${numeral(velocity).format('0.000')} = ${numeral(total).format('0,000')})`
    })
  })

  table.forEach(row => {
    console.log(
      `%c${padStart(row.date, 10)}:  ${padStart(numeral(row.total).format('0,000'), 6)}`
      + ` ${padStart('+' + numeral(row.daily).format('0,000'), 6)}`
      + `    v: ${padStart(numeral(row.v).format('0.000'), 7)}`
      + `    acc: ${padStart(numeral(row.acc).format('0.000'), 6)}`,
      'color: #777'
    )
  })

  return table
}
