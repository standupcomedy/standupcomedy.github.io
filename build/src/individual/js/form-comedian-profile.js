$(() => {
  $(document).on('submit', '.js-form-comedian-profile', function () {
    const form_data = new FormData(this)

    const submit_btn = $('.js-submit-comedian-profile'),
          submit_btn_text = submit_btn.html(),
          submit_btn_width = submit_btn.outerWidth()

    let is_fetch_success;

    submit_btn.css({'min-width': submit_btn_width}).html('<span class="animation-spin center-spin"><i data-lucide="loader-circle"></i></span>')
    lucide.createIcons()

    fetch(`${Var.api_base_url}/comedian?service=standup`, {
      method: 'POST',
      body: form_data,
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {

      if (data.success) {
        console.log(data)
        is_fetch_success = true
      } else {
        console.log(data.error)
      }
    })
    .finally(() => {
    })

    return false
  })
})

$(() => {
  $(document).on('submit', '.js-form-comedian-thumbnail', function () {
    const form_data = new FormData(this)

    fetch(
      `${Var.api_base_url}/comedian_thumbnail?service=standup`,
      {
        method: 'POST',
        body: form_data,
        credentials: 'include'
      }
    )
    .then(response => {
    console.log('status:', response.status)
    console.log('content-type:', response.headers.get('content-type'))

    return response.text()
  })
  .then(data => {
    console.log('response:', data)
  })
  .catch(error => {
    console.error(error)
  })
    .finally(() => {
    })

    return false
  })

})