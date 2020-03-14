
export function totalizeEntries (data, allDates) {
  let totalsEntry = { name: 'TOTAL' }

  const fieldNames =  ['deaths', 'cases']
  const attrNames = ['totals', 'daily']

  let value
  data.forEach(entry => {
    allDates.forEach(d => {
      attrNames.forEach(attrName => {
        fieldNames.forEach(fieldName => {
          value = entry && entry[attrName] && entry[attrName][fieldName] && entry[attrName][fieldName][d]
          if (value || value === 0) {
            totalsEntry[attrName] = totalsEntry[attrName] || {}
            totalsEntry[attrName][fieldName] = totalsEntry[attrName][fieldName] || {}

            totalsEntry[attrName][fieldName][d] = (totalsEntry[attrName][fieldName][d] || 0) + value
          }
        })
      })

      fieldNames.forEach(fieldName => {
        if (totalsEntry.latestDaily && totalsEntry.latestDaily[fieldName] > 0) {
          totalsEntry.percent = totalsEntry.percent || {}
          totalsEntry.percent[fieldName] = totalsEntry.percent[fieldName] || {}

          totalsEntry.percent[fieldName][d] = Math.round(
            ((totalsEntry.daily[fieldName][d] / totalsEntry.latestDaily[fieldName]) - 1) * 100
          )
        }
      })

      totalsEntry.latestTotal = totalsEntry.latestTotal || {}
      if (totalsEntry.totals && totalsEntry.totals.deaths[d]) {
        totalsEntry.latestTotal.deaths = totalsEntry.totals.deaths[d]
      }
      if (totalsEntry.totals && totalsEntry.totals.cases[d]) {
        totalsEntry.latestTotal.cases = totalsEntry.totals.cases[d]
      }

      totalsEntry.latestDaily = totalsEntry.latestDaily || {}
      if (totalsEntry.daily && totalsEntry.daily.deaths[d]) {
        totalsEntry.latestDaily.deaths = totalsEntry.daily.deaths[d]
      }
      if (totalsEntry.daily && totalsEntry.daily.cases[d]) {
        totalsEntry.latestDaily.cases = totalsEntry.daily.cases[d]
      }
    })
  })

  return totalsEntry
}
