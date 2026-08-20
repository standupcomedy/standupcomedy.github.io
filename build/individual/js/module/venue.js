Module.venue = {
  render: (venues) => {

    if (!venues.length) {
      return false
    }

    const html_list = [],
          html_map_list = []

    venues.forEach(venue => {
      const venue_id = venue.venue_id

      html_list.push(`
        <li data-venue-id="${venue_id}">
          <dl>
            <dt>
              <a class="js-modal-view" data-view="venue" data-id="${venue_id}" href="./?view=venues&modal=venue&venue_id=${venue_id}">${venue.name}</a>
            </dt>
            <dd class="venues-addr-station">
              <a class="js-modal-view" data-view="venue" data-id="${venue_id}" href="./?view=venues&modal=venue&venue_id=${venue_id}">
                <p class="venue-addr">${venue.address}</p>
                <p class="venue-station">${venue.station.map(text => `<span>${text}</span>`).join('')}</p>
              </a>
            </dd>
            <dd>
              <a class="js-section-view" data-view="map" data-id="${venue_id}" href="./?view=map&venue_id=${venue_id}&lat=${venue.latlng.lat}&lng=${venue.latlng.lng}"><i class="fa-solid fa-location-dot"></i></a>
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
              <a class="js-modal-view" data-view="venue" data-id="${venue_id}" href="./?view=venues&modal=venue&venue_id=${venue_id}"><i class="fa-solid fa-ellipsis"></i></a>
            </dd>
          </dl>
        </li>
      `)

      html_map_list.push(`
        <li data-id="${venue_id}" data-lat="${venue.latlng.lat}" data-lng="${venue.latlng.lng}">
          <div>
            <a>
              <span class="map-place-list-icon"><i class="fa-solid fa-location-dot"></i></span>
              <span class="map-place-list-text">${venue.name}</span>
            </a>
          </div>
        </li>
      `)
    })

    $('.js-venues-list').html(html_list.join(''))
    $('.js-map-place-list').html(html_map_list.join(''))
  }
}