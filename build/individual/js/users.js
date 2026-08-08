$(() => {
  let html = '',
      i = 0

  for (i = 0; i < 20; i++) {
    const user_id = i

    html += `
    <li>
      <div class="users-unit">
        <figure>
          <a class="js-modal-view" data-view="user" data-id="${user_id}">
            <img src="" onerror="this.style.opacity=0;">
          </a>
        </figure>
        <dl>
          <dt>なまえなまえ</dt>
          <dd>
            <a href=""><i class="fa-brands fa-youtube"></i></a>
            <a href=""><i class="fa-brands fa-instagram"></i></a>
            <a href=""><i class="fa-brands fa-tiktok"></i></a>
            <a href=""><i class="fa-brands fa-x-twitter"></i></a>
            <a class="js-modal-view" data-view="user" data-id="${user_id}"><i class="fa-solid fa-ellipsis"></i></a>
          </dd>
        </dl>
      </div>
    </li>
  `
  }

  $('.js-users-list').html(html)
})