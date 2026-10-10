const ls_standup = Fn.storageLS('standup') || {}

Var.login = {}
Var.login.profiles = []

Var.service_key = 'standup'
Var.api_base_url = (location.hostname === 'standupcomedy.github.io') ?
  'https://api.standupspot.com' : 'http://localhost:8092'


$(async () => {
  Fn.countFormText()

  // アイコンセット（https://lucide.dev/icons/）
  // NOTICE: 非同期でHTMLを追加するたびに、lucideアイコンを使用する場合には別途実行すること
  lucide.createIcons()

  const _body = $('body')

  setCalendarHtml()

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
    showSection($(this).attr('data-view'), $(this).attr('data-edit') === 'true')
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
  $(document).on('click', '.js-social-login', function () {
    const social_type = $(this).attr('data-type')

    const _login = $(`.mypage-status[data-status="login"]`),
          _loading = $(`.mypage-status[data-status="loading"]`)

    let href = ''

    _loading.css({height: _login.outerHeight()}).show()
    _login.remove()

    switch (social_type) {
      case 'google':
        href = Var.api_base_url + '/auth/google?service=standup'
        break

      // default なし
    }

    location.href = href
  })

  // ソーシャルログアウト
  $(document).on('click', '.js-social-logout', function () {
    const _mypage = $(`.mypage-status[data-status="mypage"]`),
          _loading = $(`.mypage-status[data-status="loading"]`)

    _loading.css({height: _mypage.outerHeight()}).show()
    _mypage.remove()
    location.href = Var.api_base_url + '/logout?service=standup'
  })

  // API（初期表示用ロード）
  const data = await Fn.api(`${Var.api_base_url}/init?service=${encodeURIComponent(Var.service_key)}`)

  Var.login = data.login

  Var.comedian_map = new Map(
    data.comedians.map(comedian => [
      comedian.id,
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
      String(event.id),
      event
    ])
  )

  Var.event_venue_map = new Map()

  data.events.forEach(event => {
    event.candidates
    .filter(candidate => candidate.venue_id !== null)
    .forEach(candidate => {
      const venue_id = String(candidate.venue_id),
            event_id = String(event.id)

      if (!Var.event_venue_map.has(venue_id)) {
        Var.event_venue_map.set(venue_id, [])
      }

      const event_ids = Var.event_venue_map.get(venue_id)

      if (!event_ids.includes(event_id)) {
        event_ids.push(event_id)
      }
    })
  })

  Var.candidate_event_map = new Map(
    data.events.flatMap(event =>
      event.candidates.map(candidate => [
        String(candidate.id),
        String(event.id)
      ])
    )
  )

  // const event_ids = Var.event_venue_map.get('1');



  if (Var.login.logged_in) {
    $(`.mypage-status[data-status="login"]`).remove()
  } else {
    $(`.mypage-status[data-status="mypage"]`).remove()
  }

  await setComedian()

  if (Var.login.profiles.includes('venue_manager')) {
    Fn.setToggleBtnRoll('venue_manager', 'on')
  }

  Module.comedian.render(data.comedians)
  Module.event.render(data.events)
  Module.venue.render(data.venues)
  Module.notice.render(data.notices)
  Module.latest_comment.render(data.latest_comments)

  await setMap()

  // 画面表示する
  // TODO URLではなく LSで保存して再現する、保存日も確認してxx日経過してたら、homeを表示する
  showSection(Fn.getParam('view') || 'home')

  if (Fn.getParam('modal')) {
    showModal(Fn.getParam('modal'), Fn.getParam('id'))
  }

  // スプラッシュを削除する
  setTimeout(() => {
    $('.js-splash').remove()
  }, 350)
})
