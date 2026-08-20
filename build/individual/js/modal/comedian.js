Module.modal = Module.modal || {}

Module.modal.getComedianHtml = (user_id) => {
  const info = Var.comedian_map.get(user_id)

  info.joined_events || []
  info.applied_events || []

  // TODO login comedian||venue_manager の場合
  const events_id = [
    ...(info.joined_events ?? []),
    ...((1==1) ? (info.applied_events ?? []) : [])
  ]

  const events = events_id
    .map(event_id => Var.event_map.get(event_id))
    .filter(Boolean)

  return (!info) ? `` : `
    <section class="user">
      <div class="user-header">
        <figure>
          <img src="${info.thumbnail}" onerror="this.style.opacity=0;">
        </figure>
        <dl>
          <dt>${info.name}</dt>
          <dd>
            ${(info.socialmedia.instagram === "")? `` : `
              <a href="https://www.instagram.com/${info.socialmedia.instagram}"><i class="fa-brands fa-instagram"></i></a>
            `}
            ${(info.socialmedia.tiktok === "")? `` : `
              <a href="https://www.tiktok.com/@${info.socialmedia.tiktok}"><i class="fa-brands fa-tiktok"></i></a>
            `}
            ${(info.socialmedia.youtube === "")? `` : `
              <a href="https://www.youtube.com/@${info.socialmedia.youtube}"><i class="fa-brands fa-youtube"></i></a>
            `}
            ${(info.socialmedia.x === "")? `` : `
              <a href="https://x.com/${info.socialmedia.x}"><i class="fa-brands fa-x-twitter"></i></a>
            `}
          </dd>
        </dl>
      </div>

      ${(Var.login?.user_id === user_id) ? `
        <div class="user-login js-user-login">
          <div class="user-profile-outer">
            <div class="user-profile">
              <button type="button" class="js-modal-view" data-view="profile-comedian">プロフィールを編集</button>
            </div>
          </div>
          <form class="user-textarea js-form-voice js-inputtext">
            <div class="user-form">
              <textarea class="js-inputtext-element"></textarea>
              <button type="submit" class="js-inputtext-submit">
                <i data-lucide="send-horizontal"></i>
              </button>
            </div>
            <div class="user-textarea-count form-count">
              <span class="js-inputtext-count" data-max="140">0</span> / 140
            </div>
          </form>
        </div>
      ` : ''}

      <div class="voice">
        <ul class="js-voice-primary" data-id="${user_id}"></ul>
      </div>

      ${(!events.length ? `` : `
        <div class="calendar user-calendar" data-view="list">
          <ul class="calendar-days">
            ${[...events]
              .sort((a, b) => a.date.value - b.date.value)
              .map(event => {
                const event_id = event.event_id

                return `
                  <li data-ymd="${event.date.value}">
                    <div class="calendar-date" data-day="${event.date.day}">
                      <span class="calendar-month">${event.date.month}<span class="calendar-date-unit">月</span></span>
                      <span class="calendar-day">${event.date.day}<span class="calendar-date-unit">日</span></span>
                      <span class="calendar-weekday">${event.date.week}</span>
                    </div>
                    <div>
                      <div class="calendar-event-unit" data-type="${event.type.value}" data-status="${event.status}">
                        <a class="js-modal-view" data-view="event" data-id="${event_id}" href="./?view=events&modal=event&event_id=${event_id}">
                          <p class="calendar-event-unit-type">
                            <span class="calendar-event-unit-tag">
                              <span class="event-${event.type.value}">${event.type.label}</span>
                            </span>
                            <span class="calendar-event-unit-time">
                              <span>OPEN ${event.open}</span>
                              <span>START ${event.start}</span>
                            </span>
                          </p>
                          <p class="calendar-event-unit-name">${event.name}</p>
                          <p class="calendar-event-unit-venue">
                            ${(Var.venue_map.has(event.venue_id))? Var.venue_map.get(event.venue_id).name : `（場所未定）`}
                          </p>
                        </a>
                      </div>
                    </div>
                  </li>
                `
              })
              .join('')
            }
          </ul>
        </div>
      `)}

      <div class="voice">
        <ul class="js-voice-secondary" data-id="${user_id}"></ul>
        <div class="voice-more-outer js-voice-more-outer">
          <button class="js-voice-more" type="button" data-id="${user_id}">MORE</button>
        </div>
      </div>

      ${(Var.login?.user_id === user_id) ? `` : `
        <nav class="user-nav-outer">
          <div class="user-nav">
            <button type="button" class="js-user-view" value="user">フォローする</button>
          </div>
        </nav>
      `}
    </section>
  `
}
