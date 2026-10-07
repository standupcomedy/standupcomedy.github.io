Module.modal = Module.modal || {}
Module.modal.getEditProfileComedianHtml = (id) => {
  return `
    <aside class="form">
      <h2>プロフィール編集</h2>
      <form class="form">
        <dl>
          <div>
            <dt>コメディアン・ネーム</dt>
            <dd>
              <div>
                <input type="text">
              </div>
            </dd>
          </div>
          <div>
            <dt>サムネイル画像</dt>
            <dd>
              <div>
                <input type="text">
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
          <div class="form-save">
            <button type="button">保存する</button>
          </div>
        </nav>
      </form>
    </aside>
  `
}