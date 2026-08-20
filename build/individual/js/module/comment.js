Module.comment = {
  render: (info) => {
    const html_primary = [],
          html_secondary = []

    const user_id = info.user_id,
          comments = info.comments ?? [],
          has_more = info.has_more ?? false,
          num = info.num

    comments.forEach((comment, index) => {

      if (index === 0 && !$(`.js-voice-primary[data-id="${user_id}"] li`).length) {
        html_primary.push(`
          <li data-comment-id="${comment.comment_id}">
            <div>
              <p>${comment.text}</p>
              <div class="voice-nav">
                ${(Var.login?.user_id === user_id) ? `
                  <a>削除</a>
                  ` : ``}
                <span>${comment.date}</span>
              </div>
            </div>
          </li>
        `)
      } else {
        html_secondary.push(`
          <li data-comment-id="${comment.comment_id}">
            <div>
              <p>${comment.text}</p>
              <div class="voice-nav">
                ${(Var.login?.user_id === user_id) ? `
                  <a>削除</a>
                  ` : ``}
                <span>${comment.date}</span>
              </div>
            </div>
          </li>
        `)
      }
    })

    $(`.js-voice-primary[data-id="${user_id}"]`).append(html_primary.join(''))
    $(`.js-voice-secondary[data-id="${user_id}"]`).append(html_secondary.join(''))

    if (has_more) {
      $(`.js-voice-more[data-id="${user_id}"]`).attr('data-num', num + 1)
    } else {
      $(`.js-voice-more[data-id="${user_id}"]`).closest('.js-voice-more-outer').remove()
    }
  }
}