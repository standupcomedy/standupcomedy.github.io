Module.modal = Module.modal || {}
Module.modal.getEditProfileComedianHtml = (id) => {
  return `
    <aside class="form">
      <h2>プロフィール編集</h2>
      <form class="js-form-comedian-thumbnail">
        <dl>
          <div>
            <dt>サムネイル画像</dt>
            <dd>
              <div>
                <input type="file" name="thumbnail" accept="image/jpeg,image/png,image/webp,image/heic,image/heif">
              </div>
            </dd>
          </div>
        </dl>
        <nav class="form-save-outer">
          <div class="form-save js-submit-toast">
            <button type="submit" class="js-submit-comedian-thumbnail">保存する</button>
          </div>
        </nav>
      </form>
      <form class="js-form-comedian-profile">
        <dl>
          <div>
            <dt>コメディアン・ネーム</dt>
            <dd>
              <div>
                <input type="text" name="name">
              </div>
            </dd>
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
          <div class="form-save js-submit-toast">
            <button type="submit" class="js-submit-comedian-profile">保存する</button>
          </div>
        </nav>
      </form>
    </aside>
  `
}