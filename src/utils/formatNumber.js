function formatNumber (x, i18n) {
  let separator = ','
  if (i18n) {
    separator = i18n.t('number.thousands_separator', ',')
  }

  if (x !== undefined && x !== null) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  } else {
    return ''
  }
}

export default formatNumber
