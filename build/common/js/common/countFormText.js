/**
 * input.text や textarea の文字数をカウントする
 * Notice: コーディング・サンプル

<div class="js-inputtext">
  <textarea class="js-inputtext-element"></textarea>
  <span class="js-inputtext-count"></span>
  <button class="js-inputtext-submit">送信</button>
</div>

 */
Fn.countFormText = () => {
  $(document).on('input', '.js-inputtext-element', function () {
    const _this = $(this),
          _parent = _this.closest('.js-inputtext'),
          _count = $('.js-inputtext-count', _parent),
          _submit_button = $('.js-inputtext-submit', _parent)

    const val = _this.val(),
          max_count = _count.attr('data-max') ?? 140,
          count = [...val].length

    _count.text(count)

    if (count > max_count) {
      _count.addClass('is-over')
      _submit_button.removeClass('is-able')
    } else {
      _count.removeClass('is-over')
    }

    if ([...val.trim()].length > 0 && count <= max_count) {
      _submit_button.addClass('is-able')
    } else {
      _submit_button.removeClass('is-able')
    }
  })
}