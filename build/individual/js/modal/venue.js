Module.modal = Module.modal || {}

Module.modal.getVenueHtml = (venue_id) => {
  const info = Var.venue_map.get(venue_id),
        events = Var.event_venue_map.get(venue_id) ?? []

  return (!info) ? `` : `
    <section class="venue">
      <div class="venue-header">
        <dl>
          <dt>${info.name}</dt>
          <dd class="venue-addr-station">
              <p class="venue-addr">${info.address}</p>
              <p class="venue-station">
                ${info.station.map(text => `<span>${text}</span>`).join('')}
              </p>
          </dd>
          <dd>
            <a class="js-section-view" data-view="map" data-id="${venue_id}" data-lat=${info.latlng.lat} data-lng=${info.latlng.lng} href="./?view=map&venue_id=${venue_id}&lat=${info.latlng.lat}&lng=${info.latlng.lng}"><i class="fa-solid fa-location-dot"></i></a>

            ${(info.socialmedia.instagram === "")? `` : `
              <a href="https://www.instagram.com/${info.socialmedia.instagram}"><i class="fa-brands fa-instagram"></i></a>
            `}
            ${(info.socialmedia.x === "")? `` : `
              <a href="https://x.com/${info.socialmedia.x}"><i class="fa-brands fa-x-twitter"></i></a>
            `}
            ${(info.socialmedia.tiktok === "")? `` : `
              <a href="https://www.tiktok.com/@${info.socialmedia.tiktok}"><i class="fa-brands fa-tiktok"></i></a>
            `}
            ${(info.socialmedia.youtube === "")? `` : `
              <a href="https://www.youtube.com/@${info.socialmedia.youtube}"><i class="fa-brands fa-youtube"></i></a>
            `}
          </dd>
        </dl>
      </div>

      ${(Var.login.profiles.includes('comedian') || Var.login.profiles.includes('venue_manager')) ? `
        <div class="venue-login js-user-login">
          <div class="venue-profile">
            <button type="button" class="js-modal-view" data-view="profile-venue">場所情報を編集</button>
          </div>
        </div>
      ` : ''}

      ${(!events.length)? `` : `
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
                            ${info.name ??= '（場所未定）'}
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
      `}

      <nav class="venue-nav-outer">
        <div class="venue-nav">
          <button type="button" class="js-user-view" value="venue">フォローする</button>
        </div>
      </nav>
    </section>
  `
}
