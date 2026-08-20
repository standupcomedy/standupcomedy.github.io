Var.options_hour = () => {
  let options = ''

  for (let i = 0; i < 24; i++) {
    const hour = String(i).padStart(2, '0')
    options += `<option value="${hour}">${hour}</option>`
  }

  return options
}

Module.modal = Module.modal || {}
Module.modal['edit-event'] = `
  <aside class="form">
    <h2>イベント新規作成・編集</h2>
    <form class="form">
      <dl>
        <div>
          <dt class="form-item-title-flex">
            <span>スタート</span>
            <span class="form-button">
              <button type="button" class="js-form-add-datetime">候補日時を追加する</button>
            </span>
          </dt>
          <dd>
            <div class="form-datetime js-form-datetime">
              <div class="form-datetime-delete">
                <button type="button" class="js-form-delete-datetime">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
              <input type="date">
              <select name="hour">
                ${Fn.createTimeOptions()}
              </select>
              <span>:</span>
              <select name="minute">
                ${Fn.createTimeOptions(0, 45, 15)}
              </select>
            </div>
          </dd>
        </div>
        <div class="form-item-flex">
          <dt>オープン</dt>
          <dd>
            <div class="form-datetime">
              <select name="hour">
                ${Fn.createTimeOptions()}
              </select>
              <span>:</span>
              <select name="minute">
                ${Fn.createTimeOptions(0, 45, 15)}
              </select>
            </div>
          </dd>
        </div>
        <div>
          <dt class="form-item-title-flex">
            <span>場所</span>
            <span class="form-button">
              <button type="button" class="js-modal-view" data-view="profile-venue">場所を追加登録する</button>
            </span>
          </dt>
          <dd>
            <div>
              <input type="text">
              <ul>

              </ul>
            </div>
          </dd>
        </div>
        <div class="form-item-flex">
          <dt>タイプ</dt>
          <dd>
            <div class="form-label">
              <label>
                <input type="radio" name="type" value="openmic" checked>
                <span>オープンマイク</span>
              </label>
              <label>
                <input type="radio" name="type" value="show">
                <span>ショー</span>
              </label>
            </div>
          </dd>
        </div>
        <div>
          <dt>イベント名</dt>
          <dd>
            <input type="text" name="name" value="">
          </dd>
        </div>
        <div>
          <dt>料金</dt>
          <dd>
            <input type="text" name="fee" value="">
          </dd>
        </div>
        <div>
          <dt>告知画像</dt>
          <dd>
            <input type="text" name="fee" value="">
          </dd>
        </div>
        <div class="form-item-flex">
          <dt>ステータス</dt>
          <dd>
            <div class="form-label">
              <label>
                <input type="radio" name="status" value="pending" checked>
                <span>調整中</span>
              </label>
              <label>
                <input type="radio" name="status" value="confirmed">
                <span>開催決定</span>
              </label>
            </div>
          </dd>
        </div>
        <div class="form-item-flex">
          <dt>参加条件</dt>
          <dd>
            <div class="form-label">
              <label>
                <input type="radio" name="condition" value="pending" checked>
                <span>だれでも</span>
              </label>
              <label>
                <input type="radio" name="condition" value="confirmed">
                <span>共有リンク</span>
              </label>
            </div>
          </dd>
          <dd class="form-ex">共有リンクを使うと、そのリンクを知っているコメディアンのイベカレ詳細に「参加する」ボタンが表示されます。</dd>
        </div>
        <div>
          <dt>補足(コメディアンのみイベカレ詳細に表示)</dt>
          <dd>
            <div class="js-inputtext">
              <textarea class="js-inputtext-element"></textarea>
              <p class="form-count"><span class="js-inputtext-count" data-max="500">0</span> / 500</p>
            </div>
          </dd>
        </div>
      </dl>
      <nav class="form-save-outer">
        <div class="form-save">
          <button type="button">削除する</button>
        </div>
        <div class="form-save">
          <button type="button">保存する</button>
        </div>
      </nav>
    </form>
  </aside>
`