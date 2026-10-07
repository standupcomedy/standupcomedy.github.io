const showSection = (view, is_edit) => {
  const _body = $('body'),
        _tabbar = $('.js-tabbar')

  _body.removeClass('map-edit-venue')

  if ($(`.js-section-view[data-view="${view}"]`, _tabbar).length > 0) {
    _body.attr('data-section', view).removeAttr('data-sub')
    $('.js-section-view').removeClass('focus')
    $(`.js-section-view[data-view="${view}"]`, _tabbar).addClass('focus')

    $('.js-modal').removeClass('show')
  } else {
    _body.attr('data-sub', view)

    if (is_edit) {
      _body.addClass('map-edit-venue')
    }
  }
}
