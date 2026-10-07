Module.comedian = {
  render: (comedians) => {

    if (!comedians?.length) {
      return false
    }

    const html = comedians.map(comedian => {
      const user_public_id = comedian.id,
            joined_events = comedian.joined_events,
            applied_events = comedian.applied_events

      if (joined_events?.length) {
        joined_events.forEach(joined_event => {
          const event = Var.event_map.get(joined_event)

          if (event) {
            event.joined_comedians ??= new Set()
            event.joined_comedians.add(user_public_id)
          }
        })
      }

      if (applied_events?.length) {
        applied_events.forEach(applied_event => {
          const event = Var.event_map.get(applied_event)

          if (event) {
            event.applied_comedians ??= new Set()
            event.applied_comedians.add(user_public_id)
          }
        })
      }

      return `
        <li data-user-id="${user_public_id}">
          <div class="users-unit">
            <figure>
              <a class="js-modal-view" data-view="comedian" data-id="${user_public_id}" href="./?view=comedians&modal=comedian&id=${user_public_id}">
                <img src="${comedian.thumbnail}" onerror="this.style.opacity=0;">
              </a>
            </figure>
            <dl>
              <dt>
                <a class="js-modal-view" data-view="comedian" data-id="${user_public_id}" href="./?view=comedians&modal=comedian&id=${user_public_id}">${comedian.name}</a>
              </dt>
              <dd>
                ${(!comedian.instagram || comedian.instagram === '')? `` : `
                  <a href="https://www.instagram.com/${comedian.socialmedia.instagram}"><i class="fa-brands fa-instagram"></i></a>
                `}
                ${(comedian.socialmedia.tiktok === "")? `` : `
                  <a href="https://www.tiktok.com/@${comedian.socialmedia.tiktok}"><i class="fa-brands fa-tiktok"></i></a>
                `}
                ${(comedian.socialmedia.youtube === "")? `` : `
                  <a href="https://www.youtube.com/@${comedian.socialmedia.youtube}"><i class="fa-brands fa-youtube"></i></a>
                `}
                ${(comedian.socialmedia.x === "")? `` : `
                  <a href="https://x.com/${comedian.socialmedia.x}"><i class="fa-brands fa-x-twitter"></i></a>
                `}
                <a class="js-modal-view" data-view="comedian" data-id="${user_public_id}" href="./?view=comedians&modal=comedian&id=${user_public_id}"><i class="fa-solid fa-ellipsis"></i></a>
              </dd>
            </dl>
          </div>
        </li>
      `
    }).join('')

    $('.js-users-list').html(html)
  }
}