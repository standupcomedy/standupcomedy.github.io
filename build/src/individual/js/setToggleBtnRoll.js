/**
 * ロール切り替えトグル
 *
 * @param {string} role: comedian|venue_manager
 * @param {string} set_status: on|off
 */
Fn.setToggleBtnRoll = (role, set_status) => {
  const _tgt = $(`.js-form-toggle-button[data-role="${role}"]`)

  $('input', _tgt).val((set_status === 'on') ? 1 : 0)
  _tgt.closest('.js-form-toggle').attr('data-status', set_status)
  _tgt.attr('data-status', set_status)
}