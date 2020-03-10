function formatNumber (x) {
  if (x !== undefined && x !== null) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else {
    return ''
  }
}

export default formatNumber
