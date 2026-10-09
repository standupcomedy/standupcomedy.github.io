$(() => {

  $(document).on('click', '.js-form-toggle-button', function () {
    const _this = $(this)
          role = _this.attr('data-role'),
          current_status = _this.attr('data-status'),
          next_status = (current_status === 'on') ? 'off' : 'on'


    // ガード
    if (!(role === 'comedian' || role === 'venue_manager')) {
      return false
    }

    Fn.setToggleBtnRoll(role, next_status)

    fetch(`${Var.api_base_url}/role?service=standup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        role: role,
        status: (next_status === 'on') ? 'active' : 'inactive'
      })
    })
    .then(response => response.json())
    .then(data => {

      if (!data.success) {

        // ロールバック
        setTimeout(() => {
          Fn.setToggleBtnRoll(role, current_status)
        }, 200)
        return
      }
    })
  })
})