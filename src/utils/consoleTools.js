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

  let dayCount = options.days || 14

  let last7days = window.covid.dates.slice(-7)
  if (!entry.totals.deaths[last7days[6]]) {
    last7days = window.covid.dates.slice(-8, -1)
  }

  let total = entry.totals.deaths[last7days[6]]
  let velocity = entry.velocity.deaths[last7days[6]]
  let acceleration = options.acc || entry.rollingAcceleration.deaths[last7days[6]]
  let accelerationDelta = options.delta || ((entry.rollingAcceleration.deaths[last7days[6]] - entry.rollingAcceleration.deaths[last7days[1]]) / 5)

  console.log(`%c${entry.emoji} ${entry.code} • ${entry.name}`, 'font-weight: bold')
  console.log(
    `%c${padStart(last7days[6], 10)}:  ${padStart(numeral(total).format('0,000'), 6)}`
    + ` ${padStart('+' + numeral(entry.daily.deaths[last7days[6]]).format('0,000'), 6)}`
    + `    v: ${padStart(numeral(velocity).format('0.000'), 7)}`
    + `    acc: ${padStart(numeral(acceleration).format('0.000'), 6)}`,
    'color: #000'
  )
  console.log(`        with delta: ${numeral(accelerationDelta).format('0.000')} acc per day, days: ${dayCount}`)

  let projectedDates = last7days

  let totals = {}
  let velocities = {}
  let accelerations = {}
  projectedDates.forEach(d => {
    totals[d] = entry.totals.deaths[d]
    velocities[d] = entry.velocity.deaths[d]
    accelerations[d] = entry.acceleration.deaths[d]
  })

  let table = []

  let weekLater, date, dateObj, newTotal, daily
  for (let index = 0; index < dayCount; index++) {
    date = projectedDates[index]

    dateObj = DateTime.fromISO(date)
    dateObj = dateObj.plus({days: 7})
    weekLater = dateObj.toISODate()
    projectedDates = projectedDates.concat(weekLater)

    acceleration = acceleration + accelerationDelta
    velocity = velocity + acceleration

    newTotal = Math.max(total, totals[date] + Math.pow(10, velocity))
    totals[weekLater] = newTotal
    daily = newTotal - total
    total = newTotal

    table.push({
      date: weekLater,
      dateObj,
      total,
      daily,
      v: velocity,
      acc: acceleration,
      explain: `(on ${date}: ${numeral(entry.totals.deaths[date]).format('0,000')} * 10^${numeral(velocity).format('0.000')} = ${numeral(total).format('0,000')})`
    })
  }
  last7days.forEach((date, index) => {

  })

  table.forEach(row => {
    console.log(
      `%c${padStart(`${row.dateObj.month}/${row.dateObj.day}`, 10)}:  ${padStart(numeral(row.total).format('0,000'), 6)}`
      + ` ${padStart((row.daily > 0 ? '+' : '' ) + numeral(row.daily).format('0,000'), 6)}`
      + `    v: ${padStart(numeral(row.v).format('0.000'), 7)}`
      + `    acc: ${padStart(numeral(row.acc).format('0.000'), 6)}`,
      'color: #777'
    )
  })

  return table
}
