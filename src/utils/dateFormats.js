export function formatDateMonthDD (d, i18n) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    if (i18n) {
      return i18n.t('date.format.month_dd', '{{month}} {{day}}', {
        month: i18n.t(`date.months.${parts[1]}`, MONTHS[parts[1]]),
        day: parts[2]
      })
    } else {
      return `${MONTHS[parts[1]]} ${parts[2]}`
    }
  } else {
    return d
  }
}
export function formatDateMonthAbbrDD (d, i18n) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    if (i18n) {
      return i18n.t('date.format.month_abbr_dd', '{{month}} {{day}}', {
        month: i18n.t(`date.months_abbr.${parts[1]}`, ABBREVIATED_MONTHS[parts[1]]),
        day: parts[2]
      })
    } else {
      return `${ABBREVIATED_MONTHS[parts[1]]} ${parts[2]}`
    }
  } else {
    return d
  }
}

export function formatDateWeekdayAbbrDD (d, i18n) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    if (i18n) {
      return i18n.t('date.format.abbr_weekday_dd', '{{weekday}} {{day}}', {
        weekday: i18n.t(`date.weekdays_abbr.${parts[1]}`, ABBREVIATED_WEEKDAYS[parts[1]]),
        day: parts[2]
      })
    } else {
      return `${ABBREVIATED_WEEKDAYS[parts[1]]} ${parts[2]}`
    }
  } else {
    return d
  }
}

export function formatDateMonDD (d) {
  let parts = d.match(/(\d+)\/(\d+)\/(\d+)/)

  if (parts) {
    return `${ABBREVIATED_MONTHS[parts[1]]} ${parts[2]}`
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
