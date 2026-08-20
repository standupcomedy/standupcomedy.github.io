Module.modal = Module.modal || {}
Module.modal['profile-venue'] = `
  <aside class="form">
    <h2>場所情報の新規追加・編集</h2>
    <form class="form">
      <dl>
        <div>
          <dt>店名・会場名</dt>
          <dd>
            <div>
              <input type="text">
            </div>
          </dd>
        </div>
        <div>
          <dt class="form-item-title-flex">
            <span>住所</span>
            <span class="form-button">
              <button type="button" class="js-section-view" data-view="map" data-edit="true">地図で確認する</button>
            </span>
          </dt>
          <dd>
            <div>
              <input type="text">
              <input type="hidden" name="lat" value="">
              <input type="hidden" name="lng" value="">
              <input type="hidden" name="station" value="">
            </div>
          </dd>
        </div>
        <div>
          <dt>イベント作成時の場所検索用ワード</dt>
          <dd><textarea></textarea></dd>
        </div>
        <div class="form-socialmedia">
          <dt>ソーシャルメディア</dt>
          <dd>
            <span>https://www.<strong>instagram</strong>.com/</span>
            <input type="text" name="instagram" value="">
          </dd>
          <dd>
            <span>https://<strong>x</strong>.com/</span>
            <input type="text" name="x" value="">
          </dd>
          <dd>
            <span>https://www.<strong>tiktok</strong>.com/@</span>
            <input type="text" name="tiktok" value="">
          </dd>
          <dd>
            <span>https://www.<strong>youtube</strong>.com/@</span>
            <input type="text" name="youtube" value="">
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