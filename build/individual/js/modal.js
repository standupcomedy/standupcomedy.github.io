$(() => {
  const _modal_outer = $('.js-modal-outer')

  let modal_z_index = 0

  // モーダル（非表示）
  $(document).on('click', '.js-modal-close', function () {
    $(this).closest('.js-modal').removeClass('show')
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

  // モーダル（表示）
  $(document).on('click', '.js-modal-view', async function () {
    const modal_type = $(this).attr('data-view'),
          modal_id = $(this).attr('data-id')

    let tgt = $((`.js-modal[data-view="${modal_type}"]`)),
        modal_content = ''

    modal_z_index++

    // ガード
    if (modal_type === 'user') {
      if (!modal_id) {
        return false
      }
    }

    if (tgt.length === 0) {
      _modal_outer.append(`
        <div class="modal js-modal" data-view="${modal_type}" style="z-index: ${modal_z_index};">
          <div class="modal-inner">
            <div class="modal-content">
              <div class="modal-content-inner js-modal-content-scroll">
                <div class="modal-content-main js-modal-content loading">
                  <i data-lucide="loader-circle"></i>
                </div>
              </div>
            </div>
            <a class="modal-close js-modal-close">
              <i data-lucide="x"></i>
            </a>
          </div>
        </div>
      `)
      lucide.createIcons()

      tgt = $((`.js-modal[data-view="${modal_type}"]`))

      setTimeout(() => {
        tgt.addClass('show')
      }, 10)
    } else {
      tgt.css('z-index', modal_z_index).addClass('show')
    }

    switch (modal_type) {
      case 'user':
      case 'venue':
      case 'event':
        $('.js-modal-content', tgt).addClass('loading').html(`<i data-lucide="loader-circle"></i>`)

        $('.js-modal-content-scroll').scrollTop(1)

        switch (modal_type) {
          case 'user':
            modal_content = Module.modal.getComedianHtml(modal_id)
            break
          case 'venue':
            modal_content = Module.modal.getVenueHtml(modal_id)
            break
          case 'event':
            modal_content = Module.modal.getEventHtml(modal_id)
            break

          // defaultなし
        }
        break

      default:
        modal_content = Module.modal[modal_type]
    }

    $('.js-modal-content', tgt).html(modal_content).removeClass('loading')

    switch (modal_type) {
      case 'user':
        Var.comments ??= {}

        if (!Var.comments[modal_id]) {
          Var.comments[modal_id] = await Fn.api('./assets/dummy/comments.js')
        }

        Module.comment.render(Var.comments[modal_id])
        break

      case 'edit-event':
        $('.js-modal-content-scroll').scrollTop(1)
        break

      // defaultなし
    }

    lucide.createIcons()

    return false
  })
})