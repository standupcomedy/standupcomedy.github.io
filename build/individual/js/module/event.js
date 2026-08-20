Module.event = {
  render: (events) => {

    if (!events?.length) {
      return false
    }

    events.forEach(event => {
      const event_date = event.date.value,
            event_id = event.event_id

      const venue = Var.venue_map.get(event.venue_id) || {}

      const html = `
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
              ${venue.name ??= '（場所未定）'}
            </p>
          </a>
        </div>
      `

      $(`.js-ymd[data-ymd="${event_date}"] .js-calendar-event`).append(html)
    })
  }
}