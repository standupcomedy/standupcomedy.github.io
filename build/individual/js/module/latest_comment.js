Module.latest_comment = {
  render: (latest_comments) => {

    if (latest_comments.length === 0) {
      return false
    }

    const html = latest_comments.map(comment => {
      const comedian = Var.comedian_map.get(comment.user_id)

      return `
        <li>
          <figure>
            <a class="js-modal-view" data-view="user" data-id="${comment.user_id}" href="./?view=users&modal=user&user_id=${comment.user_id}">
              <img src="${comedian?.thumbnail}" onerror="this.style.opacity=0;">
            </a>
          </figure>
          <div>
            <p>${comment.text}</p>
            <div class="voice-nav">
              <span>${comment.date}</span>
            </div>
          </div>
        </li>
      `
    }).join('')

    $('.js-voice-home').html(html)
  }
}