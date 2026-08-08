$(() => {

  // アイコンセット（https://lucide.dev/icons/）
  // NOTICE: 非同期でHTMLを追加するたびに、lucideアイコンを使用する場合には別途実行すること
  lucide.createIcons()

  const _body = $('body'),
        _tabbar = $('.js-tabbar'),
        _modal_outer = $('.js-modal-outer')

  let modal_z_index = 0

  // フッタークローン
  $('.js-footer-clone').replaceWith($('.js-footer').clone(true))

  // カレンダービュー
  $('.js-calendar-view').on('click', function () {
    const _this = $(this),
          _p = _this.closest('.js-section'),
          _tgt = $('.js-calendar', _p),
          val = _this.val()

    $('.js-calendar-view', _p).removeClass('focus')
    _this.addClass('focus')
    _tgt.attr('data-view', val)
  })

  // ユーザービュー
  $('.js-users-view').on('click', function () {
    $('.js-users-view').removeClass('focus')
    $(this).addClass('focus')
    $('.js-users-list').attr('data-view', $(this).val())
  })

  // 画面切り替え
  $('.js-section-view').on('click', function () {
    const section = $(this).attr('data-section')

    if ($(`.js-section-view[data-section="${section}"]`, _tabbar).length > 0) {
      _body.attr('data-section', section).removeAttr('data-sub')
      $('.js-section-view').removeClass('focus')
      $(this).addClass('focus')
    } else {
      _body.attr('data-sub', section)
    }

    return false
  })

  $('.js-sub-close').on('click', function () {
    $(`.js-section-view[data-section="${$(this).attr('data-section')}"]`).removeClass('focus')
    _body.removeAttr('data-sub')
    return false
  })

  // モーダル（非表示）
  $(document).on('click', '.js-modal-close', function () {
    $(this).closest('.js-modal').removeClass('show')
    return false
  })

  // モーダル（表示）
  $(document).on('click', '.js-modal-view', function () {
    const modal_type = $(this).attr('data-view'),
          modal_id = $(this).attr('data-id')

    let tgt = $((`.js-modal[data-view="${modal_type}"]`)),
        modal_content

    modal_z_index++

    if (modal_type === 'user') {
      if (!modal_id) {
        return false
      }
    }

    if (tgt.length > 0) {

      // TODO modal_type = user のとき ユーザー情報をセットする

      tgt.css('z-index', modal_z_index).addClass('show')
    } else {
      _modal_outer.append(`
        <div class="modal js-modal" data-view="${modal_type}" style="z-index: ${modal_z_index};">
          <div class="modal-inner">
            <div class="modal-content">
              <div class="modal-content-inner">
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

      // とりあえずモーダルを表示する
      setTimeout(() => {
        tgt.addClass('show')
      }, 10)

      tgt = $((`.js-modal[data-view="${modal_type}"]`))

      modal_content = Module.modal[modal_type]

      $('.js-modal-content', tgt).html(modal_content)

      // TODO modal_type = user のとき ユーザー情報をセットする

      lucide.createIcons()
      $('.js-modal-content', tgt).removeClass('loading')
    }

    return false
  })
})
