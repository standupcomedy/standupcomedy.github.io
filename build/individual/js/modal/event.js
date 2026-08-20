Module.modal = Module.modal || {}

Module.modal.getEventHtml = (event_id) => {
  const info = Var.event_map.get(event_id),
        venue = Var.venue_map.get(info?.venue_id)

  const comedians = (!info) ? null : new Set([
    ...(info.joined_comedians ?? []),
    ...(info.applied_comedians ?? [])
  ])

  return (!info)? `
    <div class="event"></div>
    ` : `
    <div class="event" data-event="${info.type.value}" data-status="${info.status}">
      <p class="event-type">
        <span class="event-${info.type.value}">${info.type.label}</span>
      </p>
      <p class="event-name">${info.name}</p>
      <p class="event-date">
        <span class="event-day">${info.date.label}</span>
        <span class="event-time">
          <span>OEPN: ${info.open}</span>
          <span>START: ${info.start}</span>
        </span>
      </p>
      ${(Var.login.profiles.includes('comedian') && info.message) ? `
        <p class="event-message">${info.message}</p>
      ` : ``}
      <div class="event-table">
        <table>
          <tr>
            <th>料金</th>
            <td>${info.fee}</td>
          </tr>
          <tr>
            <th>会場</th>
            <td>
              ${(!venue) ? `未定` : `
                <p class="event-place-name">
                  <a class="js-section-view" data-view="map" data-id="${venue.venue_id}" data-lat=${venue.latlng.lat} data-lng=${venue.latlng.lng}  href="./?view=map&venue_id=${venue.venue_id}&lat=${venue.latlng.lat}&lng=${venue.latlng.lng}">${venue.name}（地図）</a>
                </p>
                <p class="event-place-addr">${venue.address}</p>
                <p class="event-place-station">
                  ${venue.station.map(text => `<span>${text}</span>`).join('')}
                </p>
                <div class="event-place-socialmedia">
                  <dl>
                    <dt>会場ソーシャルメディア</dt>
                    <dd>
                      ${(venue.socialmedia.instagram === "")? `` : `
                        <a href="https://www.instagram.com/${venue.socialmedia.instagram}"><i class="fa-brands fa-instagram"></i></a>
                      `}
                      ${(venue.socialmedia.x === "")? `` : `
                        <a href="https://x.com/${venue.socialmedia.x}"><i class="fa-brands fa-x-twitter"></i></a>
                      `}
                      ${(venue.socialmedia.tiktok === "")? `` : `
                        <a href="https://www.tiktok.com/@${venue.socialmedia.tiktok}"><i class="fa-brands fa-tiktok"></i></a>
                      `}
                      ${(venue.socialmedia.youtube === "")? `` : `
                        <a href="https://www.youtube.com/@${venue.socialmedia.youtube}"><i class="fa-brands fa-youtube"></i></a>
                      `}
                    </dd>
                  </dl>
                </div>
              `}
            </td>
          </tr>
        </table>
      </div>
      ${(!comedians) ? `` : `
        <ul class="event-member">
          ${[...comedians].map(user_id => {
            const comedian = Var.comedian_map.get(user_id)

            return `
              <li>
                <a class="js-modal-view" data-view="user" data-id="${comedian?.user_id}" href="./?view=users&modal=user&user_id=${comedian?.user_id}">
                  <img src="${comedian?.thumbnail}" onerror="this.style.opacity=0;">
                </a>
              </li>
            `
          }).join('')}
        </ul>
      `}
      <img class="event-image" src="${info.image}" onerror="this.style.display='none';">
      <nav class="event-nav-outer">
        ${(!Var.login.profiles.includes('comedian')) ? `` : `
          <div class="event-nav">
            <button type="button" class="js-modal-view" data-view="edit-event" data-id="${event_id}">編集</button>
          </div>
        `}
        ${(!Var.login.profiles.includes('comedian') || 'TODO' == '参加条件を満たしている場合') ? `` : `
          <div class="event-nav">
            <button type="button" data-id="${event_id}">参加する</button>
          </div>
        `}
        <div class="event-nav">
          <button type="button" data-id="${event_id}">マイカレに追加</button>
        </div>
      </nav>
    </div>
  `
}
