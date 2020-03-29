import React from 'react'

import { DateTime } from 'luxon'

export function formatDateMonthDD (d) {
  const date = DateTime.fromISO(d)
  return date.toFormat('LLLL d')
}

export function formatDateMMDD (d) {
  const date = DateTime.fromISO(d)
  return date.toLocaleString().replace('/2020', '')
}

export function formatDateMonthAbbrDD (d) {
  const date = DateTime.fromISO(d)
  return date.toFormat('LLL d')
}

export function formatDateWeekdayAbbrDD (d) {
  const date = DateTime.fromISO(d)
  return date.toFormat('EEE d')
}

export function formatDateWeekdayAbbrDDorFirstOfMonth (d) {
  const date = DateTime.fromISO(d)
  if (date.day === 1) {
    return <b>{date.toFormat('LLL d').toUpperCase()}</b>
  } else {
    return date.toFormat('EEE d')
  }
}
