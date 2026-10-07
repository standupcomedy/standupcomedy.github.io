(() => {
  const ua = navigator.userAgent || navigator.vendor || window.opera,
        is_android = /android/i.test(ua),
        is_ios = /iphone|ipad|ipod/i.test(ua)

  const renderInAppGuide = () => {
    $('body').html(`
      <style>
        .force_open_external_browser {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          line-height: 1.5;
          background: #fff;
        }
        .force_open_external_browser > div {
          max-width: 400px;
          padding: 20px;
          box-sizing: border-box;
        }
        .force_open_external_browser h1 {
          margin: 0 0 20px;
          padding: 0;
          font-size: 22px;
        }
        .force_open_external_browser p {
          margin: 10px 0 0;
          padding: 0;
          font-size: 14px;
        }
        .force_open_external_browser .copy-btn {
          display: block;
          width: fit-content;
          margin: 20px auto 0;
          padding: 10px 15px;
          border: 1px solid #555;
          border-radius: 3px;
          background: #fbfaf5;
          cursor: pointer;
        }
        .force_open_external_browser .toast {
          position: relative:
        }
        .force_open_external_browser .toast strong {
          position: absolute;
          left: 0;
          display: none;
          width: 100%;
          text-align: center;
          color: #28a745;
        }

      </style>
      <div class="force_open_external_browser">
        <div>
          <h1>標準ブラウザで開き直してください</h1>
          <p>この画面はアプリ内のブラウザとなり、正常に動作しない場合があります。</p>
          <p>そのため、右上の「…」や共有ボタンをタップして「外部ブラウザーで開く」を選択、もしくは下のリンクをコピーして、SafariやChromeなど通常のブラウザで開き直してご利用ください。</p>
          <p>
            <span class="copy-btn js-copy-target">https://standupcomedy.github.io/</span>
          </p>
          <p class="toast"><strong class="js-toast"></strong></p>
        </div>
      </div>
    `)

    // 画面生成後にクリックイベントを設定（スコープの問題を完全回避）
    $('.js-copy-target').on('click', async function() {
      const textToCopy = $(this).text().trim()
      const $toast =$('.js-toast')

      try {
        await navigator.clipboard.writeText(textToCopy)
        $toast.text("コピーしました").fadeIn(200)

        setTimeout(() => {
          $toast.fadeOut(200)
        }, 2000)
      } catch (err) {
      }
    })
  }

  // 主要SNSアプリ内ブラウザ（In-App Browser）の判定
  const is_in_app = /FBAN|FBAV|Instagram|Line|Twitter|FB_IAB|FB4A|Snapchat/i.test(ua)

  // すでに外部ブラウザなら何もしない
  if (!is_in_app) return

  // 1. LINEの場合（iOS/Android共通で最も確実に動く）
  if (/Line/i.test(ua)) {
    const url = new URL(window.location.href)
    url.searchParams.set('openExternalBrowser', '1')
    window.location.href = url.toString()
    return
  }

  // 2. Androidの場合（Intentスキームを使ってChromeを強制起動）
  if (is_android) {
    const raw_url = window.location.href.replace(/^https?:\/\//, '')

    // ChromeのIntentを呼び出して強制的に外部ブラウザを開く
    location.href = `intent://${raw_url}#Intent;scheme=https;package=com.android.chrome;end;`
    return
  }

  // 3. iOS（Instagram / X / Facebook等）の場合
  if (is_ios) {

    // iOSのInstagramやXでは、JSによるWebサイト側からのSafari強制起動APIが存在しないため、
    // 画面上に「右上の『...』からSafariで開いてください」という図解バナーを出すのが唯一の解決策
    document.addEventListener('DOMContentLoaded', renderInAppGuide)
  }
})()