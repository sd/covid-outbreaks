
export function totalizeEntries (data, dates) {
  let totalsEntry = {
    name: 'TOTAL',
    daily: { deaths: {}, cases: {} },
    totals: { deaths: {}, cases: {} },
    percent: { deaths: {}, cases: {} },

    latestTotal: {},
    latestDaily: {}

  }

  let lastDate = dates.slice(-1)

  const fieldNames =  ['deaths', 'cases']

  data.forEach(entry => {
    dates.forEach(d => {
      fieldNames.forEach(fieldName => {
        let value = entry.daily[fieldName][d]

        if (value === undefined || value === null || value < totalsEntry.latestDaily[fieldName]) {
          value = (d === lastDate) ? (totalsEntry.latestDaily[fieldName] || 0) : undefined
        }

        if (entry.daily[fieldName][d] || entry.daily[fieldName][d] === 0) {
          totalsEntry.daily[fieldName][d] = (totalsEntry.daily[fieldName][d] || 0) + entry.daily[fieldName][d]
          totalsEntry.totals[fieldName][d] = (totalsEntry.totals[fieldName][d] || 0) + entry.totals[fieldName][d]

          totalsEntry.latestTotal[fieldName] = (totalsEntry.latestTotal[fieldName] || 0) + entry.daily[fieldName][d]
        }

        if (totalsEntry.daily && totalsEntry.daily[fieldName][d]) {
          totalsEntry.latestDaily[fieldName] = totalsEntry.daily[fieldName][d]
        }
      })
    })
  })

  fieldNames.forEach(fieldName => {
    let latestDaily = undefined
    dates.forEach(d => {

      if (latestDaily > 0) {
        totalsEntry.percent[fieldName][d] = Math.round(((totalsEntry.daily[fieldName][d] / latestDaily) - 1) * 100)
      }
      latestDaily = totalsEntry.daily[fieldName][d]
    })
  })

  return totalsEntry
}
