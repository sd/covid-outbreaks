export function formatDateMonDD (d) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    return `${ABBREVIATED_MONTHS[parts[1]]} ${parts[2]}`
  } else {
    return d
  }
}

export function formatDateMonthDD (d) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    return `${MONTHS[parts[1]]} ${parts[2]}`
  } else {
    return d
  }
}

export function formatDateMMDD (d) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    return `${parts[1]}/${parts[2]}`
  } else {
    return d
  }
}

export function formatDateISO (d) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    return `20${parts[3]}${parts[1]}${parts[2]}`
  } else {
    return d
  }
}

export const MONTHS = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

export const ABBREVIATED_MONTHS = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'Jun',
  '7': 'Jul',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

export const ABBREVIATED_WEEKDAYS = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat',
}
