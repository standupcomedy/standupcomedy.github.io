$(() => {
  $(document).on('submit', '.js-form-voice', function () {
    const _this = $(this),
          _textarea = $('.js-inputtext-element', _this),
          _submit_button = $('.js-inputtext-submit', _this),
          _count = $('.js-inputtext-count', _this)

    const val = _textarea.val(),
          max_count = _count.attr('data-max') ?? 140

    // ガード
    if ([...val.trim()].length === 0) {
      return false
    }

    // ガード
    if ([...val].length > max_count) {
      return false
    }

    _submit_button.addClass('animation-blinker')


    /* TODO  */
    setTimeout(() => {
      _textarea.val('')
      _submit_button.removeClass('is-able').removeClass('animation-blinker')

      const _li = $(`
        <li>
          <div>
            <p></p>
            <div class="voice-nav">
              <span>NOW</span>
            </div>
          </div>
        </li>
      `)

      _li.find('p').text(val.trim())
      $('.js-voice-primary').prepend(_li)
    }, 1000)

    return false
  })
})