const ls_standup = Fn.storageLS('standup') || {}

$(async () => {
  Fn.countFormText()

  // アイコンセット（https://lucide.dev/icons/）
  // NOTICE: 非同期でHTMLを追加するたびに、lucideアイコンを使用する場合には別途実行すること
  lucide.createIcons()

  const _body = $('body'),
        _tabbar = $('.js-tabbar')

  // フッタークローン
  $('.js-footer-clone').replaceWith($('.js-footer').clone(true))

  // 表示切り替え時に先頭に移動する
  const moveToSectionTop = (_this) => {
    const tgt = _this?.closest('.js-section')

    if (tgt) {
      tgt.scrollTop(1)
    }
  }

  // カレンダービュー（表示切り替え）
  $('.js-calendar-view').on('click', function () {
    const _this = $(this),
          _p = _this.closest('.js-section'),
          _tgt = $('.js-calendar', _p),
          val = _this.val()

    $('.js-calendar-view', _p).removeClass('focus')
    _this.addClass('focus')
    _tgt.attr('data-view', val)

    moveToSectionTop(_this)
  })

  // カレンダービュー（絞り込み）
  $('.js-calendar-switch').on('click', function () {
    const _this = $(this),
          _p = _this.closest('.js-section'),
          _tgt = $('.js-calendar', _p),
          val = _this.val()

    $('.js-calendar-switch', _p).removeClass('focus')
    _this.addClass('focus')
    _tgt.attr('data-filter', val)
  })

  // ユーザーリスト
  $('.js-users-view').on('click', function () {
    const _this = $(this),
          val = _this.val()

    $('.js-users-view').removeClass('focus')
    _this.addClass('focus')

    if (val === 'follow') {
      $('.js-users-list li').addClass('hidden')

      // TODO フォロー中のコメディアンのみ表示する
      $('.js-users-list li[data-user-id="1"]').removeClass('hidden')
      $('.js-users-list li[data-user-id="2"]').removeClass('hidden')
      $('.js-users-list li[data-user-id="3"]').removeClass('hidden')
    } else {
      $('.js-users-list li').removeClass('hidden')
    }

    moveToSectionTop(_this)
  })

  // 場所リスト
  $('.js-venues-view').on('click', function () {
    const _this = $(this),
          val = _this.val()

    $('.js-venues-view').removeClass('focus')
    _this.addClass('focus')

    if (val === 'follow') {
      $('.js-venues-list li').addClass('hidden')

      // TODO フォロー中の場所のみ表示する
      $('.js-venues-list li[data-venue-id="2"]').removeClass('hidden')
      $('.js-venues-list li[data-venue-id="4"]').removeClass('hidden')
      $('.js-venues-list li[data-venue-id="5"]').removeClass('hidden')
    } else {
      $('.js-venues-list li').removeClass('hidden')
    }

    moveToSectionTop(_this)
  })

  // 画面切り替え
  $(document).on('click', '.js-section-view', function () {
    const view = $(this).attr('data-view')

    _body.removeClass('map-edit-venue')

    if ($(`.js-section-view[data-view="${view}"]`, _tabbar).length > 0) {
      _body.attr('data-section', view).removeAttr('data-sub')
      $('.js-section-view').removeClass('focus')
      $(this).addClass('focus')

      $('.js-modal').removeClass('show')
    } else {
      _body.attr('data-sub', view)

      if ($(this).attr('data-edit') === 'true') {
        _body.addClass('map-edit-venue')
      }
    }

    return false
  })

  // サブ画面（タブにない画面）を閉じる
  $(document).on('click', '.js-sub-close', function () {
    $(`.js-section-view[data-view="${$(this).attr('data-view')}"]`).removeClass('focus')
    _body.removeAttr('data-sub').removeClass('map-edit-venue')
    return false
  })

  // URL変更
  $(document).on('click', 'a[href^="./"]', function (e) {
    e.preventDefault()
    history.replaceState(null, '', $(this).attr('href'))
  })

  // ソーシャルログイン
  $(document).on('click', '.js-social-login', () => {
    $(`.mypage-status[data-status="before"]`).hide()
    $(`.mypage-status[data-status="login"]`).show()

    // TODO ソーシャルログインの実装（下記は成功時の再現）
    setTimeout(() => {
      Var.login.logged_in = true
      Var.login.user_id = "a1"

      Var.login.profiles.push('comedian')
      Var.login.profiles.push('venue_manager')

      $(`.mypage-status[data-status="login"]`).hide()
      $(`.mypage-status[data-status="mypage"]`).show()

      $(`.tabbar-profiles[data-has-profile="yes"]`).show()
      $(`.tabbar-profiles[data-has-profile="no"]`).hide()
    }, 1000)
  })

  // API（初期ロード） TODO URL変更
  const data = await Fn.api('./assets/dummy/init.js')

  Var.login ??= {}
  Var.login.logged_in = data.login.logged_in
  Var.login.user_id = data.login.user_id

  // APIから取得したロール
  Var.login.profiles = data.login.profiles ?? []

  console.log("login", Var.login)

  Var.comedian_map = new Map(
    data.comedians.map(comedian => [
      comedian.user_id,
      comedian
    ])
  )

  Var.venue_map = new Map(
    data.venues.map(venue => [
      venue.venue_id,
      venue
    ])
  )

  Var.event_map = new Map(
    data.events.map(event => [
      event.event_id,
      event
    ])
  )

  Var.event_venue_map = new Map()
  data.events.forEach(event => {

    if (!Var.event_venue_map.has(event.venue_id)) {
      Var.event_venue_map.set(event.venue_id, [])
    }

    Var.event_venue_map.get(event.venue_id).push(event)
  })

  Module.comedian.render(data.comedians)
  Module.event.render(data.events)
  Module.venue.render(data.venues)
  Module.notice.render(data.notices)
  Module.latest_comment.render(data.latest_comments)

  await initMap()
})
