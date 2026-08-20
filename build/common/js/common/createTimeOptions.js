Fn.createTimeOptions = function (start = 0, end = 23, step = 1) {
  let options = ''

  for (let i = start; i <= end; i += step) {
    const value = String(i).padStart(2, '0')
    options += `<option value="${value}">${value}</option>`
  }

  return options
}