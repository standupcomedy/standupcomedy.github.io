Var.modal_z_index = 0

const showModal = async (modal_type, modal_id) => {
  const _modal_outer = $('.js-modal-outer')

  let is_scroll_top

  // ガード
  if (!modal_type) {
    return false
  }

  // ガード
  if (modal_type === 'comedian' && !modal_id) {
    return false
  }

  let tgt = $((`.js-modal[data-view="${modal_type}"]`)),
      modal_content = ''

  Var.modal_z_index++

  if (tgt.length === 0) {
    _modal_outer.append(`
      <div class="modal js-modal" data-view="${modal_type}">
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

    tgt = $((`.js-modal[data-view="${modal_type}"]`))
  }

  switch (modal_type) {
    case 'comedian':
    case 'edit-profile-comedian':
    case 'venue':
    case 'edit-profile-venue':
    case 'event':
    case 'edit-event':
      $('.js-modal-content', tgt).addClass('loading').html(`<i data-lucide="loader-circle"></i>`)

      is_scroll_top = true

      switch (modal_type) {
        case 'comedian':
          modal_content = Module.modal.getComedianHtml(modal_id)
          break
        case 'edit-profile-comedian':
          modal_content = Module.modal.getEditProfileComedianHtml(modal_id)
          break
        case 'venue':
          modal_content = Module.modal.getVenueHtml(modal_id)
          break
        case 'edit-profile-venue':
          modal_content = Module.modal.getEditProfileVenueHtml(modal_id)
          break
        case 'event':
          modal_content = Module.modal.getEventHtml(modal_id)
          break
        case 'edit-event':
          modal_content = Module.modal.getEditEventHtml(modal_id)
          break

        // defaultなし
      }
      break

    default:
      modal_content = Module.modal[modal_type]
  }


  tgt.css('z-index', Var.modal_z_index)
  $('.js-modal-content', tgt).html(modal_content).removeClass('loading')

  switch (modal_type) {
    case 'comedian':
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

  if (is_scroll_top) {
    $('.js-modal-content-scroll').scrollTop(1)
  }

  // Notice: モーダルアニメーションを有効にするための遅延
  setTimeout(() => {
    $('.js-modal').removeClass('show')
    tgt.addClass('show')
  }, 10)
}