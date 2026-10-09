Fn.afterSave = ($tgt, is_success) => {
  const _submit_toast = $tgt.closest('.js-submit-toast')

  $('.toast', _submit_toast).remove()

  if (is_success) {
    _submit_toast.prepend('<p class="toast toast-success" style="bottom: 28px;">保存しました！</p>')
  } else {
    _submit_toast.prepend('<p class="toast toast-error" style="bottom: 28px;">保存できませんでした</p>')
  }

  setTimeout(() => {
    $('.toast', _submit_toast).remove()
  }, 2000)
}
