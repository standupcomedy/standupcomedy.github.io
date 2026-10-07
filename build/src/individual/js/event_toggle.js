$(() => {

  $(document).on('click', '.js-form-toggle-button', function () {
    const _this = $(this)
          status = _this.attr('data-status'),
          next_status = (status === 'on') ? 'off' : 'on'

    $('input', _this).val((next_status === 'on')? 1 : 0)
    _this.closest('.js-form-toggle').attr('data-status', next_status)
    _this.attr('data-status', next_status)
  })
})