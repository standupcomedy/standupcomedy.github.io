$(() => {

  // モーダル（非表示）
  $(document).on('click', '.js-modal-close', function () {
    $(this).closest('.js-modal').removeClass('show')
    return false
  })

  // モーダル（表示）
  $(document).on('click', '.js-modal-view', async function () {
    const modal_type = $(this).attr('data-view'),
          modal_id = $(this).attr('data-id')

    showModal(modal_type, modal_id)
    return false
  })

  // モーダル（イベント新規作成・編集 候補日時を追加する）
  $(document).on('click', '.js-form-add-datetime', () => {
    const _tgt = $('.js-form-datetime:last-child'),
          val_h = $('select[name="hour"]', _tgt).val(),
          val_m = $('select[name="minute"]', _tgt).val(),
          _clone = _tgt.clone()

    $('select[name="hour"]', _clone).val(val_h)
    $('select[name="minute"]', _clone).val(val_m)

    _tgt.after(_clone)
  })

  $(document).on('click', '.js-form-delete-datetime', function () {

    if ($('.js-form-datetime').length < 2) {
      return
    }

    const _this = $(this)

    $(this).closest('.js-form-datetime').fadeOut(function () {
      $(this).remove()
    })
  })

  // モーダル（コメディアンのコメント more）
  $(document).on('click', '.js-voice-more', async function () {
    const _this = $(this),
          user_id = _this.attr('data-id'),
          num = _this.attr('data-num')

    _this.addClass('animation-blinker')

    const data_comment = await Fn.api('./assets/dummy/comments2.js')

    // TODO データ取得に成功したらの処理 try error か if文 すべてのajaxが対象

    Module.comment.render(data_comment)
    Var.comments[user_id].num = data_comment.num
    Var.comments[user_id].has_more = data_comment.has_more
    Var.comments[user_id].comments.push(...data_comment.comments)

    _this.removeClass('animation-blinker')
    lucide.createIcons()
  })
})