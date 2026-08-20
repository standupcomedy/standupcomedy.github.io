$(() => {
  const today = new Date(),
        week = ['日', '月', '火', '水', '木', '金', '土']

  let html = ''

  // 月曜始まり用の空タグ
  const blank_count = (today.getDay() + 6) % 7;

  for (let i = 0; i < blank_count; i++) {
    html += '<li class="calendar-blank"></li>'
  }

  // 表示日数（90日目＋次の日曜まで追加）
  let total_days = 90

  const last_date = new Date(today)

  last_date.setDate(today.getDate() + total_days - 1)

  const last_weekday = last_date.getDay()

  total_days += 7 - last_weekday

  // 今日から表示
  for (let i = 0; i < total_days; i++) {
    const date = new Date(today)

    date.setDate(today.getDate() + i)

    const year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          weekday = week[date.getDay()],
          ymd = year + String(month).padStart(2, '0') + String(day).padStart(2, '0')

    html += `
      <li class="js-ymd" data-ymd="${ymd}">
        <div class="calendar-date" data-day="${day}">
          <span class="calendar-month">${month}<span class="calendar-date-unit">月</span></span>
          <span class="calendar-day">${day}<span class="calendar-date-unit">日</span></span>
          <span class="calendar-weekday">(${weekday})</span>
        </div>
        <div class="js-calendar-event"></div>
      </li>
    `
  }

  html = `<ul class="calendar-header">
    <li>月</li>
    <li>火</li>
    <li>水</li>
    <li>木</li>
    <li>金</li>
    <li>土</li>
    <li>日</li>
  </ul>
  <ul class="calendar-days">${html}</ul>`

  $('.js-calendar').append(html)
})