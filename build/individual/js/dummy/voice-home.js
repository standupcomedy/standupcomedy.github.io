$(()=>{
  let i = 0,
      html = ''

  for (i = 0; i < 5; i++) {
    const user_id = i

    html += `
      <li>
        <figure>
          <a class="js-modal-view" data-view="user" data-id="${user_id}">
            <img src="" onerror="this.style.opacity=0;">
          </a>
        </figure>
        <div>
          <p>これはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテスト</p>
          <span>2026-8-8 13:03</span>
        </div>
      </li>
    `
  }

  $('.js-voice-home').html(html)
})