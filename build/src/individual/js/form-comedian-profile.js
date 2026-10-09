$(() => {
  $(document).on('submit', '.js-form-comedian-profile', function () {
    const form_data = new FormData(this)

    const submit_btn = $('.js-submit-comedian-profile'),
          submit_btn_text = submit_btn.html(),
          submit_btn_width = submit_btn.outerWidth()

    let is_fetch_success

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
        is_fetch_success = true
        Var.comedian_profile = data.comedian
      } else {
        console.log(data.error)
      }
    })
    .finally(() => {
      Fn.afterSave(submit_btn, is_fetch_success)
      submit_btn.html(submit_btn_text)
    })

    return false
  })
})


$(() => {
  $(document).on('submit', '.js-form-comedian-thumbnail', function () {
    const form_data = new FormData(this)

    const submit_btn = $('.js-submit-comedian-thumbnail'),
          submit_btn_text = submit_btn.html(),
          submit_btn_width = submit_btn.outerWidth()

    let is_fetch_success

    submit_btn.css({'min-width': submit_btn_width}).html('<span class="animation-spin center-spin"><i data-lucide="loader-circle"></i></span>')
    lucide.createIcons()

    fetch(`${Var.api_base_url}/comedian_thumbnail?service=standup`, {
      method: 'POST',
      body: form_data,
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {

      if (data.success) {
        is_fetch_success = true
        Var.comedian_profile.thumbnail = data.comedian.thumbnail
        Var.comedian_profile.status = data.comedian.status
      } else {
        console.log(data.error)
      }
    })
    .finally(() => {
      Fn.afterSave(submit_btn, is_fetch_success)
      submit_btn.html(submit_btn_text)
    })

    return false
  })

})