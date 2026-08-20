Module.notice = {
  render: (notices) => {

    if (notices.length === 0) {
      return false
    }

    const html = notices.map(notice => {
      return `
        <tr>
          <th>${notice.date}</th>
          <td>${notice.text}</td>
        </tr>
      `
    }).join('')

    $('.js-news-content').html(html)
    $('.js-news').show()
  }
}